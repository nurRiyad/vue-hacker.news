<script setup lang="ts">
import { onMounted } from 'vue'
import { useNewStore } from '@/stores/news'

const newsStore = useNewStore()
</script>

<template>
  <div class="w-full bg-white space-y-5">
    <div class="flex space-x-5 border-blue-400 border-b-4  mt-2">
      <div class="flex justify-center items-center h-auto text-3xl p-5 font-sans font-semibold text-blue-700">
        10
      </div>
      <div class="flex flex-col justify-center ">
        <div class="flex items-center font-mono space-x-1">
          <a href="" class="text-xl font-medium ">
            This is news
          </a>
          <p class="text-sm text-slate-500">
            (google.com)
          </p>
        </div>
        <div class="flex text-sm text-slate-500">
          <p>by Riyad</p>
          <p class="px-4">
            |
          </p>
          <p>1 day ago</p>
        </div>
      </div>
    </div>
  </div>
</template>
