<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getMenuParents, updateMenu, addMenu } from '/@/api/upms/menu';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
       const isSubmenu = ref(false);
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
       
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        isSubmenu.value = !!data?.isSubmenu;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
         if (unref(isSubmenu)) {
          setFieldsValue({
            ...data.record,
          });
        }
        
        const treeData = await getMenuParents();
        // console.log(treeData);
        updateSchema({
          field: 'parentId',
          componentProps: { treeData },
        });
         
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          
          const values = await validate();
         
          setDrawerProps({ confirmLoading: true });
  
          console.log(values);
          if(values.type === 0){
            values.component = 'LAYOUT'
          }
          let result ;
          if(isUpdate.value){
             result = await updateMenu(values);

          }else{
             result = await addMenu(values);
    
          }
          console.log(result);
         if(result){

          emit('success');
          closeDrawer(); 
         }
        
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }


      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
