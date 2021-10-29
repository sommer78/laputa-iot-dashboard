<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
     
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from './role.data';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

import {  updateRole, addRole } from '/@/api/upms/role';
import { Button } from '/@/components/Button';

import { useMessage } from '/@/hooks/web/useMessage';
// import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent({
  name: 'RoleDrawer',
  components: { BasicDrawer, BasicForm, Button },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);

    const checkedKeys = ref<number[]>([]);
    const { createMessage } = useMessage();
    let menuIds = '';

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 90,
      schemas: formSchema,
      showActionButtonGroup: false,
    });
    // const { t } = useI18n();
    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      resetFields();
      setDrawerProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        });
      }
    
      // treeData.value = (await getMenuParents()) as any as TreeItem[];
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

    async function handleSubmit() {
      try {
        const datas = await validate();
        setDrawerProps({ confirmLoading: true });

        datas.menuIds = menuIds;
        
        // console.log(datas);
        if (isUpdate.value) {
          const result = await updateRole(datas);
          if(result){
             createMessage.success('更新角色成功');
          }
         
        } else {
          const result = await addRole(datas);
          if(result){
             createMessage.success('添加角色成功');
          }
        
        }
        closeDrawer();
        emit('success');
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

 
   
   

    return {
      checkedKeys,
      registerDrawer,
      registerForm,
      getTitle,
      handleSubmit,
    
 

    };
  },
});
</script>
