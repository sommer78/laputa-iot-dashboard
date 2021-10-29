<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :replaceFields="{ title: 'name', key: 'id' }"
          checkable
          :checkedKeys="checkedKeys"
          toolbar
          title="菜单授权"
        />
      </template>
     
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicForm, useForm } from "/@/components/Form/index";
import { formSchema } from "./rent.data";
import { BasicDrawer, useDrawerInner } from "/@/components/Drawer";
import { BasicTree, TreeItem } from "/@/components/Tree";
import { getAllMenuTree } from "/@/api/upms/menu";
import { fetchRoleTree, updateRole, addRole } from "/@/api/upms/role";
import { Button } from "/@/components/Button";
import { toRaw } from 'vue'
// import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent({
  name: "RoleDrawer",
  components: { BasicDrawer, BasicForm, BasicTree, Button},
  emits: ["success", "register"],
  setup(_, { emit }) {
   
    const isUpdate = ref(true);
    const treeData = ref<TreeItem[]>([]);
    const checkedKeys = ref<number[]>([]);
    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 90,
      schemas: formSchema,
      showActionButtonGroup: false,
    });
    // const { t } = useI18n();
    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
      async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        await fetchRoleMenuTree(data.record ? data.record.id : 0);
        // treeData.value = (await getMenuParents()) as any as TreeItem[];
      }
    );

    const getTitle = computed(() => (!unref(isUpdate) ? "新增角色" : "编辑角色"));

    async function handleSubmit() {
      try {
        const datas = await validate();
        setDrawerProps({ confirmLoading: true });
        // TODO custom api
        
       
        const menus = datas.menus;
        var list = toRaw(menus)
        console.log(list.toString());
        datas.menuIds = list.toString();
        console.log(datas);
         if(isUpdate.value){
            const result = await updateRole(datas);
           console.log(result);
          }else{
            const result = await addRole(datas);
           console.log(result); 
          }
        closeDrawer();
        emit("success");
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }
    async function fetchRoleMenuTree(roleId?) {
      await fetchRoleTree(roleId)
        .then((roles) => {
          // console.log(roles);
          checkedKeys.value = roles;
          return getAllMenuTree();
        })
        .then((menuTree) => {
          treeData.value = menuTree;
          // 解析出所有的太监节点
          // console.log(resp);
          // console.log(checkedKeys);
          // treeData.value =  resolveAllEunuchNodeId(resp, checkedKeys, []);
        });
    }
   
    return {
      checkedKeys,
      fetchRoleMenuTree,
      registerDrawer,
      registerForm,
      getTitle,
      handleSubmit,
      treeData,

    };
  },
});
</script>
