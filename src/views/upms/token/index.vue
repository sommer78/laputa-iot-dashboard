<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess" @row-contextmenu=contextmenu>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增终端信息表 </a-button>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
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
    <ClientDrawer @register="registerDrawer" @success="handleSuccess" />
    <ClientModal @register="registerModel" :minHeight="100"  useWrapper width="80%"/>
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref} from 'vue';
  import { useMessage } from "/@/hooks/web/useMessage";
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { fetchList, deleteFrom} from '/@/api/upms/token';

  import { useDrawer } from '/@/components/Drawer';
  import ClientDrawer from './TokenDrawer.vue';
  import { columns, searchFormSchema } from './token.data';
  import ClientModal from './TokenModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useContextMenu } from '/@/hooks/web/useContextMenu';

  export default defineComponent({
    name: 'ClientManagement',
    components: { BasicTable, ClientDrawer, TableAction, ClientModal },
    setup() {
      const { notification } = useMessage();
      const box = ref('');
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [createContextMenu] = useContextMenu();
      const [registerModel, { openModal }] = useModal();
      const [registerTable, { reload, expandAll }] = useTable({
        title: '令牌列表',
        api: fetchList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          showAdvancedButton: true,
          actionColOptions: {
            span: 8,
          },
          // submitButtonOptions: {
          // text: '搜索',
          // },
          // submitFunc: customSubmitFunc,

        },
        isTreeTable: true,
        pagination: { pageSize: 10 },
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
    
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });
     
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(row: Recordable) {
        // const form = getForm().getFieldsValue();
        openDrawer(true, {
          isUpdate: true,
          record: row,
        });

      }


      async function handleDelete(record: Recordable)  {
        const result = await deleteFrom(record.access_token);
        if(result){
          
          notification.success({
            message: '成功了',
            description: '删除成功',
            duration: 3,
          });
        }
         handleSuccess();
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
        box,
        contextmenu,
        registerModel,
        openModal,
      };
    },
  });
</script>
