<template>
  <div :class="prefixCls">
    <Popover title="" trigger="click" :overlayClassName="`${prefixCls}__overlay`">
      <Badge :count="unread" :numberStyle="numberStyle" :offset="offset">
        <BellOutlined />
      </Badge>
      <template #content>
        <Tabs>
          <template v-for="item in tabListData" :key="item.key">
            <TabPane>
              <template #tab>
                {{ item.name }}
                <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
              </template>
              <NoticeList :list="item.list" />
            </TabPane>
          </template>
        </Tabs>
      </template>
    </Popover>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  // import { tabListData } from './data';
  import NoticeList from './NoticeList.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMessageStore } from "/@/store/modules/message";
     
  export default defineComponent({
    components: { Popover, BellOutlined, Tabs, TabPane: Tabs.TabPane, Badge, NoticeList },
    setup() {
       const messageStore = useMessageStore();
      const { prefixCls } = useDesign('header-notify');

      // let count = 0;

      // for (let i = 0; i < tabListData.length; i++) {
      //   count += tabListData[i].list.length;
      // }

       const tabListData = computed(() => {
          return messageStore.getNoteciTabListData ;
      });
      const unread = computed(() => {
          return messageStore.getUnread ;
      });
      return {
        prefixCls,
        tabListData,
        unread,
        offset:[-5, 10],
        numberStyle: { 
          backgroundColor: 'red',
          color: 'white',
          boxShadow: '0 0 0 1px #d9d9d9 inset',},
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  .@{prefix-cls} {
    padding-top: 2px;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>
