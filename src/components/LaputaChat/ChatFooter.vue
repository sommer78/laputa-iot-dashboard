<template>
  <div class="z-10 chat__footer isolate">
    <form>
      <input
        ref="inputEl"
        v-model="message"
        placeholder="Type a message"
      >

      <button
        v-if="canRecord"
        type="submit"
        class="send__btn"
        @click.prevent="send"
      >
        <Icon icon="grommet-icons:send"  color="#ffffff" class="w-5 h-5 text-white" />
  
      </button>
      <template v-else>
        <label
          for="capture"
          class="send__btn"
        >
  
          <Icon icon="emojione:studio-microphone" class="w-6 h-6 text-white" />
        </label>
        <input
          id="capture"
          class="hidden"
          type="file"
          accept="audio/*"
          capture
          @change="audioInputChange"
        >
      </template>
    </form>

    <div
      v-show="isRecording"
      ref="recordingEl"
      class="record"
    >
      <Icon
      icon="bi:x-circle"
        class="h-6 w-6 text-[#f20519]"
        @click="stopRecording"
      />
      <div>
        <div class="record__redcircle" />
        <div class="record__duration">
          {{ duration }}
        </div>
      </div>
      <Icon icon="ant-design:check-circle-filled"
        class="h-6 w-6 text-[#41bf49]"
        @click="finishRecording"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'

import { v4 as uuid } from 'uuid'
import recordAudio from '/@/utils/helper/recordAudio'
import { SysUser } from '/@/api/sys/model/userModel'
import Icon from '/@/components/Icon'

export default defineComponent({
  name: 'ChatFooter',
  components: {
   uuid,
   Icon,
  },
  props: {
    image: {
      type: Object,
      default: undefined,
    },
    user: {
      type: Object as PropType<SysUser | null | undefined>,
      required: true,
    },
    room: {
      type: Object,
      required: false,
    },
    roomId: {
      type: String,
      required: false,
    },
  },
  emits: ['send'],
  setup(props, { emit }) {
    const message = ref('')
    const duration = ref('')
    const isRecording = ref(false)
    const inputEl = ref()
    const recordingEl = ref()
    let record: any
    let timerInterval: number
    const canRecord = 'MediaRecorder' in window
    function send() {
      if (message.value.trim() || props.image) {
        emit('send', message.value)
        message.value = ''
      } else {
        startRecording()
      }
    }

    function audioInputChange(event: Event) {
      const target = event.target as HTMLInputElement
      const audioFile: File = (target.files as FileList)[0]

      if (audioFile) {
        sendAudio(audioFile, '')
      }
    }

    async function startRecording() {
      record = await recordAudio()
      inputEl.value.focus()
      inputEl.value.style.width = 'calc(100% - 56px)'
      isRecording.value = true
      // setAudioId("");
    }

    async function stopRecording() {
      inputEl.value.focus()
      clearInterval(timerInterval)
      const audio = record.stop()
      recordingEl.value.style.opacity = '0'
      isRecording.value = false
      inputEl.value.style.width = 'calc(100% - 112px)'
      duration.value = '00:00'
      return audio
    }

    async function finishRecording() {
      const audio = await stopRecording()
      const { audioFile, audioName } = await audio
      sendAudio(audioFile, audioName)
    }

    watch(isRecording, (newVal) => {
      if (newVal) {
        recordingEl.value.style.opacity = '1'
        startTimer()
        record.start()
      }

      function startTimer() {
        const start = Date.now()
        timerInterval = setInterval(setTime, 100)

        function setTime() {
          const timeElapsed = Date.now() - start
          const totalSeconds = Math.floor(timeElapsed / 1000)
          const minutes = pad(Math.floor(totalSeconds / 60))
          const seconds = pad(Math.floor(totalSeconds % 60))
          const _duration = `${minutes}:${seconds}`
          duration.value = _duration
        }
      }
    })

    function pad(value: number): string {
      return String(value).length < 2 ? `0${value}` : '' + value
    }

    async function sendAudio(audioFile: any, audioName: string) {
      if (!props.user) return
      // db.collection('users')
      //   .doc(props.user.id)
      //   .collection('chats')
      //   .doc(props.roomId)
      //   .set({
      //     name: props.room.name,
      //     photoURL: props.room.photoURL || null,
      //     timestamp: createTimestamp(),
      //   })
      // const doc = await db
      //   .collection('rooms')
      //   .doc(props.roomId)
      //   .collection('messages')
      //   .add({
      //     name: props.user.name,
      //     uid: props.user.id,
      //     timestamp: createTimestamp(),
      //     time: new Date().toUTCString(),
      //     audioUrl: 'uploading',
      //     audioName,
      //   })
      // await audioStorage.child(audioName).put(audioFile)
      // const url = await audioStorage.child(audioName).getDownloadURL()
      // db.collection('rooms')
      //   .doc(props.roomId)
      //   .collection('messages')
      //   .doc(doc.id)
      //   .update({
      //     audioUrl: url,
      //   })
    }

    return {
      duration,
      inputEl,
      recordingEl,
      finishRecording,
      stopRecording,
      isRecording,
      canRecord,
      send,
      audioInputChange,
      message,
    }
  },
})
</script>

<style scoped>
.chat__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 0 10px;
  height: 54px;
  width: 100%;
  bottom: 0;
}

.chat__footer > form {
  width: 100%;
  display: flex;
}

.send__btn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #06d755;
  box-shadow: 0px 0px 2px 0px #0000005e;
  border: none;
  transition: transform 150ms;
  transform: scale(1);
  cursor: pointer;
}

.send__btn:active {
  transform: scale(0.75);
}

.send__btn:focus {
  outline: none;
}

.send__btn svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.send__btn svg:nth-child(1) {
  opacity: 0;
  transform: translateX(-48%) translateY(-50%);
}

.chat__footer > svg {
  color: gray;
  box-sizing: content-box;
}

.chat__footer > form > input {
  height: 44px;
  border-radius: 31px;
  padding-left: 20px;
  border: none;
  font-size: 15px;
  margin-right: 10px;
  padding-right: 20px;
  box-shadow: 0px 0px 2px 0px #0000003b;
  font-family: Roboto, sans-serif;
  transition: all 300ms;
  /*112px 56px*/
  flex-grow: 1;
}

.chat__footer > form > input:focus {
  outline: none;
}

.send__animate-enter,
.send__animate2-enter {
  opacity: 0 !important;
  transform: scale(0.8) translateX(-58%) translateY(-58%) !important;
}

.send__animate-enter-active,
.send__animate2-enter-active {
  opacity: 1 !important;
  transform: scale(1) translateX(-50%) translateY(-50%) !important;
  transition: opacity 200ms, transform 200ms !important;
  transition-delay: 200ms !important;
}

.send__animate-enter-done,
.send__animate2-enter-done {
  opacity: 1 !important;
}

.send__animate-exit,
.send__animate2-exit {
  opacity: 1 !important;
  transform: scale(1) translateX(-50%) translateY(-50%) !important;
}

.send__animate-exit-active,
.send__animate2-exit-active {
  opacity: 0 !important;
  transform: scale(0.8) translateX(-58%) translateY(-58%) !important;
  transition: opacity 200ms, transform 200ms !important;
}

.send__animate-exit-done,
.send__animate2-exit-done {
  opacity: 0 !important;
}

.send__animate2-enter {
  transform: scale(0.8) translateX(-58%) translateY(-58%) !important;
}

.send__animate2-enter-active {
  transform: scale(1) translateX(-47%) translateY(-50%) !important;
}

.send__animate2-exit {
  transform: scale(1) translateX(-47%) translateY(-50%) !important;
}

.send__animate2-exit-active {
  transform: scale(0.8) translateX(-57%) translateY(-58%) !important;
}

.record {
  opacity: 0;
  transition: opacity 300ms;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  right: 86px;
  width: 135px;
}

.record > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 53px;
}

.record__redcircle {
  opacity: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f21d2f;
  animation: animate-record-circle 500ms infinite alternate;
}

.record__duration {
  font-size: 15px;
  font-weight: 500;
  color: #737373;
}

.record > .MuiSvgIcon-root {
  cursor: pointer;
}

@keyframes animate-record-circle {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
