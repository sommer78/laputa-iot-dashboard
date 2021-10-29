<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">

    <DictionaryTable ref="dictionaryRef" @handleSelect="handleDictSelect" class="w-1/2 xl:w-1/2" />
    <DictionaryItemTable ref="dictionaryItemRef" class="w-1/2 xl:w-1/2" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';


  import { PageWrapper } from '/@/components/Page';

  import DictionaryTable from './DictionaryTable.vue';
  import DictionaryItemTable from './DictionaryItemTable.vue';


  export default defineComponent({
    components: {  PageWrapper,  DictionaryTable, DictionaryItemTable },
    setup() {
     
      const dictionaryRef = ref();
      const dictionaryItemRef = ref();
    

      function handleDictTypeSelect(dictTypeId = '') {
        if(dictTypeId){
          dictionaryRef.value.filterByDictType(dictTypeId);
          dictionaryItemRef.value.cleanTableData();
        }else{
          dictionaryRef.value.cleanTableData();
        }
      }
      function handleDictSelect(dictId) {
        if(dictId){
          dictionaryItemRef.value.filterByDict(dictId);
        }
      }

      onMounted( () => {
         dictionaryRef.value.filterByDictType();
         dictionaryItemRef.value.cleanTableData();
     
      })
      return {
        dictionaryRef,
        dictionaryItemRef,
        handleDictSelect,
        handleDictTypeSelect,
      };
    },
  });
</script>

function onmounted() {
  throw new Error('Function not implemented.');
}
