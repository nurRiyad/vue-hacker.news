<script setup lang="ts">
defineEmits<{
  retry: []
}>()
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 border-b border-line px-5 py-4 text-sm"
    role="alert"
  >
    <p class="text-muted">Couldn't load Hacker News data. Please try again.</p>
    <button
      type="button"
      class="shrink-0 rounded-md px-3 py-1 font-medium text-accent hover:bg-raised focus-visible:outline-2 focus-visible:outline-accent"
      @click="$emit('retry')"
    >
      Try again
    </button>
  </div>
</template>
