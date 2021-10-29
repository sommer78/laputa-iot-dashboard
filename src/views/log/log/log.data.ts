import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: '编号',
    dataIndex: 'id',
    width: 200,
    ifShow: false,
  },
  {
    align: 'center',
    title: 'type',
    dataIndex: 'type',
    width: 50,
  },
  {
    align: 'left',
    title: 'title',
    dataIndex: 'title',
    width: 120,
  },
  {
    align: 'left',
    title: 'serviceId',
    dataIndex: 'serviceId',
    width: 80,
  },
 
  {
    align: 'center',
    title: 'remoteAddr',
    dataIndex: 'remoteAddr',
    width: 200,
  },
  {
    align: 'left',
    title: 'userAgent',
    dataIndex: 'userAgent',
    width: 200,
  },
  {
    align: 'left',
    title: 'requestUri',
    dataIndex: 'requestUri',
    width: 200,
  },
  {
    align: 'left',
    title: 'method',
    dataIndex: 'method',
    width: 200,
  },
  {
    align: 'left',
    title: 'params',
    dataIndex: 'params',
    width: 200,
  },
  {
    align: 'left',
    title: '执行时间',
    dataIndex: 'time',
    width: 200,
  },

  {
    align: 'left',
    title: 'exception',
    dataIndex: 'exception',
    width: 200,
  },
 
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '日志名',
    field: 'name',
    component: 'Input',
    colProps: { span: 4 },
  },
];

export const formSchema: FormSchema[] = [
  {
    component: 'Input',
    label: '编号',
    field: 'id',
    required: false,
  },
  {
    component: 'Input',
    label: 'type',
    field: 'type',
    required: false,
  },
  {
    component: 'Input',
    label: 'title',
    field: 'title',
    required: false,
  },
  {
    component: 'Input',
    label: 'serviceId',
    field: 'serviceId',
    required: false,
  },
  {
    component: 'Input',
    label: 'createBy',
    field: 'createBy',
    required: false,
  },
  {
    component: 'Input',
    label: '创建时间',
    field: 'createTime',
    required: false,
  },
  {
    component: 'Input',
    label: '更新时间',
    field: 'updateTime',
    required: false,
  },
  {
    component: 'Input',
    label: 'remoteAddr',
    field: 'remoteAddr',
    required: false,
  },
  {
    component: 'Input',
    label: 'userAgent',
    field: 'userAgent',
    required: false,
  },
  {
    component: 'Input',
    label: 'requestUri',
    field: 'requestUri',
    required: false,
  },
  {
    component: 'Input',
    label: 'method',
    field: 'method',
    required: false,
  },
  {
    component: 'Input',
    label: 'params',
    field: 'params',
    required: false,
  },
  {
    component: 'Input',
    label: '执行时间',
    field: 'time',
    required: false,
  },
  {
    component: 'Input',
    label: 'delFlag',
    field: 'delFlag',
    required: false,
  },
  {
    component: 'Input',
    label: 'exception',
    field: 'exception',
    required: false,
  },
  {
    component: 'Input',
    label: '所属租户',
    field: 'tenantId',
    required: false,
  },
];
