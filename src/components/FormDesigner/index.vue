<template>
  <a-layout >
    <a-layout-sider>
      <ul class="design-combos">
        <li
          class="design-combo"
          v-for="(field, type) of defaultConfig"
          :draggable="true"
          v-bind:key="type"
          @dragstart="dragstart($event, { fieldType: type, type: 'add' })"
        >
          <div class="title">
            <Icon :icon="field.icon" />
            <span class="ml-2">{{ field.label }}</span>
          </div>
        </li>
      </ul>
    </a-layout-sider>
    <a-layout-content>
      <div class="design-content">
        <div class="design_header">
          <a-button type="primary" class="m-2" @click="handleUpload"> 保存 </a-button>
          <a-button type="primary" class="m-2" @click="handlePreview = true"> 预览 </a-button>
          <a-button type="primary" class="m-2" @click="handleClear"> 清空 </a-button>
          <a-button type="primary" class="m-2" @click="handleUndo"> 设置默认值 </a-button>
        </div>
        <div class="h-full"  @dragover.prevent @drop="drop">
        
         <div class="flex flex-col ">
          <div class="px-4 py-2 m-2 text-5xl text-center text-gray-700 bg-gray-400 border-2 border-dashed hover:bg-red-700">+</div>
         </div>
           <BasicForm @register="register" class="mt-2">
          
          </BasicForm>
          <!-- <Form
            ref="form"
            :model="model"
            :rules="rules"
            :label-col="settings.labelCol"
            :wrapper-col="settings.wrapperCol"
            :labelAlign="settings.labelAlign"
            :layout="settings.layout"
          >
            <div
              class="design-item"
              v-for="(field, index) in fields"
              :ref="field.name"
              :key="field.name"
              :draggable="true"
              @dragover.prevent
              @drop="drop($event, index)"
              @click="click(field)"
              @dragstart="dragstart($event, { index: index, type: 'sort' })"
            >
              <DeleteOutlined class="delete" @click="remove($event, index)" />
              <FieldRender
                v-if="field.name"
                :field="field"
                v-model:value="model[field.name]"
                :options="options[field && field.datasource ? field.datasource : field.name]"
              />
            </div>
          </Form> -->
        </div>
      </div>
    </a-layout-content>
    <a-layout-sider class="design-setting">
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="formSetting" tab="表单配置">
          表单配置
          <!-- <form-setting :settings="form.settings"/> -->
        </TabPane>
        <TabPane key="fieldSetting" tab="表单项配置">
          表单项配置
          <!-- <field-setting :field="field"/> -->
        </TabPane>
      </Tabs>
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, getCurrentInstance, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Widget, WidgetForm } from './types';
import { Layout, Form, Tabs } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { defaultConfig, defaultValue } from './defaultConfig';

import FieldRender from './src/FieldRender.vue';

import { DragOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';

interface State {
  basicWidgets: Widget[];
  layoutWidgets: Widget[];
  advanceWidgets: Widget[];
  undo: boolean;
  redo: boolean;
  widgetForm: WidgetForm;
  configTab: 'widget' | 'form';
  widgetFormSelect: any;
}

export default defineComponent({
  name: 'form-container',
  props: {
    upload: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    preview: {
      type: Boolean,
      default: true,
    },
    generateJson: {
      type: Boolean,
      default: true,
    },
    generateCode: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Layout,
    DragOutlined,
    DeleteOutlined,
    Form,
    Tabs,
    TabPane: Tabs.TabPane,
    FieldRender,
    Icon,
    BasicForm,
  },
  setup(props, ctx) {
    const { t } = useI18n();
    const emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter;
    const activeKey = ref('formSetting');

    const options = {
      select: [
        {
          id: '1',
          name: '1',
        },
        {
          id: '2',
          name: '2',
        },
        {
          id: '3',
          name: '3',
        },
      ],
    };
    const form = reactive({
      settings: {
        name: '表单名称',
        labelAlign: 'right',
        layout: 'horizontal',
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        },
      },
      fields: [],
      rules: {},
      model: {},
    });
    const field = ref('');
    const schemas: FormSchema[] = [
      {
        field: 'field1',
        component: 'Input',
        label: '字段1',
        show: false,
        itemProps: {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 18,
          },
        },
        slot: 'f3',
       
      },
     
     
    ];

    const [register, { appendSchemaByField }] =
      useForm({
        schemas: schemas,
        labelWidth: 120,
        actionColOptions: {
          span: 24,
        },
        showActionButtonGroup: false,
        baseRowStyle: {backgroundColor: "blue", hover: "{outline: 1px #1890ff dashed}" },
      });

    function handleField(element: Widget) {
      console.log('element :>> ', element);
      emitter.emit('on-field-add', element);
    }

    function handleUndo() {
      console.log('undo :>> ', 'undo');
    }
    function handleRedo() {
      console.log('redo :>> ', 'redo');
    }
    function handleUpload() {
      console.log('upload :>> ', 'upload');
    }
    function handleClear() {
      console.log('clear :>> ', 'clear');
    }
    function handlePreview() {
      console.log('preview :>> ', 'preview');
    }
    function handleGenerateJson() {
      console.log('generateJson :>> ', 'generateJson');
    }
    function handleGenerateCode() {
      console.log('generateCode :>> ', 'generateCode');
    }
    function handleConfigSelect(value: State['configTab']) {
      state.configTab = value;
    }
    function dragstart(e, data) {
      e.dataTransfer.setData('data', JSON.stringify(data));
    }

    function drop(e, index) {
      e.stopPropagation();
      // console.log(e);
      // console.log(e.dataTransfer.getData('data'));
      const data = JSON.parse(e.dataTransfer.getData('data'));
      console.log(data);
      appendSchemaByField(
        {
          field: 'field10',
          label: '字段10',
          component: 'Input',
          colProps: {
            span: 22,
          },
        },
        'field3'
      );
      if (data.type === 'sort') {
        let temp = form.fields[data.index];
        form.fields.splice(data.index, 1);
        form.fields.splice(index, 0, temp);
      } else {
        let thisFiled = JSON.parse(JSON.stringify(defaultConfig[data.fieldType]));
        console.log(thisFiled);
        if (thisFiled.name) {
          thisFiled.name = thisFiled.name + '_' + new Date().getTime();
        }
        thisFiled.defaultValue = defaultValue[thisFiled.type];
        form.fields.push(thisFiled);
        field.value = thisFiled;
        // changeClaceholder();
        // removeSelected();
      }
    }
    function click(e) {}
    function remove(e) {
      console.log('remove', e);
    }

    // reloadComponents()

    onMounted(() => {});
    return {
      // ...toRefs(state),

      ...toRefs(form),
      options,
      defaultConfig,
      activeKey,
      dragstart,
      drop,
      handleField,
      handleUndo,
      handleRedo,
      handleUpload,
      handleClear,
      handlePreview,
      handleGenerateJson,
      handleGenerateCode,
      handleConfigSelect,
      field,
      click,
      remove,
      register,
    };
  },
});
</script>

<style scoped>
.ant-layout,
.ant-layout-content,
.ant-layout-sider,
.ant-tabs {
  height: 100%;
  margin: 0;
}

.ant-layout-content,
.ant-layout-sider {
  overflow: auto;
  background-color: white;
  outline: 1px #ebeef5 solid;
}

.ant-layout-content {
  position: relative;
}

.ant-layout-sider {
  min-width: 320px !important;
  max-width: 320px !important;
}

.ant-tabs {
  overflow: auto;
}

.design_header {
  position: absolute;
  width: 100%;
  z-index: 1000;
  height: 46px;
  line-height: 46px;
  background-color: white;
  outline: 1px #ebeef5 solid;
  top: 0;
}

.design-content {
  padding: 47px 0 0 0;
}

.design-body {
  margin: 0;
  overflow: auto;
}

.design-body,
.design-content {
  height: 100% !important;
}

.design-setting .body {
  height: 100%;
  overflow: auto;
  padding-bottom: 40px;
}

.design-item {
  margin: 5px;
  padding: 10px;
  position: relative;
}

.design-item.selected,
.design-item:hover {
  outline: 1px #1890ff dashed !important;
}

.design-item .delete {
  position: absolute;
  color: #1890ff;
  z-index: 3;
  right: 5px;
  bottom: 5px;
}

.design-combos {
  padding: 0;
  margin-top: 10px;
}

.design-combo {
  display: inline-block;
}

.design-combo .title {
  margin: 10px;
  outline: 1px #e4edf7 solid !important;
  text-align: center;
  line-height: 40px;
  width: 126px;
  height: 40px;
}
</style>
