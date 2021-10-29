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
  import { formSchema } from './ds.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { putDsconf, addDsconf } from '/@/api/dev/gen';
  
  export default defineComponent({
    name: 'DsDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],

    setup(_, { emit }) {
      // const urlPixx = 'jdbc:mysql://laputa-mysql:3306/laputa_iot_upms?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&allowMultiQueries=true&allowPublicKeyRetrieval=true';
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        
        if (unref(isUpdate)) {
          data.record.password = '';
          setFieldsValue({
            ...data.record,
          });
        }
      
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增数据源' : '编辑数据源'));

      async function handleSubmit() {
        try {
          
          const values = await validate();
         
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
           let message1= `jdbc:${values.dsType}://${values.host}:${values.port}/${values.dsName}?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&allowMultiQueries=true&allowPublicKeyRetrieval=true` ;
           console.log(message1);
           values.url = message1;
          if(isUpdate.value){
            const result = await putDsconf(values);
           console.log(result);
          }else{
              const result = await addDsconf(values);
           console.log(result); 
          }
         
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
