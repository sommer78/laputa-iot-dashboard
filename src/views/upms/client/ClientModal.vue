<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="展示终端信息"
    @visible-change="handleShow"
  >
  
   <Description @register="registerDesc" class="mt-4" />

  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description,  useDescription } from '/@/components/Description/index';
  import { descSchema } from './client.data';


  export default defineComponent({
    name:'ClientModel',
    components: { BasicModal, Description },
    setup() {
      const loading = ref(true);
      const lines = ref(10);
      const [register, { setModalProps, redoModalHeight }] = useModalInner(async (data) => {
        // console.log(data);
        setDescProps({data: data.data});
      // resetFields();
      // setDrawerProps({ confirmLoading: false });
      // isUpdate.value = !!data?.isUpdate;

      // setFieldsValue({
      //   ...data.record,
      // });
      });
    
      const [registerDesc, {setDescProps}] = useDescription({
        schema: descSchema,
        useCollapse: true,
       
      });

      
      watch(
        () => lines.value,
        () => {
          redoModalHeight();
        }
      );

      function handleShow(visible: boolean) {
        if (visible) {
          loading.value = true;
          setModalProps({ loading: true, confirmLoading: true });
          setTimeout(() => {
            lines.value = Math.round(Math.random() * 30 + 5);
            loading.value = false;
            setModalProps({ loading: false, confirmLoading: false });
          }, 1000);
        }
      }

      function setLines() {
        lines.value = Math.round(Math.random() * 20 + 10);
      }
      return { register, loading, handleShow, lines, setLines,registerDesc };
    },
  });
</script>
<style scoped>
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
