import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [

  {
    align: 'left',
    title: '参数名',
    dataIndex: 'publicName',
    width: 150,
  },
  {
    align: 'left',
    title: '参数主键',
    dataIndex: 'publicKey',
    width: 200,
  },
  {
    align: 'left',
    title: '参数值',
    dataIndex: 'publicValue',
    width: 150,
  },
  {
    align: 'center',
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
        const status = record.status;
        const color = status? 'blue' : 'red';
        const text = status ? '有效' : '无效';
        return h(Tag, { color: color }, () => text);
      },
  },
  {
    align: 'left',
    title: '验证码',
    dataIndex: 'validateCode',
    width: 150,
  },
  {
    align: 'left',
    title: '公众类型',
    dataIndex: 'publicType',
    width: 150,
  },
  {
    align: 'left',
    title: '系统类型',
    dataIndex: 'system',
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
    label: '编号',
    field: 'publicId',
    required: false,
  },
  {
    component: 'Input',
    label: 'publicName',
    field: 'publicName',
    required: false,
  },
  {
    component: 'Input',
    label: 'publicKey',
    field: 'publicKey',
    required: false,
  },
  {
    component: 'Input',
    label: 'publicValue',
    field: 'publicValue',
    required: false,
  },
  {
    component: 'Input',
    label: 'status',
    field: 'status',
    required: false,
  },
  {
    component: 'Input',
    label: 'validateCode',
    field: 'validateCode',
    required: false,
  },
  {
    component: 'Input',
    label: 'publicType',
    field: 'publicType',
    required: false,
  },
  {
    component: 'Input',
    label: 'system',
    field: 'system',
    required: false,
  },
  {
    component: 'Input',
    label: 'delFlag',
    field: 'delFlag',
    required: false,
  },
];
