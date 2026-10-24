<script setup lang="ts">
interface Props {
  score: number
}

defineProps<Props>()
</script>

<template>
  <div class="border-b-2 card-layout">
    <div class="flex justify-center items-center w-12 sm:w-20 p-5">
      <p class="text-center font-semibold text-[#f3621d] text-sm sm:text-xl">{{ score }}</p>
    </div>
    <div class="flex flex-col justify-center sm:overflow-hidden sm:truncate my-4 sm:my-0">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-layout {
  display: grid;
  grid-template-columns: 1fr 11fr;
}
</style>
