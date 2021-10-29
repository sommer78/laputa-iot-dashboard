<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        <Authority :value="$options.name + ':' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        </Authority>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
         
              tooltip: '修改',
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
     
              tooltip: '删除',
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

    <AppModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { fetchList } from '/@/api/upms/privilegevalue';
  import { PerEnum } from '/@/enums/perEnum';
  import { columns } from './privilegeValue.data';
  import AppModal from './privilegeValueModal.vue';

  import { useModal } from '/@/components/Modal';
  import { deleteById } from '/@/api/upms/privilegevalue';
  import { Authority } from '/@/components/Authority';

  export default defineComponent({
    name: 'AppPrivilegeValue',
    components: { BasicTable, TableAction, AppModal, Authority },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '列表',
        api: fetchList,
        columns,
        canColDrag: true,
        useSearchForm: false,
        pagination: false,
        bordered: true,
        showIndexColumn: true,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: false,
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        debugger;
        deleteById([record.id]).then((res) => {
          console.log(res);
          reload();
        });
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      return {
        PerEnum,
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
