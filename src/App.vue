<script setup>
import Home from './pages/index.vue'
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
