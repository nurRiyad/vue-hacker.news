<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { computed } from 'vue'
import type { User } from '@/types/User'
import QueryError from '@/components/QueryError.vue'
import { userQuery } from '@/queries/hackerNews'
import { formatRelativeTime } from '@/utils/time'

interface Props {
  userid: string
}
const props = defineProps<Props>()

const { data, error, refresh, refetch } = useQuery(userQuery<User>(props.userid))
await refresh()

const user = computed(() => data.value)
const createdAt = computed(() => formatRelativeTime(user.value?.created ?? 0))
const about = computed(() => user.value?.about ?? '')

function retry() {
  void refetch()
}
</script>

<template>
  <QueryError v-if="error" @retry="retry" />
  <div v-else-if="user">
    <p>Username: {{ props.userid }}</p>
    <p>Karma: {{ user.karma }}</p>
    <p>Created: {{ createdAt }}</p>
    <p>About:</p>
    <pre class="border border-line p-2">
    <div class="overflow-auto" v-html="about" />
  </pre>
  </div>
</template>
