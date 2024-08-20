<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'

import mobileBridge from '../assets/bridge-mobile.png'
import desktopBridge from '../assets/bridge-lg.png'


const hyun = [
  {
    id: 1,
    height: 9.5,
    label: '1 청',
  },
  {
    id: 2,
    height: 9,
    label: '2 흥',
  },
  {
    id: 3,
    height: 8.5,
    label: '3 둥',
  },
  {
    id: 4,
    height: 8,
    label: '4 당',
  },
  {
    id: 5,
    height: 7.5,
    label: '5 동',
  },
  {
    id: 6,
    height: 7,
    label: '6 징',
  },
  {
    id: 7,
    height: 6.5,
    label: '7 땅',
  },
  {
    id: 8,
    height: 6,
    label: '8 지',
  },
  {
    id: 9,
    height: 5.5,
    label: '9 찡',
  },
  {
    id: 10,
    height: 5,
    label: '10 칭',
  },
  {
    id: 11,
    height: 4.5,
    label: '11 쫑',
  },
  {
    id: 12,
    height: 4,
    label: '12 챙',
  },
]

const windowWidth = ref(window.innerWidth)
const imageSrc = ref(mobileBridge)
const imgRef = ref(null)
const imgHeight = ref(0)

function getImageSrc() {
  return windowWidth.value <= 599 ? mobileBridge : desktopBridge
}

function handleResize() {
  windowWidth.value = window.innerWidth
  if (imgRef.value) {
    imgHeight.value = imgRef.value.offsetHeight
    console.log('imgRef.value.offsetHeight; ', imgHeight.value)
  }
}

function updateImageSrc() {
  imageSrc.value = getImageSrc()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('resize', updateImageSrc)
  handleResize()
  getImageSrc()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('resize', updateImageSrc)
})
</script>

<template>
  <div class="relative w-full h-full flex flex-row select-none">
    <div class="flex w-full flex-col mobile:mt-[10px]">
      <div class="w-full" :style="{  height: (imgHeight-40) / 12 + 'px', backgroundColor: 'red' }"></div>
<!--      :style="{ height: (imgHeight-40) / 12 + 'px' }"-->
      <div v-for="(val, index) in hyun" class="relative flex items-center" :style="{ height: (imgHeight-40) / 12 + 'px' }">
        <!--     시김새 영역     -->
        <div class="w-[15%] border-none mobile:w-[25%] mobile:py-[26px]"
             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'">
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div :class="[`w-full bg-[#fff] border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>
          </div>
        </div>
        <!--     안족 배열     -->
        <div class="relative w-[45%] border-none mobile:w-[30%] mobile:py-[26px]"
             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'">
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div :class="[`w-full bg-[#fff] border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>
          </div>
          <div class="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-[1]"
               :style="`left: calc(${index} * (100% / 12))`">
            <img
                :src="imageSrc"
                alt="안족"
                class="max-w-full max-h-full object-contain min-w-[80px] min-h-[212px] miniTablet:min-w-[80px] miniTablet:min-h-[212px] mobile:min-w-[62px] mobile:min-h-[139px]"
            >
          </div>
        </div>
        <!--     라벨 영역     -->
        <div class="relative w-[5%] border-none mobile:py-[26px]"
             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'">
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div
                class="absolute transform -translate-y-1/2 bg-black flex justify-center items-center whitespace-nowrap rounded-tr-[16px] rounded-tl-[16px] bg-opacity-60 mobile:w-auto mobile:h-fit px-4 py-[6px] mobile:px-1 mobile:py-0 mobile:text-[12px] mobile:rounded-tr-[8px] mobile:rounded-tl-[8px]"
                style="z-index: 10"
            >
              <span class="text-[18px] font-normal text-[#fff]">{{
                  windowWidth <= 599 ? val.label.replaceAll(" ", "") : val.label
                }}</span>
            </div>
            <div :class="[`w-full bg-[#fff] border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>
          </div>
        </div>
        <!--     연주 영역     -->
        <div class="w-[25%] border-none mobile:w-[40%] mobile:py-[26px]"
             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'">
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div :class="[`w-full bg-[#fff] border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>
          </div>
        </div>
        <!--     현침     -->
        <div class="w-[10%] border-none mobile:hidden mobile:py-[26px]"
             :class="index === 0 ? 'mobile:pt-[12px] mobile:pb-[26px]' : 'mobile:py-[26px]'">
          <div class="flex justify-center items-center w-full h-[16px] border-none">
            <div :class="[`w-full bg-[#fff] border-none`]" :style="`height: ${val.height}px; z-index: 99`"></div>
          </div>
        </div>
      </div>
      <div class="w-full" :style="{ height: '4%', backgroundColor: 'red' }"></div>
    </div>
    <div class="absolute right-0 top-[-40px] mobile:hidden">
      <img ref="imgRef" src="../assets/hyunchime.png" class="h-screen" @load="updateImageSize">
    </div>
  </div>
</template>

<style scoped>

</style>