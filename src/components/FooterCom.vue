<script setup lang="ts">
import GithubVue from './icons/Github.vue'
import LinkedIn from './icons/LinkedIn.vue'
</script>

<template>
  <div class="py-2  bg-[#f3621d] text-white font-mono">
    <div class="flex items-center justify-center container mx-auto max-w-6xl space-x-5">
        <a href="http://github.com/nurriyad" target="_blank">
          <GithubVue :width="20" />
        </a>
        <a href="https://www.linkedin.com/in/nur-riyad" target="_blank">
          <LinkedIn :width="18" />
        </a>
        <a href="http://github.com/nurriyad/hacker-news" target="_blank" class="hover:font-semibold underline">
          Source Code
        </a>
    </div>
  </div>
</template>
