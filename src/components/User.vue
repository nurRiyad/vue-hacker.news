<script setup lang="ts">
import type { User } from '@/types/User'
import { useFetch } from '@vueuse/core'
import { timeDifferene } from '@/utils/time'

// set props
interface Props {
  userid: string
}
const props = defineProps<Props>()

const { data: resp } = await useFetch(
  `https://hacker-news.firebaseio.com/v0/user/${props.userid}.json?print=pretty`,
)
const user = JSON.parse(resp.value as string) as User
const createdAt = timeDifferene(user.created)
const about = user.about ?? ''
</script>

<template>
  <div>
    <p>Username: {{ props.userid }}</p>
    <p>Karma: {{ user.karma }}</p>
    <p>Created: {{ createdAt }}</p>
    <p>About:</p>
    <pre class="border p-2">
    <div class="overflow-auto" v-html="about" />
  </pre>
  </div>
</template>
