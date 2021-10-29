<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">

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
    <LogDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref} from 'vue';
  import { useMessage } from "/@/hooks/web/useMessage";
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { fetchList, deleteFrom} from '/@/api/log/log';

  import { useDrawer } from '/@/components/Drawer';
  import LogDrawer from './LogDrawer.vue';

  import { columns, searchFormSchema } from './log.data';

  export default defineComponent({
    name: 'LogManagement',
    components: { BasicTable, LogDrawer, TableAction },
    setup() {
      const { notification } = useMessage();
      const box = ref('');
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll }] = useTable({
        title: '日志表列表',
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

        const result = await deleteFrom(record.id);
        if(result){
          handleSuccess();
          notification.success({
            message: '成功',
            description: '删除成功',
            duration: 3,
          });
        }
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
      };
    },
  });
</script>
