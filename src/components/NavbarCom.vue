<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const routeName = computed(() => route.name || '')
</script>

<template>
  <div class="p-5 bg-[#f3621d] text-white font-mono">
    <div class="flex flex-row justify-between container mx-auto max-w-6xl px-2">
      <!-- Left navbar -->
      <div class="flex flex-row space-x-4">
        <RouterLink to="/">
          <!-- <img class="w-10" src="@/assets/logo/hackerNews.png" alt="hacker new logo"> -->
          <div class="flex">
            <img class="sm:hidden w-10 object-cover
            " src="@/assets/logo/hackerNews.png" alt="hackerNew logo">
            <p class="hidden text-xl font-bold sm:block" :class="{ underline: routeName === 'topNews' }">HackerNews</p>
          </div>
        </RouterLink>

      </div>
      <!-- Right Navbar -->
      <div class="flex flex-row space-x-4 ">
        <RouterLink to="/new" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'newPage' }">
          New
        </RouterLink>
        <RouterLink to="/best" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'bestPage' }">
          Best
        </RouterLink>
        <RouterLink to="/show" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'showPage' }">
          Show
        </RouterLink>
        <RouterLink to="/ask" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'askPage' }">
          Ask
        </RouterLink>
        <RouterLink to="/jobs" class="hover:text-white hover:font-semibold"
          :class="{ underline: routeName === 'jobsPage' }">
          Jobs
        </RouterLink>
      </div>
    </div>
  </div>
</template>
