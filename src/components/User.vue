<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { User } from '@/types/User'
import { timeDifferene } from '@/utils/time'

// set props
interface Props {
  userid: string
}
const props = withDefaults(defineProps<Props>(), {
  userid: '-',
})

const about = ref('')
const karma = ref(0)
const time = ref(0)

const coutDif = computed(() => {
  return timeDifferene(time.value)
})

const { data: resp } = await useFetch(`https://hacker-news.firebaseio.com/v0/user/${props.userid}.json?print=pretty`)
const news = ref<User>(JSON.parse(resp.value as string))

about.value = news.value.about
karma.value = news.value.karma
time.value = news.value.created
</script>

<template>
  <div>
    <p>Username: {{ userid }}</p>
    <p>Karma: {{ karma }}</p>
    <p>Created: {{ coutDif }}</p>
    <p>About: </p>
    <pre class="border p-2">
    <div class="overflow-auto" v-html="about" />
  </pre>
  </div>
</template>
