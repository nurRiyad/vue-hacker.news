<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { createPageHead } from '@/utils/seo'

const route = useRoute()

useHead(
  computed(() =>
    createPageHead({
      title: 'Page not found',
      description: 'The requested page could not be found.',
      path: route.path,
      robots: 'noindex,follow',
    }),
  ),
)
</script>

<template>
  <div class="text-center m-60">
    <h1 class="text-9xl font-bold text-faint">404!</h1>
    <p>Page Not Found</p>
  </div>
</template>
