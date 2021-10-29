import { ref } from 'vue'

export const activeAudioId = ref('')

export function setAudioId(newId: string) {
  activeAudioId.value = newId
}
