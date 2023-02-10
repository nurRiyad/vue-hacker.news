<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import FooterCom from '@/components/FooterCom.vue'
import NavbarCom from '@/components/NavbarCom.vue'
import { useNewStore } from '@/stores/news'

const newsStore = useNewStore()
onMounted(() => {
  newsStore.fetchAllNews()
})

// add meta tags
const description
  = 'Hacker News is a social news website focusing on computer science and entrepreneurship. This site with built by Al Asad Nur Riyad wiht Vue3, Vue-Router, Pinia, TailwindCss, VueUse'
const ogTitle
  = 'HackerHews built with Vue3, Vue-Router, Pinia, TailwindCss, VueUse By Al Asad Nur Riyad'
const twitterDescription
  = 'HackerHews built with Vue3, Vue-Router, Pinia, TailwindCss, VueUse By Al Asad Nur Riyad'
const image
  = 'https://hnews-nurriyad.netlify.app/android-chrome-512x512.png'
const mySite = 'https://hnews-nurriyad.netlify.app'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    {
      name: 'description',
      content: description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: mySite },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: mySite,
    },
    {
      property: 'og:title',
      content: ogTitle,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: '@debs_obrien' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: mySite,
    },
    {
      name: 'twitter:title',
      content: ogTitle,
    },
    {
      name: 'twitter:description',
      content: twitterDescription,
    },
    {
      name: 'twitter:image',
      content: image,
    },
  ],
})
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center">
    <NavbarCom />
    <div class="font-mono bg-slate-200  flex-grow">
      <div class="container mx-auto max-w-6xl">
        <RouterView />
      </div>
    </div>
    <FooterCom />
  </div>
</template>
