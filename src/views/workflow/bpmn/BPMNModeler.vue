<template>
  <PageWrapper>
    <div class="w-full h-screen bg-gray-100">
      <BpmnActions />
      <Modeler />
      <Panel />
     
    </div>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { useGo } from '/@/hooks/web/usePage';
import { useMessage } from '/@/hooks/web/useMessage';
import Modeler from '/@/components/LaputaBpmn/modeler';
import { PageWrapper } from '/@/components/Page';
import Panel from '/@/components/LaputaBpmn/panel';
import BpmnActions from '/@/components/LaputaBpmn/bpmn-actions';
export default defineComponent({
  name: 'BPMNModeler',
  components: { PageWrapper, Modeler, Panel, BpmnActions },
  setup() {
    const go = useGo();
    const { notification } = useMessage();

    function handleDelete(record: Recordable) {
      // console.log(record);
    
    
    }

    function handleRoleAuth(record: Recordable, e) {
      e.stopPropagation();
      go('/upms/role_auth/' + record.id);
    }

    return {
      handleRoleAuth,
      handleDelete,
    };
  },
});
</script>

<style scoped>
.bpmn-modeler-containers {
  height: 90vh;
}


/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 4px;
  background-color: #f1f1f1;
  border-radius: 0.6px;
  height: 4px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  width: 4px;
  height: 60px;
  background-color: #475156;
  border-radius: 2px;
}

</style>