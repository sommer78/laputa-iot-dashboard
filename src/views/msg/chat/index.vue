<template>
  <div class="w-full h-screen chat__mainbody">
    <div class="h-full overflow-auto">
      <ChatUser v-for="(item, key) in chats" :key="key" :chat="item" @onClick="onClick" />
    </div>
    <div class="relative flex-grow chat">
      <div class="chat__background" :style="{ height }" />
      <div class="chat__header">
        <div class="avatar__container">
          <Avatar :src="user?.avatar" />
        </div>

        <div class="chat__header--info">
          <h3 :style="{ width: isMobile ? width - 165 : undefined }">
            {{ room?.name }}
          </h3>
        </div>

        <div class="mr-5 chat__header--right">
          <input id="image" class="hidden" accept="image/*" type="file" @change="showPreview" />
          <button>
            <label class="h-6 cursor-pointer" for="image">
              <Icon icon="icon-park-outline:pic" />
            </label>
          </button>
          <button>
            <Icon icon="vaadin:ellipsis-dots-v" />
          </button>
        </div>
      </div>

      <div className="chat__body--container ">
        <div className="chat__body" :style="{ height: height - 68 }">
          <ChatMessages :messages="messages" :user="user" :room-id="roomId" />
        </div>
      </div>

      <MediaPreview v-if="src" :src="src" @closePreview="closePreview" />

       <VideoPlayer   />

      <ChatFooter :image="image" :user="user" :room="room" :room-id="roomId" @send="send" />
    </div>
  </div>
</template>
 
<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '/@/components/Icon';
import { Avatar } from 'ant-design-vue';
import { useUserStore } from '/@/store/modules/user';
import { useWindowSize } from '/@/hooks/useWindowSize';
import useRoom from '/@/hooks/chat/useRoom';
import useChatMessages from '/@/hooks/chat/useChatMessages';

import { ChatMessages, Sidebar, ChatUser } from '/@/components/LaputaChat';
import MediaPreview from '/@/components/LaputaChat/MediaPreview.vue';
import ChatFooter from '/@/components/LaputaChat/ChatFooter.vue';
import  VideoPlayer  from '/@/components/VideoPlayer/VideoPlayer.vue';

// import { v4 as uuid } from 'uuid'
// import Compressor from 'compressorjs'

const chats = [];

for (let i = 0; i < 20; i++) {
  chats.push({
    avatar_url: `https://randomuser.me/api/portraits/men/${i}.jpg`,
    name: `Fulan ${i}`,
    last_message: `Hi bro, ini gw Fulan ${i}. Gimana utang lo yang kmren ?`,
    last_reply: 'yesterday',
    status: i % 2,
    num: i,
  });
}
export default defineComponent({
  name: 'Chat',
  components: {
    Icon,
    Avatar,
    // PhotographIcon,
    // DotsVerticalIcon,
    // ArrowLeftIcon,
    ChatUser,
    Sidebar,
    ChatMessages,
    MediaPreview,
    ChatFooter,
    VideoPlayer,
  },
  setup() {
    const route = useRoute();
    const { isMobile, width, height } = useWindowSize();
    const roomId = route.params.id as string;

    const messages = useChatMessages(roomId);
    const image = ref();
    const src = ref('');
    const video = reactive({
      url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&amp;userId=17&amp;ext=.mp4',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    })
    const userStore = useUserStore();
    const disabledBack = computed(() => {
      // eslint-disable-next-line
      let _path = route.path;
      return window.history.state.back === null;
    });

    const user = computed(() => {
      return userStore.getUserInfo || {};
    });
    const room = useRoom(roomId, user);

    function showPreview(event: Event) {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];

      if (file) {
        image.value = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          src.value = reader.result as string;
        };
      }
    }

    function closePreview() {
      src.value = '';
      image.value = null;
    }

    async function send(text: string) {
      if (!user.value) return;
      if (text.trim() || (text === '' && image.value)) {
        const imageName = '';
        const newMessage = image.value
          ? {
              name: user.value.username,
              message: text,
              uid: user.value.id,
              time: new Date().toUTCString(),
              imageUrl: 'uploading',
              imageName,
            }
          : {
              name: user.value.username,
              message: text,
              uid: user.value.id,
              time: new Date().toUTCString(),
            };
      }
    }

    function onClick(user) {
      console.log(user);
    }

    return {
      disabledBack,
      isMobile,
      user,
      roomId,
      src,
      showPreview,
      closePreview,
      room,
      height,
      width,
      messages,
      image,
      send,
      chats,
      onClick,
      video,
    };
  },
});
</script>

<style scoped>
.chat__mainbody {
  background-color: #ededed;
  display: flex;
  height: 92vh;
  width: 100%;
  box-shadow: -1px 4px 20px 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  border-top: 1px solid lightgrey;
}
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #e5ddd5;
}

.page-enter {
  opacity: 0;
  transform: scale(0.9) translateZ(456px);
}

.page-enter-active {
  opacity: 1;
  transform: scale(1) translateZ(456px);
  transition: transform 300ms, opacity 300ms;
}

.page-exit {
  opacity: 1;
  transform: scale(1);
}

.page-exit-active {
  opacity: 0;
  transform: scale(0.9) translateZ(456px);
  transition: transform 300ms, opacity 300ms;
}

.chat__background {
  background-image: url(/@/assets/images/bg-chat-tile-light.png);
  background-size: contain;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.06;
}

.chat__header {
  padding: 10px;
  padding-right: 0px;
  padding-left: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  background-color: #ededed;
  z-index: 1;
}

.chat__header--info {
  flex: 1;
  margin-left: 8px;
}

.chat__header--info > h3 {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
}

.chat__header--info > p {
  color: grey;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
  font-size: 13px;
}

.chat__header--right {
  display: flex;
  justify-content: space-between;
  min-width: 50px;
}

.chat__header--right > .MuiButtonBase-root {
  padding: 12px;
}

.chat__body--container {
  /* flex: 1; */
  background-repeat: repeat;
  background-position: center;
  overflow: scroll;
  background-color: transparent;
  z-index: 1;
  position: relative;
  height: calc(100% - 125px);
}

.chat__body {
  /* opacity: 0; */
  /* background-color: transparent; */
  padding: 0px 60px;
  padding-bottom: 98px !important;
  transition: opacity 200ms;
  position: relative;
}

.chat__body--container::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.paginateLoader {
  background: transparent !important;
}

.paginateLoader > div > .MuiCircularProgress-svg {
  transform: scale(1);
  /*display: none;*/
}

.scroll {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  left: 50%;
  bottom: 78px;
  transform: translateX(-50%) scale(1);
  transition: transform 150ms;
  z-index: 1;
  box-shadow: 0px 0px 2px 0px #00000087;
  cursor: pointer;
}

.scroll svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.scroll div {
  position: absolute;
  top: 0;
  right: 0;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: #06d755;
  color: white;
  font-size: 10px;
  font-weight: 500;
  display: grid;
  place-items: center;
  color: white;
}

.scroll-enter {
  transform: translateX(-50%) scale(0.7);
  opacity: 0;
}

.scroll-enter-active {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  transition: opacity 300ms, transform 300ms;
}

.scroll-exit {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

.scroll-exit-active {
  opacity: 0;
  transform: translateX(-50%) scale(0.7);
  transition: opacity 300ms, transform 300ms;
}

.chat__deleting {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: #ffffff6c;
  z-index: 2;
}

.seen {
  position: absolute;
  height: 30px;
  width: 94px;
  right: 60px;
  bottom: 58px;
  opacity: 0 !important;
}

.seen-animate-enter {
  opacity: 0 !important;
}

.seen-animate-enter-active {
  opacity: 1 !important;
  transition: opacity 200ms;
}

.seen-animate-exit {
  opacity: 0 !important;
}

.seen-animate-exit-active {
  opacity: 0 !important;
}

.seen-animate-enter-done {
  opacity: 1 !important;
}

.seen p {
  background-color: #dcf8c6;
  padding: 3px 15px;
  text-align: center;
  position: absolute;
  right: 0;
  border-radius: 10px;
}

.seen span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.seen .MuiSvgIcon-root {
  transform: scale(0.9);
  margin-left: 5px;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (min-width: 761px) {
  .chat__header--info > h3 {
    width: 350px;
  }

  .chat__header--info > p {
    width: 350px;
  }
}

@media (max-width: 760px) {
  .seen {
    right: 20px;
  }
  .chat {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #e5ddd5;
    opacity: 1;
    transform: scale(1);
    transition: transform 250ms cubic-bezier(0.37, 0, 0.63, 1),
      opacity 250ms cubic-bezier(0.37, 0, 0.63, 1);
  }

  .chat__body {
    padding: 0px 20px;
  }

  .image-container .MuiCircularProgress-svg {
    transform: scale(1.5) !important;
  }
  .chat__header {
    padding: 10px;
    padding-left: 8px;
  }
  .chat__header--right > .MuiButtonBase-root {
    padding: 8px;
  }
  .chat__header > .MuiButtonBase-root {
    padding: 0px;
    padding-right: 5px;
    border-radius: 18.5px;
  }

  .chat__header--info > p,
  .chat__header--info > h3 {
    width: 180px;
  }
  .chat__header--info > p {
    font-size: 11px;
    font-weight: 400;
  }

  .page-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: transform 300ms cubic-bezier(0.37, 0, 0.63, 1),
      opacity 300ms cubic-bezier(0.37, 0, 0.63, 1);
  }

  .page-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: transform 300ms cubic-bezier(0.37, 0, 0.63, 1),
      opacity 300ms cubic-bezier(0.37, 0, 0.63, 1);
  }
}
</style>
