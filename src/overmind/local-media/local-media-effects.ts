export const mediaDevices = (() => {
  let _mediaStream: MediaStream | null = null;

  return {
    async requestPermission() {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

      _mediaStream = mediaStream;
    },

    getMediaStream() {
      return _mediaStream
    },
  }
})()