<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">

   
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'bx:bx-code-block',
              color: 'success',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ic:twotone-design-services',
              color: 'error',
              onClick: handleDelete.bind(null, record),
             
            },
          ]"
        />
      </template>
      <template #form-advanceBefore>
        <a-button type="primary" @click="handleCode"> 批量 </a-button>
       
      </template>
     
    </BasicTable>
    <GenDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, unref, ref} from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { fetchList} from '/@/api/dev/gen';

  import { useDrawer } from '/@/components/Drawer';
  import GenDrawer from './GenDrawer.vue';

  import { columns, searchFormSchema } from './gen.data';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, GenDrawer, TableAction },
    setup() {
      const box = ref('');
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll,getSelectRows,getForm }] = useTable({
        title: '代码生成列表',
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
   
    
    
      function handleEdit(row: Recordable) {
        const form = getForm().getFieldsValue();
        //  console.log(form);
        row.dsName = form['dsName'];
        openDrawer(true, {
          isBetch: false,
          record: row,
        });
        // console.log(row);
        // handleDown(row).then(() => {
 
        // })
      }

      function onSelect(e){

        const ds = unref(e);
        console.log(ds);
      };
      async function handleDelete(record: Recordable)  {
        
        // const result = await deleteDsconf(record.id);
        //  console.log(result);
      }
      async function handleCode()  {
        const rows =   getSelectRows();
        console.log(rows);
         const form = getForm().getFieldsValue();
        //  console.log(form);
        let row = rows[0];
      
        const  tables =   rows.map(item => item.tableName);
        // console.log(tables.join('-'));
        row.dsName = form['dsName'];
        row.tableName = tables.join('-');
        openDrawer(true, {
          isBetch: false,
          record: row,
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

        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,

        handleCode,
        box,
      };
    },
  });
</script>
