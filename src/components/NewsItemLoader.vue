<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
</script>

<template>
  <ContentLoader
    viewBox="0 0 476 40"
    :speed="2"
    primary-color="#f3f3f3"
    secondary-color="#ecebeb"
  >
    <rect x="5" y="10" rx="0" ry="0" width="25" height="20" />
    <rect x="40" y="13" rx="0" ry="0" width="300" height="5" />
    <rect x="40" y="22" rx="0" ry="0" width="100" height="5" />
    <rect x="150" y="22" rx="0" ry="0" width="100" height="5" />
  </ContentLoader>
</template>

