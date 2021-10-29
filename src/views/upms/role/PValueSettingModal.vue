<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent,  computed, } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { pValueFormSchema } from './role.data';
import { getAll, getRoleMenuPvs, updatePriVal } from '/@/api/upms/privilegevalue';
import { ACLModel } from '/@/api/upms/model/PrivilegeValueModel';

export default defineComponent({
  name: 'PValueSettingModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
  
    let role;
    let menu;
    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
      labelWidth: 100,
      schemas: pValueFormSchema,
      showActionButtonGroup: false,
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({
        confirmLoading: false,
        title: '设置角色'+ data?.role.code +' 菜单【' + data.record.name + '】的权限值',
      });

      setFieldsValue({
        ...data.record,
      });
     
     
      role = data?.role;
      menu = data?.record;
      // console.log(role.value);
      let options = (await getAll()) || [];
      // let checkedOptions = await getPValuesByModule()||[];
      // console.log(options);
      const params :ACLModel  = {
        menuId: menu.id,
        roleId: role.id,
      }
 
      let acl = (await getRoleMenuPvs(params)) || [];
      options.forEach((item: any) => {
        item['value'] = item.position;
        item['label'] = item.name;
        item['icon'] = item.icon;
      });
      if (acl && acl.pvs && acl.pvs.length > 0) {
        const value = acl.pvs.map((res: any) => res.position);
        setFieldsValue({
          pvs: value,
        });
      }

      updateSchema({
        field: 'pvs',
        componentProps: {
          options,
        },
      });
    });

    const getTitle = computed(() => ('设置权限值'));

    async function handleSubmit() {
      try {
        setModalProps({ confirmLoading: true });
        const values = await validate();
        if(values.pvs && values.pvs.length>0){
            values.pvs = values.pvs.map((item: any) => {
            return { position: item };
          });
        }
      

        values.menuSn = menu.tag;
        values.menuId = menu.id;
        values.roleSn = role.code;
        values.roleId = role.id;
        console.log(values);
        
        const result =  await updatePriVal(values);
        if(result){
          closeModal();
          emit('success');
        }
       
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, role, handleSubmit };
  },
});
</script>
