// @vitest-environment happy-dom
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { defineComponent, h, ref, type Ref } from 'vue'
import { useScoreSortedItems } from '@/composables/useScoreSortedItems'
import { createPiniaColadaPlugins } from '@/tests/piniaColada'

const useFetchMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useFetch: useFetchMock,
}))

const scores: Record<number, number | 'fail'> = { 1: 5, 2: 50, 3: 20, 4: 'fail' }

enableAutoUnmount(afterEach)

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
    const { items } = mountScoreQuery(ref([1, 2, 3]), ref(false))
    await flushPromises()

    expect(useFetchMock).not.toHaveBeenCalled()
    expect(items.value).toEqual([])
  })

  it('orders items by score, highest first', async () => {
    const { items, isLoading } = mountScoreQuery(ref([1, 2, 3]), ref(true))
    expect(isLoading.value).toBe(true)
    await flushPromises()

    expect(items.value.map((item) => item.id)).toEqual([2, 3, 1])
    expect(isLoading.value).toBe(false)
  })

  it('surfaces an item failure instead of silently omitting it', async () => {
    const { error } = mountScoreQuery(ref([1, 4]), ref(true))
    await flushPromises()

    expect(error.value).toEqual(new Error('boom'))
  })

  it('reloads when the ids change and when it is enabled', async () => {
    const ids = ref<number[]>([1, 2])
    const enabled = ref(false)
    const { items } = mountScoreQuery(ids, enabled)

    enabled.value = true
    await flushPromises()
    expect(items.value.map((item) => item.id)).toEqual([2, 1])

    ids.value = [1, 3]
    await flushPromises()
    expect(items.value.map((item) => item.id)).toEqual([3, 1])
  })
})

function mountScoreQuery(ids: Ref<number[]>, enabled: Ref<boolean>) {
  let query!: ReturnType<typeof useScoreSortedItems<{ id: number; score: number }>>
  const Host = defineComponent({
    setup() {
      query = useScoreSortedItems<{ id: number; score: number }>(ids, enabled)
      return () => h('div')
    },
  })

  mount(Host, { global: { plugins: createPiniaColadaPlugins() } })
  return query
}
