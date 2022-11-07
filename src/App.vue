<script setup lang="ts">
import FooterCom from '@/components/FooterCom.vue'
import NavbarCom from '@/components/NavbarCom.vue'
</script>

<template>
  <div>
    <NavbarCom />
    <RouterView />
    <FooterCom />
  </div>
</template>
