<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

const NewItems = defineAsyncComponent(() => import('@/components/NewItems.vue'))
const CommentsCom = defineAsyncComponent(() => import('@/components/CommentsCom.vue'))
const NewsItemLoader = defineAsyncComponent(() => import('@/components/NewsItemLoader.vue'))

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
          <NewItems :id="newid" @kids="setKids" />
        </template>
        <template #fallback>
          <NewsItemLoader />
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
            <NewsItemLoader />
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
