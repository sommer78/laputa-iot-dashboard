import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: '客户端ID',
    dataIndex: 'clientId',
    width: 100,
  },
  {
    align: 'left',
    title: '资源IDS',
    dataIndex: 'resourceIds',
    width: 80,
  },
  {
    align: 'left',
    title: '客户端密钥',
    dataIndex: 'clientSecret',
    width: 150,
  },
  {
    align: 'left',
    title: '作用域',
    dataIndex: 'scope',
    width: 150,
  },
  {
    align: 'left',
    title: '授权类型',
    dataIndex: 'authorizedGrantTypes',
    width: 150,
    
  },
  {
    align: 'left',
    title: '重定向地址',
    dataIndex: 'webServerRedirectUri',
    width: 150,
  },
  {
    align: 'left',
    title: '授权',
    dataIndex: 'authorities',
    width: 150,
  },
  {
    align: 'left',
    title: '授权Token',
    dataIndex: 'accessTokenValidity',
    width: 150,
  },
  {
    align: 'left',
    title: '刷新Token',
    dataIndex: 'refreshTokenValidity',
    width: 150,
  },
  {
    align: 'left',
    title: '附加信息',
    dataIndex: 'additionalInformation',
    width: 150,
  },
  {
    align: 'left',
    title: '自动授权',
    dataIndex: 'autoapprove',
    width: 80,
    customRender: ({ record }) => {
        const autoapprove = record.autoapprove;
        const color = autoapprove ? 'green' : 'red';
        const text = autoapprove ? '启用' : '停用';
        return h(Tag, { color: color }, () => text);
      },
  },
 
];
export const descSchema: DescItem[] = [
  {
    field: 'clientId',
    label: '客户端ID',
    contentMinWidth: 100,
    span: 2,
  },
  {
    field: 'authorizedGrantTypes',
    label: '授权类型',
    contentMinWidth: 200,
    span: 1,
  },
  {
    field: 'autoapprove',
    label: '自动授权',
    render: (curVal, data) => {
      console.log(curVal,data)
      const autoapprove = data.autoapprove;
      const color = autoapprove ? 'green' : 'red';
      const text = autoapprove ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    field: 'accessTokenValidity',
    label: '授权Token',
  },
  {
    field: 'refreshTokenValidity',
    label: '刷新Token',
  },
  {
    field: 'additionalInformation',
    label: '附加信息',
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    label: '终端信息表名',
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

export const formSchema: FormSchema[] = [
  {
    component: 'Input',
    label: 'clientId',
    field: 'clientId',
    required: false,
  },
  {
    component: 'Input',
    label: 'resourceIds',
    field: 'resourceIds',
    required: false,
  },
  {
    component: 'Input',
    label: 'clientSecret',
    field: 'clientSecret',
    required: false,
  },
  {
    component: 'Input',
    label: 'scope',
    field: 'scope',
    required: false,
  },
  {
    component: 'Input',
    label: 'authorizedGrantTypes',
    field: 'authorizedGrantTypes',
    required: false,
  },
  {
    component: 'Input',
    label: 'webServerRedirectUri',
    field: 'webServerRedirectUri',
    required: false,
  },
  {
    component: 'Input',
    label: 'authorities',
    field: 'authorities',
    required: false,
  },
  {
    component: 'Input',
    label: 'accessTokenValidity',
    field: 'accessTokenValidity',
    required: false,
  },
  {
    component: 'Input',
    label: 'refreshTokenValidity',
    field: 'refreshTokenValidity',
    required: false,
  },
  {
    component: 'Input',
    label: 'additionalInformation',
    field: 'additionalInformation',
    required: false,
  },
  {
    component: 'Input',
    label: 'autoapprove',
    field: 'autoapprove',
    required: false,
  },
  {
    component: 'Input',
    label: 'delFlag',
    field: 'delFlag',
    required: false,
  },
];
