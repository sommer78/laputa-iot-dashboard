import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: 'name',
    dataIndex: 'name',
    width: 150,
  },
  {
    align: 'left',
    title: 'code',
    dataIndex: 'code',
    width: 150,
  },
  {
    align: 'left',
    title: '开始时间',
    dataIndex: 'startTime',
    width: 150,
  },
  {
    align: 'left',
    title: '结束时间',
    dataIndex: 'endTime',
    width: 150,
  },
  {
    align: 'left',
    title: 'status',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const deleted = record.deleted;
      const enable = ~~deleted === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 4 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    show: false,
    component: 'Input',
  },
  {
    component: 'Input',
    label: '名称',
    field: 'name',
    required: false,
  },
  {
    component: 'Input',
    label: '编码',
    field: 'code',
    required: false,
  },
  {
    component: 'DatePicker',
    label: '开始时间',
    field: 'startTime',
    required: false,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'DatePicker',
    label: '结束时间',
    field: 'endTime',
    required: false,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: 'status',
    field: 'status',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
];
