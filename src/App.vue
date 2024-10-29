<script setup>
import {onMounted} from "vue";
import Home from './pages/index.vue'
import {useCommonStore} from "./stores/common.js";

const commonStore = useCommonStore()

onMounted(() => {
  if (window.location.search.includes('iscream')) {
    commonStore.isShownLogo = true;
  }
});
</script>

<template>
  <Home/>
</template>

<style>
html, body {
  overscroll-behavior: none; /* Prevents pull-to-refresh in most cases */
  touch-action: none;
}
</style>
