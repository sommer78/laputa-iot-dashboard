<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">发送选择的联系人</a-button>
        <a-button type="primary" @click="handleCreate">发送全部</a-button>
        <a-button type="primary" @click="handleCreate">新增</a-button>

        <a-button type="primary" class="filter-item" @click="handleDownload">导出</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '查看邮件',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此邮件',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MailModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { getMailPageList } from '/@/api/msg/mail';
import { PageWrapper } from '/@/components/Page';
import { useModal } from '/@/components/Modal';
import MailModal from './MailModal.vue';
import { mailColumns, searchFormSchema } from './mail.data';
import { useGo } from '/@/hooks/web/usePage';
import { Avatar } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'MainInbox',
  components: { BasicTable, PageWrapper, MailModal, TableAction, Avatar, UserOutlined },
  setup() {
    const go = useGo();
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload, updateTableDataRecord }] = useTable({
      title: '邮箱列表',
      api: getMailPageList,
      rowKey: 'id',
      columns: mailColumns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
      },
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      handleSearchInfoFn(info) {
        // console.log('handleSearchInfoFn', info);
        return info;
      },
      actionColumn: {
        width: 120,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: Recordable) {
      console.log(record);
      openModal(true, {
        record,
        isUpdate: true,
      });
    }

    function handleDelete(record: Recordable) {
      console.log(record);
    }

    function handleSuccess({ isUpdate, values }) {
      if (isUpdate) {
        // 演示不刷新表格直接更新内部数据。
        // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
        const result = updateTableDataRecord(values.id, values);
        console.log(result);
      } else {
        reload();
      }
    }

    function handleSelect(deptId = '') {
      searchInfo.deptId = deptId;
      reload();
    }

    const handleDownload = () => {};

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelect,
      searchInfo,
      handleDownload,
    };
  },
});
</script>
