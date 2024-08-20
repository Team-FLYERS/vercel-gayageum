import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGuideStore = defineStore('guide', () => {
  const openGuide = ref(false);

  return {
    openGuide,
  }
})
