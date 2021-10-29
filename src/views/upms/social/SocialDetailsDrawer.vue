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
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
>
    <BasicForm @register="registerForm" />
</BasicDrawer>
</template>
<script lang="ts">
    import { defineComponent, ref, computed, unref } from 'vue';
    import { BasicForm, useForm } from '/@/components/Form/index';
    import { formSchema } from './socialdetails.data';
    import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

    import {  putFrom, addFrom } from '/@/api/upms/socialdetails';

    export default defineComponent({
    name: 'SocialDetailsDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],

    setup(_, { emit }) {
    const isUpdate = ref(true);

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
});

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {

    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;


    setFieldsValue({
    ...data.record
});


});

    const getTitle = computed(() => (!unref(isUpdate) ? '新增路由配置表' : '编辑路由配置表'));

    async function handleSubmit() {
    try {

    const values = await validate();

    setDrawerProps({ confirmLoading: true });

    if(isUpdate.value){
        const result = await putFrom(values);

    }else{
        const result = await addFrom(values);

    }

    closeDrawer();
    emit('success');
} finally {
    setDrawerProps({ confirmLoading: false });
}
}

    return { registerDrawer, registerForm, getTitle, handleSubmit };
},
});
</script>
