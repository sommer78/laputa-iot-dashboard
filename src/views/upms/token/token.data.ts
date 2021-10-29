import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: '有效令牌',
    dataIndex: 'access_token',
   
  },
  {
    align: 'left',
    title: '令牌类型',
    dataIndex: 'token_type',
    width: 80,
  },
  {
    align: 'left',
    title: '刷新令牌',
    dataIndex: 'refresh_token',
    
  },
  {
    align: 'left',
    title: '有效时间',
    dataIndex: 'expires_in',
    width: 100,
  },
  {
    align: 'left',
    title: '证书权限',
    dataIndex: 'license',
    width: 100,
    
  },
  {
    align: 'left',
    title: '是否激活',
    dataIndex: 'active',
    width: 80,
    customRender: ({ record }) => {
        const autoapprove = record.active;
        const color = autoapprove ? 'green' : 'red';
        const text = autoapprove ? '启用' : '停用';
        return h(Tag, { color: color }, () => text);
      },
  },
  {
    align: 'left',
    title: '作用域',
    dataIndex: 'scope',
    width: 100,
  },


];
export const descSchema: DescItem[] = [
  {
    field: 'access_token',
    label: '有效令牌',
    contentMinWidth: 100,
    span: 2,
  },
  {
    field: 'token_type',
    label: '授权类型',
    contentMinWidth: 200,
    span: 1,
  },
  {
    field: 'active',
    label: '是否激活',
    render: (curVal, data) => {
      console.log(curVal,data)
      const autoapprove = data.active;
      const color = autoapprove ? 'green' : 'red';
      const text = autoapprove ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    field: 'expires_in',
    label: '有效时间',
  },
  {
    field: 'refresh_token',
    label: '刷新Token',
  },
  {
    field: 'license',
    label: '证书权限',
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
