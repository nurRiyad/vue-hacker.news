<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const routeName = computed(() =>
  Array.isArray(route.params.type) ? route.params.type[0] : route.params.type || '',
)

const links = [
  { to: '/new', name: 'new', label: 'New' },
  { to: '/best', name: 'best', label: 'Best' },
  { to: '/show', name: 'show', label: 'Show' },
  { to: '/ask', name: 'ask', label: 'Ask' },
  { to: '/jobs', name: 'jobs', label: 'Jobs' },
]
</script>

<template>
  <header class="sticky top-0 z-10 border-b-2 border-accent bg-page/90 text-ink backdrop-blur">
    <div class="container mx-auto flex h-14 max-w-3xl items-center justify-between px-3 sm:px-5">
      <RouterLink
        to="/"
        class="flex items-center gap-2 rounded focus-visible:outline-2 focus-visible:outline-accent"
      >
        <img
          class="w-7 rounded-sm sm:hidden"
          src="@/assets/logo/hackerNews.png"
          alt="Hacker News logo"
        />
        <span class="hidden text-lg font-bold tracking-tight sm:block"
          ><span class="text-accent" aria-hidden="true">&gt;</span> HackerNews<span
            class="animate-pulse text-accent"
            aria-hidden="true"
            >_</span
          ></span
        >
      </RouterLink>
      <nav class="flex items-center gap-1" aria-label="Main">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
          :class="
            routeName === link.name
              ? 'bg-accent text-page hover:bg-accent hover:text-page'
              : 'text-muted'
          "
          :aria-current="routeName === link.name ? 'page' : undefined"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
