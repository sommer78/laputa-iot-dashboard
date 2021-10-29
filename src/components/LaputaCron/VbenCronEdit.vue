<template>
  
 <el-popover v-model:visible="state.cronPopover" width="700px" trigger="manual">
      <CronModal
        @change="changeCron"
        @close="togglePopover(false)"
      ></CronModal>
      <template #reference>
        <el-input
          @focus="togglePopover(true)"
          v-model="state.cron"
          placeholder="* * * * * ? *"
        ></el-input>
      </template>
    </el-popover>
</template>

<script>
import { reactive, defineComponent, ref } from 'vue';
// import { useModal } from '/@/components/Modal';
import CronModal from './CronModal.vue';
import {
  ElPopover,
  ElInput,
  
} from 'element-plus';

export default defineComponent({
  name: 'VbenCronEdit',
  components: { ElPopover,  ElInput, CronModal },
  setup() {

    // const [registerModal, { openModal }] = useModal();
    const state = reactive({
      cronPopover: false,
      cron: '',
      maxHeight: 1000,
    
    });
    const changeCron = (val) => {
      if (typeof val !== 'string') return false;
      state.cron = val;
    };

    const togglePopover = (bol) => {
      state.cronPopover = bol
    }

    return {
      state,
      changeCron,
      togglePopover,
    };
  },
});
</script>

<style lang="less" scoped>
.cron-popover {
  height: 400px;
}
</style>
