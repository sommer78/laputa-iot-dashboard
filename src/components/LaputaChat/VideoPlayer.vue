<template>
  <div>
    <div ref="videoRef" class="player" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue'
import Dplayer from 'dplayer'

export default defineComponent({
  name: 'VideoPlayer',
  components: {  },
 props: {
    video:{
      type: Object,
      required: false,
    }
  },
 
  setup (props,) {
    const videoRef = ref() // 获取视频容器
    //此处我们可以进行播放器的初始化
    new Dplayer({          //初始化视频对象
      container:videoRef.value,   //指定视频容器节点
      video:{
       url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&amp;userId=17&amp;ext=.mp4',  // 指定视频播放链接
       pic: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',  // 指定视频封面图
       classList: ["dplayer-hide-controller"],
      }
    });
    return {
      videoRef,
    }
  },
})
</script>

<style>
.player{
  width: 100%;
  height: 100%;
}
</style>
