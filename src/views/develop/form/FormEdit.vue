<template>

    <CreateForm />

</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { Tabs } from 'ant-design-vue';
  import CreateForm from '/@/components/FormDesigner/index.vue'

  // import { UserInfoModel } from '/@/api/sys/model/userModel';
  export default defineComponent({
    name: 'FormEdit',
    components: { PageWrapper, ATabs: Tabs, ATabPane: Tabs.TabPane,CreateForm },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      // const userData = ref<UserInfoModel>(any);
      const formId = ref(route.params?.id);
 

      // TODO
  
     

       function uploadSuccess({ source, data }) {
    
        console.log(data);
      
   
      }
      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/develop/form');
      }

    
      return { 
        formId, 
       goBack,
      uploadSuccess,
      // userData, 
      };
    },
   
  });
</script>

<style></style>
