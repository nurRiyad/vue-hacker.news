<script setup lang="ts">
import { onMounted } from 'vue'
import FooterCom from '@/components/FooterCom.vue'
import NavbarCom from '@/components/NavbarCom.vue'
import { useNewStore } from '@/stores/news'

const newsStore = useNewStore()
onMounted(() => {
  newsStore.fetchAllNews()
})
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center">
    <NavbarCom />
    <div class="font-mono bg-slate-200  flex-grow">
      <div class="container mx-auto max-w-6xl">
        <RouterView />
      </div>
    </div>
    <FooterCom />
  </div>
</template>
