<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增区域信息 </a-button>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',

              onClick: handleEdit.bind(null, record),
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
    <BaseAreaDrawer @register="registerDrawer" @success="handleSuccess" />
    <BaseAreaModal @register="registerModel" :minHeight="100"  useWrapper width="80%"/>
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref} from 'vue';
  import { useMessage } from "/@/hooks/web/useMessage";
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { fetchList, deleteById} from '/@/api/upms/basearea';

  import { useDrawer } from '/@/components/Drawer';
  import BaseAreaDrawer from './BaseAreaDrawer.vue';
  import { columns, searchFormSchema } from './basearea.data';
  import BaseAreaModal from './BaseAreaModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useContextMenu } from '/@/hooks/web/useContextMenu';

  export default defineComponent({
    name: 'BaseAreaManagement',
    components: { BasicTable, BaseAreaDrawer, TableAction, BaseAreaModal  },
    setup() {
      const { notification } = useMessage();
      const box = ref('');
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [createContextMenu] = useContextMenu();
      const [registerModel, { openModal }] = useModal();
      const [registerTable, { reload, expandAll, getForm }] = useTable({
        title: '区域信息列表',
        api: fetchList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          showAdvancedButton: true,
          actionColOptions: {
            span: 8,
          },

        },
        isTreeTable: true,
        pagination: { pageSize: 10 },
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        rowSelection: { type: 'checkbox',
          onSelect: onSelect},
        actionColumn: {
          width: 80,
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

      function handleEdit(row: Recordable) {
        const form = getForm().getFieldsValue();
        openDrawer(true, {
          isUpdate: true,
          record: row,
        });

      }


      async function handleDelete(record: Recordable)  {
        const result = await deleteById(record.id);
        if(result){
          handleSuccess();
          notification.success({
            message: '成功了',
            description: '删除成功',
            duration: 3,
          });
        }
      }



      function contextmenu(record, index, e: MouseEvent){
        createContextMenu({
          event: e,
          items: [
            {
              label: '查看',
              icon: 'ant-design:fund-view-outlined',
              handler: () => {
                openModal(true, {
                  data: record,
                  index: index,
                });

              },
            },

          ],
        });
      }


      function onSelect() {
        reload();
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }


      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
        onSelect,
        box,
        contextmenu,
        registerModel,
        openModal,
      };
    },
  });
</script>
