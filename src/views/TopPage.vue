<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useNewStore } from '@/stores/news'
import NewItems from '@/components/NewItems.vue'

const newsStore = useNewStore()
const { topNewsList } = storeToRefs(newsStore)

const currentPage = ref(1)
const totalPage = computed(() => {
  const totalNews = topNewsList.value.length
  if (totalNews % 20 === 0)
    return totalNews / 20
  else return Math.floor(totalNews / 20) + 1
})

const filteredNews = computed(() => {
  const fst = (currentPage.value - 1) * 20
  const lst = (currentPage.value * 20) - 1

  return topNewsList.value.filter((val, idx) => {
    if (idx <= lst && idx >= fst)
      return true
    else return false
  })
})
</script>

<template>
  <div class="flex flex-col bg-white h-full w-full">
    <div v-for="n in filteredNews" :key="n" class="flex-grow">
      <Suspense>
        <template #default>
          <NewItems :id="n" />
        </template>
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </div>
    <div class="text-center my-2 py-2 ">
      <p> {{ currentPage }}/{{ totalPage }}</p>
    </div>
  </div>
</template>
