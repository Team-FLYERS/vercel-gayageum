<script setup>
import {nextTick, onBeforeUnmount, onMounted, reactive, ref} from 'vue';
import {storeToRefs} from "pinia";
import mobileBridge from '../assets/bridge-mobile.png'
import desktopBridge from '../assets/bridge-lg.png'
import GuideArrowLeft from '../assets/guide-arrow-left.vue'
import GuidePointer from '../assets/guide-pointer.vue'
import {useGuideStore} from "../stores/guide.js";
import {useSettingStore} from "../stores/settings.js";
import {useCommonStore} from "../stores/common.js";

const guideStore = useGuideStore()
const settingStore = useSettingStore()
const commonStore = useCommonStore()

const { selectedTuning } = storeToRefs(settingStore);

const audioContext = new (window.AudioContext || window.webkitAudioContext)({
  latencyHint: 'interactive', // 지연 시간을 최소화
  sampleRate: 44100, // 표준 샘플 레이트 설정
});

const stringInfo = reactive([
  {
    isShaking: false,
    height: 9.5,
    position: { top: 0, height: 0 },
    label: '1 청',
    hexCode: '#FF7C00CC',
    alterHexCode: '#FF7C00CC',
    ['구음']: '청',
    ['기보음']: {
      ['C본청']: '레',
      ['Db본청']: '레',
      ['A본청']: '레',
    },
    ['실제음']: {
      ['C본청']: '솔',
      ['Db본청']: '라♭',
      ['A본청']: '미',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_01_SingleNote_G2.wav',
        ['농현']: 'C_01a_NongB_G2.wav',
        ['꺾는음']: 'C_01_SingleNote_G2.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_01_SingleNote_Ab2.wav',
        ['농현']: 'Db_01a_NongB_Ab2.wav',
        ['꺾는음']: 'Db_01b_Break_Ab2.wav',
      },
      ['A본청']: {
        ['평음']: 'A_01_SingleNote_E2.wav',
        ['농현']: 'A_01a_NongB_E2.wav',
        ['꺾는음']: 'Db_01_SingleNote_Ab2.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 9,
    position: { top: 0, height: 0 },
    label: '2 흥',
    hexCode: '#0073FFCC',
    alterHexCode: '#0073FFCC',
    ['구음']: '흥',
    ['기보음']: {
      ['C본청']: '솔',
      ['Db본청']: '솔',
      ['A본청']: '솔',
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
        ['꺾는음']: 'C_02_SingleNote_C3.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_02_SingleNote_Db3.wav',
        ['농현']: 'Db_02a_NongB_Db3.wav',
        ['꺾는음']: 'Db_02_SingleNote_Db3.wav',
      },
      ['A본청']: {
        ['평음']: 'A_02_SingleNote_A2.wav',
        ['농현']: 'A_02a_NongB_A2.wav',
        ['꺾는음']: 'A_02_SingleNote_A2.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 8.5,
    position: { top: 0, height: 0 },
    label: '3 둥',
    hexCode: '#2F2D59CC',
    alterHexCode: '#2F2D59CC',
    ['구음']: '둥',
    ['기보음']: {
      ['C본청']: '라',
      ['Db본청']: '라',
      ['A본청']: '라',
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
    position: { top: 0, height: 0 },
    label: '4 당',
    hexCode: '#FF7C00CC',
    alterHexCode: '#FF7C00CC',
    ['구음']: '당',
    ['기보음']: {
      ['C본청']: '레',
      ['Db본청']: '레',
      ['A본청']: '레',
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
        ['꺾는음']: 'C_04_SingleNote_G3.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_04_SingleNote_Ab3.wav',
        ['농현']: 'Db_04a_NongB_Ab3.wav',
        ['꺾는음']: 'Db_04_SingleNote_Ab3.wav',
      },
      ['A본청']: {
        ['평음']: 'A_04_SingleNote_E3.wav',
        ['농현']: 'A_04a_NongB_E3.wav',
        ['꺾는음']: 'A_04_SingleNote_E3.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 7.5,
    position: { top: 0, height: 0 },
    label: '5 동',
    hexCode: '#FFC500CC',
    alterHexCode: '#FFC500CC',
    ['구음']: '동',
    ['기보음']: {
      ['C본청']: '미',
      ['Db본청']: '미',
      ['A본청']: '미',
    },
    ['실제음']: {
      ['C본청']: '라',
      ['Db본청']: '시♭',
      ['A본청']: '파',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_05_SingleNote_A3.wav',
        ['농현']: 'C_05a_NongB_A3.wav',
        ['꺾는음']: 'C_05_SingleNote_A3.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_05_SingleNote_Bb3.wav',
        ['농현']: 'Db_05a_NongB_Bb3.wav',
        ['꺾는음']: 'Db_05_SingleNote_Bb3.wav',
      },
      ['A본청']: {
        ['평음']: 'A_05_SingleNote_F3.wav',
        ['농현']: 'A_05a_NongB_F3.wav',
        ['꺾는음']: 'A_05_SingleNote_F3.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 7,
    position: { top: 0, height: 0 },
    label: '6 징',
    hexCode: '#0073FFCC',
    alterHexCode: '#0073FFCC',
    ['구음']: '징',
    ['기보음']: {
      ['C본청']: '솔',
      ['Db본청']: '솔',
      ['A본청']: '솔',
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
        ['꺾는음']: 'C_06_SingleNote_C4.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_06_SingleNote_Db4.wav',
        ['농현']: 'Db_06a_NongB_Db4.wav',
        ['꺾는음']: 'Db_06_SingleNote_Db4.wav',
      },
      ['A본청']: {
        ['평음']: 'A_06_SingleNote_A3.wav',
        ['농현']: 'A_06a_NongB_A3.wav',
        ['꺾는음']: 'A_06_SingleNote_A3.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 6.5,
    position: { top: 0, height: 0 },
    label: '7 땅',
    hexCode: '#2F2D59CC',
    alterHexCode: '#2F2D59CC',
    ['구음']: '땅',
    ['기보음']: {
      ['C본청']: '라',
      ['Db본청']: '라',
      ['A본청']: '라',
    },
    ['실제음']: {
      ['C본청']: '레',
      ['Db본청']: '미♭',
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
    position: { top: 0, height: 0 },
    label: '8 지',
    hexCode: '#8C2FE8CC',
    alterHexCode: '#8C2FE8CC',
    ['구음']: '지',
    ['기보음']: {
      ['C본청']: '시',
      ['Db본청']: '시',
      ['A본청']: '시',
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
        ['꺾는음']: 'C_08_SingleNote_E4.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_08_SingleNote_F4.wav',
        ['농현']: 'Db_08a_NongB_F4.wav',
        ['꺾는음']: 'Db_08_SingleNote_F4.wav',
      },
      ['A본청']: {
        ['평음']: 'A_08_SingleNote_C4.wav',
        ['농현']: 'A_08a_NongB_C4.wav',
        ['꺾는음']: 'A_08_SingleNote_C4.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 5.5,
    position: { top: 0, height: 0 },
    label: '9 찡',
    hexCode: '#FF7C00CC',
    alterHexCode: '#00CC66',
    ['구음']: '찡',
    ['기보음']: {
      ['C본청']: '레',
      ['Db본청']: '레',
      ['A본청']: '도',
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
        ['꺾는음']: 'C_09_SingleNote_G4.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_09_SingleNote_Ab4.wav',
        ['농현']: 'Db_09a_NongB_Ab4.wav',
        ['꺾는음']: 'Db_09_SingleNote_Ab4.wav',
      },
      ['A본청']: {
        ['평음']: 'A_09_SingleNote_D4.wav',
        ['농현']: 'A_09a_NongB_D4.wav',
        ['꺾는음']: 'A_09_SingleNote_D4.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 5,
    position: { top: 0, height: 0 },
    label: '10 칭',
    hexCode: '#FFC500CC',
    alterHexCode: '#FFC500CC',
    ['구음']: '칭',
    ['기보음']: {
      ['C본청']: '미',
      ['Db본청']: '미',
      ['A본청']: '미',
    },
    ['실제음']: {
      ['C본청']: '라',
      ['Db본청']: '시♭',
      ['A본청']: '파',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_10_SingleNote_A4.wav',
        ['농현']: 'C_10a_NongB_A4.wav',
        ['꺾는음']: 'C_10_SingleNote_A4.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_10_SingleNote_Bb4.wav',
        ['농현']: 'Db_10a_NongB_Bb4.wav',
        ['꺾는음']: 'Db_10_SingleNote_Bb4.wav',
      },
      ['A본청']: {
        ['평음']: 'A_10_SingleNote_F4.wav',
        ['농현']: 'A_10a_NongB_F4.wav',
        ['꺾는음']: 'A_10_SingleNote_F4.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 4.5,
    position: { top: 0, height: 0 },
    label: '11 쫑',
    hexCode: '#0073FFCC',
    alterHexCode: '#0073FFCC',
    ['구음']: '쫑',
    ['기보음']: {
      ['C본청']: '솔',
      ['Db본청']: '솔',
      ['A본청']: '솔',
    },
    ['실제음']: {
      ['C본청']: '도',
      ['Db본청']: '레♭',
      ['A본청']: '라',
    },
    audio: {
      ['C본청']: {
        ['평음']: 'C_11_SingleNote_C5.wav',
        ['농현']: 'C_11a_NongB_C5.wav',
        ['꺾는음']: 'C_11_SingleNote_C5.wav',
      },
      ['Db본청']: {
        ['평음']: 'Db_11_SingleNote_Db5.wav',
        ['농현']: 'Db_11a_NongB_Db5.wav',
        ['꺾는음']: 'Db_11_SingleNote_Db5.wav',
        // ['꺾는음']: 'Db_11b_Break_C4.wav', ///////////////////////// 파일없음
      },
      ['A본청']: {
        ['평음']: 'A_11_SingleNote_A4.wav',
        ['농현']: 'A_11a_NongB_A.wav',
        ['꺾는음']: 'A_11_SingleNote_A4.wav',
      },
    },
  },
  {
    isShaking: false,
    height: 4,
    position: { top: 0, height: 0 },
    label: '12 쨍',
    hexCode: '#2F2D59CC',
    alterHexCode: '#2F2D59CC',
    ['구음']: '쨍',
    ['기보음']: {
      ['C본청']: '라',
      ['Db본청']: '라',
      ['A본청']: '라',
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

const stringRef = ref([]);

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)
const imageSrc = ref(mobileBridge)

const selectedTechnic = ref('평음');

const lastEventHandled = ref(null);

const hcImage1Ele = ref(null)
const hcImage2Ele = ref(null)

const hcImage1Width = ref(null)
const hcImage2Width = ref(0)

function getImageSrc() {
  return windowWidth.value <= 1023 ? mobileBridge : desktopBridge
}

function handleKeyup(event) {
  if (!event.ctrlKey) selectedTechnic.value = '평음';
  else if (!event.altKey) selectedTechnic.value = '평음';
}


function handleKeydown(event) {
  if (event.shiftKey) selectedTechnic.value = '농현';
  else if (event.altKey) selectedTechnic.value = '꺾는음';

  if (event.repeat) return;
  const keyMap = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187];
  const index = keyMap.indexOf(event.keyCode);
  if (index >= 0) {
    playString(event, stringInfo?.[index], index)();
  }
}

function handleResize() {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
  updateImageSize();
  imageSrc.value = getImageSrc();

  nextTick(() => {
    stringRef.value.forEach((ref, index) => {
      const rect = ref.getBoundingClientRect();
      stringInfo[index].position = { top: rect.top, height: rect.height };
    });
  });
}

function updateImageSize() {
  if (hcImage1Ele.value) {
    hcImage1Width.value = hcImage1Ele.value.clientWidth;
  }
  if (hcImage2Ele.value) {
    hcImage2Width.value = hcImage2Ele.value.clientWidth - 4;
  }
}

function selectedNote(val, _selectedNote, _selectedTuning) {
  switch (_selectedNote) {
    case '구음':
      return val['구음']
    case '기보음':
      return val['기보음'][_selectedTuning]
    case '실제음':
      return val['실제음'][_selectedTuning]
    case '표시 안함':
      return;
    default:
      return;
  }
}

async function getMedia(constrains) {
  // if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  //   const initialContrains = {
  //     audio: true,
  //     video: false
  //   } // 특별한 요구사항 없이 오디오와 비디오 요청
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia(initialContrains);
  //     const video = document.createElement('video');
  //     video.srcObject = stream;
  //     video.muted = true;
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}

async function loadSound() {
  const _que = [];
  for (const info of stringInfo) {
    for (const tuning of ['C본청', 'Db본청', 'A본청']) {
      for (const technic of ['평음', '농현', '꺾는음']) {
        if (typeof info.audio[tuning][technic] !== 'string') continue;
        const path = new URL(`/src/assets/wav/${info.audio[tuning][technic]}`, import.meta.url).href;
        _que.push((async (_info, _tuning, _technic) => {
          try {
            const response = await fetch(path);
            const arrayBuffer = await response.arrayBuffer();
            _info.audio[_tuning][_technic] = await audioContext.decodeAudioData(arrayBuffer);
          } catch (error) {
            _info.audio[_tuning][_technic] = null;
            console.error(error);
          }
        })(info, tuning, technic));
      }
    }
  }
  await Promise.all(_que);
  setTimeout(() => {
    commonStore.isLoadedAudios = true;
    openChrome()
  }, 1000);
}

function playString(event, val, index) {
  return function (direction, mouseEvent) {
    const _audio = val['audio']?.[selectedTuning.value]?.[selectedTechnic.value];
    if (
        (lastEventHandled?.value?.eventType?.includes('move')
            && lastEventHandled?.value?.['구음'] === val['구음'])
        || _audio === null
    ) {
      lastEventHandled.value = { eventType: (event || direction)?.type, ['구음']: val['구음'] };
      return;
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }

    const source = audioContext.createBufferSource();
    source.buffer = _audio;
    source.connect(audioContext.destination);
    source.start(0);
    source.onended = () => {
      source.disconnect();
    };
    stringInfo[index].isShaking = true;

    const _e = setTimeout(() => {
      stringInfo[index].isShaking = false;
      clearTimeout(_e);
    }, 3000);
    lastEventHandled.value = { eventType: (event || direction)?.type, ['구음']: val['구음'] };
  };
}

function dragString(){
  return function (direction, mouseEvent) {
    const pageY = direction.pageY || direction.targetTouches?.[0]?.pageY
    stringInfo.forEach((info, index) => {
      if (
          lastEventHandled?.value?.['구음'] === info['구음']
      ) return;
      if (info.position.top < pageY && (info.position.top + info.position.height) > pageY) {
        playString(direction, stringInfo?.[index], index)();
      }
    });
  }
}

function setSelectedTechnic(technic) {
  return function (direction, mouseEvent) {
    selectedTechnic.value = technic;
  };
}

function openChrome() {
  if (/SamsungBrowser/i.test(navigator.userAgent)) {
    alert("본 사이트는 크롬 브라우저 사용을 권장합니다.");
    window.location.href = "intent:" + window.location.host + "#Intent;scheme=https;package=com.android.chrome;end";
  }
}

onMounted(() => {
  updateImageSize()
  handleResize()
  getMedia()
  loadSound()
  window.addEventListener('resize', handleResize)
  window.addEventListener('keyup', handleKeyup)
  window.addEventListener('keydown', handleKeydown)
  hcImage1Ele.value.addEventListener('load', updateImageSize)
  hcImage2Ele.value.addEventListener('load', updateImageSize)
  // drawCanvas()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.addEventListener('keyup', handleKeyup)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative w-full h-full flex flex-row select-none" @contextmenu.native="$event.preventDefault();">
    <div class="flex w-full flex-col h-[95%]">
      <div
          class="absolute notMobile:top-[-53px] mobile:top-[-26px] left-0 h-screen notMobile:w-[7%] mobile:w-[20%] cursor-pointer"
          v-touch:press="setSelectedTechnic('농현')"
          v-touch:release="setSelectedTechnic('평음')"
          :style="{
          height: `${windowHeight}px`,
          zIndex: 100
        }"
      >
        <div class="absolute w-[90%] h-[90%] top-[5%] left-[5%] bg-[#fff] rounded-lg bg-opacity-15 justify-center items-center flex">
        </div>
      </div>
      <div
          class="absolute notMobile:top-[-53px] mobile:top-[-26px] notMobile:left-[7%] mobile:left-[20%] h-screen notMobile:w-[7%] mobile:w-[20%] cursor-pointer"
          v-touch:press="setSelectedTechnic('꺾는음')"
          v-touch:release="setSelectedTechnic('평음')"
          :style="`height: ${windowHeight}px; z-index: 100;`"
      >
      </div>
      <div v-if="guideStore.openGuide" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" style="z-index: 100" />
      <div v-for="(val, index) in stringInfo" class="relative flex flex-1 items-center">
        <div
            v-if="[2, 6, 11].includes(index)"
            class="absolute h-full notMobile:top-0 mobile:top-0 notMobile:left-[7%] mobile:left-[20%] notMobile:w-[7%] mobile:w-[20%]"
        >
          <div class="absolute w-full h-full top-0 left-0 bg-[#fff] rounded-lg bg-opacity-15" />
        </div>
        <div
            class="absolute top-0 left-0 w-[100%] flex items-center h-full border-none mobile:w-[100%] mobile:py-[0px] pointer-events-none"
        >
          <div class="flex justify-start items-center w-full h-[16px] border-none pointer-events-none">
            <div
                class="stringBackground border-none notMobile:rounded-r-full pointer-events-none"
                :class="{ shake: stringInfo[index].isShaking }"
                :style="{
                width: `calc(100% - ${hcImage2Width}px)`,
                height: `${val.height}px`,
                zIndex: 99,
                ...(settingStore.isLineColor ? { backgroundColor: settingStore.selectedTuning === 'A본청' && index === 8 ? val.alterHexCode : val.hexCode } : { backgroundImage: 'linear-gradient(#eee, #999)' })
              }"
            />
            <img
                class="absolute mobile:hidden pointer-events-none"
                src="../assets/hole.png"
                draggable="false"
                alt="hole"
                :style="`right: ${hcImage2Width - 25}px; z-index: 98`"
            >
          </div>
        </div>
        <!--     시김새 영역 15 45     -->
        <div
            class="relative w-[15%] flex items-center h-full border-none mobile:w-[45%] mobile:py-[0px] cursor-pointer pointer-events-none"
        >
          <Transition name="fade">
            <div v-if="guideStore.openGuide && index === 3" class="absolute top-1/2 left-[25%] transform -translate-y-1/2 -translate-x-1/2 w-[50px] h-[50px] rounded-full" style="z-index: 102;" v-show="guideStore.selectedIndex === 0">
              <div class="w-full h-full bg-white opacity-50 rounded-full"></div>
              <GuideArrowLeft class="absolute top-[-50px] left-[21px] miniTablet:hidden" style="z-index: 103;"/>
              <GuidePointer class="absolute bottom-[-32px] left-[66%] transform -translate-x-1/2" style="width:40px; height: 50px; z-index: 103;"/>
              <div class="absolute notMiniTablet:top-[-40px] miniTablet:bottom-[-72px] notMiniTablet:right-[-580px] miniTablet:right-[-256px] miniTablet:w-[313px] notMiniTablet:text-[28px] miniTablet:text-[21px] text-[#fff] flex justify-center items-center select-none" style="z-index: 102;">
                <p class="text-center"><span class="text-[#5E95FF]">이 영역</span>을 누르면 떠는 <br class="notMiniTablet:hidden"/>소리(농현)를 낼 수 있어요</p>
              </div>
            </div>
          </Transition>
          <Transition name="fade">
            <div v-if="guideStore.openGuide && index === 9" class="absolute top-1/2 notMiniTablet:left-[70%] miniTablet:left-[70%] transform -translate-y-1/2 -translate-x-1/2 w-[75px] h-[54px] rounded-[27px]" style="z-index: 102;" v-show="guideStore.selectedIndex === 0">
              <div class="w-full h-full rounded-[27px] bg-[#FFFC5E66]"></div>
              <div class="absolute notMiniTablet:top-1/2 transform notMiniTablet:-translate-y-1/2 miniTablet:-translate-x-1/2 notMiniTablet:right-[-520px] miniTablet:right-[-375px] miniTablet:w-[313px] notMiniTablet:text-[28px] miniTablet:text-[21px] text-[#fff] flex justify-center items-center select-none" style="z-index: 102;">
                <p class="text-left">노란색 버튼을 누르면 꺾는<br class="notMiniTablet:hidden"/> 소리를 낼 수 있어요</p>
              </div>
            </div>
          </Transition>
        </div>
        <!--     안족 배열 60 55    -->
        <div class="relative w-[45%] flex items-center h-full mobile:w-[10%] mobile:py-[0px] border-none">
          <!--          <div class="flex justify-center items-center w-full h-[16px] border-none">-->
          <!--            <div :class="[`w-full border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>-->
          <!--          </div>-->
          <div
              class="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-[3]"
              :style="`left: calc(${index} * (100% / 12))`"
          >
            <img
                :src="imageSrc"
                alt="안족"
                class="pointer-events-none mobile:w-[42px] mobile:h-[84px]"
                :style="{
                maxWidth: 'none',
                aspectRatio: '1/1',
                height: windowWidth <= 599 ? `${windowHeight / 10}px` : 'auto'
              }"
                draggable="false"
            >
          </div>
        </div>
        <!--     라벨 영역 65 60    -->
        <div class="relative w-[5%] flex items-center h-full border-none mobile:py-[0px]">
          <div
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#000] flex justify-center items-center whitespace-nowrap rounded-[24px] bg-opacity-50 notMobile:min-w-[76px] notMobile:min-h-[48px] mobile:min-w-[68px] mobile:h-[40px] mobile:px-1 gap-2 mobile:gap-1 mobile:w-auto py-[6px] mobile:py-0 notMobile:text-[24px] mobile:text-[20px]"
              :style="[
              { zIndex: 99 },
              settingStore.isLineColor ? { backgroundColor: settingStore.selectedTuning === 'A본청' && index === 8 ? val.alterHexCode : val.hexCode } : {},
              windowHeight <= 659 ? { height: '95%', minHeight: 'auto', fontSize: '20px' } : {}
            ]"
          >
            <span
                class="font-normal text-[#fff] flex justify-center items-center w-[22px]">{{index + 1 }}</span>
            <div
                v-if="settingStore.selectedNote !== '표시 안함'"
                class="flex justify-center items-center rounded-full"
            >
              <span class="font-normal text-[#fff] flex justify-center items-center">{{ selectedNote(val, settingStore.selectedNote, selectedTuning) }}</span>
            </div>
          </div>
          <!--            <div :class="[`w-full border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>-->
        </div>
        <!--     연주 영역 90 100   -->
        <!--        <div class="w-[25%] flex items-center h-full border-none mobile:w-[40%] mobile:py-[0px]"-->
        <!--             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[0px]'"-->
        <!--             @mousedown="playString($event, val, settingStore.selectedTuning, selectedTechnic)"-->
        <!--        >-->
        <div
            ref="stringRef"
            class="relative w-[25%] flex items-center h-full border-none mobile:w-[40%] mobile:py-[0px] cursor-pointer"
            :style="{
            zIndex: guideStore.openGuide && index === 6 ? 102 : 1,
          }"
            v-touch:drag.once="dragString()"
            v-touch:press="playString($event, val, index)"
        >
          <!--          <div class="flex justify-center items-center w-full h-[16px] border-none">-->
          <!--            <div :class="[`w-full border-none`]" :style="`height: ${val.height}px;`"></div>-->
          <!--          </div>-->
          <Transition name="fade">
            <div v-if="guideStore.openGuide && index === 6" v-show="guideStore.selectedIndex === 0" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[50px] h-[50px] rounded-full" style="z-index: 102;">
              <div class="w-full h-full bg-white opacity-50 rounded-full"></div>
              <GuidePointer class="absolute bottom-[-32px] left-[66%] transform -translate-x-1/2" style="width:40px; height: 50px; z-index: 103;"/>
              <div class="absolute notMiniTablet:left-1/2 transform notMiniTablet:-translate-x-1/2 miniTablet:right-[-48px] notMiniTablet:top-[85px] miniTablet:top-[85px] notMiniTablet:w-[350px] miniTablet:w-[260px] notMiniTablet:text-[28px] miniTablet:text-[21px] text-[#fff] flex justify-center items-center select-none" style="z-index: 102;">
                <p class="text-center">연주 영역을 터치하여 <br class="notMiniTablet:hidden" />가야금을 연주해보세요</p>
              </div>
            </div>
          </Transition>
          <!--          <div v-if="guideStore.openGuide && index === 5" class="absolute notMiniTablet:left-1/2 transform notMiniTablet:-translate-x-1/2 miniTablet:right-[-32px] notMiniTablet:top-[100px] miniTablet:top-[105px] notMiniTablet:w-[350px] miniTablet:w-[260px] notMiniTablet:text-[28px] miniTablet:text-[21px] text-[#fff] flex justify-center items-center select-none" style="z-index: 102;">-->
          <!--            <p class="text-center">연주 영역을 터치하여 <br class="notMiniTablet:hidden" />가야금을 연주해보세요</p>-->
          <!--          </div>-->
        </div>
        <!--     현침  100 100   -->
        <div class="w-[10%] flex items-center h-full border-none mobile:hidden mobile:py-[0px]" draggable="false">
          <!--          <div class="flex justify-center items-center w-full h-[16px] border-none">-->
          <!--            <div :class="[`w-full border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
    <div class="absolute right-0 top-[-53px] mobile:hidden flex flex-row pointer-events-none" style="z-index: 2" draggable="false">
      <img
          src="../assets/hyunchime-pattern.png"
          draggable="false"
          alt="pattern"
          class="h-screen absolute pointer-events-none"
          :style="`right: ${hcImage1Width + hcImage2Width - 4}px`"
      >
      <img ref="hcImage1Ele" src="../assets/hyunchime-1.png" class="h-screen pointer-events-none" draggable="false" alt="hyunchime-1" style="z-index: 1">
      <img ref="hcImage2Ele" src="../assets/hyunchime-2.png" class="h-screen pointer-events-none" draggable="false" alt="hyunchime-2">
    </div>
  </div>
</template>

<style scoped>
.stringBackground {
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
