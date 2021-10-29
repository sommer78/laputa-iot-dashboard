import { ref, watch } from 'vue'

export default function useRoom(roomId: string, authUser: any) {
  const room = ref()

  watch(
    authUser,
    async (newVal) => {
      if (newVal) {
        if(roomId){
          const isUserRoom = roomId.includes(newVal.id)
          const doc = isUserRoom ? roomId?.replace(newVal.id, '') : roomId
        }
       

       
      }
    },
    { immediate: true }
  )

  return room
}