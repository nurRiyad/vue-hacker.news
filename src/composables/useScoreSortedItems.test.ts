import { flushPromises } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { ref } from 'vue'
import { useScoreSortedItems } from '@/composables/useScoreSortedItems'

const useFetchMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useFetch: useFetchMock,
}))

const scores: Record<number, number | 'fail'> = { 1: 5, 2: 50, 3: 20, 4: 'fail' }

const respond = () => {
  useFetchMock.mockImplementation((url: string) => {
    const id = Number(/item\/(\d+)\.json/.exec(url)?.[1])
    const score = scores[id]
    return {
      get: () => ({
        json: async () =>
          score === 'fail'
            ? { data: ref(null), error: ref(new Error('boom')) }
            : { data: ref({ id, score }), error: ref(null) },
      }),
    }
  })
}

describe('useScoreSortedItems', () => {
  beforeEach(() => {
    useFetchMock.mockReset()
    respond()
  })

  it('does not fetch while disabled', async () => {
    const { items } = useScoreSortedItems(ref([1, 2, 3]), ref(false))
    await flushPromises()

    expect(useFetchMock).not.toHaveBeenCalled()
    expect(items.value).toEqual([])
  })

  it('orders items by score, highest first, and skips failed ones', async () => {
    const { items, isLoading } = useScoreSortedItems(ref([1, 2, 3, 4]), ref(true))
    expect(isLoading.value).toBe(true)
    await flushPromises()

    expect(items.value.map((item) => item.id)).toEqual([2, 3, 1])
    expect(isLoading.value).toBe(false)
  })

  it('reloads when the ids change and when it is enabled', async () => {
    const ids = ref([1, 2])
    const enabled = ref(false)
    const { items } = useScoreSortedItems(ids, enabled)

    enabled.value = true
    await flushPromises()
    expect(items.value.map((item) => item.id)).toEqual([2, 1])

    ids.value = [1, 3]
    await flushPromises()
    expect(items.value.map((item) => item.id)).toEqual([3, 1])
  })
})
