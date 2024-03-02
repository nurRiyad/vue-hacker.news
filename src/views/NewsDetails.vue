<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsLoader from '@/components/NewsLoader.vue'

const NewsItems = defineAsyncComponent(() => import('@/components/NewsItems.vue'))
const ShowItem = defineAsyncComponent(() => import('@/components/ShowItem.vue'))
const AskItem = defineAsyncComponent(() => import('../components/AskItem.vue'))
const CommentsCom = defineAsyncComponent(() => import('@/components/CommentsCom.vue'))

const route = useRoute()
const newid = computed(() => {
  const id = route.params.newsid
  const numID = Number(id)
  return numID
})

const detailsPageType = computed(() => {
  if (route.path.includes('/ask/'))
    return 'ask'
  else if (route.path.includes('/show/'))
    return 'show'
  else return 'news'
})

const kids = ref<Array<number>>([])
const setKids = (val: Array<number>) => {
  kids.value = val
}

const text = ref('')
const setText = (val: string) => {
  text.value = val
}
</script>

<template>
  <div class="space-y-2">
    <div class="bg-white">
      <Suspense>
        <template #default>
          <ShowItem v-if="detailsPageType === 'show'" :id="newid" @kids="setKids" />
          <div v-else-if="detailsPageType === 'ask'">
            <AskItem :id="newid" @kids="setKids" @text="setText" />
            <div class="text-xs text-slate-600 p-5" v-html="text" />
          </div>
          <NewsItems v-else :id="newid" @kids="setKids" />
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
