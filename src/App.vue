<script setup lang="ts">
import { useHead } from '@vueuse/head'
import FooterCom from '@/components/FooterCom.vue'
import NavbarCom from '@/components/NavbarCom.vue'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center text-ink">
    <NavbarCom />
    <div class="bg-page flex-grow sm:py-4">
      <div
        class="container mx-auto max-w-3xl overflow-hidden bg-surface sm:rounded-lg sm:border sm:border-line"
      >
        <RouterView />
      </div>
    </div>
    <FooterCom />
  </div>
</template>
