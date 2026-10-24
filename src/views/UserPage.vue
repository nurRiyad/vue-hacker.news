<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const User = defineAsyncComponent(() => import('@/components/User.vue'))
const UserLoader = defineAsyncComponent(() => import('@/components/UserLoader.vue'))

const route = useRoute()
const userId = computed(() => {
  const id = route.params.userid
  return Array.isArray(id) ? (id[0] ?? '') : (id ?? '')
})
</script>

<template>
  <div class="flex flex-col bg-white h-full w-full p-3">
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
