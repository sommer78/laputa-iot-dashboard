<template>
  <div class="fc-style">
    <a-layout class="fc-container">
      <a-layout-content class="fc-main">
        <a-layout>
          <a-layout-sider theme="light" :width="250">
            <div class="components">
              <ComponentGroup
                title="基础字段"
                :fields="basicFields"
                :list="antd.basicComponents"
              />
              <ComponentGroup
                title="高级字段"
                :fields="advanceFields"
                :list="antd.advanceComponents"
              />
              <ComponentGroup
                title="布局字段"
                :fields="layoutFields"
                :list="antd.layoutComponents"
              />
            </div>
          </a-layout-sider>
          <a-layout class="center-container">
            <VbenHeader
              v-bind="$props"
              @preview="() => (previewVisible = true)"
              @uploadJson="() => (uploadJsonVisible = true)"
              @generateJson="handleGenerateJson"
              @generateCode="handleGenerateCode"
              @clearable="handleClearable"
            />
            <a-layout-content :class="{ 'widget-empty': widgetForm.list }">
              <VbenWidgetForm
                ref="widgetFormRef"
                v-model:widgetForm="widgetForm"
                v-model:widgetFormSelect="widgetFormSelect"
              />
            </a-layout-content>
          </a-layout>
          <a-layout-sider
            theme="light"
            class="widget-config-container"
            :width="300"
          >
            <a-layout>
              <a-layout-header>
                <div
                  class="config-tab"
                  :class="{ active: configTab === 'widget' }"
                  @click="configTab = 'widget'"
                >
                  字段属性
                </div>
                <div
                  class="config-tab"
                  :class="{ active: configTab === 'form' }"
                  @click="configTab = 'form'"
                >
                  表单属性
                </div>
              </a-layout-header>
              <a-layout-content class="config-content">
                <VbenWidgetConfig
                  v-show="configTab === 'widget'"
                  v-model:select="widgetFormSelect"
                />
                <VbenFormConfig
                  v-show="configTab === 'form'"
                  v-model:config="widgetForm.config"
                />
              </a-layout-content>
            </a-layout>
          </a-layout-sider>
        </a-layout>
      </a-layout-content>

      <a-modal
        v-model:visible="uploadJsonVisible"
        title="导入JSON"
        :width="800"
        @ok="handleUploadJson"
      >
        <a-alert
          type="info"
          message="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"
          style="margin-bottom: 10px"
        />
        
      </a-modal>

      <a-modal v-model:visible="previewVisible" :width="800">
        <VbenGenerateForm
          style="margin-top: 20px"
          ref="generateFormRef"
          :data="widgetForm"
        />
        <template #footer>
          <a-button @click="handleReset">重置</a-button>
          <a-button type="primary" @click="handleGetData">获取数据</a-button>
        </template>
      </a-modal>

      <a-modal
        v-model:visible="generateJsonVisible"
        title="生成JSON"
        okText="Copy"
        :width="800"
        @ok="handleCopyClick(generateJsonTemplate)"
      >
       
      </a-modal>

      <a-modal
        v-model:visible="dataJsonVisible"
        title="获取数据"
        okText="Copy"
        :width="800"
        @ok="handleCopyClick(dataJsonTemplate)"
      >
       
      </a-modal>

      <a-modal
        v-model:visible="dataCodeVisible"
        title="生产代码"
        okText="Copy"
        :width="800"
        @ok="handleCopyClick(dataCodeTemplate)"
      >
        <a-tabs
          type="card"
          v-model:activeKey="codeLanguage"
          :tabBarStyle="{ margin: 0 }"
        >
          <a-tab-pane tab="Vue Component" :key="codeType.Vue">
          
          </a-tab-pane>
          <a-tab-pane tab="HTML" :key="codeType.Html">
           
          </a-tab-pane>
        </a-tabs>
      </a-modal>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs, watchEffect } from 'vue'
import { message } from 'ant-design-vue'
import { CodeEditor } from '/@/components/CodeEditor';
import ComponentGroup from './ComponentGroup.vue'
import VbenHeader from './VbenHeader.vue'
import VbenWidgetForm from './VbenWidgetForm.vue'
import VbenGenerateForm from './VbenGenerateForm.vue'
import VbenWidgetConfig from './VbenWidgetConfig.vue'
import VbenFormConfig from './VbenFormConfig.vue'
import { antd } from './config'
import { copy } from './utils'
import { Layout, Tabs, Modal,Alert } from 'ant-design-vue';
import generateCode from './utils/generateCode'
import { WidgetForm } from './config/antd'
import './styles/index.styl'
enum CodeType {
  Vue = 'vue',
  Html = 'html'
}


export default defineComponent({
  name: 'VbenDesignForm',
  components: {
    VbenHeader,
    ComponentGroup,
    CodeEditor,
    VbenWidgetForm,
    VbenGenerateForm,
    VbenWidgetConfig,
    VbenFormConfig,
    Layout, 
    ALayoutHeader: Layout.Header,
    ATabs: Tabs, 
    ATabPane: Tabs.TabPane,
    AModal: Modal,
    AAlert: Alert,
  },
  props: {
    preview: {
      type: Boolean,
      default: true
    },
    generateCode: {
      type: Boolean,
      default: true
    },
    generateJson: {
      type: Boolean,
      default: true
    },
    uploadJson: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    basicFields: {
      type: Array as PropType<Array<string>>,
      default: () => [
        'input',
        'password',
        'textarea',
        'number',
        'radio',
        'checkbox',
        'time',
        'date',
        'rate',
        'select',
        'switch',
        'slider',
        'text'
      ]
    },
    advanceFields: {
      type: Array as PropType<Array<string>>,
      default: () => ['img-upload', 'richtext-editor', 'cascader']
    },
    layoutFields: {
      type: Array as PropType<Array<string>>,
      default: () => ['grid']
    }
  },
  setup() {
    const state = reactive({
      antd,
      codeType: CodeType,
      widgetForm: JSON.parse(JSON.stringify(antd.widgetForm)),
      widgetFormSelect: null,
      generateFormRef: null as any,
      configTab: 'widget',
      previewVisible: false,
      uploadJsonVisible: false,
      dataJsonVisible: false,
      dataCodeVisible: false,
      generateJsonVisible: false,
      generateCodeVisible: false,
      generateJsonTemplate: JSON.stringify(antd.widgetForm, null, 2),
      dataJsonTemplate: '',
      dataCodeTemplate: '',
      codeLanguage: CodeType.Vue,
      jsonEg: JSON.stringify(antd.widgetForm, null, 2)
    })

    const handleUploadJson = () => {
      try {
        state.widgetForm = JSON.parse(state.jsonEg)

        if (state.widgetForm.list) {
          state.widgetFormSelect = state.widgetForm.list[0]
        }

        state.uploadJsonVisible = false
        message.success('上传成功')
      } catch (error) {
        message.error('上传失败')
      }
    }

    const handleCopyClick = (text: string) => {
      copy(text)
      message.success('Copy成功')
    }

    const handleGetData = () => {
      state.generateFormRef.getData().then((res: any) => {
        state.dataJsonTemplate = JSON.stringify(res, null, 2)
        state.dataJsonVisible = true
      })
    }

    const handleGenerateJson = () =>
      (state.generateJsonTemplate = JSON.stringify(
        state.widgetForm,
        null,
        2
      )) && (state.generateJsonVisible = true)

    const handleGenerateCode = () => {
      state.codeLanguage = CodeType.Vue
      state.dataCodeVisible = true
    }

    watchEffect(() => {
      if (state.dataCodeVisible) {
        state.dataCodeTemplate = generateCode(
          state.widgetForm,
          state.codeLanguage,
          'Antd'
        )!
      }
    })

    const handleClearable = () =>
      (state.widgetForm = JSON.parse(JSON.stringify(antd.widgetForm))) &&
      (state.widgetFormSelect = null)

    const handleReset = () => state.generateFormRef.reset()

    const getJson = () => state.widgetForm

    const setJson = (json: WidgetForm) => {
      state.widgetForm = json
      if (json.list.length) {
        state.widgetFormSelect = json.list[0]
      }
    }

    const getTemplate = (codeType: CodeType) =>
      generateCode(state.widgetForm, codeType, 'Antd')

    const clear = () => handleClearable()

    return {
      ...toRefs(state),
      handleUploadJson,
      handleCopyClick,
      handleGetData,
      handleGenerateJson,
      handleGenerateCode,
      handleClearable,
      handleReset,
      getJson,
      setJson,
      getTemplate,
      clear
    }
  }
})
</script>
