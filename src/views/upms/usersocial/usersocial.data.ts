import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: '用户ID',
    dataIndex: 'userId',
    width: 150,
  },
  {
    align: 'left',
    title: '姓名',
    dataIndex: 'name',
    width: 150,
  },
  {
    align: 'left',
    title: '账号类型',
    dataIndex: 'type',
    width: 150,
  },
  {
    align: 'left',
    title: '头像',
    dataIndex: 'avatar',
    width: 150,
  },
  {
    align: 'left',
    title: '社交登录UID',
    dataIndex: 'socialUid',
    width: 150,
  },
  {
    align: 'left',
    title: '社交登录TOKEN',
    dataIndex: 'accessToken',
    width: 150,
  },
  {
    align: 'left',
    title: '社交登录过期时间',
    dataIndex: 'expiresIn',
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
    label: '用户ID',
    field: 'userId',
    required: false,
  },
  {
    component: 'Input',
    label: '姓名',
    field: 'name',
    required: false,
  },
  {
    component: 'Input',
    label: '账号类型',
    field: 'type',
    required: false,
  },
  {
    component: 'Input',
    label: '头像',
    field: 'avatar',
    required: false,
  },
  {
    component: 'Input',
    label: '社交登录UID',
    field: 'socialUid',
    required: false,
  },
  {
    component: 'Input',
    label: '社交登录TOKEN',
    field: 'accessToken',
    required: false,
  },
  {
    component: 'Input',
    label: '社交登录过期时间',
    field: 'expiresIn',
    required: false,
  },
];
