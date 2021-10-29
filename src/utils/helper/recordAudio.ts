

export default function recordAudio() {
  return new Promise((resolve) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      // @ts-ignore
      const mediaRecorder = new MediaRecorder(stream)
      const audioChunks: any[] = []

      mediaRecorder.addEventListener('dataavailable', (event: MessageEvent) => {
        audioChunks.push(event.data)
      })

      function start() {
        mediaRecorder.start()
      }

      function stop() {
        return new Promise((resolve) => {
          mediaRecorder.addEventListener('stop', () => {
            const audioName = ''
            const audioFile = new File(audioChunks, audioName, {
              type: 'audio/mpeg',
            })
            const audioUrl = URL.createObjectURL(audioFile)
            const audio = new Audio(audioUrl)
            function play() {
              audio.play()
            }

            resolve({ audioFile, audioUrl, play, audioName })
          })

          mediaRecorder.stop()
        })
      }

      resolve({ start, stop })
    })
  })
}
