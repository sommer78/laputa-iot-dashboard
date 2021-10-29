<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" preIcon="akar-icons:arrow-back" @click="handleClose">
          返回
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: '设置权限值',
              icon: 'ic:outline-vpn-key',
              onClick: handlePvs.bind(null, record),
            },

            {
              tooltip: '删除',
              icon: 'ant-design:delete-outlined',
              color: 'error',
              onClick: (e) => e.stopPropagation(),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <PValueSettingModal @register="registerPValueModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { getAclByRoleId, deleteByIds } from '/@/api/upms/menu';
import { getRoleById } from '/@/api/upms/role';

// import { useMessage } from '/@/hooks/web/useMessage';
import { useRoute } from 'vue-router';
import { roleAuthColumns } from './role.data';
import { useTabs } from '/@/hooks/web/useTabs';
import { useModal } from '/@/components/Modal';
import PValueSettingModal from './PValueSettingModal.vue';

export default defineComponent({
  name: 'RoleAuth',
  components: { BasicTable, TableAction, PValueSettingModal },
  setup() {
    const route = useRoute();
    const roleId = route.params?.id;
    const treeData = ref<any[]>([]);
    const role = ref();
    const { setTitle, close } = useTabs();
    // const { createMessage } = useMessage();
    const [registerPValueModal, { openModal: openPvalueModal }] = useModal();
    const [registerTable, { reload, expandAll, setTableData }] = useTable({
      title: '角色权限',
      columns: roleAuthColumns,
      isTreeTable: true,
      defaultExpandAllRows: false,
      expandRowByClick: true,
      canColDrag: true,
      useSearchForm: false,
      pagination: false,
      bordered: true,
      showIndexColumn: false,
      actionColumn: {
        width: 80,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });

    async function fetch() {
      await getRoleById(roleId)
        .then((r) => {
          setTitle('角色:' + r.code);
          // menutrees = menuTree;
          role.value = r;

          return getAclByRoleId(roleId);
        })
        .then((menus) => {
          // console.log(roles);
          // checkedKeys.value = roles;
          // 解析出所有的太监节点
          // roles = resolveAllEunuchNodeId(unref(treeData), roles, []);
          // console.log(roles);
          treeData.value = menus;
          setTableData(menus);
          // createMessage.success('得到角色成功');
          return menus;
        });
    }
    //  createMessage.success(roleId);
    // console.log(roleId);
    function handleDelete(record: Recordable) {
      deleteByIds(record.id).then(() => {
        reload();
      });
    }

    const handlePvs = (record: Recordable, e) => {
      e.stopPropagation();
      // console.log(record);
      openPvalueModal(true, {
        record,
        role,
      });
    };
    const handleClose = () => {
      close();
    };

    async function handleSuccess() {
      await fetch();
      setTimeout(() => {
        expandAll();
      }, 1000);
    }

    onMounted(() => {
     fetch();
    });

    return {
      registerTable,
      handleDelete,
      handleSuccess,
      handlePvs,
      handleClose,
      registerPValueModal,
      treeData,
      role,
    };
  },
});
</script>
