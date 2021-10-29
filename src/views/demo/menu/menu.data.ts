import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { useI18n } from '/@/hooks/web/useI18n';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      // if(!record?.icon){
      //   return h(Icon, { icon: 'emojione:radio-button' });
      // }
      return h(Icon, { icon: record.icon?  record.icon:'emojione:radio-button' });
      
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 100,
    customRender: ({ record }) => {
      const { t } = useI18n();
      // console.log(record.title);
      return t(record.title);
    },
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 120,
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 80,
    customRender: ({ record }) => {
      const type = record.type;
      const color = type>1 ? 'green' : 'blue';
      const text = type>1 ? '按钮' : '菜单/目录';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '状态',
    dataIndex: 'deleted',
    width: 80,
    customRender: ({ record }) => {
      const deleted = record.deleted;
      const enable = ~~deleted === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

const isDir = (type: number) => type === 0;
const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    default: 1,
    },
    colProps:{ span: 8 },
  },
 
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    show: false,
    component: 'Input',
  },
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps:{
      onChange:(e,obj)=>{
          console.info(e,obj);
      },
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
   
  },

  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
     required: true,
  },

  {
    field: 'icon',
    label: '图标',
    component: 'SwitchIconPicker',
    required: ({ values }) => !isButton(values.type),
    show: ({ values }) => !isButton(values.type),
  },

  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: ({ values }) => !isButton(values.type),
    show: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    show: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    show: ({ values }) => isButton(values.type),
  },
  {
    field: 'redirect',
    label: '重定向',
    component: 'Input',
    show: ({ values }) => isDir(values.type),
  },
  {
    field: 'deleted',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '禁用', value: 1 },
        { label: '启用', value: 0 },
      ],
    },
  },
  {
    field: 'frameSrc',
    label: '内部网页',
    component: 'Input',
    show: ({ values }) => isMenu(values.type)&& values.isLink,
  },
  {
    field: 'currentActiveMenu',
    label: '当前菜单',
    component: 'Input',
    show: ({ values }) => isDir(values.type),
  },
 
  {
    field: 'isLink',
    label: '是否外链',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    show: ({ values }) => !isButton(values.type),
  },

  {
    field: 'ignoreKeepAlive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    show: ({ values }) => isMenu(values.type),
  },

  {
    field: 'showMenu',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
    show: ({ values }) => !isButton(values.type),
  },
];
