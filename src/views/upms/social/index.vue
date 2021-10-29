<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增路由配置表 </a-button>
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
    <SocialDetailsDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, unref, ref} from 'vue';
  import { useMessage } from "/@/hooks/web/useMessage";
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { fetchList, deleteFrom} from '/@/api/upms/socialdetails';

  import { useDrawer } from '/@/components/Drawer';
  import SocialDetailsDrawer from './SocialDetailsDrawer.vue';

  import { columns, searchFormSchema } from './socialdetails.data';

  export default defineComponent({
    name: 'SocialDetailsManagement',
    components: { BasicTable, SocialDetailsDrawer, TableAction },
    setup() {
      const { notification } = useMessage();
      const box = ref('');
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll, getForm }] = useTable({
        title: '路由配置表列表',
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

      function onSelect(e){

        const ds = unref(e);
        console.log(ds);
      };
      async function handleDelete(record: Recordable)  {
        const result = await deleteFrom(record.id);
        if(result){
          handleSuccess();
          notification.success({
            message: '成功了',
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
