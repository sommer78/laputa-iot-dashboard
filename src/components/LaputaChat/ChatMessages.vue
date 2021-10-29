<template>

   <div class="flex-grow overflow-auto chat-area">
      <div
        class="flex mt-4 mb-2 ml-5 mr-5"
        v-for="(message, key) in messages"
        :key="key"
        :class="{'justify-end': message.me}"
      >
        <div class="p-2 text-sm text-gray-900 rounded-lg" :class="{'bg-green-200': message.me, 'bg-white': !message.me}">
          <p>
            {{message.message}}
            <span class="inline ml-3 text-xs text-gray-500">{{message.time}}</span>
          </p>
        </div>
      </div>
    </div>
     
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';
import { Message } from '/@/api/chat/model/message';
import { SysUser } from '/@/api/sys/model/userModel';
import AudioPlayer from './AudioPlayer.vue';
import {  useLoading } from '/@/components/Loading';
export default defineComponent({
  name: 'ChatMessages',
  components: { AudioPlayer },
  props: {
    messages: {
      type: Array as PropType<Message[]>,
      required: true,
    },
    user: {
      type: Object as PropType<SysUser | null | undefined>,
      required: true,
    },
  },
  setup() {
    const [openFullLoading, closeFullLoading] = useLoading({
      tip: '加载中...',
    });

    onMounted(() => {
      openFullLoading();
      setTimeout(() => {
        closeFullLoading();
      }, 10000);
    });

    return {};
  },
});
</script>

<style scoped>
.chat-area {
  opacity: 1 !important;
  background-color: #e5ddd5;
}
</style>
