/*
 *    Copyright (c) 2018-2025, Laputa IOT All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the www.laputa-iot.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: SommerJiang (sommer_jiang@163.com)
 */

<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="展示定时任务调度表"
    @visible-change="handleShow"
  >
    <Description @register="registerDesc" class="mt-4" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { Description, useDescription } from '/@/components/Description/index';
import { jobSchema } from './job.data';

export default defineComponent({
  name: 'JobModel',
  components: { BasicModal, Description },
  setup() {
    const loading = ref(true);
    const lines = ref(10);
    const [register, { setModalProps, redoModalHeight }] = useModalInner(async (data) => {
      // console.log(data);
      setDescProps({ data: data.data });
    });

    const [registerDesc, { setDescProps }] = useDescription({
      schema: jobSchema,
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
    return { register, loading, handleShow, lines, setLines, registerDesc };
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
