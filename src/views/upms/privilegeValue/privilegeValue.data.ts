import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 100,
    align: 'left',
  },
  {
    title: '位',
    dataIndex: 'position',
    width: 100,
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon?  record.icon:'emojione:radio-button' });
    },
  },
  {
    title: '缩写',
    dataIndex: 'abbr',
    width: 50,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
  },
  {
    title: '排序号',
    dataIndex: 'orderNo',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 400,
    align: 'left',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],
  },
  
  {
    field: 'icon',
    label: '图标',
    component: 'SwitchIconPicker',
  },
  {
    field: 'position',
    label: '位',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'orderNo',
    label: '排序',
    required: true,
    component: 'InputNumber',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    rules: [
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],
  },
];
