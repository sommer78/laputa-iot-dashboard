<template>
  <!-- <FocusLoop :disabled="!show"> -->
     
    <div
      ref="vscPopup"
      class="vsc-popup"
      :dir="dir"
    >
      <transition name="scale">
        <div
          v-show="show"
          id="vsc-popup-box"
          class="vsc-popup-box"
        >
          <div
            v-show="$slots.header"
            class="vsc-popup-header"
          >
            <slot name="header" />
          </div>
          <div class="vsc-popup-body">
            <slot name="body">
              <ListMessage
                :url-asset="urlAssets"
                :attendants="getAttendants"
                 @openChat="myOpenChat"
              />
            </slot>
          </div>
          <div
            v-show="$slots.footer"
            class="vsc-popup-footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </transition>
      <button
        ref="vscButton"
        class="vsc-popup-button vsc-popup-button--default"
 
        aria-haspopup="true"
        aria-controls="vsc-popup-box"
        :aria-expanded="show ? 'true' : 'false'"
        :aria-label="ariaLabelButton"
        :title="ariaLabelButton"
        @click="togglePopup"
      >
       <div v-if="newMessagesCount > 0 && !show" class="vsc-new-messsages-count">
        {{ newMessagesCount }}
      </div>
        <span v-show="!show || !icon">
          <slot
            name="button"
            :open="show"
          >
            <img
              align="middle"
              :src="`/src/assets/icons/chat.svg`"
              alt="chat icon"
              aria-hidden="true"
            >
          </slot>
        </span>
        <img
          v-show="show && icon"
          :src="`/src/assets/icons/close.svg`"
          alt="close icon"
          aria-hidden="true"
        >
      </button>
    </div>
  <!-- </FocusLoop> -->
</template>

<script>
import { defineComponent, onBeforeUnmount, ref, watch } from 'vue'
import ListMessage from './ListMessage.vue'
// import { FocusLoop } from '@vue-a11y/focus-loop'

const HREF_BY_APP = {
  whatsapp: 'https://api.whatsapp.com/send?phone=%ph%&text=',
  messenger: 'https://m.me/%ph%',
  telegram: 'https://telegram.me/%ph%',
  viber: 'viber://chat?number=%ph%',
  wechat: 'weixin://dl/chat?%ph%',
  line: 'https://line.me/R/oaMessage/%ph%/',
  twitter: 'https://twitter.com/messages/compose?recipient_id=%ph%'
}

export default defineComponent({
  name: 'MessagePopup',

  components: {
    ListMessage,
    // FocusLoop
  },

  props: {
    icon: {
      type: Boolean,
      default: false
    },

    attendants: {
      type: Array,
      default: () => ([])
    },

    dir: {
      type: String,
      default: 'ltr'
    },
    
    newMessagesCount: {
      type: Number,
      default: () => 0
    },
  },

  computed: {
    ariaLabelButton () {
      return `${this.show ? 'Close' : 'Open'} social chat popup`
    },

    getAttendants () {
      return this.attendants.map((attendant) => {
        // const href = attendant.icon ? HREF_BY_APP[attendant.icon].replace('%ph%', (attendant.number || attendant.id || attendant.username)) : attendant.href
        return { ...attendant, href: attendant.href }
      })
    }
  },

  setup(_, { emit }) {
    const show = ref(false)
    const urlAssets = ref("")
    const vscPopup = ref(null)
    const vscButton = ref(null)

    onBeforeUnmount (() => {
      removeEventListeners()
    })

    watch(show, (val) => {
      if (!val) return removeEventListeners()
      document.addEventListener('click', closeClickOutside)
      document.addEventListener('keydown', closeKeydownEsc)
    })

    function togglePopup () {
      show.value = !show.value
      setTimeout(() => vscButton.value.blur(), 500)
      if (!show) return emit('close')
      emit('open')
    }

    function closeClickOutside ({ target }) {
      if (!vscPopup.value.contains(target)) togglePopup()
    }

    function closeKeydownEsc ({ which }) {
      if (which === 27) togglePopup()
    }

    function removeEventListeners () {
      document.removeEventListener('click', closeClickOutside)
      document.removeEventListener('keydown', closeKeydownEsc)
    }

     function myOpenChat(content){
       show.value = !show.value
      // console.log(content);
      emit('myOpenChat',content);
    }

    return {
      show,
      vscPopup,
      vscButton,
      togglePopup,
      urlAssets,
      myOpenChat,
    }
  }
})
</script>

<style >
:root {
  --vsc-bg-header: #333;
  --vsc-bg-footer: #fafafa;
  --vsc-text-color-header: #fff;
  --vsc-text-color-footer: inherit;
  --vsc-bg-button: #333;
  --vsc-text-color-button: #fff;
  --vsc-outline-color: #333;
  --vsc-border-color-bottom-header: transparent;
  --vsc-border-color-top-footer: #f3f3f3;
}

.vsc-popup * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.vsc-popup {
  position: fixed;
  z-index: 999;
  right: 40px;
  bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 380px;
  margin-left: 20px;
  -webkit-font-smoothing: antialiased;
}

.vsc-popup[dir="ltr"] {
  text-align: left;
}

.vsc-popup[dir="rtl"] {
  left: 20px;
  right: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.vsc-popup[dir="rtl"] .vsc-popup-box {
  transform-origin: bottom left;
}

.vsc-popup[dir="rtl"] .vsc-popup-body .vsc-popup-body__link-info {
  padding-left: 0;
  padding-right: 10px;
}

.vsc-popup-box {
  transition: transform 0.3s ease-in-out, opacity 0.2s, visibility 0.2s;
  transform-origin: bottom right;
  transform: scale3d(1, 1, 1);
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 5px 25px -5px rgba(45,62,79,0.15);
  background-color: #fbfbfb;
  border: var(--vsc-border-default);
  overflow: hidden;
}

.vsc-popup .scale-leave-active {
  transform: scale3d(0, 0, 0);
}

.vsc-popup-header {
  padding: 22px 18px;
  border-bottom: 5px solid var(--vsc-border-color-bottom-header);
  background-color: var(--vsc-bg-header);
  color: var(--vsc-text-color-header);
}

.vsc-popup-body {
  padding: 14px;
  background-color: #fff;
  max-height: 300px;
  overflow: auto;
}

.vsc-popup-body__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.vsc-popup-body__list-item {
  width: 100%;
}

.vsc-popup-body__list-item:not(:last-child) {
  border-bottom: 1px solid #fbfbfb;
}

.vsc-popup-body__link {
  outline: none;
  display: flex;
  padding: 10px 18px;
  text-decoration: none;
  color: #333;
  letter-spacing: 0.2px;
  margin: 1.5px 0;
  border-radius: 10px;
}

.vsc-popup-body__link:hover,
.vsc-popup-body__link:focus {
  background-color: #fbfbfb;
}

.vsc-popup-body__link:focus {
  box-shadow: 0 0 0 3px var(--vsc-outline-color);
}

.vsc-popup-body__link-avatar {
  position: relative;
  width: 62px;
  height: 62px;
}

.vsc-popup-body__link-avatar > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.vsc-popup-body__link-avatar-brand {
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 25px;
  height: 25px;
  background-repeat: no-repeat;
  background-size: contain;
}

.vsc-popup-body__link-info {
  padding-top: 12px;
  padding-left: 12px;
}

.vsc-popup-body__link-info > span {
  display: block;
  line-height: 1rem;
}

.vsc-popup-body__link-info__label {
  font-size: 12px;
}

.vsc-popup-body__link-info__name {
  font-weight: bold;
  margin-top: 2px;
  font-size: 18px;
}

.vsc-popup-footer {
  padding: 16px;
  border-top: 1px solid var(--vsc-border-color-top-footer);
  background-color: var(--vsc-bg-footer);
  color: var(--vsc-text-color-footer);
}

.vsc-popup-button {
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  color: var(--vsc-text-color-button);
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: inline-block;
  padding-top: 2px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
  font-family: inherit;
  transition: background-color 0.3s, box-shadow 0.2s;
  
}

.vsc-popup-button > img {
  margin: auto; 
}

.vsc-popup-button > span > img {
  margin: auto; 
}

.vsc-popup-button--default {
  background-color: var(--vsc-bg-button);
}

.vsc-popup-button--no-icon {
  border-radius: 30px;
  height: auto;
  width: auto;
  padding: 14px 20px;
}

.vsc-popup-button:focus,
.vsc-popup-button:hover {
  box-shadow: 0 0 0 3px #fff, 0 0 0 6px var(--vsc-outline-color);
}
@media (prefers-reduced-motion: reduce) {
  .vsc-popup * {
    transition: none;
  }
}

.vsc-new-messsages-count {
  position: absolute;
  top: -3px;
  left: 41px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  background: #ff4646;
  color: white;
  text-align: center;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
}

</style>
