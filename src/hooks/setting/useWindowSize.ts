import { reactive, toRefs } from 'vue'

interface WindowSize {
  width: number
  height: number
  transform: string
  isMobile?: boolean
}
const state = reactive<WindowSize>({
  width: 0,
  height: 0,
  transform: '',
  isMobile: false
})

export function setupUseWindowSize() {
  function handleResize() {
    if (window.innerHeight > 768 && window.innerWidth > 1366) {
      const currentRatio = window.innerHeight / window.innerWidth;
      const ratio = 768 / 1366;
      if (ratio < currentRatio) {
        Object.assign(state, {
          width: 1366,
          height: window.innerHeight * (1366 / window.innerWidth),
          transform: `scale(${window.innerWidth / 1366})`,
        })
      } else if (ratio > currentRatio) {
        Object.assign(state, {
          width: window.innerWidth * (768 / window.innerHeight),
          height: 768,
          transform: `scale(${window.innerHeight / 768})`,
        })
      } else {
        Object.assign(state, {
          width: 1366,
          height: 768,
          transform: `scale(${window.innerHeight / 768})`,
        })
      }
    }
    Object.assign(state, {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= 760,
      transform: `scale(1)`,
    })
  }

  window.addEventListener("resize", handleResize);

  handleResize()
  return () => window.removeEventListener("resize", handleResize)
}

export function useWindowSize() {
  return toRefs<WindowSize>(state)
}
