<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

const ShowItem = defineAsyncComponent(() => import('@/components/ShowItem.vue'))
const CommentsCom = defineAsyncComponent(() => import('@/components/CommentsCom.vue'))
const NewsLoader = defineAsyncComponent(() => import('@/components/NewsLoader.vue'))

const route = useRoute()
const newid = computed(() => {
  const id = route.params.newsid
  const numID = Number(id)
  return numID
})

const kids = ref<Array<number>>([])
const setKids = (val: Array<number>) => {
  kids.value = val
}
</script>

<template>
  <div class="space-y-2">
    <div class="bg-white">
      <Suspense>
        <template #default>
          <ShowItem :id="newid" @kids="setKids" />
        </template>
        <template #fallback>
          <NewsLoader />
        </template>
      </Suspense>
    </div>
    <div>
      <div v-for="kid in kids" :key="kid" class="space-y-10">
        <Suspense>
          <template #default>
            <CommentsCom :id="kid" />
          </template>
          <template #fallback>
            <NewsLoader />
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
