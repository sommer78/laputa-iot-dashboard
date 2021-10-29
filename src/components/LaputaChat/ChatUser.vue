<template>
  <div
    class="flex p-2 pb-4 border-b-2 border-gray-200 cursor-pointer hover:bg-gray-300 "
    :onclick="onClick"
  >
    <div class="flex-2">
      <div class="relative w-12 h-12">
        <img class="w-12 h-12 mx-auto rounded-full" :src="chat.avatar_url" :alt="chat.name" />
        <span
          class="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"
          :class="{ 'bg-green-400': chat.status === 0, 'bg-gray-400': chat.status === 1 }"
        ></span>
      </div>
    </div>
    <div class="flex-1 px-2">
      <div class="w-32 truncate"
        ><span class="text-gray-800">{{ chat.name }}</span></div
      >
      <div
        ><small class="text-gray-600">{{ chat.last_message }}</small></div
      >
    </div>
    <div class="text-right flex-2">
      <div
        ><small class="text-gray-500">{{ chat.last_reply }}</small></div
      >
      <div>
        <small
          v-if="chat.num>0"
          class="inline-block w-6 h-6 text-xs leading-6 text-center text-white bg-red-500 rounded-full "
        >
          {{ chat.num }}
        </small>
      </div>
    </div>
  </div>
 
</template>
  <!-- <div class="flex p-2 pb-4 border-b-2 border-gray-200 cursor-pointer hover:bg-gray-300 hover:border-red-500">
    <div class="relative w-1/6">
      <img class="w-12 h-12 mx-auto rounded-full" :src="chat.avatar_url" :alt="chat.name" />
      <span
        class="absolute right-0 w-4 h-4 border-2 border-white rounded-full bottom-5"
        :class="{'bg-green-400': chat.status===0, 'bg-gray-400': chat.status===1}"
      ></span>
    </div>

    <div class="w-3/6">
      <h3 class="text-lg text-gray-600">{{ chat.name }}</h3>
      <p class="text-sm text-gray-500 truncate">{{ chat.last_message }}</p>
    </div>
    <div class="w-2/6 text-sm text-right text-gray-500">{{ chat.last_reply }}</div>
    <div>
                    <small
                      class="inline-block w-6 h-6 text-xs leading-6 text-center text-white bg-red-500 rounded-full "
                    >
                      {{ chat.num }}
                    </small>
                  </div>
  </div> -->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatUser',
  props: {
    chat: Object,
  },
  emits: ['onClick' ],
 
  setup(props, { emit }) {
    function onClick(){
      emit('onClick', props.chat);
    };
    return {
      onClick
    }
  }
});
</script>
