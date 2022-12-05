<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const routeName = computed(() => route.name || '')
</script>

<template>
  <div class="p-5 bg-sky-700 text-gray-300 font-mono">
    <div class="flex flex-row justify-between container mx-auto max-w-6xl">
      <!-- Left navbar -->
      <div class="flex flex-row space-x-4">
        <RouterLink to="/">
          <img class="w-10" src="@/assets/logo/hackerNews.png" alt="hacker new logo">
        </RouterLink>
        <RouterLink to="/" class="hover:text-white hover:font-semibold" :class="{ underline: routeName === 'topNews' }">
          Top
        </RouterLink>
        <RouterLink to="/new" class="hover:text-white hover:font-semibold" :class="{ underline: routeName === 'newPage' }">
          New
        </RouterLink>
        <RouterLink to="/best" class="hover:text-white hover:font-semibold" :class="{ underline: routeName === 'bestPage' }">
          Best
        </RouterLink>
        <RouterLink to="/show" class="hover:text-white hover:font-semibold" :class="{ underline: routeName === 'showPage' }">
          Show
        </RouterLink>
        <RouterLink to="/ask" class="hover:text-white hover:font-semibold" :class="{ underline: routeName === 'askPage' }">
          Ask
        </RouterLink>
        <RouterLink to="/jobs" class="hover:text-white hover:font-semibold" :class="{ underline: routeName === 'jobsPage' }">
          Jobs
        </RouterLink>
      </div>
      <!-- Right Navbar -->
      <div class="flex flex-row space-x-4">
        <a href="https://nurriyad.xyz" target="_blank" class="hover:text-white hover:font-semibold hover:underline">
          Built by Riyad
        </a>
      </div>
    </div>
  </div>
</template>
