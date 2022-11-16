<script setup lang="ts">
import { onMounted } from 'vue'
import { useNewStore } from '@/stores/news'

const newsStore = useNewStore()
</script>

<template>
  <div>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, voluptatem!</p>
    <p>{{ newsStore.topNewsList }}</p>
  </div>
</template>
