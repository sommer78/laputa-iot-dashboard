<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" >
      <template #settingLeader="{ model, field }">
        <Tag v-if="model[field]" closable @close="handleDeleteLeader">
          {{model['leaderName']}}[{{model[field]}}]
        </Tag>
        <a-button style="width: 110px" type="link" @click="handleSettingLeader">设置领导</a-button>
      </template>
    </BasicForm>
    <StaffSelector @register="registerStaffModal"
                      @success="handleSettingLeaderSuccess"/>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, Rule, useForm } from '/@/components/Form/index';
  import { deptFormSchema } from './dept.data';
  import { saveOrUpdate, checkEntityExist } from '/@/api/org/dept';
  import { getCompanies } from '/@/api/org/company';
  import { useModal } from '/@/components/Modal';
  import {  Tag } from 'ant-design-vue';
  import StaffSelector from '/@/views/components/selector/staffSelector/index.vue';
  import {CheckExistParams} from "/@/api/model/baseModel";
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();


  export default defineComponent({
    name: 'DeptModal',
    components: { BasicModal, BasicForm,  Tag, StaffSelector },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const [registerStaffModal, { openModal: openStafflSelector, setModalProps: setStaffModalProps }] = useModal();

      const selectedPersonList = ref([]);

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: deptFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const getBaseDynamicRules = (params: CheckExistParams)=>{
        return [
          {
            trigger: 'blur',
            validator: (_, value)=>{
              if(value){
                return checkEntityExist({id: params.id, field: params.field, fieldValue: value, fieldName:params.fieldName}).then(res=>{
                  if(res){
                    return Promise.resolve();
                  }else{
                    return Promise.reject(params.fieldName + "已存在，请修改！")
                  }
                }).catch((res)=>{
                  return Promise.reject(res)
                })
              }else{
                return Promise.resolve();
              }
            }
          }
        ] as Rule[];
      }

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        const treeData = await getCompanies();
        let formData = data.record;

        if(formData.id && formData.leaderCode){
          selectedPersonList.value = [{code:formData.leaderCode, name:formData.leaderName}];
        }else{
          selectedPersonList.value = [];
        }
        await updateSchema([
          {
            field: 'companyId',
            componentProps: { treeData },
          },
          {
            field: 'code',
            dynamicRules: () => {
              return [
                {
                  required: true,
                  whitespace: true,
                  message: '编码不能为空！',
                },
                {
                  pattern: new RegExp('^[0-9a-zA-Z_]{1,}$'),
                  type: 'string',
                  message: '请输入英文或数字！',
                },
                {
                  max: 64,
                  message: '字符长度不能大于64！',
                },
                ...getBaseDynamicRules({id: unref(isUpdate)&&formData&&formData.id||"", field: 'code', fieldValue: "", fieldName:'编码'}),
              ];
            },
          }
        ]);

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        } else {
          if(formData.companyId){
            setFieldsValue({
              companyId: formData.companyId
            });
          }
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '修改部门'));

      // 弹出选择领导
      function handleSettingLeader() {
        openStafflSelector(true, {
          selectorProps:{
            multiSelect: false,
            selectedList: selectedPersonList.value,
          }
        });

        setStaffModalProps({
          title: `设置部门领导`,
          bodyStyle: {padding: '0px', margin: '0px'},
          width: 850, height: 450,
          showOkBtn: true, showCancelBtn: false
        });
      }

      // 设置领导成功回调
      async function handleSettingLeaderSuccess(selectedStaffs: any) {
        selectedPersonList.value = selectedStaffs.map(item=>{return {id: item.id, code: item.code, name: item.name}});
        if(selectedStaffs&& selectedStaffs.length>0){
          setFieldsValue({
            leaderCode: selectedStaffs[0].code,
            leaderName: selectedStaffs[0].name
          });
        }else{
          setFieldsValue({
            leaderCode: '',
            leaderName: ''
          });
        }
      }
      async function handleDeleteLeader() {
        setFieldsValue({
          leaderCode: '',
          leaderName: ''
        });
        selectedPersonList.value = [];
      }

      async function handleSubmit() {
        try {
          setModalProps({confirmLoading: true});
          const values = await validate();
          const result = await saveOrUpdate(values);
          if(result){
             createMessage.success('新增或更新部门成功');
              closeModal();
               emit('success');
          }else{
              createMessage.error('新增或更新部门失败');
          }
         
        } finally {
          setModalProps({confirmLoading: false});
        }
      }

      return {
        registerModal,
        registerForm,
        getTitle,
        registerStaffModal,
        selectedPersonList,
        handleDeleteLeader,
        handleSettingLeader,
        handleSubmit,
        handleSettingLeaderSuccess,
  
      };
    },
  });
</script>
