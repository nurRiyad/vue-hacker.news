<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useFetch } from '@vueuse/core'
import { onMounted, ref } from 'vue'

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
const news = ref(JSON.parse(resp.value as string))

title.value = news.value.title
score.value = news.value.score
author.value = news.value.by
time.value = news.value.time
</script>

<template>
  <div class="flex space-x-5  border-b-2  mt-0">
    <div class="flex justify-center items-center h-auto p-5 font-sans font-semibold text-blue-700">
      {{ score }}
    </div>
    <div class="flex flex-col justify-center ">
      <div class="flex items-center font-mono space-x-1">
        <a href="" class="font-medium ">
          {{ title }}
        </a>
        <p class="text-sm text-slate-500">
          (google.com)
        </p>
      </div>
      <div class="flex text-sm text-slate-500">
        <p>by {{ author }}</p>
        <p class="px-4">
          |
        </p>
        <p>{{ time }} ago</p>
      </div>
    </div>
  </div>
</template>
