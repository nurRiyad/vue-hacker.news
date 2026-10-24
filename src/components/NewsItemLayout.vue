<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  score: number
}

const props = defineProps<Props>()

const isHot = computed(() => props.score >= 200)
</script>

<template>
  <div
    class="flex items-start gap-3 border-b border-line px-3 py-3 transition-colors hover:bg-raised/60 sm:gap-4 sm:px-5 sm:py-4"
  >
    <div
      class="flex w-12 shrink-0 flex-col items-center rounded-md border py-1.5 tabular-nums"
      :class="
        isHot ? 'border-accent/50 bg-accent-soft text-accent' : 'border-line bg-raised text-muted'
      "
      :title="`${score} points`"
    >
      <svg class="h-3 w-3" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M6 2 11 10H1z" fill="currentColor" />
      </svg>
      <span class="text-sm font-bold leading-tight">{{ score }}</span>
      <span class="sr-only">points</span>
    </div>
    <div class="min-w-0 flex-1">
      <slot />
    </div>
  </div>
</template>
