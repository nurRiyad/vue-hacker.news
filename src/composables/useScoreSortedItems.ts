import { computed, ref, watch, type Ref } from 'vue'
import { fetchHackerNewsResource } from '@/api/hackerNews'

interface ScoredItem {
  id: number
  score: number
}

// Loads the given page of item IDs and orders it by score. Each item is fetched once and
// handed back so item components can render it without requesting it again.
export function useScoreSortedItems<T extends ScoredItem>(
  ids: Readonly<Ref<readonly number[]>>,
  enabled: Readonly<Ref<boolean>>,
) {
  const items = ref<T[]>([]) as Ref<T[]>
  const isLoading = ref(false)
  let latestRequest = 0

  watch(
    [ids, enabled],
    async ([currentIds, isEnabled]) => {
      const request = ++latestRequest
      if (!isEnabled) {
        items.value = []
        isLoading.value = false
        return
      }

      isLoading.value = true
      const results = await Promise.allSettled(
        currentIds.map((id) => fetchHackerNewsResource<T>(`item/${id}`)),
      )
      if (request !== latestRequest) return

      items.value = results
        .flatMap((result) => (result.status === 'fulfilled' ? [result.value as T] : []))
        .sort((a, b) => b.score - a.score)
      isLoading.value = false
    },
    { immediate: true },
  )

  return { items, isLoading: computed(() => isLoading.value) }
}
