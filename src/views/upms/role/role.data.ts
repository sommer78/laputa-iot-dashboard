import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch, Tag } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/upms/role';
import { useMessage } from '/@/hooks/web/useMessage';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: '角色编号',
    dataIndex: 'code',
    width: 180,
  },
  {
    title: '数据类型',
    dataIndex: 'dsType',
    width: 80,
    customRender: ({ record }) => {
      const type = record.dsType;
      const color = type==0  ? 'green' : 'blue';
      const roleTypes = {
        0: '全部' ,
        1:  '自定义',
        2: '本级及子级',
        3: '本级',
       }
     
      return h(Tag, { color: color }, () => roleTypes[type]);
    },
  },
  {
    title: '数据范围',
    dataIndex: 'dsScope',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'deleted',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'deleted')) {
        record.pendingStatus = false;
      }
      // console.log(record);
      
      return h(Switch, {
        checked: record.deleted === 0,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ;
          const { createMessage } = useMessage();
          setRoleStatus(record.id, newStatus)
            .then(() => {
              record.deleted = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '角色描述',
    dataIndex: 'roleDesc',
  },
];

export const roleAuthColumns: BasicColumn[] = [
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
    title: '权限组',
    dataIndex: 'pvs',
    align: 'left',
    customRender: ({ record }) => {
      const permissions = record.pvs;
      const color = 'green';

      const tags =
        (permissions &&
          permissions.map(item=> {
        return h(Tag, { color: color, style: {marginRight:'10px'} }, () => item.name);
      }) || []);

      return tags;
    },
  },
 
 
];


export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
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
    field: 'id',
    label: 'ID',
    show: false,
    component: 'Input',
  },
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'code',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  {
    field: 'dsType',
    label: '数据范围',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '全部', value: 0 },
        { label: '自定义', value: 1 },
        { label: '本级及子级', value: 2 },
        { label: '本级', value: 3 },
      ],
    },
  },
 
  {
    field: 'dsScope',
    label: '数据权限类型',
    component: 'Input',
  },
  {
    field: 'deleted',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
  },
  {
    label: '备注',
    field: 'roleDesc',
    component: 'InputTextArea',
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
