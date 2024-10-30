<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from 'vue'
import {useGuideStore} from "../stores/guide.js";
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide} from 'vue3-carousel'

import guide2 from '../assets/guide_2.png'

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
    <!--    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" style="z-index:1"></div>-->
    <Transition name="fade">
      <div
          v-show="guideStore.openGuide && guideStore.selectedIndex === 1"
          class="absolute flex top-0 left-0 w-full h-full justify-center items-center"
          style="z-index: 1"
      >
        <img class="max-w-[1280px] max-h-[80%] w-[100%]" :src="guide2"  alt=""/>
      </div>
    </Transition>
    <div class="relative w-full h-full flex flex-row" style="z-index: 100">
      <Carousel ref="myCarousel" @slide-start="slideStart" v-if="!isMobile" :wrapAround="true" :autoplay="5000">
        <Slide :key="0">
          <div class="carousel__item"></div>
        </Slide>
        <Slide :key="1">
          <div class="carousel__item"></div>
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
          class="absolute bottom-[50%] notMiniTablet:left-8 transform cursor-pointer miniTablet:bottom-[50%] miniTablet:left-[16px] select-none btn-nav"
          style="z-index: 2;"
          @click="onClickItem((guideStore.selectedIndex - 1)%2)"
      >
        <img :src="BtnPrev" alt="" />
      </button>
      <button
          type="button"
          aria-label="닫기"
          class="absolute bottom-[50%] notMiniTablet:right-8 transform cursor-pointer miniTablet:bottom-[50%] miniTablet:right-[16px] select-none btn-nav"
          style="z-index: 2"
          @click="onClickItem((guideStore.selectedIndex + 1)%2)"
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
      <!--      <div class="flex flex-row w-full h-[40px] bg-red-500 absolute bottom-[100px]">-->
      <!--        <div class="w-[50%] h-full bg-amber-400"></div>-->
      <!--        <div class="w-[50%] h-full bg-blue-400"></div>-->
      <!--      </div>-->
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
