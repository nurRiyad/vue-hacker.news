<script setup lang="ts">
import GithubVue from './icons/Github.vue'
import LinkedIn from './icons/LinkedIn.vue'
</script>

<template>
  <div class="py-2 bg-blue-800 text-gray-300 font-mono">
    <div class="flex flex-row justify-center container mx-auto max-w-5xl space-x-5">
      <div class="flex justify-center items-center space-x-2">
        <GithubVue :width="20" />
        <p>nurRiyad</p>
      </div>
      <div class="flex justify-center items-center space-x-2">
        <LinkedIn :width="18" />
        <p>nurRiyad</p>
      </div>
    </div>
  </div>
</template>
