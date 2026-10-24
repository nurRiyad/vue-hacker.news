<script setup lang="ts">
import { computed, defineAsyncComponent, shallowRef, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import NewsLoader from '@/components/NewsLoader.vue'
import { createPageHead, type StorySeoMetadata } from '@/utils/seo'

const NewsItems = defineAsyncComponent(() => import('@/components/NewsItems.vue'))
const ShowItem = defineAsyncComponent(() => import('@/components/ShowItem.vue'))
const AskItem = defineAsyncComponent(() => import('../components/AskItem.vue'))
const CommentsCom = defineAsyncComponent(() => import('@/components/CommentsCom.vue'))

const route = useRoute()
const storySeo = shallowRef<StorySeoMetadata>()
const newid = computed(() => {
  const id = route.params.newsid
  const numID = Number(id)
  return numID
})

watch(newid, () => {
  storySeo.value = undefined
})

const detailsPageType = computed(() => {
  if (route.path.includes('/ask/')) return 'ask'
  else if (route.path.includes('/show/')) return 'show'
  else return 'news'
})

const pageHead = computed(() =>
  createPageHead({
    title: storySeo.value?.title ?? 'Hacker News story',
    description: storySeo.value?.description ?? 'Read a story and its discussion on Hacker News.',
    path: route.path,
    type: 'article',
    robots: storySeo.value ? undefined : 'noindex,follow',
    publishedAt: storySeo.value?.publishedAt,
  }),
)

useHead(pageHead)

const kids = shallowRef<Array<number>>([])
function setKids(val: Array<number>) {
  kids.value = val
}

const text = shallowRef('')
function setText(val: string) {
  text.value = val
}

function setStorySeo(metadata: StorySeoMetadata) {
  if (metadata.id === newid.value) storySeo.value = metadata
}
</script>

<template>
  <div class="space-y-2">
    <div>
      <Suspense>
        <template #default>
          <ShowItem
            v-if="detailsPageType === 'show'"
            :key="newid"
            :id="newid"
            @kids="setKids"
            @seo="setStorySeo"
          />
          <div v-else-if="detailsPageType === 'ask'">
            <AskItem :key="newid" :id="newid" @kids="setKids" @text="setText" @seo="setStorySeo" />
            <div class="text-xs text-muted p-5" v-html="text" />
          </div>
          <NewsItems v-else :key="newid" :id="newid" @kids="setKids" @seo="setStorySeo" />
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
