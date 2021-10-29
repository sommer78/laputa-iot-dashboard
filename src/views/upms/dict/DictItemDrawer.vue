/*
 *    Copyright (c) 2018-2025, Laputa IOT All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the www.laputa-iot.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: SommerJiang (sommer_jiang@163.com)
 */

<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="titleName"
    width="80%"

  >
     <BasicTable @register="registerTable" :searchInfo="searchInfo">
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
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref,  reactive } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { itemColumns } from './dict.data';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

import { fetchItemList } from '/@/api/upms/dict';

export default defineComponent({
  name: 'DictItemDrawer',
  components: { BasicDrawer, BasicTable, TableAction },
  emits: ['success', 'register'],
  
  setup(_, { emit }) {
    const titleName = ref('');
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
        title: '字典表列表',
        api: fetchItemList,
        columns: itemColumns,
        formConfig: {
          labelWidth: 120,
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
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

    const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    
      setDrawerProps({ confirmLoading: false });
      console.log(data);
      searchInfo.dictId =  data.record.id;
      titleName.value = data.record.description;
      // searchInfo.value = {dictId: data.record.id}; 
      reload();
     
    });

  
    const handleEdit = ()=>{

    }
    const handleDelete = ()=>{

    }
    

    return { registerDrawer,  registerTable, searchInfo, handleEdit, handleDelete, titleName };
  },
});
</script>
