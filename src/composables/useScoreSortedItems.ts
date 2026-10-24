import { useQuery } from '@pinia/colada'
import { computed, type Ref } from 'vue'
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
  const query = useQuery(() => ({
    key: ['score-sorted-items', ids.value] as const,
    enabled: enabled.value,
    query: async () => {
      const items = await Promise.all(
        ids.value.map((id) => fetchHackerNewsResource<T>(`item/${id}`)),
      )
      return items.sort((a, b) => b.score - a.score)
    },
  }))

  return {
    items: computed(() => query.data.value ?? []),
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }
}
