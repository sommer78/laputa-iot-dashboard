import { getRoleList } from '/@/api/upms/role';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import {Tag} from "ant-design-vue";
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    slots: {
      customRender: 'imageRender'
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 180,
  },
  {
    title: '权限组',
    dataIndex: 'roleList',
    align: 'left',
    customRender: ({ record }) => {
      const roles = record.roleList;
      const color = 'green';

      const tags =
        (roles &&
          roles.map(item=> {
        return h(Tag, { color: color, style: {marginRight:'10px'} }, () => item.name);
      }) || []);

      return tags;
    },
  },

  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入账号名/姓名/手机',
    },
    labelWidth: 60,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
 
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: ['不能输入带有admin的用户名'],
    required: true,
    colProps: {
      span: 16,
    },
  },
   
  {
    field: 'avatar',
    label: '',
    component: 'Input',
    slot: 'headImg',
    colProps: {
      style: 'margin: auto;position: absolute;right: -100px; ',
      span: 10,
    },
  },
  {
    field: 'name',
    label: '昵称',
    component: 'Input',
    required: true,
    colProps: {
      span: 16,
    },
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    required: true,
    show: false,
   
  },
  {
    label: '角色', 
    field: 'roles',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      immediate: false,
      api: getRoleList,
      labelField: 'name',
      valueField: 'id',
    },
  },

  {
    label: '手机',
    field: 'phone',
    component: 'Input',
    required: true,
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: false,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
 
];

export const userInfoFormSchema: FormSchema[] = [
  {
    field: 'avatar',
    component: 'Input',
    label: '头像',
    slot: 'avatar',
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    
  },
   {
    label: '角色',
    field: 'roleId',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: getRoleList,
      lazy: false,
      labelField: 'name',
      valueField: 'id',
      defaultValue: "['管理员']"
    },
   
  },
  {
    field: 'dept',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    
  },
  {
    field: 'name',
    label: '昵称',
    component: 'Input',
    
  },

  {
    label: '手机',
    field: 'phone',
    component: 'Input',
   
  },
 
 
];

