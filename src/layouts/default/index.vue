<template>
<div>
  <Layout :class="prefixCls" v-bind="lockEvents"> 
    <LayoutFeatures />
    <LayoutHeader fixed v-if="getShowFullHeaderRef" />
    <Layout :class="[layoutClass]">
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <Layout :class="`${prefixCls}-main`">
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
  <MessagePopup
    icon
    class="main-chat"
    :attendants="attendants"
    @myOpenChat="myOpenChat"
    @open="open"
    :new-messages-count="newMessagesCount"
  >
    <template v-slot:header>
      <p>你有了新的消息</p>
    </template>
    <template v-slot:button>
      <img
        src="/src/assets/icons/telegram.svg"
        alt="Please open chat platform"
        aria-hidden="true"
      >
    </template>
  </MessagePopup>
</div>
  
</template>

<script lang="ts">
import { defineComponent, computed,ref, unref, onMounted, onUnmounted} from 'vue';
import { Layout } from 'ant-design-vue';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

import LayoutHeader from './header/index.vue';
import LayoutContent from './content/index.vue';
import LayoutSideBar from './sider/index.vue';
import LayoutMultipleHeader from './header/MultipleHeader.vue';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';
import { useLockPage } from '/@/hooks/web/useLockPage';

import { useAppInject } from '/@/hooks/web/useAppInject';

import { useUserStore } from "/@/store/modules/user";
import { useMessageStore } from "/@/store/modules/message";

import { MessagePopup }  from '/@/components/MessagePopup'
import { LAPUTA } from "/@/store/modules/message";
import { useGo } from '/@/hooks/web/usePage';
import { PageEnum } from '/@/enums/pageEnum';
 
export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LayoutFeatures: createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
    LayoutFooter: createAsyncComponent(() => import('/@/layouts/default/footer/index.vue')),
    LayoutHeader,
    LayoutContent,
    LayoutSideBar,
    LayoutMultipleHeader,
    Layout,
    MessagePopup,
  },
  setup() {
    const { prefixCls } = useDesign('default-layout');
    const { getIsMobile } = useAppInject();
    const { getShowFullHeaderRef } = useHeaderSetting();
    const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();
    // const { notification } = useMessage();
    // const newMessagesCount = ref(10);
    const userStore = useUserStore();
    const messageStore = useMessageStore();
     
    const go = useGo();
    
    // 刷新时间
    let refreshTime;
   
  const newMessagesCount = computed(() => messageStore.getNewMessagesCount);
    // Create a lock screen monitor
    const lockEvents = useLockPage();

    const layoutClass = computed(() => {
      let cls: string[] = ['ant-layout'];
      if (unref(getIsMixSidebar) || unref(getShowMenu)) {
        cls.push('ant-layout-has-sider');
      }
      return cls;
    });
 // 实时检测刷新token
    function  refreshToken() {
      refreshTime = setInterval(() =>{} , 10000);
    }

   

    onMounted(() => {
      // initWebSocket();
      messageStore.websocket_init(LAPUTA.WEBSOCKET_URI_ENDPOINT);
    });
    onUnmounted(() => {
       messageStore.websocket_disconnect();
      // disconnect();
    });
    function myOpenChat(content){
      console.log(content);
      go(PageEnum.CHAT_PAGE);
       let chatMessage = {
            sender: ` ${userStore.getUserInfo.username}`,
            content:content,
            type: 'CHAT'
        };
        messageStore.websocket_send({topic: LAPUTA.WEBSOCKET_URI_SUBSCRIBE_HEARTBEAT, data: JSON.stringify(chatMessage)})
       
      
    }
    function open(){
      // newMessagesCount.value = 0;
    }
    const attendants = [
      {
        type: 'email',
        label: 'Support',
        name: '猫猫',
        username: 'ktquez',
        avatar: {
          src: '/src/assets/images/header.jpg',
          alt: '猫猫 头像'
        }
      },
      {
        type: 'viber',
        label: 'Sales',
        name: '飞飞',
        username: 'pombo',
        avatar: {
          src: '/src/assets/images/header.jpg',
          alt: '飞飞 头像'
        }
      },
      {
        type: 'messenger',
        label: 'Developer',
        name: '不错的故事',
        username: 'lucasferreiralimax',
        avatar: {
          src: '/src/assets/images/header.jpg',
          alt: '不错的故事 的头像'
        }
      }
    ]

    return {
      getShowFullHeaderRef,
      getShowSidebar,
      prefixCls,
      getIsMobile,
      getIsMixSidebar,
      layoutClass,
      lockEvents,
      refreshToken,
      refreshTime,
      attendants,
      myOpenChat,
      newMessagesCount,
      open,
    };
  },
  
  

});
</script>
<style lang="less">


  .main-chat {
  --telegram: #039be5;
  --vsc-bg-heade: #039be5;
  --vsc-bg-button: #039be5;
  --vsc-outline-color: #039be5;
  }

@prefix-cls: ~"@{namespace}-default-layout";

  .beautiful-chat_class {
   z-index: 999999;
  }
  
.@{prefix-cls} {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: @content-bg;
  flex-direction: column;

  > .ant-layout {
    min-height: 100%;
  }
 
  
  &-main {
    width: 100%;
    margin-left: 1px;
  }
}
</style>
