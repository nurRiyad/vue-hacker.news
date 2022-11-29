<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { Jobs } from '@/types/Jobs'
import { timeDifferene } from '@/utils/time'

// set props
interface Props {
  id: number
}
const props = withDefaults(defineProps<Props>(), {
  id: NaN,
})

const title = ref('no title')
const score = ref(0)
const author = ref('no author available')
const time = ref(0)

const { data: resp } = await useFetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`)
const news = ref<Jobs>(JSON.parse(resp.value as string))

title.value = news.value.title
score.value = news.value.score
author.value = news.value.by
time.value = news.value.time

const creatTime = computed(() => {
  return timeDifferene(time.value)
})
</script>

<template>
  <div class="flex border-b-2">
    <div class="flex justify-center items-center w-20 p-5">
      <p class="text-center font-semibold text-sky-700 text-xl">
        {{ score }}
      </p>
    </div>
    <div class="flex flex-col justify-center overflow-hidden truncate">
      <div class="flex items-center font-mono space-x-1 ">
        <a href="#" target="_blank" class="font-medium hover:decoration-sky-500 truncate hover:underline">
          {{ title }}
        </a>
      </div>
      <div class="flex text-sm text-slate-500  ">
        <a href="">by <span class="hover:underline hover:decoration-sky-500">{{ author }}</span></a>
        <p class="px-4">
          |
        </p>
        <p>created {{ creatTime }}</p>
      </div>
    </div>
  </div>
</template>
