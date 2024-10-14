<script setup>
import LoadingLogo from '../assets/logo-loading.vue'
</script>

<template>
  <div class="fixed flex top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center" style="z-index: 105">
    <div class="flex flex-col justify-center items-center w-[240px] py-6 bg-[#fff] rounded-[24px] gap-6">
      <LoadingLogo />
      <div class="flex w-full text-center justify-center items-center">
        <svg class="animate-spin h-[48px] w-[48px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#FFECE0" stroke-width="4"></circle>
          <path fill="#FF863B" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p class="text-[24px] text-[#FF863B] font-normal">LOADING...</p>
    </div>
  </div>
</template>

<style scoped>
</style>
