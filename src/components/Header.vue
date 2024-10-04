<script setup>
import {ref} from 'vue';
import SettingsPanel from './SettingPanel.vue';
import {useGuideStore} from "../stores/guide.js";

import Bars from '../assets/bars-3.vue'
import BarsMobile from '../assets/bars-3-mobile.vue'
import Logo from '../assets/logo.vue'
import LogoMobile from '../assets/logo-mobile.vue'

const guideStore = useGuideStore()

const settingsOpen = ref(false);

function toggleSettings() {
  if (!guideStore.openGuide) {
    settingsOpen.value = !settingsOpen.value
  }
}
</script>

<template>
  <header class="relative flex w-full notMobile:min-h-[53px] notMobile:h-[53px] mobile:h-[26px] bg-transparent" aria-label="Header" style="z-index:102">
    <div class="flex flex-row w-full justify-between" style="z-index: 2">
      <div class="flex flex-1 h-fit justify-start notMobile:pt-8 mobile:pt-4 notMobile:pl-[28px] mobile:pl-5">
        <Logo class="hidden notMobile:flex" />
        <LogoMobile class="hidden mobile:flex" />
      </div>
      <div v-if="!settingsOpen" class="flex flex-1 h-full justify-end notMobile:pt-4 notMobile:pr-4 mobile:pt-2 mobile:pr-2">
        <button
          type="button"
          aria-label="셋팅"
          class="notMobile:w-[56px] notMobile:h-[56px] mobile:w-[40px] mobile:h-[40px] flex justify-center items-center bg-[#fff] border-[1px] border-[#0000001A] rounded-full"
          style="box-shadow: 0 8px 8px 0 #000000A6"
          @click="toggleSettings"
        >
          <Bars class="hidden notMobile:flex" />
          <BarsMobile class="hidden mobile:flex" />
        </button>
      </div>
      <div v-if="guideStore.openGuide" class="absolute right-8 top-[100px] notMobile:text-[28px] mobile:text-[21px] text-[#fff] flex justify-center items-center select-none">
        <p class="text-center">여기서 조율, 음표시, 줄 색깔<br class="notMobile:hidden" /> <span class="text-green-700">옵션</span>을<br class="mobile:hidden" /> <span class="text-green-700">선택</span>할 수 있어요.</p>
      </div>
      <transition name="slide-fade" style="z-index: 2">
        <SettingsPanel v-if="settingsOpen" @close="toggleSettings" />
      </transition>
    </div>
  </header>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
