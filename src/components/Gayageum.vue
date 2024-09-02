<script setup>
import {onBeforeUnmount, onMounted, reactive, ref, watchEffect} from 'vue';
import mobileBridge from '../assets/bridge-mobile.png'
import desktopBridge from '../assets/bridge-lg.png'
import {useGuideStore} from "../stores/guide.js";
import {useSettingStore} from "../stores/settings.js";
import {useCommonStore} from "../stores/common.js";

const guideStore = useGuideStore()
const settingStore = useSettingStore()
const commonStore = useCommonStore()

const audioContext = new (window.AudioContext || window.webkitAudioContext)({
  latencyHint: 'interactive'
});

const stringInfo = reactive([
  {
    isShaking: false,
    height: 9.5,
    label: '1 청',
    hexCode: '#FF7C00',
    ['구음']: '청',
    ['기보음']: {
      ['C본청']: '레',
      ['Db본청']: '레♭',
      ['A본청']: '미',
    },
    ['실제음']: {
      ['C본청']: '솔',
      ['Db본청']: '레♭',
      ['A본청']: '미',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_01_SingleNote_G2.wav',
        ['농현']: 'C_01a_NongB_G2.wav',
        ['꺾는음']: 'C_01b_Break_G2.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_01_SingleNote_Ab2.wav',
        ['농현']: 'Db_01a_NongB_Ab2.wav',
        ['꺾는음']: 'Db_01b_Break_Ab2.wav',
      },
      ['A본청']: {
        ['평음']: 'A_01_SingleNote_E2.wav',
        ['농현']: 'A_01a_NongB_E2.wav',
        ['꺾는음']: 'A_01b_Break_E2.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 9,
    label: '2 흥',
    hexCode: '#0073FF',
    ['구음']: '홍',
    ['기보음']: {
      ['C본청']: '솔',
      ['Db본청']: '레♭',
      ['A본청']: '라',
    },
    ['실제음']: {
      ['C본청']: '도',
      ['Db본청']: '레♭',
      ['A본청']: '라',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_02_SingleNote_C3.wav',
        ['농현']: 'C_02a_NongB_C3.wav',
        ['꺾는음']: 'C_02b_Break_C3.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_02_SingleNote_Db3.wav',
        ['농현']: 'Db_02a_NongB_Db3.wav',
        ['꺾는음']: 'Db_02b_Break_Db2.wav',
      },
      ['A본청']: {
        ['평음']: 'A_02_SingleNote_A2.wav',
        ['농현']: 'A_02a_NongB_A2.wav',
        ['꺾는음']: 'A_02b_Break_A2.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 8.5,
    label: '3 둥',
    hexCode: '#2F2D59',
    ['구음']: '동',
    ['기보음']: {
      ['C본청']: '라',
      ['Db본청']: '미♭',
      ['A본청']: '시',
    },
    ['실제음']: {
      ['C본청']: '레',
      ['Db본청']: '미♭',
      ['A본청']: '시',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_03_SingleNote_D3.wav',
        ['농현']: 'C_03a_NongB_D3.wav',
        ['꺾는음']: 'C_03b_Break_D3.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_03_SingleNote_Eb3.wav',
        ['농현']: 'Db_03a_NongB_Eb3.wav',
        ['꺾는음']: 'Db_03b_Break_Eb3.wav',
      },
      ['A본청']: {
        ['평음']: 'A_03_SingleNote_B2.wav',
        ['농현']: 'A_03a_NongB_B1.wav',
        ['꺾는음']: 'A_03b_Break_B2.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 8,
    label: '4 당',
    hexCode: '#FF7C00',
    ['구음']: '당',
    ['기보음']: {
      ['C본청']: '레',
      ['Db본청']: '라♭',
      ['A본청']: '미',
    },
    ['실제음']: {
      ['C본청']: '솔',
      ['Db본청']: '라♭',
      ['A본청']: '미',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_04_SingleNote_G3.wav',
        ['농현']: 'C_04a_NongB_G3.wav',
        ['꺾는음']: 'C_04b_Break_G3.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_04_SingleNote_Ab3.wav',
        ['농현']: 'Db_04a_NongB_Ab3.wav',
        ['꺾는음']: 'Db_04b_Break_Ab3.wav',
      },
      ['A본청']: {
        ['평음']: 'A_04_SingleNote_E3.wav',
        ['농현']: 'A_04a_NongB_E3.wav',
        ['꺾는음']: 'A_04b_Break_E3.wav',
      },
    },
  },
  {
    isShaking: false,
    id: 5,
    height: 7.5,
    label: '5 동',
    hexCode: '#FFC500',
    ['구음']: '동',
    ['기보음']: {
      ['C본청']: '미',
      ['Db본청']: '시♭',
      ['A본청']: '파',
    },
    ['실제음']: {
      ['C본청']: '라',
      ['Db본청']: '시♭',
      ['A본청']: '피',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_05_SingleNote_A3.wav',
        ['농현']: 'C_05a_NongB_A3.wav',
        ['꺾는음']: 'C_05b_Break_A3.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_05_SingleNote_Bb3.wav',
        ['농현']: 'Db_05a_NongB_Bb3.wav',
        ['꺾는음']: 'Db_05b_Break_Bb3.wav',
      },
      ['A본청']: {
        ['평음']: 'A_05_SingleNote_F3.wav',
        ['농현']: 'A_05a_NongB_F3.wav',
        ['꺾는음']: 'A_05b_Break_F3.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 7,
    label: '6 징',
    hexCode: '#0073FF',
    ['구음']: '징',
    ['기보음']: {
      ['C본청']: '솔',
      ['Db본청']: '레♭',
      ['A본청']: '라',
    },
    ['실제음']: {
      ['C본청']: '도',
      ['Db본청']: '레♭',
      ['A본청']: '라',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_06_SingleNote_C4.wav',
        ['농현']: 'C_06a_NongB_C4.wav',
        ['꺾는음']: 'C_06b_Break_C4.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_06_SingleNote_Db4.wav',
        ['농현']: 'Db_06a_NongB_Db4.wav',
        ['꺾는음']: 'Db_06b_Break_Db4.wav',
      },
      ['A본청']: {
        ['평음']: 'A_06_SingleNote_A3.wav',
        ['농현']: 'A_06a_NongB_A3.wav',
        ['꺾는음']: 'A_06b_Break_A3.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 6.5,
    label: '7 땅',
    hexCode: '#2F2D59',
    ['구음']: '땅',
    ['기보음']: {
      ['C본청']: '라',
      ['Db본청']: '파',
      ['A본청']: '시',
    },
    ['실제음']: {
      ['C본청']: '미',
      ['Db본청']: '파',
      ['A본청']: '시',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_07_SingleNote_D4.wav',
        ['농현']: 'C_07a_NongB_D4.wav',
        ['꺾는음']: 'C_07b_Break_D4.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_07_SingleNote_Eb4.wav',
        ['농현']: 'Db_07a_NongB_Eb4.wav',
        ['꺾는음']: 'Db_07b_Break_Eb4.wav',
      },
      ['A본청']: {
        ['평음']: 'A_07_SingleNote_B3.wav',
        ['농현']: 'A_07a_NongB_B3.wav',
        ['꺾는음']: 'A_07b_Break_B3.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 6,
    label: '8 지',
    hexCode: '#8C2FE8',
    ['구음']: '지',
    ['기보음']: {
      ['C본청']: '시',
      ['Db본청']: '파',
      ['A본청']: '도',
    },
    ['실제음']: {
      ['C본청']: '미',
      ['Db본청']: '파',
      ['A본청']: '도',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_08_SingleNote_E4.wav',
        ['농현']: 'C_08a_NongB_E4.wav',
        ['꺾는음']: 'C_08b_Break_E4.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_08_SingleNote_F4.wav',
        ['농현']: 'Db_08a_NongB_F4.wav',
        ['꺾는음']: 'Db_08b_Break_F4.wav',
      },
      ['A본청']: {
        ['평음']: 'A_08_SingleNote_C4.wav',
        ['농현']: 'A_08a_NongB_C4.wav',
        ['꺾는음']: 'A_08b_Break_C4.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 5.5,
    label: '9 찡',
    hexCode: '#FF7C00',
    ['구음']: '찡',
    ['기보음']: {
      ['C본청']: '레',
      ['Db본청']: '라♭',
      ['A본청']: '레',
    },
    ['실제음']: {
      ['C본청']: '솔',
      ['Db본청']: '라♭',
      ['A본청']: '레',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_09_SingleNote_G4.wav',
        ['농현']: 'C_09a_NongB_G4.wav',
        ['꺾는음']: 'C_09b_Break_G4.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_09_SingleNote_Ab4.wav',
        ['농현']: 'Db_09a_NongB_Ab4.wav',
        ['꺾는음']: 'Db_09b_Break_Ab4.wav',
      },
      ['A본청']: {
        ['평음']: 'A_09_SingleNote_D4.wav',
        ['농현']: 'A_09a_NongB_D4.wav',
        ['꺾는음']: 'A_09b_Break_D4.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 5,
    label: '10 칭',
    hexCode: '#FFC500',
    ['구음']: '칭',
    ['기보음']: {
      ['C본청']: '미',
      ['Db본청']: '라',
      ['A본청']: '파',
    },
    ['실제음']: {
      ['C본청']: '라',
      ['Db본청']: '라',
      ['A본청']: '파',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_10_SingleNote_A4.wav',
        ['농현']: 'C_10a_NongB_A4.wav',
        ['꺾는음']: 'C_10b_Break_A4.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_10_SingleNote_Bb4.wav',
        ['농현']: 'Db_10a_NongB_Bb4.wav',
        ['꺾는음']: 'Db_10b_Break_Bb4.wav',
      },
      ['A본청']: {
        ['평음']: 'A_10_SingleNote_F4.wav',
        ['농현']: 'A_10a_NongB_F4.wav',
        ['꺾는음']: 'A_10b_Break_F4.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 4.5,
    label: '11 쫑',
    hexCode: '#0073FF',
    ['구음']: '쫑',
    ['기보음']: {
      ['C본청']: '솔',
      ['Db본청']: '도',
      ['A본청']: '라',
    },
    ['실제음']: {
      ['C본청']: '도',
      ['Db본청']: '도',
      ['A본청']: '라',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_11_SingleNote_C5.wav',
        ['농현']: 'C_11a_NongB_C5.wav',
        ['꺾는음']: 'C_11b_Break_C5.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_11_SingleNote_Db5.wav',
        ['농현']: 'Db_11a_NongB_Db5.wav',
        ['꺾는음']: 'C_06b_Break_C4.wav',
        // ['꺾는음']: 'Db_11b_Break_C4.wav', ///////////////////////// 파일없음
      },
      ['A본청']: {
        ['평음']: 'A_11_SingleNote_A4.wav',
        ['농현']: 'A_11a_NongB_A.wav',
        ['꺾는음']: 'A_11b_Break_A4.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 4,
    label: '12 챙',
    hexCode: '#2F2D59',
    ['구음']: '챙',
    ['기보음']: {
      ['C본청']: '라',
      ['Db본청']: '미♭',
      ['A본청']: '시',
    },
    ['실제음']: {
      ['C본청']: '레',
      ['Db본청']: '미♭',
      ['A본청']: '시',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_12_SingleNote_D5.wav',
        ['농현']: 'C_12a_NongB_D5.wav',
        ['꺾는음']: 'C_12b_Break_D5.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_12_SingleNote_Eb5.wav',
        ['농현']: 'Db_12a_NongB_Eb5.wav',
        ['꺾는음']: 'Db_12b_Break_Eb5.wav',
      },
      ['A본청']: {
        ['평음']: 'A_12_SingleNote_B4.wav',
        ['농현']: 'A_12a_NongB_B4.wav',
        ['꺾는음']: 'A_12b_Break_B4.wav',
      },
    },
  },
]);

const windowWidth = ref(window.innerWidth)
const imageSrc = ref(mobileBridge)

const selectedTechnic = ref('평음');

const countLoadedAudios = ref(0)

const lastEventHandled = ref(null);

function getImageSrc() {
  return windowWidth.value <= 599 ? mobileBridge : desktopBridge
}

function handleKeyup(event) {
  if (!event.ctrlKey) selectedTechnic.value = '평음';
  else if (!event.altKey) selectedTechnic.value = '평음';
}
function handleKeydown(event) {
  console.log(">>>>>>>>>> handleKeydown", event);
  if (event.ctrlKey) selectedTechnic.value = '농현';
  if (event.altKey) selectedTechnic.value = '꺾는음';
  if (event.repeat) return;
  switch (event.keyCode) {
    case 49:
      playString(event, stringInfo?.[0], settingStore.selectedTuning, 0)();
      return;
    case 50:
      playString(event, stringInfo?.[1], settingStore.selectedTuning, 1)();
      return;
    case 51:
      playString(event, stringInfo?.[2], settingStore.selectedTuning, 2)();
      return;
    case 52:
      playString(event, stringInfo?.[3], settingStore.selectedTuning, 3)();
      return;
    case 53:
      playString(event, stringInfo?.[4], settingStore.selectedTuning, 4)();
      return;
    case 54:
      playString(event, stringInfo?.[5], settingStore.selectedTuning, 5)();
      return;
    case 55:
      playString(event, stringInfo?.[6], settingStore.selectedTuning, 6)();
      return;
    case 56:
      playString(event, stringInfo?.[7], settingStore.selectedTuning, 7)();
      return;
    case 57:
      playString(event, stringInfo?.[8], settingStore.selectedTuning, 8)();
      return;
    case 48:
      playString(event, stringInfo?.[9], settingStore.selectedTuning, 9)();
      return;
    case 189:
      playString(event, stringInfo?.[10], settingStore.selectedTuning, 10)();
      return;
    case 187:
      playString(event, stringInfo?.[11], settingStore.selectedTuning, 11)();
      return;
  }
}

function handleResize() {
  windowWidth.value = window.innerWidth
  // drawCanvas()
}

function updateImageSrc() {
  imageSrc.value = getImageSrc()
}

function selectedNote(val, selectedNote, selectedTuning) {
  switch (selectedNote) {
    case '구음':
      return val['구음']
    case '기보음':
      return val['기보음'][selectedTuning]
    case '실제음':
      return val['실제음'][selectedTuning]
    case '표시 안함':
      return;
    default:
      return;
  }
}

async function getMedia(constrains) {
  const initialContrains = {
    audio: true,
    video: false
  } // 특별한 요구사항 없이 오디오와 비디오 요청
  try {
    const stream = await navigator.mediaDevices.getUserMedia(initialContrains);
    const video = document.createElement('video');
    video.srcObject = stream;
  } catch(error) {
    console.log(error)
  }
}

function loadSound() {
  console.log(">>> loadSound");
  stringInfo.forEach((info, index) => {
    ['C본청', 'Db본청', 'A본청'].forEach((_info, _index) => {
      ['평음', '농현', '꺾는음'].forEach((__info, __index) => {
        const _path = new URL(`/src/assets/wav/${info['audio'][_info][__info]}`, import.meta.url).href;
        console.log('try', _path);
        try {
          (async () => {
            const response = await fetch(_path);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            console.log(">>>>> audioBuffer", audioBuffer);
            stringInfo[index].audio[_info][__info] = audioBuffer;
            countLoadedAudios.value++;
          })();
        } catch (_e) {
        }
      })
    })
  });
  console.log(">>>>> stringInfo", stringInfo);
}

function playString(event, val, _selectedTuning, index) {
  return function (direction, mouseEvent) {
    console.log('>>>>>>>> playString', mouseEvent, { _selectedTuning, selectedTechnic: selectedTechnic.value }, val, lastEventHandled.value);

    (async () => {
      if (audioContext.state === 'suspended') {
        console.log('>>>>>> audioContext.state', audioContext.state);
        await audioContext.resume();
      }
      const _audio = val['audio'][_selectedTuning][selectedTechnic.value];
      const source = audioContext.createBufferSource();
      source.buffer = _audio;
      source.connect(audioContext.destination);
      source.start(0);
      stringInfo[index].isShaking = true;
      const _e = setTimeout(() => {
        stringInfo[index].isShaking = false;
        clearTimeout(_e);
      }, 3000);
    })();
    lastEventHandled.value = { eventType: mouseEvent?.type, ['구음']: val['구음'] };
  };
}

function setSelectedTechnic(technic) {
  return function (direction, mouseEvent) {
    console.log(">>>>>>>> setSelectedTechnic", technic);
    selectedTechnic.value = technic;
  };
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  updateImageSrc()
  getMedia();
  loadSound()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watchEffect(() => {
  updateImageSrc()
})

watchEffect(() => {
  let count = 0;
  ['C본청', 'Db본청', 'A본청'].forEach((_info, _index) => {
    ['평음', '농현', '꺾는음'].forEach((__info, __index) => {
      if (stringInfo?.['audio']?.[_info]?.[__info]) {
        count++;
      }
    });
  });
  if (countLoadedAudios.value === count) {
    setTimeout(() => {
      commonStore.isLoadedAudios = true;
    }, 1000);
  }
})

// const canvas = ref(null)
//
// const drawCanvas = () => {
//   const ctx = canvas.value.getContext('2d')
//   const width = window.innerWidth
//   const height = Math.min(window.innerHeight, 900)
//
//   canvas.value.width = width
//   canvas.value.height = height
//
//   const backgroundImage = new Image()
//   backgroundImage.src = backgroundImgPath
//   backgroundImage.onload = () => {
//     ctx.drawImage(backgroundImage, 0, 0, width, height)
//
//     // ctx.strokeStyle = '#FFFFFF'
//     ctx.strokeStyle = 'red'
//     ctx.lineWidth = 4
//     const numStrings = 12
//     for (let i = 0; i < numStrings; i++) {
//       const y = (i + 1) * (height / (numStrings + 1))
//       ctx.lineWidth = hyun[i].height
//       ctx.beginPath()
//       ctx.moveTo(0, y)
//       ctx.lineTo(width, y)
//       ctx.stroke()
//     }
//   }
// }
onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('resize', updateImageSrc)
  window.addEventListener('keyup', handleKeyup);
  window.addEventListener('keydown', handleKeydown);
  // drawCanvas()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateImageSrc)
  window.removeEventListener('resize', handleResize)
  window.addEventListener('keyup', handleKeyup);
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative w-full h-full flex flex-row select-none" @contextmenu.native="$event.preventDefault();">
    <div class="flex w-full flex-col mt-[69px] notMobile:h-[85%] mobile:mt-[12px]">
      <div v-if="guideStore.openGuide" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
           style="z-index: 101">
      </div>
      <div
          class="absolute top-0 left-0 h-full w-[10%] z-[100]"
          v-touch:press="setSelectedTechnic('농현')"
          v-touch:release="setSelectedTechnic('평음')"
      />
      <div v-for="(val, index) in stringInfo" class="relative flex flex-1 items-center">
        <div
            class="absolute top-0 left-0 w-[100%] flex items-center h-full border-none mobile:w-[100%] mobile:py-[26px]"
            :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'"
        >
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div
                :class="{ 'w-full': true, 'stringBackground': true, 'border-none': true, shake: stringInfo[index].isShaking }"
                :style="`height: ${val.height}px; z-index: 99`"
            ></div>
          </div>
        </div>
        <!--     시김새 영역     -->
        <div
            class="w-[15%] flex items-center h-full border-none mobile:w-[25%] mobile:py-[26px]"
            :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'"
        >
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div :class="[`w-full border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>
          </div>
        </div>
        <!--     안족 배열     -->
        <div class="relative w-[45%] flex items-center h-full border-none mobile:w-[30%] mobile:py-[26px]"
             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'">
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div :class="[`w-full border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>
          </div>
          <div class="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-[3]"
               :style="`left: calc(${index} * (100% / 12))`">
            <img
                :src="imageSrc"
                alt="안족"
                class="max-w-full max-h-full object-contain min-w-[80px] min-h-[212px] miniTablet:min-w-[80px] miniTablet:min-h-[212px] mobile:min-w-[62px] mobile:min-h-[139px]"
                draggable="false"
            >
          </div>
        </div>
        <!--     라벨 영역     -->
        <div class="relative w-[5%] flex items-center h-full border-none mobile:py-[26px]"
             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'">
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div
                class="absolute bg-[#000] flex justify-center items-center whitespace-nowrap rounded-[20px] bg-opacity-40 notMobile:min-w-[76px] notMobile:min-h-[48px] mobile:min-w-[30px] mobile:h-[40px] mobile:px-1 gap-2 mobile:gap-1 mobile:w-auto py-[6px] mobile:py-0 mobile:text-[12px]"
                style="z-index: 100"
            >
              <span class="text-[20px] font-extrabold text-[#fff] flex justify-center items-center">{{ index + 1 }}</span>
              <div
                  v-if="settingStore.selectedNote !== '표시 안함'"
                  class="flex justify-center items-center w-[30px] h-[30px] rounded-full"
                  :style="{ backgroundColor: settingStore.isLineColor ? val.hexCode : 'transparent' }"
              >
                <span class="text-[20px] font-extrabold text-[#fff] flex justify-center items-center">
                  {{ selectedNote(val, settingStore.selectedNote, settingStore.selectedTuning) }}
                </span>
              </div>
            </div>
            <div :class="[`w-full border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>
          </div>
        </div>
        <!--     연주 영역     -->
<!--        <div class="w-[25%] flex items-center h-full border-none mobile:w-[40%] mobile:py-[26px]"-->
<!--             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'"-->
<!--             @mousedown="playString($event, val, settingStore.selectedTuning, selectedTechnic)"-->
<!--        >-->
          <div class="w-[25%] flex items-center h-full border-none mobile:w-[40%] mobile:py-[26px]"
               :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'"
               style="z-index: 99"
               v-touch:press="playString($event, val, settingStore.selectedTuning, index)"
          >
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div :class="[`w-full border-none`]" :style="`height: ${val.height}px;`"></div>
          </div>
        </div>
        <!--     현침     -->
        <div class="w-[10%] flex items-center h-full border-none mobile:hidden mobile:py-[26px]"
             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'">
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div :class="[`w-full border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="w-full h-[900px] absolute" style="z-index: 2">-->
    <!--      <canvas ref="canvas" style="z-index: 5"></canvas>-->
    <!--      <div class="absolute right-0 top-[-40px] mobile:hidden" style="z-index: 3">-->
    <!--        <img src="../assets/hyunchime.png" class="">-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="absolute right-0 top-[-40px] mobile:hidden" style="z-index: 2">
      <img src="../assets/hyunchime.png" class="h-screen" draggable="false">
    </div>
    <button
        v-if="guideStore.openGuide"
        type="button"
        aria-label="닫기"
        class="absolute bottom-[32px] notMobile:left-1/2 notMobile:-translate-x-1/2 transform px-14 py-3 font-bold text-[#fff] text-xl bg-green-700 rounded-[32px] cursor-pointer mobile:bottom-[16px] mobile:px-5 mobile:py-3 mobile:rounded-[16px] mobile:right-[16px]"
        style="z-index: 101"
        @click="guideStore.openGuide = false"
    >
      닫기
    </button>
  </div>
</template>

<style scoped>
.stringBackground {
  background-image: linear-gradient(#eee, #999);
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.01s ease;
}

.stringBackground.shake {
  animation: shake 0.2s ease-in-out;
  animation-iteration-count: 15;
}

@keyframes shake {
  0%, 100% {
    transform: translateY(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateY(-0.7px);
  }
  20%, 40%, 60%, 80% {
    transform: translateY(0.7px);
  }
}
</style>
