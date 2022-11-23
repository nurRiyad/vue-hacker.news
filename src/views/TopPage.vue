<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useNewStore } from '@/stores/news'
import NewItems from '@/components/NewItems.vue'
</script>

<template>
  <div class="w-full bg-white">
    <NewItems v-for="n in 10" :key="n" />
  </div>
</template>
