<template>
   <!-- <FormItem v-if="field.type !== 'divider'" :label="field.label" :name="field.name"> -->

    <Input
      v-if="field.type === 'input'"
      v-model:value="model"
      :placeholder="field.placeholder"
      :disabled="field.disabled"
      :default-value="field.defaultValue"
      :allow-clear="field.allowClear"
      :type="field.type ? field.type : 'input'"
      :maxlength="field.maxlength"
    />

   <!-- </FormItem> -->
</template>

<script lang="ts">
// import {  Form, Input, Divider,Textarea, InputNumber , TreeSelect, Checkbox, CheckboxGroup, 
// Select,SelectOption, Cascader, TimePicker,DatePicker,RangePicker} from 'ant-design-vue';
// import  { FormItem } from '/@/components/Form/index';

import { defineComponent, watch, reactive, toRefs } from 'vue';
export default defineComponent({
  name: '',
  props: ['field', 'value', 'options'],
  components: {
    // FormItem: Form.Item, Input, Divider,Textarea,InputNumber,TreeSelect,Checkbox,CheckboxGroup, Select, SelectOption, Cascader,
    // TimePicker,DatePicker,RangePicker
    // FormItem
  },
  setup(props, { emit }) {
    console.log('props',props);
    const state = reactive({
      model: '',
      value: 'hello, ',
    
    });
    watch(
      () => state.model,
      async (value) => {
        emit('update:value', value);
      }
    );
    watch(
      () => props.value,
      async (value) => {
        state.model = value;
      }
    );
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.ant-calendar-picker {
  width: 100% !important;
}
</style>
