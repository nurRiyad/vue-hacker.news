<script setup lang="ts">
import FooterCom from '@/components/FooterCom.vue'
import NavbarCom from '@/components/NavbarCom.vue'
</script>

<template>
  <div class="min-h-screen">
    <NavbarCom />
    <RouterView />
    <FooterCom />
  </div>
</template>
