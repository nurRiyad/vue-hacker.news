<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useNewStore } from '@/stores/news'
import NewItems from '@/components/NewItems.vue'
</script>

<template>
  <div class="flex flex-col bg-white">
    <h1 class="flex-grow">
      <NewItems />
    </h1>
  </div>
</template>
