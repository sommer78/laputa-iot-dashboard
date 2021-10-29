<template>
 <div>
   <AntdDesignForm/>
 </div>

</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import AntdDesignForm from '/@/components/FormGenerator/AntdDesignForm.vue';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';


  export default defineComponent({
    name: 'FormGenerator',
    components: { PageWrapper, AntdDesignForm, },
    setup() {
     
      return { 
  
      };
    },
   
  });
</script>

<style></style>
