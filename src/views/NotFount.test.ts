// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { createMemoryHistory, createRouter } from 'vue-router'
import NotFount from '@/views/NotFount.vue'

const useHeadMock = vi.hoisted(() => vi.fn())
vi.mock('@vueuse/head', () => ({ useHead: useHeadMock }))

describe('NotFount', () => {
  beforeEach(() => {
    useHeadMock.mockReset()
  })

  it('renders the not-found page and sets its no-index metadata', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:pathMatch(.*)*', component: NotFount }],
    })
    await router.push('/missing')
    await router.isReady()

    const wrapper = mount(NotFount, { global: { plugins: [router] } })

    expect(wrapper.text()).toContain('Page Not Found')
    expect(useHeadMock).toHaveBeenCalled()
  })
})
