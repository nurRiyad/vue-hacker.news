<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { createPageHead } from '@/utils/seo'

const User = defineAsyncComponent(() => import('@/components/User.vue'))
const UserLoader = defineAsyncComponent(() => import('@/components/UserLoader.vue'))

const route = useRoute()
const userId = computed(() => {
  const id = route.params.userid
  return Array.isArray(id) ? (id[0] ?? '') : (id ?? '')
})

const pageHead = computed(() =>
  createPageHead({
    title: userId.value ? `Hacker News user ${userId.value}` : 'Hacker News user',
    description: userId.value
      ? `View ${userId.value}'s Hacker News profile, including karma, join date, and profile bio.`
      : 'View a Hacker News user profile.',
    path: route.path,
    type: 'profile',
    profileUsername: userId.value || undefined,
  }),
)

useHead(pageHead)
</script>

<template>
  <div class="flex flex-col h-full w-full p-3">
    <Suspense>
      <template #default>
        <User :key="userId" :userid="userId" />
      </template>
      <template #fallback>
        <UserLoader />
      </template>
    </Suspense>
  </div>
</template>
