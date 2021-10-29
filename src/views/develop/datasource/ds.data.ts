import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 200,
    align: 'left',
    ifShow: false,
  },
  {
    title: '数据源名称',
    dataIndex: 'name',
    width: 150,
    align: 'left',
  },
  {
    title: '数据类型',
    dataIndex: 'dsType',
    width: 150,
    align: 'left',
  },
  {
    title: '主机',
    dataIndex: 'host',
    width: 100,
  },
  {
    title: '端口',
    dataIndex: 'port',
    width: 60,
  },
  {
    title: '组件',
    dataIndex: 'url',
    width: 400,
  },
 
  {
    title: '类型',
    dataIndex: 'confType',
    width: 80,
    customRender: ({ record }) => {
      const type = record.confType;
     
      const color = type==0 ? 'green' : 'blue';
      const text = type==0 ? '主机' : 'JDBC';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '状态',
    dataIndex: 'delFlag',
    width: 80,
    customRender: ({ record }) => {
      const delFlag = record.delFlag;
      const enable = ~~delFlag === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '数据源名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dsType',
    label: '菜单类型',
    component: 'Input',
    colProps: { span: 8 },
  },
 
];
const basicOptions: LabelValueOptions = [
  {
    label: 'mysql',
    value: 'mysql',
  },
  {
    label: 'oracle',
    value: 'oracle',
  },
  {
    label: 'pg',
    value: 'pg',
  },
  {
    label: 'mssql',
    value: 'mssql',
  },
  {
    label: 'db2',
    value: 'db2',
  },
];

const portOptions: LabelValueOptions = [
  {
    label: 'mysql',
    value: 3306,
  },
  {
    label: 'oracle',
    value: 1521,
  },
  {
    label: 'pg',
    value: 5432,
  },
  {
    label: 'mssql',
    value: 1433,
  },
  {
    label: 'db2',
    value: 50000,
  },
];

const isUpdate = (type: number) => type === 2;
export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
 
  {
    field: 'name',
    label: '数据源名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'dsType',
    label: '数据源类型',
    component: 'Select',
    required: true,
    defaultValue: 'mysql',
    // componentProps: {
    //   options: basicOptions,
    // },
    componentProps: ({ formModel }) => {
      return {
        options: basicOptions,
        placeholder: '同步f2的值为f1',
        onChange: (e: string) => {
          console.log(e);
          formModel.port = portOptions.find(a=>{return a.label == e })?.value;
        },
      };
    },
  },


  {
    field: 'confType',
    label: '配置类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '主机', value: 0 },
        { label: 'JDBC', value: 1 },
      ],
    },
  },
  {
    field: 'host',
    label: '主机',
    component: 'Input',
    required: true,
  },

  {
    field: 'port',
    label: '端口',
    component: 'Input',
    required: true,
    defaultValue: 3306,
    
  },
  {
    field: 'url',
    label: '链接',
    component: 'Input',
  },
  {
    field: 'dsName',
    label: '数据库名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
  
  },
  {
    field: 'delFlag',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '禁用', value: '1' },
        { label: '启用', value: '0' },
      ],
    },
  },
   
  
];
