<script setup lang="ts">
import GithubVue from './icons/Github.vue'
import LinkedIn from './icons/LinkedIn.vue'
</script>

<template>
  <div class="py-3 border-t border-line bg-page text-muted [&_a:hover]:text-accent">
    <p class="mb-2 text-center text-sm">
      Developed by
      <a
        href="https://github.com/nurriyad"
        target="_blank"
        rel="noopener noreferrer"
        class="font-semibold text-ink underline-offset-2 hover:underline"
      >
        Riyad
      </a>
    </p>
    <div class="flex items-center justify-center container mx-auto max-w-3xl space-x-5">
      <a
        href="http://github.com/nurriyad"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
      >
        <GithubVue :width="20" />
      </a>
      <a
        href="https://www.linkedin.com/in/nur-riyad"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
      >
        <LinkedIn :width="18" />
      </a>
      <a
        href="http://github.com/nurriyad/hacker-news"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm underline-offset-2 hover:underline"
      >
        Source Code
      </a>
    </div>
  </div>
</template>
