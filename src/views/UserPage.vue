<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import User from '@/components/User.vue'
import UserLoader from '@/components/UserLoader.vue'

const route = useRoute()
const userId = computed(() => {
  return (route.params.userid as string) || ''
})
</script>

<template>
  <div class="flex flex-col bg-white h-full w-full p-3">
    <Suspense>
      <template #default>
        <User :userid="userId" />
      </template>
      <template #fallback>
        <UserLoader />
      </template>
    </Suspense>
  </div>
</template>
