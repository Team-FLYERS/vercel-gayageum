<script setup>
import {onMounted} from 'vue'
import {useGuideStore} from "../stores/guide.js";

const guideStore = useGuideStore()

onMounted(() => {
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" style="z-index: 101;">
    <div class="relative w-full h-full">
      <button
          type="button"
          aria-label="닫기"
          class="absolute bottom-[32px] notMobile:right-8 transform px-14 py-3 font-bold text-[#fff] text-xl bg-green-700 rounded-[32px] cursor-pointer mobile:bottom-[16px] mobile:px-5 mobile:py-3 mobile:rounded-[16px] mobile:right-[16px]"
          @click="guideStore.openGuide = false"
      >
        닫기
      </button>
      <!--      <div class="flex flex-row w-full h-[40px] bg-red-500 absolute bottom-[100px]">-->
      <!--        <div class="w-[50%] h-full bg-amber-400"></div>-->
      <!--        <div class="w-[50%] h-full bg-blue-400"></div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style scoped>

</style>