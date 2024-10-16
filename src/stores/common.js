import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('settings', () => {
  const isLoadedAudios = ref(false);
  const isShownLogo = ref(false);

  return {
    isLoadedAudios,
    isShownLogo
  }
})
