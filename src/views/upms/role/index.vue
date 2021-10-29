<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              tooltip: '设置权限值',
              icon: 'carbon:two-factor-authentication',
              onClick: handleRoleAuth.bind(null, record),
            },
            {
              tooltip: '设置角色菜单',
              icon: 'ant-design:setting-outlined',
              onClick: handleRoleMenu.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    <RoleMenuDrawer @register="registerRoleMenuDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { getRoleListByPage, deleteRole } from '/@/api/upms/role';
import { useDrawer } from '/@/components/Drawer';
import RoleDrawer from './RoleDrawer.vue';
import RoleMenuDrawer from './RoleMenuDrawer.vue';
import { columns, searchFormSchema } from './role.data';
import { useGo } from '/@/hooks/web/usePage';
import { useMessage } from '/@/hooks/web/useMessage';

export default defineComponent({
  name: 'RoleManagement',
  components: { BasicTable, RoleDrawer, RoleMenuDrawer, TableAction },
  setup() {
    const go = useGo();
    const { notification } = useMessage();
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerRoleMenuDrawer, { openDrawer: openRoleMenuDrawer }] = useDrawer();
    const [registerTable, { reload }] = useTable({
      title: '角色列表',
      api: getRoleListByPage,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      actionColumn: {
        width: 160,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: undefined,
      },
    });

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: Recordable) {
      openDrawer(true, {
        record,
        isUpdate: true,
      });
    }

    function handleDelete(record: Recordable) {
      // console.log(record);
      deleteRole(record.id).then((result) => {
      if(result){
          handleSuccess();
          notification.success({
            message: '成功了',
            description: record.name+'删除成功',
            duration: 3,
          });
        }else{
          notification.error({
            message: '失败了',
            description: record.name+'删除失败',
            duration: 3,
          }); 
        }
      });
    }

    function handleRoleAuth(record: Recordable, e) {
      e.stopPropagation();
      go('/upms/role_auth/' + record.id);
    }

    function handleRoleMenu(record: Recordable, e) {
      e.stopPropagation();
      // console.log(record);

      openRoleMenuDrawer(true, {
        record,
      });
    }

    function handleSuccess() {
      reload();
    }

    return {
      registerTable,
      registerDrawer,
      registerRoleMenuDrawer,
      handleCreate,
      handleEdit,
      handleRoleAuth,
      handleRoleMenu,
      handleDelete,
      handleSuccess,
    };
  },
});
</script>
