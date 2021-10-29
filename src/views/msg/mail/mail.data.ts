import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { DescItem } from '/@/components/Description/index';
import { SvgIcon } from '/@/components/Icon';



export const mailColumns: BasicColumn[] = [
  {
    align: 'left',
    title: '主题',
    dataIndex: 'title',
    width: 150,
  },
  {
    align: 'left',
    title: '类型',
    width: 150,
    customRender: ({ record }) => {
      const isAudio = record.isAudio;

      const image =   h(SvgIcon, { name:'item' });
      return image;
    }
  },

  {
    align: 'left',
    title: '内容',
    dataIndex: 'content',
    width: 150,
  },
  {
    align: 'left',
    title: '简单描述',
    dataIndex: 'describe',
    width: 150,
  },
 
  {
    align: 'left',
    title: '发送者',
    dataIndex: 'senderName',
    width: 150,
  },
 
  {
    align: 'left',
    title: '接收时间',
    dataIndex: 'receiveDate',
    width: 150,
  },
  {
    align: 'left',
    title: '内部邮箱',
    dataIndex: 'isInner',
    width: 150,
  },
  {
    align: 'left',
    title: '发送者邮箱',
    dataIndex: 'senderMail',
    width: 150,
  },
  {
    align: 'left',
    title: '接收者邮箱',
    dataIndex: 'receiveMail',
    width: 150,
  },
  {
    align: 'left',
    title: '阅读时间',
    dataIndex: 'readDate',
    width: 150,
  },
  {
    align: 'left',
    title: '状态码  0: 未读,1: 已读,2: 已回复,3: 已转发',
    dataIndex: 'status',
    width: 150,
  },
  {
    align: 'left',
    title: '附件数',
    dataIndex: 'fileCount',
    width: 150,
  },
  {
    align: 'left',
    title: '内容大学',
    dataIndex: 'size',
    width: 150,
  },

  
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '邮件名',
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
    label: '主题',
    field: 'title',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '内容',
    field: 'content',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '简单描述',
    field: 'describe',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '星标邮件 0普通 1星级',
    field: 'isstar',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '发送者',
    field: 'senderName',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '收件人id',
    field: 'receiveUser',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '收件人',
    field: 'receiveName',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '接收时间',
    field: 'receiveDate',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '内部邮箱，默认是0 1是外部',
    field: 'isInner',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '发送者邮箱',
    field: 'senderMail',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '接收者邮箱',
    field: 'receiveMail',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '阅读时间',
    field: 'readDate',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '状态码  0: 未读,1: 已读,2: 已回复,3: 已转发',
    field: 'status',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '附件数',
    field: 'fileCount',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '内容大小',
    field: 'size',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '是否语音邮箱 0正常 1语音',
    field: 'isAudio',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '是否草稿 0草稿 1正式',
    field: 'isDraft',
    contentMinWidth: 100,
    span: 1,
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
    component: 'Input',
    label: '主题',
    field: 'title',
    required: false,
    colProps: {
      span: 16,
    },
  },
  {
    component: 'Input',
    label: '简单描述',
    field: 'describe',
    required: false,
    colProps: {
      span: 16,
    },
  },
  {
    component: 'InputTextArea',
    label: '内容',
    field: 'content',
    required: false,
  },
 
  {
  
    label: '星标邮件 0普通 1星级',
    field: 'isStar',
    required: false,
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: () => {
      return {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
        placeholder: '星标邮件',
       
      };
    },
  },
  {
    component: 'Input',
    label: '发送者',
    field: 'senderName',
    required: false,
  },
  {
    component: 'Input',
    label: '收件人id',
    field: 'receiveUser',
    required: false,
  },
  {
    component: 'Input',
    label: '收件人',
    field: 'receiveName',
    required: false,
  },
  {
    label: '内部邮箱，默认是0 1是外部',
    field: 'isInner',
    required: false,
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: () => {
      return {
        options: [
          { label: '外部', value: true },
          { label: '内部', value: false },
        ],
        placeholder: '星标邮件',
       
      };
    },
  },
  {
    component: 'Input',
    label: '发送者邮箱',
    field: 'senderMail',
    required: false,
  },
  {
    component: 'Input',
    label: '接收者邮箱',
    field: 'receiveMail',
    required: false,
  },

  {
    component: 'Input',
    label: '是否语音邮箱 0正常 1语音',
    field: 'isAudio',
    required: false,
  },

];
