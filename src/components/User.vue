<script setup lang="ts">
import type { User } from '@/types/User'
import { fetchHackerNewsResource } from '@/api/hackerNews'
import { formatRelativeTime } from '@/utils/time'

// set props
interface Props {
  userid: string
}
const props = defineProps<Props>()

const user = await fetchHackerNewsResource<User>(`user/${props.userid}`)
const createdAt = formatRelativeTime(user.created)
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
