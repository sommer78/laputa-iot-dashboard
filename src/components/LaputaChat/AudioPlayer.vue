<template>
  <div>
    <div :class="['audioplayer', isSender && 'audioplayer__alt']">
     
      <Icon
      icon="ion:language"
        v-if="isPlaying"
        class="w-6 h-6 cursor-pointer"
        @click="stopAudio"
      />
      <Icon
      icon="ion:language"
        v-else
        class="w-6 h-6 cursor-pointer"
        @click="playAudio"
      />
      <div>
        <span
          :style="{width: `${sliderValue}%`}"
          class="audioplayer__slider--played"
        />
        <input
          type="range"
          min="1"
          max="100"
          :value="sliderValue"
          class="audioplayer__slider"
          @change="scrubAudio"
        >
      </div>
    </div>
    <span class="chat__timestamp audioplayer__time">{{ duration }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
// import { PlayIcon, PauseIcon } from '@heroicons/vue/outline'
import { activeAudioId, setAudioId } from '/@/hooks/usePlayer'
import Icon from '/@/components/Icon'


export default defineComponent({
  name: 'AudioPlayer',
  components: { Icon },
  props: {
    isSender: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isPlaying = ref(false)
    const isMediaLoaded = ref(false)
    const sliderValue = ref(0)
    const duration = ref('')
    const totalDuration = ref('')
    const audio = ref()
    let interval: number

    watch(
      () => props.audioUrl,
      (newVal) => {
        if (newVal !== 'uploading') {
          audio.value = new Audio(newVal)
          audio.value.load()
          getAudioDuration(audio.value).then(() => {
            setupAudio()
          })
        }
      },
      { immediate: true }
    )

    function getAudioDuration(media: any) {
      return new Promise((resolve) => {
        media.onloadedmetadata = () => {
          media.currentTime = Number.MAX_SAFE_INTEGER

          media.ontimeupdate = () => {
            media.ontimeupdate = () => {
              // console.log('WTF AudioPlayer')
            }
            media.currentTime = 0.1
            resolve(media.duration)
          }
        }
      })
    }

    function setupAudio() {
      audio.value.addEventListener('canplaythrough', () => {
        if (!totalDuration.value) {
          isMediaLoaded.value = true
          const time = formatTime(audio.value.duration)
          totalDuration.value = time
          duration.value = totalDuration.value
        }
      })

      audio.value.addEventListener('ended', () => {
        clearInterval(interval)
        duration.value = totalDuration.value
        sliderValue.value = 0
        isPlaying.value = false
      })
    }

    function formatTime(time: number): string {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time - minutes * 60)
      let minutesStr = ''
      let secondsStr = ''
      if (minutes < 10) {
        minutesStr = `0${minutes}`
      }
      if (seconds < 10) {
        secondsStr = `0${seconds}`
      }

      return `${minutesStr}:${secondsStr}`
    }

    function playAudio() {
      isPlaying.value = true
      audio.value.play()
      if (activeAudioId.value !== props.id) {
        setAudioId(props.id)
      }
      interval = setInterval(updateSlider, 100)
    }

    function updateSlider() {
      let sliderPosition = 0

      if (typeof audio.value.duration === 'number') {
        sliderPosition = audio.value.currentTime * (100 / audio.value.duration)
        sliderValue.value = sliderPosition
        const time = formatTime(audio.value.currentTime)
        duration.value = time
      }
    }

    function stopAudio() {
      audio.value.pause()
      clearInterval(interval)
      isPlaying.value = false
      duration.value = totalDuration.value
    }

    function scrubAudio(event: any) {
      const value = event.target.value
      const valueNumber = Number(value)

      if (isMediaLoaded.value) {
        const seekTo = audio.value.duration * (valueNumber / 100)
        audio.value.currentTime = seekTo
        sliderValue.value = valueNumber
      }
    }

    watch(activeAudioId, (newVal) => {
      if (newVal !== props.id) {
        audio.value.pause()
        isPlaying.value = false
      }
    })

    return {
      playAudio,
      stopAudio,
      isMediaLoaded,
      isPlaying,
      scrubAudio,
      duration,
      sliderValue,
    }
  },
})
</script>

<style>
.audioplayer {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.audioplayer > div {
  width: calc(100% - 48px);
  height: 15px;
  display: flex;
  align-items: center;
  position: relative;
}

.audioplayer__slider {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 5px;
  width: 100%;
  background: #00000030;
  border-radius: 2.5px;
  position: absolute;
  right: 0;
  z-index: 1;
}

.audioplayer__slider:focus {
  outline: none;
}

.audioplayer__slider--played {
  height: 5px;
  background: #a9a9a9;
  border-radius: 2.5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  position: absolute;
  left: 0;
  z-index: 2;
}

.audioplayer__slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #a9a9a9;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  position: relative;
  z-index: 5;
}

.audioplayer__slider::-webkit-slider-thumb:active {
  transform: scale(1.25);
}

.audioplayer__slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #a9a9a9;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}

.audioplayer__slider::-moz-range-thumb:active {
  transform: scale(1.25);
}

.audioplayer__alt .audioplayer__slider::-webkit-slider-thumb {
  background: #06d755;
}

.audioplayer__alt .audioplayer__slider::-moz-range-thumb {
  background: #06d755;
}

.audioplayer__alt .audioplayer__slider--played {
  background: #06d755;
}

.audioplayer__played .audioplayer__slider::-webkit-slider-thumb {
  background: #2ab5eb;
}

.audioplayer__played .audioplayer__slider::-moz-range-thumb {
  background: #2ab5eb;
}

.audioplayer__played .audioplayer__slider--played {
  background: #2ab5eb;
}

.audioplayer__time {
  margin-right: 10px;
  margin-left: 2px;
  min-width: 35px;
  display: inline-block;
  font-size: 14px !important;
}

.audioplayer .MuiCircularProgress-root {
  width: 25.39px !important;
  height: 24px !important;
  margin-right: 15px;
  color: #a9a9a9;
}

.audioplayer .MuiCircularProgress-root .MuiCircularProgress-svg {
  transform: scale(1.1);
  width: 25.375px;
  height: 25.375px;
}
</style>
