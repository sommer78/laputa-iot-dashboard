<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <OrgTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
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
          :dropDownActions="[
            {
              label: '分配角色',
              title: '分配角色',
              icon: 'ant-design:usergroup-add',
              onClick: handleSettingRoles.bind(null, record),
            },
            {
              title: '设置领导',
              label: '设置领导',
              icon: 'ant-design:setting-outlined',
              onClick: handleSettingLeader.bind(null, record),
            },
          ]"
        />
      </template>
      <template #nameRender="{ record }">
        <Badge>
          <template #count>
            <WomanOutlined v-if="record.sex===0" style="color: #f5222d; font-size: 12px;" />
            <ManOutlined v-else style="color: #1890ff; font-size: 12px;" />
          </template>
          <Avatar :src="record.avatar" @click="previewImageHandle(record.avatar)">
            <template #icon>
              <UserOutlined />
            </template>
          </Avatar>
        </Badge>
        {{record.name}}
      </template>

      <template #rolesRender="{ record }">
        <div class="staff-roles">
          <Spin :spinning="deleteRoleLoading&&deleteRoleLoading[record.id]?deleteRoleLoading[record.id]:false">
            <Space>
              <Tag class="role-item" v-for="role in record.roles" v-bind:key="role">
                {{role.name}}
                <Popconfirm
                  title="确定要删除吗?"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="confirmDeleteRole(record.id, role.id)"
                  @cancel="cancelDeleteRole"
                >
                  <DeleteOutlined color="error" style="color: #d9595b"/>
                </Popconfirm>
              </Tag>
            </Space>
          </Spin>
        </div>
      </template>
    </BasicTable>
    <Image
      :width="0"
      :height="0"
      :src="previewImage"
      :preview="{visible: previewImageVisible, onVisibleChange: previewImageVisibleChange}"
    />
    <StaffModal @register="registerModal" @success="handleSuccess" />
    <RoleSelector @register="registerRoleModal" @success="handleSettingRoleSuccess" />
    <StaffSelector @register="registerStaffModal" @success="handleSettingLeaderSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getStaffPageList,
    allocationRoles,
    deleteByIds,
    deleteStaffRole,
    setLeaderCode
  } from '/@/api/org/staff';
  import { PageWrapper } from '/@/components/Page';
  import OrgTree from '/@/views/components/leftTree/OrgTree.vue';
  import { ManOutlined, WomanOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons-vue';

  import { useModal } from '/@/components/Modal';
  import StaffModal from './StaffModal.vue';
  import RoleSelector from '/@/views/components/selector/roleSelector/index.vue';
  import StaffSelector from '/@/views/components/selector/staffSelector/index.vue';
  import {Tag, Popconfirm, Avatar, Badge, Spin, Space, Image} from "ant-design-vue";

  import { columns, searchFormSchema } from './staff.data';

  export default defineComponent({
    name: 'StaffManagement',
    components: { BasicTable, Spin, Space, PageWrapper, OrgTree, StaffModal,
      RoleSelector, StaffSelector, TableAction, Avatar, Badge, Popconfirm, Tag, Image,
      DeleteOutlined, ManOutlined, WomanOutlined, UserOutlined
    },
    setup() {
      const [registerModal, { openModal, setModalProps }] = useModal();
      const [registerRoleModal, { openModal: openRoleSelector, setModalProps: setRoleModalProps }] = useModal();
      const [registerStaffModal, { openModal: openStaffSelector, setModalProps: setStaffModalProps }] = useModal();
      const currentStaff = ref<Recordable>({});
      const deleteRoleLoading = ref<object>({});
      const previewImage = ref<string>("");
      const previewImageVisible = ref<boolean>(false);
      const currentNode = ref<Recordable>({});

      const [registerTable, { reload }] = useTable({
        title: '列表',
        api: getStaffPageList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          showAdvancedButton: false,
          showResetButton: false,
          autoSubmitOnEnter: true,
        },
        searchInfo: {
          showRoles: true,
        },
        size: 'small',
        useSearchForm: true,
        showIndexColumn: false,
        bordered: true,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        beforeFetch:(params)=>{
          let searchInfo = {};
          if(currentNode.value?.sourceType === '1'){
            searchInfo = {companyId: unref(currentNode).id};
          }else if(currentNode.value?.sourceType === '2'){
            searchInfo = {deptId: unref(currentNode).id};
          }
          return {...params, ...searchInfo}
        },
      });

      function handleCreate() {
        let record = {};
        if(unref(currentNode)){
          if(unref(currentNode).sourceType === '1'){
            record = {companyId: unref(currentNode).id};
          }else if(unref(currentNode).sourceType === '2'){
            record = {companyId: unref(currentNode).companyId, deptId: unref(currentNode).id}
          }
        }
        openModal(true, {
          isUpdate: false,
          record
        });
        setModalProps({title: `新增人员`, bodyStyle:{padding:'0px', margin:'0px'},
          width: 800, height: 400,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
        setModalProps({title: `修改人员`, bodyStyle:{padding:'0px', margin:'0px'},
          width: 800, height: 420,
        });
      }
      function handleSettingRoles(record: Recordable) {
        currentStaff.value = record;
        openRoleSelector(true, {
          staffId: currentStaff.value.id
        });
        setRoleModalProps({title: `给【${record.name}(${record.code})】添加角色`, bodyStyle:{padding:'0px', margin:'0px'},
          width: 850, height: 450,
          showOkBtn: true, showCancelBtn: false
        });
      }

      function handleSettingLeader(record: Recordable) {
        currentStaff.value = record;
        let selectedList = [];
        if(record.leaderCode && record.leaderName){
          selectedList.push({id: record.id, code: record.leaderCode, name: record.leaderName});
        }
        openStaffSelector(true, {
          selectorProps:{
            multiSelect: false,
            selectedList
          }
        });
        setStaffModalProps({title: `给【${record.name}(${record.code})】设置领导`, bodyStyle:{padding:'0px', margin:'0px'},
          width: 850, height: 450,
          showOkBtn: true, showCancelBtn: false
        });
      }

      async function handleSettingRoleSuccess(selectedRoles: any) {
        const roles = selectedRoles.map(item=>{
          return {id: item.id};
        });
        await allocationRoles({staffId: unref(currentStaff).id, roles: roles});
        reloadTable();
      }

      async function handleSettingLeaderSuccess(selectedStaffs: any) {
        if(selectedStaffs&& selectedStaffs.length>0){
          setLeaderCode({leaderCode: selectedStaffs[0].code, id: unref(currentStaff).id}).then(()=>{
            reloadTable();
          }).finally(()=>{

          })
        }
      }

      function handleDelete(record: Recordable) {
        deleteByIds([record.id]).then((res) => {
          console.log(res);
          reload();
        });
      }

      function doSearch() {
        reload();
      }

      function handleSuccess() {
        reload();
      }
      function cancelDeleteRole() {
        // reload();
      }
      function previewImageHandle(headImg) {
        if(headImg){
          previewImage.value = headImg;
          previewImageVisible.value = true;
        }
      }
      function previewImageVisibleChange(visible, prevVisible) {
        previewImageVisible.value = visible;
      }

      function confirmDeleteRole(staffId:string, roleId:string) {
        deleteRoleLoading.value[staffId] = true;
        deleteStaffRole({staffId, roleId}).then(()=>{
          reloadTable();
        }).finally(()=>{
          deleteRoleLoading.value[staffId] = false;
        });
      }

      function reloadTable(){
        let searchInfo = {};
        if(currentNode.value?.sourceType === '1'){
          searchInfo = {companyId: unref(currentNode).id};
        }else if(currentNode.value?.sourceType === '2'){
          searchInfo = {deptId: unref(currentNode).id};
        }
        reload({ searchInfo });
      }

      function handleSelect(node:any) {
        currentNode.value = node;
        reloadTable();
      }

      return {
        registerTable,
        registerRoleModal,
        registerStaffModal,
        registerModal,
        deleteRoleLoading,
        previewImage,
        previewImageVisible,
        previewImageHandle,
        previewImageVisibleChange,
        handleCreate,
        handleEdit,
        confirmDeleteRole,
        cancelDeleteRole,
        handleSettingRoles,
        handleSettingLeader,
        handleDelete,
        handleSuccess,
        handleSettingRoleSuccess,
        handleSettingLeaderSuccess,
        handleSelect,
        doSearch,
      };
    },
  });
</script>

<style lang="less">
  .staff-roles{
    .ant-space-align-center{
      flex-flow: wrap;
      
      .role-item{
        margin: 2px 0;
      }
    }
  }
</style>
