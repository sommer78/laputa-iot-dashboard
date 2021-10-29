import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';


export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    align: 'left',
    width: 160,
    customRender: ({ record }) => {
      return h('span', {}, [h(Icon, { icon: record.icon }), h('span', record.name)]);
      // return h(Icon, { icon: record.image });
    },
  },
  {
    title: '路径',
    dataIndex: 'path',
    align: 'left',
    width: 180,
  },
  
  {
    title: '组件',
    dataIndex: 'component',
    align: 'left',
    customRender: ({ record }) => {
      const isLink = record.isLink;
      if('IFrame' === record.component){
        return h(Tag, { color: 'blue' }, () => record.frameSrc);
       
      }
      if(isLink){
        return h(Tag, { color: 'green' }, () => record.path); 
      }
      return record.component;
    },
  },
  {
    title: '标签',
    dataIndex: 'tag',
    width: 150,
  },
  {
    title: '是否显示',
    dataIndex: 'showMenu',
    width: 60,
    customRender: ({ record }) => {
      const status = record.showMenu;
      // console.log(status)
      const enable = status === true;
      const color = enable ? 'green' : 'red';
      const text = enable ? '显示' : '隐藏';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '隐藏菜单',
    dataIndex: 'hideMenu',
    width: 60,
    customRender: ({ record }) => {
      const status = record.hideMenu;
      const enable = status === false;
      const color = enable ? 'green' : 'red';
      const text = enable ? '显示' : '隐藏';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '状态',
    dataIndex: 'deleted',
    width: 60,
    customRender: ({ record }) => {
      const status = record.deleted;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
 
  
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

const isDir = (type: number) => type === 0;
const isMenu = (type: number) => type === 1;
const isEmbedded = (component: string) => component === 'IFrame';


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
    field: 'tag',
    label: '模块标签',
    component: 'Input',
    required: true,
  },

  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps:{
    
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    defaultValue: -1,
   
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
    required: true,
    show: true,
  },

  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    show: true,
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    show: ({ values }) => isMenu(values.type),
    componentProps:{
      onChange:(e,obj)=>{
        console.info(e,obj);
      },
     
    },
   
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
    show: ({ values }) => isMenu(values.type) && isEmbedded(values.component),
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
    show: ({ values }) => isMenu(values.type) && !isEmbedded(values.component),
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
    componentProps: ({ formModel }) => {
     
      return {
        options: [
          { label: '否', value: false },
          { label: '是', value: true },
        ],
        placeholder: '是否显示',
        onChange: (e: ChangeEvent) => {
          console.log(e);
          console.log(formModel);
          // formModel.hidden = !e.target.value;
        },
      };
    },
   
    show: true,
  },
  {
    field: 'hideMenu',
    label: '隐藏菜单',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: () => {
     
      return {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
        placeholder: '隐藏菜单',
       
      };
    },
  },
];


export const pValueFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'pvs',
    label: ' ',
    required: false,
    component: 'CheckboxGroup',
    labelWidth: 10,
  },
];
