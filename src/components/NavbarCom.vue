<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const routeName = computed(() => Array.isArray(route.params.type) ? route.params.type[0] : route.params.type || '')
</script>

<template>
  <div class="p-5 bg-[#f3621d] text-white font-mono">
    <div class="flex flex-row justify-between container mx-auto max-w-5xl px-2">
      <!-- Left navbar -->
      <div class="flex flex-row space-x-4">
        <RouterLink to="/">
          <div class="flex">
            <img
              class="sm:hidden w-8 object-cover
            " src="@/assets/logo/hackerNews.png" alt="hackerNew logo"
            >
            <p class="hidden text-xl font-bold sm:block" :class="{ underline: routeName === '' }">
              HackerNews
            </p>
          </div>
        </RouterLink>
      </div>
      <!-- Right Navbar -->
      <div class="flex flex-row space-x-4 ">
        <RouterLink
          to="/new" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'new' }"
        >
          New
        </RouterLink>
        <RouterLink
          to="/best" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'best' }"
        >
          Best
        </RouterLink>
        <RouterLink
          to="/show" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'show' }"
        >
          Show
        </RouterLink>
        <RouterLink
          to="/ask" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'ask' }"
        >
          Ask
        </RouterLink>
        <RouterLink
          to="/jobs" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'job' }"
        >
          Jobs
        </RouterLink>
      </div>
    </div>
  </div>
</template>
