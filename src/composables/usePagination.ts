import { useOffsetPagination } from '@vueuse/core'
import { computed, type Ref } from 'vue'

export function usePagination<T>(items: Readonly<Ref<readonly T[]>>, pageSize = 20) {
  const total = computed(() => items.value.length)
  const {
    currentPage,
    currentPageSize,
    pageCount: totalPages,
    isFirstPage,
    isLastPage,
    next: nextPage,
    prev: previousPage,
  } = useOffsetPagination({ total, pageSize })

  const currentItems = computed(() => {
    const startIndex = (currentPage.value - 1) * currentPageSize.value
    return items.value.slice(startIndex, startIndex + currentPageSize.value)
  })

  const isEmpty = computed(() => currentItems.value.length === 0)

  function resetPage() {
    currentPage.value = 1
  }

  return {
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    currentItems,
    isEmpty,
    nextPage,
    previousPage,
    resetPage,
  }
}
