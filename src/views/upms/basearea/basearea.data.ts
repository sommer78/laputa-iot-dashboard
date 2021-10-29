import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: '编码',
    dataIndex: 'code',
    width: 150,
  },
  {
    align: 'left',
    title: '父编码',
    dataIndex: 'pcode',
    width: 150,
  },
  {
    align: 'left',
    title: '名称',
    dataIndex: 'name',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '区域信息名',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'delete',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];
export const descSchema: DescItem[] = [
  {
    label: '编码',
    field: 'code',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '父编码',
    field: 'pcode',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '名称',
    field: 'name',
    contentMinWidth: 100,
    span: 1,
  },
];

export const formSchema: FormSchema[] = [
  {
    component: 'Input',
    label: '编码',
    field: 'code',
    required: false,
  },
  {
    component: 'Input',
    label: '父编码',
    field: 'pcode',
    required: false,
  },
  {
    component: 'Input',
    label: '名称',
    field: 'name',
    required: false,
  },
];
