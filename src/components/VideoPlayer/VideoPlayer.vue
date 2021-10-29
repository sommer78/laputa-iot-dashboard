<template>
  <div id="video-app">
    <div class="test-player-wrap">
      <vue3-video-player
        @global-auto-play="autoPlay"
        :src="source1"
        :logo="logo"
        :barrageConfig="{ fontSize: 20, opacity: 90, position: 80, barrageList: barrages2 }"
        title="Smartisan T1"
        :view-core="viewCore"
      >
      </vue3-video-player>
    </div>
  </div>
</template>

<script lang="ts">
// const barragesJson = window.barragesJson
const videoSource = [
  {
    src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20Sparkle%20_%20Your%20Name%20AMV_K_7To_y9IAM_240p.mp4',
    resolution: '240p',
  },
  {
    src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20Sparkle%20_%20Your%20Name%20AMV_K_7To_y9IAM_360p.mp4',
    resolution: '360p',
  },
  {
    src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20Sparkle%20_%20Your%20Name%20AMV_K_7To_y9IAM_360p.mp4',
    resolution: '720p',
  },
  {
    src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
    resolution: '1080p',
  },
];
// const videoSource = [
//   {
//     src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.webm',
//     type: 'video/webm'
//   },
//   {
//     src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
//     type: 'video/mp4'
//   }
// ]
// const videoSource2 = 'https://media.vued.vanthink.cn/the_garden_of_words_trailer_english__1080p.mp4'
//  :barrageConfig="{ fontSize: 20, opacity: 90, position: 80, barrageList: barrages2 }"
const videoSource2 = 'https://static.smartisanos.cn/common/video/smartisant1.mp4';
const liveArrSource = [
  {
    src: 'https://gctxyc.liveplay.myqcloud.com/gc/yxhcyz_1/index.m3u8?contentid=2820180516001',
    resolution: 'test',
  },
];
const liveStrSource =
  'https://gctxyc.liveplay.myqcloud.com/gc/yxhcyz_1/index.m3u8?contentid=2820180516001';
const cover = 'https://img1.wxzxzj.com/maxresdefault.jpg';
import HLSCore from '@cloudgeek/playcore-hls';

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',
  components: { HLSCore },
  props: {
    src: String,
    title: {
      type: String,
      required: false,
    },
    barrageListe: {
      type: String,
      required: false,
    },
  },

  setup(props, { emit }) {
    const viewCore = ref([
      (_, config) => {
        console.log(config);
      },
    ]);
    const source2 = ref(videoSource2);
    const liveArrSource2 = ref(liveArrSource);
    const cover2 = ref(cover);

    function playFunc(e) {
      console.log(e);
    }
    const logo = ref('/src/assets/images/logo.png');
    function autoPlay(b) {
      console.log('auto play change to ' + b);
    }
    function createBarrages() {
      const arr = [
        'vue3 video player',
        'awesome 棒棒棒',
        '6000 units 6000弹幕',
        'test 测试一下吧',
        '60 FPS',
        'test in fullscreen mode 全屏模式试一试',
      ];
      let barrages = [];
      const temp = [];
      for (let i = 0; i < 6; i++) {
        for (let index = 0; index < 1000; index++) {
          const time = parseInt(Math.random() * 408927);
          if (index % 4 === 0) {
            temp.push({
              type: 0,
              content: arr[parseInt(Math.random() * arr.length)],
              avatar: 'https://api.multiavatar.com/LarchLiu.png',
              username: 'LarchLiu' + time,
              time: parseFloat(time / 1000),
            });
          } else if (index % 4 === 1) {
            temp.push({
              type: 3,
              content: arr[parseInt(Math.random() * arr.length)],
              time: parseFloat(time / 1000),
            });
          } else if (index % 4 === 2) {
            temp.push({
              type: 1,
              content: arr[parseInt(Math.random() * arr.length)],
              time: parseFloat(time / 1000),
            });
          } else {
            temp.push({
              type: 2,
              content: arr[parseInt(Math.random() * arr.length)],
              time: parseFloat(time / 1000),
              color: parseInt(Math.random() * 16777215),
            });
          }
        }
      }
      barrages = temp.sort((a, b) => {
        return a.time - b.time;
      });
      return barrages;
    }

    const barrages2 = ref(createBarrages());
    const source1 = ref(videoSource);
    return {
      source1,
      logo,
      source2,
      playFunc,
      HLSCore,
      liveArrSource2,
      viewCore,
      autoPlay,
      cover2,
      barrages2,
    };
  },
});
</script>

<style scoped>
#video-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
#video-app .vue-core-video-player-containers {
  margin: 30px auto;
}
#video-app .test-player-wrap {
  width: 720px;
  position: relative;
  margin: 30px auto;
}
@media all and (max-width: 768px) {
  #video-app .test-player-wrap {
    width: 100%;
    height: auto;
  }
}
</style>