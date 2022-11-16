<script setup lang="ts">
import { onMounted } from 'vue'
import FooterCom from '@/components/FooterCom.vue'
import NavbarCom from '@/components/NavbarCom.vue'
import { useNewStore } from '@/stores/news'

const newsStore = useNewStore()
onMounted(() => {
  newsStore.getBestNewsList()
  newsStore.getNewNewsList()
  newsStore.getTopNewsList()
})
</script>

<template>
  <div class="min-h-screen">
    <NavbarCom />
    <RouterView />
    <FooterCom />
  </div>
</template>
