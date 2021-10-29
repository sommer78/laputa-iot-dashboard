<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
         <a-button type="primary" preIcon='fa-solid:expand-arrows-alt' @click="handleExpand"> 展开 </a-button>
         <a-button type="primary" preIcon='bx:bx-collapse' @click="handleCollapse"> 收缩 </a-button>
        <Authority value="Menu:add">
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        </Authority>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
             
              tooltip: '添加子菜单',
              icon: 'ant-design:plus-outlined',
              onClick: handleCreateChild.bind(null, record),
            },
           
            {
             
              tooltip: '修改',
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
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

    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />

  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAllMenu, deleteByIds } from '/@/api/upms/menu';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { columns, searchFormSchema } from './menu.data';
  import MenuDrawer from './MenuDrawer.vue';

  import { Authority } from '/@/components/Authority';

  const { createMessage } = useMessage();
  import { useDrawer } from '/@/components/Drawer';
  import { useUserStore } from '/@/store/modules/user';
  export default defineComponent({
    name: 'Menu',
    components: { BasicTable, TableAction, MenuDrawer,  Authority },
    setup() {
      const userStore = useUserStore();
      const userInfo = computed(() => userStore.getUserInfo);
      const [registerDrawer, { openDrawer, setDrawerProps }] = useDrawer();

      let newtitle = '';
      if( userInfo && userInfo.value.roles && userInfo.value.roles.length>0){
        newtitle +='['
          userInfo.value.roles.forEach(role=>{
            newtitle += role.code;
          })
           newtitle +=']'
      }
    
      const [registerTable, { reload, expandAll,collapseAll }] = useTable({
        title: '菜单列表',
        api: getAllMenu, 
        columns,
        isTreeTable: true,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          showAdvancedButton: false,
          showResetButton: false,
          autoSubmitOnEnter: true,
        },
        
        defaultExpandAllRows: false,
        expandRowByClick: true,
        canColDrag: true,
        useSearchForm: true,
        pagination: false,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 170,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
 

      function handleCreate() {
         setDrawerProps({ title: '新增菜单' + newtitle });
         openDrawer(true, {
          isUpdate: false,
        });
      }
      function handleCreateChild(record: Recordable, e) {
        e.stopPropagation();
        setDrawerProps({ title: '新增【' + record.name + '】的子菜单' });
        record = { parentId: record.id,
         type: 1,
         sort: record.sort*100 ,
         title: record.title,
         path: record.path,
         component: record.component,
         };
        openDrawer(true, {
          record,
          isUpdate: false,
          isSubmenu: true,
        });
      }

     

      function handleEdit(record: Recordable, e) {
        e.stopPropagation();
        setDrawerProps({title: '修改菜单'});
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
       function handleExpand() {
        expandAll();
      }
      function handleCollapse() {
        collapseAll();
      }
      
      

      function handleDelete(record: Recordable) {
        if(record.children&&record.children.length>0){
          createMessage.warning("有子节点，不能删除！")
          return;
        }
        deleteByIds(record.id).then(() => {
          reload();
        });
      }

      async function handleSuccess() {
        await reload();
        setTimeout(()=>{
          expandAll();
        }, 1000)
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleCreateChild,
        handleDelete,
        handleSuccess,
        handleExpand,
        handleCollapse,
      };
    },
  });
</script>
