<template>
  <div class="w-full h-screen bg-gray-100">
    <div class="container flex flex-col w-11/12 h-full m-auto main-body">
      <div class="flex flex-col flex-1 main">
        <div class="hidden lg:block heading flex-2">
          <h1 class="mb-4 text-3xl text-gray-700">Chat</h1>
        </div>
        <div class="flex flex-1 h-full">
          <div class="flex-col hidden w-1/3 pr-6 sidebar lg:flex flex-2">
            <div class="px-2 pb-6 search flex-2">
              <input
                type="text"
                class="block w-full py-2 bg-transparent border-b-2 border-gray-200 outline-none"
                placeholder="Search"
              />
            </div>
            <div class="flex-1 h-full px-2 overflow-auto">
              <div
                class="flex p-4 mb-4 transition-transform duration-300 transform bg-white rounded shadow-md cursor-pointer entry hover:scale-105"
              >
                <div class="flex-2">
                  <div class="relative w-12 h-12">
                    <img
                      class="w-12 h-12 mx-auto rounded-full"
                      src="/src/assets/images/header.jpg"
                      alt="chat-user"
                    />
                    <span
                      class="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full "
                    ></span>
                  </div>
                </div>
                <div class="flex-1 px-2">
                  <div class="w-32 truncate"><span class="text-gray-800">Ryann Remo</span></div>
                  <div><small class="text-gray-600">Yea, Sure!</small></div>
                </div>
                <div class="text-right flex-2">
                  <div><small class="text-gray-500">15 April</small></div>
                  <div>
                    <small
                      class="inline-block w-6 h-6 text-xs leading-6 text-center text-white bg-red-500 rounded-full "
                    >
                      23
                    </small>
                  </div>
                </div>
              </div>
              <div
                class="flex p-4 mb-4 transition-transform duration-300 transform bg-white rounded shadow-md cursor-pointer entry hover:scale-105"
              >
                <div class="flex-2">
                  <div class="relative w-12 h-12">
                    <img
                      class="w-12 h-12 mx-auto rounded-full"
                      src="/src/assets/images/header.jpg"
                      alt="chat-user"
                    />
                    <span
                      class="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full "
                    ></span>
                  </div>
                </div>
                <div class="flex-1 px-2">
                  <div class="w-32 truncate"><span class="text-gray-800">Karp Bonolo</span></div>
                  <div><small class="text-gray-600">Yea, Sure!</small></div>
                </div>
                <div class="text-right flex-2">
                  <div><small class="text-gray-500">15 April</small></div>
                  <div>
                    <small
                      class="inline-block w-6 h-6 text-xs leading-6 text-center text-white bg-red-500 rounded-full "
                    >
                      10
                    </small>
                  </div>
                </div>
              </div>
              <div
                class="flex p-4 mb-4 transition-transform duration-300 transform bg-white border-l-4 border-red-500 rounded shadow-md cursor-pointer entry hover:scale-105"
              >
                <div class="flex-2">
                  <div class="relative w-12 h-12">
                    <img
                      class="w-12 h-12 mx-auto rounded-full"
                      src="/src/assets/images/header.jpg"
                      alt="chat-user"
                    />
                    <span
                      class="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full "
                    ></span>
                  </div>
                </div>
                <div class="flex-1 px-2">
                  <div class="w-32 truncate"><span class="text-gray-800">龙猫</span></div>
                  <div><small class="text-gray-600">Yea, Sure!</small></div>
                </div>
                <div class="text-right flex-2">
                  <div><small class="text-gray-500">15 April</small></div>
                </div>
              </div>
              <div
                class="flex p-4 mb-4 transition-transform duration-300 transform bg-white rounded shadow-md cursor-pointer entry hover:scale-105"
              >
                <div class="flex-2">
                  <div class="relative w-12 h-12">
                    <img
                      class="w-12 h-12 mx-auto rounded-full"
                      src="/src/assets/images/header.jpg"
                      alt="chat-user"
                    />
                    <span
                      class="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full "
                    ></span>
                  </div>
                </div>
                <div class="flex-1 px-2">
                  <div class="w-32 truncate"><span class="text-gray-800">Cadi Kajetán</span></div>
                  <div><small class="text-gray-600">Yea, Sure!</small></div>
                </div>
                <div class="text-right flex-2">
                  <div><small class="text-gray-500">15 April</small></div>
                </div>
              </div>
              <div
                class="flex p-4 mb-4 transition-transform duration-300 transform bg-white rounded shadow-md cursor-pointer entry hover:scale-105"
              >
                <div class="flex-2">
                  <div class="relative w-12 h-12">
                    <img
                      class="w-12 h-12 mx-auto rounded-full"
                      src="/src/assets/images/header.jpg"
                      alt="chat-user"
                    />
                    <span
                      class="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full "
                    ></span>
                  </div>
                </div>
                <div class="flex-1 px-2">
                  <div class="w-32 truncate"><span class="text-gray-800">Rina Samuel</span></div>
                  <div><small class="text-gray-600">Yea, Sure!</small></div>
                </div>
                <div class="text-right flex-2">
                  <div><small class="text-gray-500">15 April</small></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col flex-1 chat-area">
            <div class="flex-3">
              <h2 class="py-1 mb-8 text-xl border-b-2 border-gray-200">与 <b>小猫猫</b>聊天</h2>
            </div>
            <div class="flex-1 overflow-auto messages">
              <div class="flex mb-4 message">
                <div class="flex-2">
                  <div class="relative w-12 h-12">
                    <img
                      class="w-12 h-12 mx-auto rounded-full"
                      src="/src/assets/images/header.jpg"
                      alt="chat-user"
                    />
                    <span
                      class="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full "
                    ></span>
                  </div>
                </div>
                <div class="flex-1 px-2">
                  <div class="inline-block p-2 px-6 text-gray-700 bg-gray-300 chat-message">
                    <span   >
                      Hey there. We would like to invite you over to our office for a visit. How
                      about it? Hey there. We would like to invite you over to our office for a visit. How
                      about it? Hey there. We would like to invite you over to our office for a visit. How
                      about it? Hey there. We would like to invite you over to our office for a visit. How
                      about it? Hey there. We would like to invite you over to our office for a visit. How
                      about it? Hey there. We would like to invite you over to our office for a visit. How
                      about it?
                      </span
                    >
                  </div>
                  <div class="pl-4"><small class="text-gray-500">15 April</small></div>
                </div>
              </div>
              <div class="flex mb-4 message">
                <div class="flex-2">
                  <div class="relative w-12 h-12">
                    <img
                      class="w-12 h-12 mx-auto rounded-full"
                      src="/src/assets/images/header.jpg"
                      alt="chat-user"
                    />
                    <span
                      class="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full "
                    ></span>
                  </div>
                </div>
                <div class="flex-1 px-2">
                  <div class="inline-block p-2 px-6 text-gray-700 bg-gray-300 rounded-full">
                    <span>All travel expenses are covered by us of course :D</span>
                  </div>
                  <div class="pl-4"><small class="text-gray-500">15 April</small></div>
                </div>
              </div>
              <div class="flex mb-4 text-right message me">
                <div class="flex-1 px-2">
                  <div class="inline-block p-2 px-6 text-white bg-blue-600 rounded-full">
                    <span>It's like a dream come true</span>
                  </div>
                  <div class="pr-4"><small class="text-gray-500">15 April</small></div>
                </div>
              </div>
              <div class="flex mb-4 text-right message me">
                <div class="flex-1 px-2">
                  <div class="inline-block p-2 px-6 text-white bg-blue-600 rounded-full">
                    <span>I accept. Thank you very much.</span>
                  </div>
                  <div class="pr-4"><small class="text-gray-500">15 April</small></div>
                </div>
              </div>
              <div class="flex mb-4 message">
                <div class="flex-2">
                  <div class="relative w-12 h-12">
                    <img
                      class="w-12 h-12 mx-auto rounded-full"
                      src="/src/assets/images/header.jpg"
                      alt="chat-user"
                    />
                    <span
                      class="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full "
                    ></span>
                  </div>
                </div>
                <div class="flex-1 px-2">
                  <div class="inline-block p-2 px-6 text-gray-700 bg-gray-300 rounded-full">
                    <span>You are welome. We will stay in touch.</span>
                  </div>
                  <div class="pl-4"><small class="text-gray-500">15 April</small></div>
                </div>
              </div>
            </div>
            <div class="pt-4 pb-10 flex-2">
              <div class="flex bg-white rounded-lg shadow write">
                <div class="flex items-center content-center p-4 pr-0 text-center flex-3">
                  <span class="block text-center text-gray-400 hover:text-gray-800">
                    <svg
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      class="w-6 h-6"
                    >
                      <path
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div class="flex-1">
                  <textarea
                    name="message"
                    class="block w-full px-4 py-4 bg-transparent outline-none"
                    rows="1"
                    placeholder="Type a message..."
                    autofocus
                  ></textarea>
                </div>
                <div class="flex items-center content-center w-32 p-2 flex-2">
                  <div class="flex-1 text-center">
                    <span class="text-gray-400 hover:text-gray-800">
                      <span class="inline-block align-text-bottom">
                        <svg
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          class="w-6 h-6"
                        >
                          <path
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          ></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                  <div class="flex-1">
                    <button class="inline-block w-10 h-10 bg-blue-400 rounded-full">
                      <span class="inline-block align-text-bottom">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          class="w-4 h-4 text-white"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    <!-- v-if="room" -->
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '/@/components/Icon';
import { Avatar } from 'ant-design-vue';
import { useUserStore } from '/@/store/modules/user';
import { useWindowSize } from '/@/hooks/useWindowSize';
import useRoom from '/@/hooks/chat/useRoom';
import useChatMessages from '/@/hooks/chat/useChatMessages';


// import { v4 as uuid } from 'uuid'
// import Compressor from 'compressorjs'

export default defineComponent({
  name: 'Chat',
  components: {
    Icon,
    Avatar,

  
  },
  setup() {
    const route = useRoute();
    const { isMobile, width, height } = useWindowSize();
    const roomId = route.params.id as string;

    const messages = useChatMessages(roomId);
    const image = ref();
    const src = ref('');
    const userStore = useUserStore();
    const disabledBack = computed(() => {
      // eslint-disable-next-line
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
    };
  },
});
</script>

<style scoped>
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #e5ddd5;
}

 .chat-message{
    border-radius:0 15px 15px 15px  ;
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
  background-image: url('/@/assets/images/bg-chat-tile-light.png');
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
  padding-right: 0;
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
  padding: 0 60px;
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
  box-shadow: 0 0 2px 0 #00000087;
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
    padding: 0 20px;
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
    padding: 0;
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
