import { describe, expect, it } from 'vite-plus/test'
import { computed, ref } from 'vue'
import { usePagination } from '@/composables/usePagination'

describe('usePagination', () => {
  it('slices items into pages and bounds navigation', () => {
    const items = computed(() => Array.from({ length: 21 }, (_, index) => index + 1))
    const pagination = usePagination(items)

    expect(pagination.totalPages.value).toBe(2)
    expect(pagination.currentItems.value).toHaveLength(20)
    expect(pagination.isEmpty.value).toBe(false)

    pagination.nextPage()
    expect(pagination.currentPage.value).toBe(2)
    expect(pagination.currentItems.value).toEqual([21])

    pagination.nextPage()
    expect(pagination.currentPage.value).toBe(2)

    pagination.previousPage()
    expect(pagination.currentPage.value).toBe(1)
    pagination.previousPage()
    expect(pagination.currentPage.value).toBe(1)
  })

  it('keeps one page for empty lists and resets to the first page', () => {
    const items = ref([1, 2, 3])
    const pagination = usePagination(
      computed(() => items.value),
      1,
    )

    pagination.nextPage()
    pagination.nextPage()
    pagination.resetPage()

    expect(pagination.currentPage.value).toBe(1)
    items.value = []
    expect(pagination.totalPages.value).toBe(1)
    expect(pagination.isEmpty.value).toBe(true)
  })

  it('clamps the current page when the item list shrinks', () => {
    const items = ref(Array.from({ length: 30 }, (_, index) => index + 1))
    const pagination = usePagination(
      computed(() => items.value),
      10,
    )

    pagination.nextPage()
    pagination.nextPage()
    expect(pagination.currentPage.value).toBe(3)

    items.value = Array.from({ length: 11 }, (_, index) => index + 1)

    expect(pagination.currentPage.value).toBe(2)
    expect(pagination.currentItems.value).toEqual([11])
  })
})
