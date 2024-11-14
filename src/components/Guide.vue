<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from 'vue'
import {useGuideStore} from "../stores/guide.js";
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide} from 'vue3-carousel'

import guide1 from '../assets/guide_1.png'
import guide2 from '../assets/guide_2.png'
import guide1Mobile from '../assets/guide_1_mobile.png'
import guide2Mobile from '../assets/guide_2_mobile.png'
import guide3Mobile from '../assets/guide_3_mobile.png'

import BtnPrev from '../assets/btn_prev.png'
import BtnNext from '../assets/btn_next.png'

const guideStore = useGuideStore()

const myCarousel = ref(null)

const slideStart = ({slidingToIndex, currentSlideIndex, prevSlideIndex, slidesCount}) => {
  guideStore.selectedIndex = slidingToIndex;
};

const onClickItem = (index) => {
  myCarousel.value.slideTo(index);
};

const isMobile = computed(() => {
  const info = navigator.userAgent;
  var flag = false;

  if( info.indexOf("iPhone") > -1
      || info.indexOf("Android") > -1
      || info.indexOf("iPad") > -1
      || info.indexOf("iPod") > -1
  ) {
    flag = true;
  }
  return flag;
});

const handleKeyup = (event) => {
  if (event.keyCode === 37 || event.keyCode === 39) {
    myCarousel.value.next();
  }
};

onMounted(() => {
  window.addEventListener('keyup', handleKeyup);
})

onBeforeUnmount(() => {
  window.addEventListener('keyup', handleKeyup);
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full" style="z-index: 103">
    <div class="relative w-full h-full flex flex-row" style="z-index: 100">
      <Carousel ref="myCarousel" @slide-start="slideStart" :wrapAround="true">
        <Slide :key="0" v-if="!isMobile">
          <div class="carousel__item">
            <div
                class="absolute flex top-0 left-0 w-full h-full justify-center items-center"
                style="z-index: 1; background-color: #000;"
            >
              <img class="h-[100%]" :src="guide1"  alt=""/>
            </div>
          </div>
        </Slide>
        <Slide :key="1" v-if="!isMobile">
          <div class="carousel__item">
            <div
                class="absolute flex top-0 left-0 w-full h-full justify-center items-center"
                style="z-index: 1; background-color: #000;"
            >
              <img class="h-[100%]" :src="guide2"  alt=""/>
            </div>
          </div>
        </Slide>
        <Slide :key="0" v-if="isMobile">
          <div class="carousel__item">
            <div
                class="absolute flex top-0 left-0 w-full h-full justify-center items-center"
                style="z-index: 1; background-color: #000;"
            >
              <img class="h-[100%]" :src="guide1Mobile"  alt=""/>
            </div>
          </div>
        </Slide>
        <Slide :key="1" v-if="isMobile">
          <div class="carousel__item">
            <div
                class="absolute flex top-0 left-0 w-full h-full justify-center items-center"
                style="z-index: 1; background-color: #000;"
            >
              <img class="h-[100%]" :src="guide2Mobile"  alt=""/>
            </div>
          </div>
        </Slide>
        <Slide :key="2" v-if="isMobile">
          <div class="carousel__item">
            <div
                class="absolute flex top-0 left-0 w-full h-full justify-center items-center"
                style="z-index: 1; background-color: #000;"
            >
              <img class="h-[100%]" :src="guide3Mobile"  alt=""/>
            </div>
          </div>
        </Slide>

        <template #addons="{ currentSlide, slidesCount }">
          <ol class="carousel__pagination">
            <li class="carousel__pagination-item" v-for="index in slidesCount">
              <button
                  type="button"
                  class="carousel__pagination-button"
                  :class="{ 'carousel__pagination-button--active': (index-1) === currentSlide }"
                  :id="(index-1)"
                  :aria-label="`Navigate to slide ${(index-1) === currentSlide}`"
                  @click="onClickItem(index-1)"
              />
            </li>
          </ol>
        </template>
      </Carousel>
      <button
          type="button"
          aria-label="닫기"
          class="absolute bottom-[50%] notMiniTablet:left-8 transform cursor-pointer miniTablet:bottom-[50%] miniTablet:left-[16px] select-none btn-nav"
          style="z-index: 2; background: none;"
          @click="onClickItem((guideStore.selectedIndex - 1) % (isMobile ? 3 : 2))"
      >
        <img :src="BtnPrev" alt="" />
      </button>
      <button
          type="button"
          aria-label="닫기"
          class="absolute bottom-[50%] notMiniTablet:right-8 transform cursor-pointer miniTablet:bottom-[50%] miniTablet:right-[16px] select-none btn-nav"
          style="z-index: 2; background: none;"
          @click="onClickItem((guideStore.selectedIndex + 1) % (isMobile ? 3 : 2))"
      >
        <img :src="BtnNext" alt="" />
      </button>
      <button
          type="button"
          aria-label="닫기"
          class="absolute bottom-[32px] notMiniTablet:right-8 transform px-14 py-3 font-bold text-[#fff] text-xl bg-green-700 rounded-[32px] cursor-pointer miniTablet:bottom-[16px] miniTablet:px-5 miniTablet:py-3 miniTablet:rounded-[16px] miniTablet:right-[16px] select-none"
          style="z-index: 2"
          @click="guideStore.openGuide = false"
      >
        닫기
      </button>
    </div>
  </div>
</template>

<style>
.carousel {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.carousel__viewport, .carousel__track {
  height: 100%;
}


.carousel__item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__pagination {
  position: absolute;
  left: 50%;
  display: flex;
  justify-content: center;
  list-style: none;
  line-height: 0;
  padding: 0;
  margin: -40px 0 0;
  margin-left: -38px;
  z-index: 200;
}

.carousel__pagination-button::after {
  background-color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 15px;
}

.carousel__pagination-button--active::after {
  width: 40px;
  background-color: rgb(21 128 61);
}

.btn-nav {
  opacity: 0.2;
}

.btn-nav:hover {
  opacity: 0.7;
}

@media (hover: hover) {
  .carousel__pagination-button:hover::after {
    background-color: rgb(21 128 61);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
