<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { News } from '@/types/News'
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
const url = ref('')

const { data: resp } = await useFetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`)
const news = ref<News>(JSON.parse(resp.value as string))

title.value = news.value.title
score.value = news.value.score
author.value = news.value.by
time.value = news.value.time
url.value = news.value.url

const getDomainName = computed(() => {
  if (url.value) {
    const splitedUrl = url.value.split('/')
    if (splitedUrl.length >= 3)
      return splitedUrl[2]
  }
  return ''
})

const creatTime = computed(() => {
  return timeDifferene(time.value)
})

const isValidUrl = computed(() => {
  if (getDomainName.value === '')
    return false
  else return true
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
        <a :href="url" target="_blank" class="font-medium hover:decoration-sky-500 truncate" :class="{ 'hover:underline': isValidUrl }">
          {{ title }}
        </a>
        <p v-if="isValidUrl" class="text-sm text-slate-500">
          ({{ getDomainName }})
        </p>
      </div>
      <div class="flex text-sm text-slate-500  ">
        <a href="">by <span class="hover:underline hover:decoration-sky-500">{{ author }}</span></a>
        <p class="px-4">
          |
        </p>
        <p>created {{ creatTime }} ago</p>
      </div>
    </div>
  </div>
</template>
