import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: 'type',
    dataIndex: 'type',
    width: 150,
  },
  {
    align: 'left',
    title: 'remark',
    dataIndex: 'remark',
    width: 150,
  },
  {
    align: 'left',
    title: 'appId',
    dataIndex: 'appId',
    width: 150,
  },
  {
    align: 'left',
    title: 'appSecret',
    dataIndex: 'appSecret',
    width: 150,
  },
  {
    align: 'left',
    title: 'redirectUrl',
    dataIndex: 'redirectUrl',
    width: 150,
  },
  {
    align: 'left',
    title: 'delFlag',
    dataIndex: 'delFlag',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '数据源',
    field: 'name',
    component: 'Input',
    colProps: { span: 4 },
  },
];

export const formSchema: FormSchema[] = [
  {
    component: 'Input',
    label: 'type',
    field: 'type',
    required: false,
  },
  {
    component: 'Input',
    label: 'remark',
    field: 'remark',
    required: false,
  },
  {
    component: 'Input',
    label: 'appId',
    field: 'appId',
    required: false,
  },
  {
    component: 'Input',
    label: 'appSecret',
    field: 'appSecret',
    required: false,
  },
  {
    component: 'Input',
    label: 'redirectUrl',
    field: 'redirectUrl',
    required: false,
  },
  {
    component: 'Input',
    label: 'delFlag',
    field: 'delFlag',
    required: false,
  },
];
