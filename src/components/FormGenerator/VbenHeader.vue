<template>
  <a-layout-header class="btn-bar">
    <a-button
      v-if="$attrs.uploadJson"
      type="link"
      size="small"
      @click="$emit('uploadJson')"
    >
      <SvgIcon name="upload" />
      导入JSON
    </a-button>
    <a-button
      v-if="$attrs.clearable"
      type="link"
      size="small"
      @click="$emit('clearable')"
    >
    <SvgIcon name="clearable" />
      清空
    </a-button>
    <a-button
      v-if="$attrs.preview"
      type="link"
      size="small"
      @click="$emit('preview')"
    >
      <SvgIcon name="preview" />
      预览
    </a-button>
    <a-button
      v-if="$attrs.generateJson"
      type="link"
      size="small"
      @click="$emit('generateJson')" 
    >
     <SvgIcon name="generate-json" />
      生成JSON
    </a-button>
    <a-button
      v-if="$attrs.generateCode"
      type="link"
      size="small"
      @click="$emit('generateCode')"
    >
     <SvgIcon name="generate-code" />
      生成代码
    </a-button>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SvgIcon  } from '/@/components/Icon/index';
import { Layout,  } from 'ant-design-vue';
import './styles/index.styl'
export default defineComponent({
  name: 'VbenHeader',
  components: {
    SvgIcon,
    Layout,
    ALayoutHeader: Layout.Header,
  },
  emits: ['uploadJson', 'clearable', 'preview', 'generateJson', 'generateCode']
})
</script>
