<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="p-5 bg-sky-700 text-gray-300 font-mono">
    <div class="flex flex-row justify-between container mx-auto max-w-5xl">
      <!-- Left navbar -->
      <div class="flex flex-row space-x-4">
        <RouterLink to="/">
          <img class="w-10" src="@/assets/logo/hackerNews.png" alt="hacker new logo">
        </RouterLink>
        <RouterLink to="/" class="hover:text-white hover:font-semibold">
          Top
        </RouterLink>
        <RouterLink to="/new" class="hover:text-white hover:font-semibold">
          New
        </RouterLink>
        <RouterLink to="/show" class="hover:text-white hover:font-semibold">
          Show
        </RouterLink>
        <RouterLink to="/ask" class="hover:text-white hover:font-semibold">
          Ask
        </RouterLink>
        <RouterLink to="/jobs" class="hover:text-white hover:font-semibold">
          Jobs
        </RouterLink>
      </div>
      <!-- Right Navbar -->
      <div class="flex flex-row space-x-4">
        <a href="https://nurriyad.xyz" target="_blank" class="hover:text-white hover:font-semibold">
          Build by Riyad
        </a>
      </div>
    </div>
  </div>
</template>
