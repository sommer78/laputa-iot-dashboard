<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增文件 </a-button>
      </template>

      <template #action="{ record }">
        <TableAction
            :actions="[
             {
              icon: 'el:download',
              onClick: handleEdit.bind(null, record),
           },
           {
              icon: 'ant-design:link-outlined',
              onClick: downloadFileByUrl.bind(null, record),
           },
            {
              icon: 'ic:twotone-design-services',
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
    <FileDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref} from 'vue';
  import { useMessage } from "/@/hooks/web/useMessage";
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { fetchList, deleteFrom, handleDown} from '/@/api/file/file';
  import {
    downloadByUrl,
  } from '/@/utils/file/download';
  import { useDrawer } from '/@/components/Drawer';
  import FileDrawer from './FileDrawer.vue';

  import { columns, searchFormSchema } from './file.data';

  export default defineComponent({
    name: 'FileManagement',
    components: { BasicTable, FileDrawer, TableAction },
    setup() {
      const { notification } = useMessage();
      const box = ref('');
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll }] = useTable({
        title: '文件列表',
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
          fixed: undefined,
        },
      });



     function downloadFileByUrl(row: Recordable) {
       
         downloadByUrl({
          url: row.url,
          target: row.fileName,
        });
      }


       function handleCreate() {
       
          openDrawer(true, {
            isUpdate: false,
          });

      }

      function handleEdit(row) {
        // const form = getForm().getFieldsValue();
        handleDown(row);
     
      }


      async function handleDelete(record: Recordable)  {

        const result = await deleteFrom(record.id);
         if(result){
           handleSuccess();
            notification.success({
            message: '成功了',
            description: '删除日志成功',
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
        downloadFileByUrl,
      };
    },
  });
</script>
