import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: '编号',
    dataIndex: 'id',
    width: 50,
    ifShow: false,
  },
  {
    align: 'center',
    title: '类型',
    dataIndex: 'type',
    width: 100,
  },
  {
    align: 'center',
    title: '描述',
    dataIndex: 'description',
    width: 200,
  },

  {
    align: 'center',
    title: '备注信息',
    dataIndex: 'remarks',
    width: 200,
  },
  {
    align: 'center',
    title: 'system',
    dataIndex: 'system',
    width: 150,
    customRender: ({ record }) => {
      const type = record.system;

      const color = type ? 'green' : 'blue';
      const text = type ? '系统' : '业务';
      return h(Tag, { color: color }, () => text);
    },
  },
];


export const dictionaryItemSearchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
    labelWidth: 60,
    colProps: {span: 16},
  },
];

export const itemColumns: BasicColumn[] = [
  {
    align: 'left',
    title: 'dictId',
    dataIndex: 'dictId',
    width: 100,
    ifShow: false,
  },
  {
    align: 'left',
    title: 'value',
    dataIndex: 'value',
    width: 100,
  },
  {
    align: 'left',
    title: 'label',
    dataIndex: 'label',
    width: 100,
  },
  {
    align: 'left',
    title: 'type',
    dataIndex: 'type',
    width: 100,
  },
  {
    align: 'left',
    title: 'description',
    dataIndex: 'description',
    width: 100,
  },
  {
    align: 'left',
    title: '排序（升序）',
    dataIndex: 'sort',
    width: 50,
  },
  {
    align: 'left',
    title: 'remarks',
    dataIndex: 'remarks',
    width: 100,
  },
 
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '关键字',
    field: 'keyword',
    component: 'Input',
    colProps: { span: 12 },
  },
];

export const dictSchema: FormSchema[] = [
  {
    component: 'Input',
    label: '编号',
    field: 'id',
    show: false,
  },
  {
    component: 'Input',
    label: 'type',
    field: 'type',
    required: false,
  },
  {
    component: 'Input',
    label: 'description',
    field: 'description',
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
    label: 'remarks',
    field: 'remarks',
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
  {
    component: 'Input',
    label: '所属租户',
    field: 'tenantId',
    required: false,
  },
];
export const dictionaryItemFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'dictId',
    label: '字典主键',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 60,
        message: '字符长度不能大于60！',
      }
    ],
  },
  /*{
    field: 'ename',
    label: '英文名称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '英文名称不能为空！',
      },
      {
        pattern: new RegExp('^[0-9a-zA-Z_]{1,}$'),
        type: 'string',
        message: '请输入英文或数字！',
      },
      {
        max: 60,
        message: '字符长度不能大于60！',
      },
    ],
  },*/
  {
    field: 'code',
    label: '编码',
    component: 'Input',
  },
  {
    field: 'orderNo',
    label: '排序号',
    required: false,
    component: 'InputNumber',
  },
];
