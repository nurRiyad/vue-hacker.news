<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
</script>

<template>
  <ContentLoader
    viewBox="0 0 600 60"
    :speed="2"
    primary-color="#f3f3f3"
    secondary-color="#ecebeb"
  >
    <rect x="10" y="7" rx="3" ry="3" width="410" height="6" />
    <rect x="11" y="22" rx="3" ry="3" width="380" height="6" />
    <rect x="10" y="38" rx="3" ry="3" width="178" height="6" />
    <rect x="7" y="55" rx="3" ry="3" width="380" height="6" />
    <rect x="3" y="68" rx="3" ry="3" width="388" height="6" />
  </ContentLoader>
</template>
