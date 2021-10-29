<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicTree
      :treeData="treeData"
      :replaceFields="{ title: 'name', key: 'id' }"
      checkable
      :checkedKeys="checkedKeys"
      toolbar
      title="菜单授权"
      ref="treeRef"
      @check="onSelect"
    />
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref,} from 'vue';

import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { BasicTree, TreeItem } from '/@/components/Tree';
import { getAllMenuTree } from '/@/api/upms/menu';
import { fetchMenuNoCatTree, setRoleAuth } from '/@/api/upms/role';
import { Button } from '/@/components/Button';
import { toRaw } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
// import { RoleParams } from '/@/api/demo/model/upmstemModel';
// import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent({
  name: 'RoleMenuDrawer',
  components: { BasicDrawer, BasicTree, Button },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    let roleData = new Object();
    const treeData = ref<TreeItem[]>([]);
    const checkedKeys = ref<number[]>([]);
    const { createMessage } = useMessage();
    let menuIds = '';

    // const { t } = useI18n();
    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      setDrawerProps({ confirmLoading: false });
      roleData = data.record;
      await fetchRoleMenuTree(data.record ? data.record.id : 0);

      // treeData.value = (await getMenuParents()) as any as TreeItem[];
    });

    const getTitle = '角色权限赋值';

    async function handleSubmit() {
      try {
        setDrawerProps({ confirmLoading: true });

        roleData['menuIds'] = menuIds;
        const result = await setRoleAuth(roleData);
        if (result) {
          createMessage.success('更新角色权限');
          closeDrawer();
          emit('success');
        }
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

    async function fetchRoleMenuTree(roleId?) {
      await getAllMenuTree()
        .then((menuTree) => {
          // menutrees = menuTree;
          treeData.value = menuTree;
          // 解析出所有的太监节点
          // console.log(resp);
          // console.log(checkedKeys);
          // treeData.value =  resolveAllEunuchNodeId(resp, checkedKeys, []);
          return fetchMenuNoCatTree(roleId);
        })
        .then((menus) => {
          // console.log(roles);
          // checkedKeys.value = roles;
          // 解析出所有的太监节点
          // roles = resolveAllEunuchNodeId(unref(treeData), roles, []);
          // console.log(roles);
          checkedKeys.value = menus;

          return menus;
        });
    }
    /**
     * 解析出所有的太监节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 太监节点id数组
     */
    function resolveAllEunuchNodeId(json, idArr, temp) {
      let count = 0;
      for (let i = 0; i < json.length; i++) {
        const item = json[i];
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          //有小孩 遍历小孩
          resolveAllEunuchNodeId(item.children, idArr, temp);
        } else {
          // console.log(idArr,item.id)
          if (idArr.indexOf(item.id) > 0) {
            temp.push(item.id);
          }

          // if(idArr.id!== item.id){
          //     temp.push(idArr.id);
          // }
        }
      }

      return temp;
    }

    function onSelect(selectedKeys, info) {
      // console.log('onSelect', selectedKeys);
      let keys = info.checkedNodes.map((item) => item.key);
      var list = toRaw(keys);
      // console.log(list.toString());
      menuIds = list.toString().concat(',').concat(info.halfCheckedKeys.join(','));
      // console.log(menuIds);
    }

    return {
      checkedKeys,
      fetchRoleMenuTree,
      registerDrawer,
      getTitle,
      handleSubmit,
      treeData,
      onSelect,
    };
  },
});
</script>
