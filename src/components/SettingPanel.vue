<script setup>
import {defineEmits, ref} from 'vue';
import {useSettingStore} from "../stores/settings.js";
import {useGuideStore} from "../stores/guide.js";

const emit = defineEmits(['close']);

function closePanel() {
  emit('close');
}

const settingStore = useSettingStore()
const guideStore = useGuideStore()

const noteTooltip = ref(false)

const tuning = [
  { value: 'C본청', label: 'C 본청' },
  { value: 'Db본청', label: 'D♭본청' },
  { value: 'A본청', label: 'A본청 (육자배기토리)' },
];

const note = [
  { value: '구음', label: '구음' },
  { value: '기보음', label: '기보음' },
  { value: '실제음', label: '실제음' },
  { value: '표시 안함', label: '표시 안함' }
];

function selectTuning(value) {
  settingStore.selectedTuning = value;
}

function handleChangeTuning(event) {
  settingStore.selectedTuning = event.target.value;
}

function selectNote(value) {
  settingStore.selectedNote = value;
}

function handleChangeNote(event) {
  settingStore.selectedNote = event.target.value;
}

function toggleLineColor() {
  settingStore.isLineColor = !settingStore.isLineColor;
}

function handleGuide() {
  emit('close')
  guideStore.openGuide = true
}
</script>

<template>
  <div
    id="settings-panel"
    class="fixed inset-y-0 right-0 h-full bg-custom-gradient shadow-lg max-w-[400px] w-full px-10 pt-[32px] rounded-tl-[24px] rounded-bl-[24px] mobile:max-w-[344px]"
    aria-label="셋팅 창"
  >
    <div class="w-full flex justify-between items-center mb-6 select-none">
      <span class="text-[32px] font-semibold leading-[38px] text-[#000]">설정</span>
      <button
          class="bg-transparent"
          aria-label="설정 닫기"
          @click="closePanel"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z"
                fill="#0F172A"/>
        </svg>
      </button>
    </div>
    <div class="flex flex-col w-full gap-2 mb-6 select-none">
      <span class="text-[18px] font-semibold leading-[21px] text-[#000]">조율</span>
      <div class="flex flex-col w-full bg-[#fff] border border-[#E6E6E6] rounded-[16px]">
        <label
            v-for="(option, index) in tuning"
            :key="option.value" class="flex items-center w-full h-[56px] px-[32px] cursor-pointer"
            :class="{ 'border-b border-[#E6E6E6]': index !== tuning.length - 1 }"
        >
          <input
              type="radio"
              :id="option.value"
              name="radiobutton"
              :value="option.value"
              v-model="settingStore.selectedTuning"
              class="sr-only"
              @change="handleChangeTuning"
          />
          <div
              :class="[
              'flex items-center justify-center w-6 h-6 border rounded-full cursor-pointer',
              settingStore.selectedTuning === option.value ? 'border-[#3B7EFF]' : 'border-[#E6E6E6]'
            ]"
              :aria-checked="settingStore.selectedTuning === option.value"
              role="radio"
              tabindex="0"
              @click="selectTuning(option.value)"
              @keydown.enter.space.prevent="selectTuning(option.value)"
          >
            <span
                :class="[
                  'w-4 h-4 rounded-full',
                settingStore.selectedTuning === option.value ? 'bg-[#3B7EFF]' : 'bg-transparent'
              ]"
            ></span>
          </div>
          <span
              :class="[
                'ml-4 text-[16px] font-normal leading-[19px]',
              settingStore.selectedTuning === option.value ? 'text-[#000]' : 'text-[#666666]'
            ]"
          >{{ option.label }}</span>
        </label>
      </div>
    </div>
    <div class="flex flex-col w-full gap-2 mb-6 justify-center select-none">
      <div class="relative flex flex-row items-center gap-2">
        <span class="text-[18px] font-semibold leading-[21px] text-[#000]">음표시</span>
        <button
            type="button"
            aria-label="음표시 툴팁"
            class="flex w-[21px] h-[21px] justify-center items-center border border-[#000] rounded-full leading-0 text-[#000] bg-transparent cursor-pointer"
            @click="noteTooltip = !noteTooltip"
        >
          ?
        </button>
        <div v-if="noteTooltip" @click="noteTooltip = !noteTooltip" class="fixed top-0 left-0 w-full h-full bg-transparent"></div>
        <div v-if="noteTooltip" class="bubbleChat absolute top-[28px] bg-black bg-opacity-70 p-2 rounded-[8px]">
          <p class="text-[#fff] relative pl-3">
            <span class="absolute left-0 top-0 text-[#fff]">·</span>
            구음: 악기의 소리를 입으로 흉내내어 부르는 방법입니다.
          </p>
          <p class="text-[#fff] relative pl-3">
            <span class="absolute left-0 top-0 text-[#fff]">·</span>
            기보음은 악보에 기록되는 음입니다.
          </p>
          <p class="text-[#fff] relative pl-3">
            <span class="absolute left-0 top-0 text-[#fff]">·</span>
            실제음은 실제로 들리는 음을 의미합니다.
          </p>
        </div>
      </div>
      <div class="flex flex-col w-full bg-[#fff] border border-[#E6E6E6] rounded-[16px]">
        <label
            v-for="(option, index) in note"
            :key="option.value" class="flex items-center w-full h-[56px] px-[32px] cursor-pointer"
            :class="{ 'border-b border-[#E6E6E6]': index !== note.length - 1 }"
        >
          <input
              type="radio"
              :id="option.value"
              name="radiobutton"
              :value="option.value"
              v-model="settingStore.selectedNote"
              class="sr-only"
              @change="handleChangeNote"
          />
          <div
              :class="[
              'flex items-center justify-center w-6 h-6 border rounded-full cursor-pointer',
              settingStore.selectedNote === option.value ? 'border-[#3B7EFF]' : 'border-[#E6E6E6]'
            ]"
              :aria-checked="settingStore.selectedNote === option.value"
              role="radio"
              tabindex="0"
              @click="selectNote(option.value)"
              @keydown.enter.space.prevent="selectNote(option.value)"
          >
            <span
                :class="[
                  'w-4 h-4 rounded-full',
                settingStore.selectedNote === option.value ? 'bg-[#3B7EFF]' : 'bg-transparent'
              ]"
            ></span>
          </div>
          <span
              :class="[
                'ml-4 text-[16px] font-normal leading-[19px]',
              settingStore.selectedNote === option.value ? 'text-[#000]' : 'text-[#666666]'
            ]"
          >{{ option.label }}</span>
        </label>
      </div>
    </div>
    <div class="flex w-full bg-[#fff] border border-[#E6E6E6] rounded-[16px] justify-between items-center px-[32px] h-[64px] select-none mb-6">
      <span class="text-[18px] font-semibold leading-[21px] text-[#000]">줄 색깔</span>
      <button
        :aria-pressed="settingStore.isLineColor.toString()"
        @click="toggleLineColor"
        class="bg-transparent"
      >
        <svg v-if="settingStore.isLineColor" width="48" height="28" viewBox="0 0 48 28" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_25_306)">
            <rect width="48" height="28" rx="14" fill="#3B7EFF"/>
            <g filter="url(#filter0_d_25_306)">
              <circle cx="34" cy="14" r="12" fill="white"/>
            </g>
          </g>
          <rect x="0.5" y="0.5" width="47" height="27" rx="13.5" stroke="black" stroke-opacity="0.05"/>
          <defs>
            <filter id="filter0_d_25_306" x="20" y="2" width="28" height="28" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                             result="hardAlpha"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_306"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_25_306" result="shape"/>
            </filter>
            <clipPath id="clip0_25_306">
              <rect width="48" height="28" rx="14" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <svg v-else width="48" height="28" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_25_304)">
            <rect width="48" height="28" rx="14" fill="#E6E6E6"/>
            <g filter="url(#filter0_d_25_304)">
              <circle cx="14" cy="14" r="12" fill="white"/>
            </g>
          </g>
          <rect x="0.5" y="0.5" width="47" height="27" rx="13.5" stroke="black" stroke-opacity="0.05"/>
          <defs>
            <filter id="filter0_d_25_304" x="0" y="2" width="28" height="28" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                             result="hardAlpha"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_304"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_25_304" result="shape"/>
            </filter>
            <clipPath id="clip0_25_304">
              <rect width="48" height="28" rx="14" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
    <div class="flex w-full bg-[#fff] border border-[#E6E6E6] rounded-[16px] justify-between items-center px-[32px] h-[64px] select-none">
      <span class="text-[18px] font-semibold leading-[21px] text-[#000]">도움말</span>
      <button
        class="bg-transparent"
        @click="handleGuide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.bubbleChat::after {
  display: block;
  width: 0;
  content: "";
  border: 13px solid transparent;
}

.bubbleChat::after {
  position: absolute;
}

.bubbleChat::after {
  border-bottom-color: rgba(0, 0, 0, 0.7);
  border-top: 0;
}

.bubbleChat::after {
  top: -13px;
  left: 55px;
}

</style>
