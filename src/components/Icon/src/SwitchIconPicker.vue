<template>
  <a-input
    disabled
    :style="{ width }"
    :placeholder="t('component.icon.placeholder')"
    :class="prefixCls"
    v-model:value="currentSelect"
  >
    <template #addonAfter>
      
      <Popover
        placement="bottomLeft"
        trigger="click"
        v-model="visible"
        :overlayClassName="`${prefixCls}-popover`"
      >
        <template #title>
          <div class="flex justify-between">
            <a-input
              :placeholder="t('component.icon.search')"
              @change="handleSearchChange"
              allowClear
            />
          </div>
        </template>

        <template #content>
           <a-tabs :default-active-key=currentTab @change="tabChange">
            <a-tab-pane key="icon" tab="Icon">
           <div v-if="getPaginationList.length">
            <ScrollContainer class="border border-t-0 border-solid">
              <ul class="flex flex-wrap px-2">
                <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="flex items-center justify-center p-2 mt-1 mr-1 border border-solid cursor-pointer w-1/8 hover:border-primary"
                  @click="handleClick(icon)"
                  :title="icon"
                >
                
                  <Icon :icon="icon" />
                </li>
              </ul>
            </ScrollContainer>
            <div class="flex items-center justify-center py-2" v-if="getTotal >= pageSize">
              <Pagination
                showLessItems
                size="small"
                :pageSize="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else
            ><div class="p-5"> <Empty /></div>
          </template>
            </a-tab-pane>
            <a-tab-pane key="svg" tab="SVG">
            <div v-if="getPaginationList.length">
            <ScrollContainer class="border border-t-0 border-solid">
              <ul class="flex flex-wrap px-2">
                <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="flex items-center justify-center p-2 mt-1 mr-1 border border-solid cursor-pointer w-1/8 hover:border-primary"
                  @click="handleClick(icon)"
                  :title="icon"
                >
                  <Icon :icon="icon" />
                </li>
              </ul>
            </ScrollContainer>
            <div class="flex items-center justify-center py-2" v-if="getTotal >= pageSize">
              <Pagination
                showLessItems
                size="small"
                :pageSize="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else
            ><div class="p-5"> <Empty /></div>
          </template>
            </a-tab-pane>
          </a-tabs>
         
        </template>

        <span class="flex items-center px-2 py-1 cursor-pointer" v-if="currentSvg">
          <SvgIcon :name="currentSvg" />
        </span>
        <Icon :icon="currentSelect || 'ion:apps-outline'" class="px-2 py-1 cursor-pointer" />

        
      </Popover>
    </template>
  </a-input>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, watch, unref } from 'vue';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { ScrollContainer } from '/@/components/Container';

  import { Input, Popover, Pagination, Empty } from 'ant-design-vue';
  import Icon from './Icon.vue';
  import SvgIcon from './SvgIcon.vue';

  import iconsData from '../data/icons.data.ion';
  import { propTypes } from '/@/utils/propTypes';
  import { usePagination } from '/@/hooks/web/usePagination';
  import { useDebounceFn } from '@vueuse/core';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';
  import svgIcons from 'virtual:svg-icons-names';
  import { Tabs } from 'ant-design-vue';
  const SVG_END_WITH_FLAG = '|svg';
  
  function getIcons() {
    const data = iconsData as any;
    const prefix: string = data?.prefix ?? '';
    let result: string[] = [];
    if (prefix) {
      result = (data?.icons ?? []).map((item) => `${prefix}:${item}`);
    } else if (Array.isArray(iconsData)) {
      result = iconsData as string[];
    }
    return result;
  }

  function getSvgIcons() {
    return svgIcons.map((icon) => icon.replace('icon-', '')+SVG_END_WITH_FLAG) as string[];
  }


  export default defineComponent({
    name: 'SwitchIconPicker',
    components: { [Input.name]: Input, Icon, Popover, ScrollContainer, Pagination, Empty, SvgIcon,  ATabs: Tabs, ATabPane: Tabs.TabPane },
    inheritAttrs: false,
    props: {
      value: propTypes.string,
      width: propTypes.string.def('100%'),
      pageSize: propTypes.number.def(140),
      copy: propTypes.bool.def(false),
      mode: propTypes.oneOf<('svg' | 'iconify')[]>(['svg', 'iconify']).def('iconify'),
    },
    emits: ['change'],
    setup(props, { emit }) {
      let isSvgMode = props.mode === 'svg';
      // const isSvgMode = true;
      const icons = isSvgMode ? getSvgIcons() : getIcons();
      // const icons =  getAllIcon();
      
      // const map = getAllIcon();
      // console.log('map:',map);
      const currentSelect = ref('');
      const currentSvg = ref('');
      const visible = ref(false);
      const currentList = ref(icons);
      const currentTab = ref('icon');
      const { t } = useI18n();
      const { prefixCls } = useDesign('icon-picker');

      const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100);
      const { clipboardRef, isSuccessRef } = useCopyToClipboard(props.value);
      const { createMessage } = useMessage();

      const { getPaginationList, getTotal, setCurrentPage } = usePagination(
        currentList,
        props.pageSize
      );

      watchEffect(() => {
        currentSelect.value = props.value;
      });

      watch(
        () => currentSelect.value,
        (v) => emit('change', v)
      );

      function handlePageChange(page: number) {
        setCurrentPage(page);
      }

      function handleClick(icon: string) {
        currentSelect.value = icon;
       
        console.log('current:',currentSelect.value)
        currentSvg.value = isSvgMode? icon.replace(SVG_END_WITH_FLAG,''): '';
         console.log('currentSvg:',currentSvg.value)
        if (props.copy) {
          clipboardRef.value = icon;
          if (unref(isSuccessRef)) {
            createMessage.success(t('component.icon.copy'));
          }
        }
      }
    
      function handleSearchChange(e: ChangeEvent) {
        const value = e.target.value;
        if (!value) {
          setCurrentPage(1);
          currentList.value = icons;
          return;
        }
        currentList.value = icons.filter((item) => item.includes(value));
      }

      function tabChange(e){
      
        isSvgMode = e === 'svg';
          console.log(isSvgMode);
        currentList.value =  (e === 'icon' ? getIcons(): getSvgIcons()); 
         
      }
      return {
        t,
        prefixCls,
        visible,
        isSvgMode,
        getTotal,
        getPaginationList,
        handlePageChange,
        handleClick,
        currentSelect,
        currentSvg,
        handleSearchChange: debounceHandleSearchChange,
        tabChange,
        currentTab,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-icon-picker';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding: 0;
    }

    &-popover {
      width: 300px;

      .ant-popover-inner-content {
        padding: 0;
      }

      .scrollbar {
        height: 220px;
      }
    }
  }
</style>
