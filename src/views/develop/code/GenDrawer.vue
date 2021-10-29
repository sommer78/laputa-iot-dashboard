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
  import { formSchema } from './gen.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import {  handleDown  } from '/@/api/dev/gen';
  
  export default defineComponent({
    name: 'GenDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],

    setup(_, { emit }) {
      const isBetch = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        console.info(data.record)
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isBetch.value = !!data?.isBetch;

      
          setFieldsValue({
            ...data.record,
            comments: data.record.tableComment,
          });
        
      
      });

      const getTitle = computed(() => (!unref(isBetch) ? '生成代码' : '批量生成'));

      async function handleSubmit() {
        try {
          
          const values = await validate();
         
          setDrawerProps({ confirmLoading: true });
          // console.log(row);
          handleDown(values);
         
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
