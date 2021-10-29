<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" class="accountForm">
      <template #headImg>
        <Upload
          style="margin: auto"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :multiple="false"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <plus-outlined></plus-outlined>
            <div class="ant-upload-text">上传头像</div>
          </div>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, Rule, useForm } from '/@/components/Form/index';
import { accountFormSchema } from './account.data';
import { useMessage } from '/@/hooks/web/useMessage';
// import { getDeptTree } from '/@/api/upms/dept';
import { PlusOutlined } from '@ant-design/icons-vue';
import { uploadApi } from '/@/api/file/upload';
import { updateUser, addUser, checkEntityExist } from '/@/api/upms/user';
import { CropperAvatar } from '/@/components/Cropper';
import { checkImgType, getBase64WithFile } from '/@/components/Upload/src/helper';
import { Upload } from 'ant-design-vue';
import { CheckExistParams } from '/@/api/model/baseModel';

export default defineComponent({
  name: 'AccountModal',
  components: { BasicModal, BasicForm, Upload, PlusOutlined, CropperAvatar },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref('');
    const imageUrl = ref<string>('');
    const { createMessage } = useMessage();
    const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
      labelWidth: 100,
      schemas: accountFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 23,
      },
    });

    const getBaseDynamicRules = (params: CheckExistParams) => {
      return [
        {
          trigger: 'blur',
          validator: (_, value) => {
            if (value) {
              return checkEntityExist({
                id: params.id,
                field: params.field,
                fieldValue: value,
                fieldName: params.fieldName,
              })
                .then((res) => {
                  if (res) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(params.fieldName + '已存在，请修改！');
                  }
                })
                .catch((res) => {
                  return Promise.reject(res);
                });
            } else {
              return Promise.resolve();
            }
          },
        },
      ] as Rule[];
    };

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      // console.log('isUpdate:', isUpdate.value)
      let formData = data.record;
      if (unref(isUpdate)) {
        rowId.value = formData.id;
        const roles = formData.roleList.map((item) => {
          return item.id;
        });
        // console.log('roles:', roles)

        formData.roles = roles;
        setFieldsValue({
          ...formData,
        });
      }

      // const treeData = await getDeptTree();
      await updateSchema([
        {
          field: 'username',
          dynamicRules: () => {
            return [
              {
                required: true,
                whitespace: true,
                message: '用户名不能为空！',
              },
              {
                pattern: new RegExp('^[0-9a-zA-Z_]{1,}$'),
                type: 'string',
                message: '请输入英文或数字！',
              },
              {
                max: 32,
                message: '字符长度不能大于32！',
              },
              ...getBaseDynamicRules({
                id: (unref(isUpdate) && formData && formData.id) || '',
                field: 'username',
                fieldValue: '',
                fieldName: '用户名',
              }),
            ];
          },
        },

        {
          field: 'mobile',
          dynamicRules: () => {
            return [
              {
                required: true,
                whitespace: true,
                message: '手机不能为空！',
              },
              {
                pattern: new RegExp(
                  '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$'
                ),
                type: 'string',
                message: '请输入正确的手机号！',
              },
              {
                max: 32,
                message: '字符长度不能大于32！',
              },
              ...getBaseDynamicRules({
                id: (unref(isUpdate) && formData && formData.id) || '',
                field: 'mobile',
                fieldValue: '',
                fieldName: '手机号',
              }),
            ];
          },
        },
        {
          field: 'email',
          dynamicRules: () => {
            return [
              {
                pattern: new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'),
                type: 'string',
                message: '请输入正确的邮箱地址！',
              },
              {
                max: 256,
                message: '字符长度不能大于256！',
              },
              ...getBaseDynamicRules({
                id: (unref(isUpdate) && formData && formData.id) || '',
                field: 'email',
                fieldValue: '',
                fieldName: '邮箱',
              }),
            ];
          },
        },
        {
          field: 'password',
          show: !unref(isUpdate),
        },
      ]);
      if(isUpdate.value){
        imageUrl.value = data.record.avatar;
      }
     
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

    function uploadSuccess({ source, data }) {
      // console.log( source );
      // console.log(data);
      imageUrl.value = data.url;
    }

    async function handleSubmit() {
      if (unref(isUpdate)) {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          values.avatar = imageUrl.value;
          values.password = '';
          console.log(values);
          const result = await updateUser(values);
          if (result) {
            closeModal();
            emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
          } else {
            createMessage.error('更新用户失败');
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }else{
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          values.avatar = imageUrl.value;
 
          const result = await addUser(values);
          if (result) {
            closeModal();
            emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
          } else {
            createMessage.error('更新用户失败');
          }
        } finally {
          setModalProps({ confirmLoading: false });
        } 
      }
    }
    const beforeUpload = (file) => {
      if (!checkImgType(file)) {
        createMessage.error('只允许上传图片！');
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        createMessage.error('图片不能大于2MB！');
        return false;
      }
      // console.log(file);
      getBase64WithFile(file).then(({ result: thumbUrl }) => {
        imageUrl.value = thumbUrl;
      });

      return false;
    };

    return {
      imageUrl,
      registerModal,
      registerForm,
      getTitle,
      handleSubmit,
      beforeUpload,
      uploadSuccess,
      uploadApi,
    };
  },
});
</script>
<style lang="less" scoped>
.accountForm {
  position: relative;
}
</style>
