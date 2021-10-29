<template>
  <PageWrapper title="WebSocket 示例">
    <div class="flex">
      <div class="w-1/3 p-4 bg-white">
        <div class="flex items-center">
          <span class="mr-4 text-lg font-medium"> 连接状态: </span>
          <Tag :color="getTagColor">{{ status }}</Tag>
        </div>
        <hr class="my-4" />

        <div class="flex">
          <a-input v-model:value="server" disabled>
            <template #addonBefore> 服务地址 </template>
          </a-input>
          <a-button :type="getIsOpen ? 'danger' : 'primary'" @click="toggle">
            {{ getIsOpen ? '关闭连接' : '开启连接' }}
          </a-button>
        </div>
        <p class="mt-4 text-lg font-medium">设置</p>
        <hr class="my-4" />

        <InputTextArea
          placeholder="需要发送到服务器的内容"
          :disabled="!getIsOpen"
          v-model:value="sendValue"
          allowClear
        />

        <a-button type="primary" block class="mt-4" :disabled="!getIsOpen" @click="handlerSend">
          发送
        </a-button>
      </div>

      <div class="w-2/3 p-4 ml-4 bg-white">
        <span class="mr-4 text-lg font-medium"> 消息记录: </span>
        <hr class="my-4" />

        <div class="overflow-auto max-h-80">
          <ul>
            <li v-for="item in getList" class="mt-2" :key="item.time">
              <div class="flex items-center">
                <span class="mr-2 font-medium text-primary">收到消息:</span>
                <span>{{ formatToDateTime(item.time) }}</span>
              </div>
              <div>
                {{ item.res }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, watchEffect, computed, toRefs } from 'vue';
  import { Tag, Input } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { useWebSocket } from '@vueuse/core';
  import { formatToDateTime } from '/@/utils/dateUtil';

  export default defineComponent({
    components: {
      PageWrapper,
      [Input.name]: Input,
      InputTextArea: Input.TextArea,
      Tag,
    },
    setup() {
      const state = reactive({
        server: 'ws://127.0.0.1:5060/socketServer/longmao',
        sendValue: '',
        recordList: [] as { id: number; time: number; res: string }[],
      });

      const { status, data, send, close, open } = useWebSocket(state.server, {
        autoReconnect: false,
        heartbeat: false,
      });

      watchEffect(() => {
        if (data.value) {
          try {
            const res = JSON.parse(data.value);
            state.recordList.push(res);
          } catch (error) {
            state.recordList.push({
              res: data.value,
              id: Math.ceil(Math.random() * 1000),
              time: new Date().getTime(),
            });
          }
        }
      });

      const getIsOpen = computed(() => status.value === 'OPEN');
      const getTagColor = computed(() => (getIsOpen.value ? 'success' : 'red'));

      const getList = computed(() => {
        return [...state.recordList].reverse();
      });

      function handlerSend() {
        send(state.sendValue);
        state.sendValue = '';
      }

      function toggle() {
        if (getIsOpen.value) {
          close();
        } else {
          open();
        }
      }
      return {
        status,
        formatToDateTime,
        ...toRefs(state),
        handlerSend,
        getList,
        toggle,
        getIsOpen,
        getTagColor,
      };
    },
  });
</script>
