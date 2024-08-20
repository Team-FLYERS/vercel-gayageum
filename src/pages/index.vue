<script setup>
import GayageumHeader from '../components/Header.vue'
import GayageumBody from '../components/Gayageum.vue'
import Guide from '../components/Guide.vue'
import Loading from '../components/Loading.vue'
import {useSettingStore} from "../stores/settings.js"
import {useGuideStore} from "../stores/guide.js"
import {useCommonStore} from "../stores/common.js"

const settingStore = useSettingStore()
const guideStore = useGuideStore()
const commonStore = useCommonStore()

// const guide = ref(false);

</script>

<template>
  <!--  bg-custom-image bg-cover-->
  <div class="w-full flex flex-col bg-custom-image bg-cover flex-1 bg-center h-screen overflow-hidden">
    <div class="w-full flex flex-col h-full mobile:h-auto">
      <GayageumHeader/>
      <GayageumBody/>
<!--      <Guide v-if="guideStore.openGuide"/>-->
    </div>
    <Loading v-if="!commonStore.isLoadedAudios"/>

<!--    <div class="flex flex-1 bg-[#000] bg-opacity-80 overflow-hidden" style="z-index: 3; filter: blur(4px);"></div>-->

  </div>
</template>

<style scoped>
</style>