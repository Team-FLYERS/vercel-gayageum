<script setup>
import GayageumHeader from '../components/Header.vue'
import GayageumBody from '../components/Gayageum.vue'
import Guide from '../components/Guide.vue'
import Loading from '../components/Loading.vue'
import {useGuideStore} from "../stores/guide.js"
import {useCommonStore} from "../stores/common.js"

const guideStore = useGuideStore()
const commonStore = useCommonStore()

</script>

<template>
  <div class="w-full flex flex-col bg-custom-image bg-cover flex-1 bg-center h-dvh overflow-hidden">
    <div class="w-full flex flex-col h-full">
      <GayageumHeader/>
      <GayageumBody/>
      <Guide v-if="guideStore.openGuide"/>
    </div>
    <Loading v-if="!commonStore.isLoadedAudios"/>
  </div>
</template>

<style scoped>
</style>