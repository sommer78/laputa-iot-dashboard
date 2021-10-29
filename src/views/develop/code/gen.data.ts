import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { fetchDsList } from '/@/api/dev/gen';
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 200,
    align: 'left',
    ifShow: false,
  },
  {
    title: '数据源表',
    dataIndex: 'tableComment',
    width: 150,
    align: 'left',
  },
  {
    title: '数据类型',
    dataIndex: 'dbType',
    width: 150,
    align: 'left',
  },
  {
    title: 'ENGINE',
    dataIndex: 'ENGINE',
    width: 100,
  },
  {
    title: '表名',
    dataIndex: 'tableName',
    width: 120,
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '数据源',
    field: 'dsName',
    component: 'ApiSelect',
    componentProps: {
      api: fetchDsList,
      resultField: 'records',
      labelField: 'name',
      valueField: 'name',
    },
    colProps: { span: 4 },
  },
  {
    field: 'tableName',
    label: '表名称',
    component: 'Input',
    colProps: { span: 4 },
    
  },
 
];


export const formSchema: FormSchema[] = [
  {
    field: 'dsName',
    label: '数据源名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'packageName',
    label: '包名',
    component: 'Input',
    defaultValue: 'com.laputa.iot',
   
  },

  {
    field: 'author',
    label: '作者',
    component: 'Input',
    defaultValue: 'Sommer',
   
  },
  {
    field: 'moduleName',
    label: '模块名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'tablePrefix',
    label: '表前缀',
    component: 'Input',

   
  },
  {
    field: 'tableName',
    label: '表名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'comments',
    label: '表备注',
    component: 'Input',
  
  },
 
  {
    field: 'entityType',
    component: 'Select',
    label: '实例类型',
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '单例',
          value: '0',
          key: '0',
        },
        {
          label: '连接表',
          value: '1',
          key: '1',
        },
      ],
    },
  },
 
  
];
