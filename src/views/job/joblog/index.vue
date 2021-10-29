<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
    
 
    </BasicTable>
  
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, unref, ref} from 'vue';
  import { useMessage } from "/@/hooks/web/useMessage";
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { fetchList } from '/@/api/job/joblog';



  import { columns, searchFormSchema } from './joblog.data';

  import { useContextMenu } from '/@/hooks/web/useContextMenu';

  export default defineComponent({
    name: 'JobLogManagement',
    components: { BasicTable,  TableAction  },
    setup() {
      const { notification } = useMessage();
      const box = ref('');
      
      const [createContextMenu] = useContextMenu();
 
      const [registerTable, { reload, expandAll, getForm }] = useTable({
        title: '定时任务执行日志表列表',
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

    
    function onSelect(e) {
      console.log(e)
        }
    

    



      function contextmenu(record, index, e: MouseEvent){
        createContextMenu({
          event: e,
          items: [
            {
              label: '查看',
              icon: 'ant-design:fund-view-outlined',
              handler: () => {
              

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


        handleSuccess,
        onFetchSuccess,
        onSelect,
        box,
        contextmenu,

      };
    },
  });
</script>
