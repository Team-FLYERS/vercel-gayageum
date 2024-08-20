import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('settings', () => {
  const selectedTuning = ref('C본청');
  const selectedNote = ref('표시 안함');
  const isLineColor = ref(false);

  return {
    selectedTuning,
    selectedNote,
    isLineColor,
  }
})
