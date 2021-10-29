import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: 'routeName',
    dataIndex: 'routeName',
    width: 150,
  },
  {
    align: 'left',
    title: 'routeId',
    dataIndex: 'routeId',
    width: 150,
  },
  {
    align: 'left',
    title: '断言',
    dataIndex: 'predicates',
    width: 150,
  },
  {
    align: 'left',
    title: '过滤器',
    dataIndex: 'filters',
    width: 150,
  },
  {
    align: 'left',
    title: 'uri',
    dataIndex: 'uri',
    width: 150,
  },
  {
    align: 'left',
    title: '排序',
    dataIndex: 'order',
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
    label: 'routeName',
    field: 'routeName',
    required: false,
  },
  {
    component: 'Input',
    label: 'routeId',
    field: 'routeId',
    required: false,
  },
  {
    component: 'Input',
    label: '断言',
    field: 'predicates',
    required: false,
  },
  {
    component: 'Input',
    label: '过滤器',
    field: 'filters',
    required: false,
  },
  {
    component: 'Input',
    label: 'uri',
    field: 'uri',
    required: false,
  },
  {
    component: 'Input',
    label: '排序',
    field: 'order',
    required: false,
  },
  {
    component: 'Input',
    label: 'delFlag',
    field: 'delFlag',
    required: false,
  },
];
