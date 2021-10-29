<template>
  <ul class="vsc-popup-body__list">
    <li
      v-for="(attendant, index) in attendants"
      :key="`vsc-item-${index}`"
      class="vsc-popup-body__list-item"
    >
      <a
        @click="openChat(attendant.href)"
        rel="noopener"
        target="_blank"
        class="vsc-popup-body__link"
        :aria-label="`Contact ${attendant.name}, opens in a new window`"
      >
        <div class="vsc-popup-body__link-avatar">
          
          <img
            :src="attendant.avatar.src"
            :alt="attendant.avatar.alt"
          >
          <span
            class="vsc-popup-body__link-avatar-brand"
            :style="attendant.type ? `background-image: url(/src/assets/images/${attendant.type}.png)` : ''"
          />
        </div>
        <div class="vsc-popup-body__link-info">
          <span
            class="vsc-popup-body__link-info__label"
            v-text="attendant.label"
          />
          <span
            class="vsc-popup-body__link-info__name"
            v-text="attendant.name"
          />
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'
//  :href="attendant.href"
export default defineComponent({
  name: 'ListMessage',
  props: {
    urlAsset: String,
    attendants: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props) {
   function openChat(content){
    //  console.log(content);
      this.$emit('openChat',content);
   }
   return {
     openChat,
   }
  }
})
</script>
