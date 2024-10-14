<script setup>
import {onMounted} from 'vue'
import {useGuideStore} from "../stores/guide.js";

const guideStore = useGuideStore()

onMounted(() => {
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full" style="z-index: 103">
<!--    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" style="z-index:1"></div>-->
    <div class="relative w-full h-full flex flex-row">
<!--      &lt;!&ndash;     시김새 영역 15 45     &ndash;&gt;-->
<!--      <div-->
<!--        class="w-[15%] flex items-center h-full border-none mobile:w-[45%] mobile:py-[0px]"-->
<!--      >-->
<!--        <div class="flex justify-center items-center w-full h-[16px] border-none">-->
<!--          <div :class="[`w-full border-none`]"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--      &lt;!&ndash;     안족 배열 60 55    &ndash;&gt;-->
<!--      <div class="w-[45%] flex items-center h-full mobile:w-[10%] mobile:py-[0px] border-none">-->
<!--        <div class="flex justify-center items-center w-full h-[16px] border-none">-->
<!--          <div :class="[`w-full border-none`]"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--      &lt;!&ndash;     라벨 영역 65 60    &ndash;&gt;-->
<!--      <div class="relative w-[5%] flex items-center h-full border-none mobile:py-[0px]">-->
<!--      </div>-->
<!--      &lt;!&ndash;     연주 영역 90 100   &ndash;&gt;-->
<!--      <div-->
<!--        class="relative w-[25%] flex justify-center items-center border-none h-full mobile:w-[40%] mobile:py-[0px]"-->
<!--        style="z-index: 2;"-->
<!--      >-->
<!--        <div class="w-[50px] h-[50px] rounded-full bg-white opacity-50" style="z-index: 999;"></div>-->
<!--      </div>-->
      <button
        type="button"
        aria-label="닫기"
        class="absolute bottom-[32px] notMiniTablet:right-8 transform px-14 py-3 font-bold text-[#fff] text-xl bg-green-700 rounded-[32px] cursor-pointer miniTablet:bottom-[16px] miniTablet:px-5 miniTablet:py-3 miniTablet:rounded-[16px] miniTablet:right-[16px] select-none"
        style="z-index: 2"
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