// @vitest-environment happy-dom
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { createMemoryHistory, createRouter } from 'vue-router'
import { ref } from 'vue'
import NewsDetails from '@/views/NewsDetails.vue'

const useFetchMock = vi.hoisted(() => vi.fn())
const useHeadMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useFetch: useFetchMock,
}))
vi.mock('@vueuse/head', () => ({ useHead: useHeadMock }))

beforeEach(() => {
  useFetchMock.mockReset()
  useHeadMock.mockReset()
})

describe('NewsDetails', () => {
  it.each([
    ['/news/42', 'Story 42'],
    ['/ask/43', 'Story 43'],
    ['/show/44', 'Story 44'],
  ])('renders the %s story and updates page metadata', async (path, title) => {
    useFetchMock.mockImplementation((url: string) => {
      const id = Number(url.match(/item\/(\d+)\.json/)?.[1])
      return {
        get: () => ({
          json: async () => ({
            data: ref({
              by: 'alice',
              id,
              kids: [],
              score: 20,
              text: '<p>Question body</p>',
              time: Math.floor(Date.now() / 1000) - 3600,
              title: `Story ${id}`,
              type: 'story',
              url: 'https://example.com/story',
            }),
            error: ref(null),
          }),
        }),
      }
    })

    const routes = [
      { path: '/news/:newsid', component: NewsDetails },
      { path: '/ask/:newsid', component: NewsDetails },
      { path: '/show/:newsid', component: NewsDetails },
    ]
    const router = createRouter({ history: createMemoryHistory(), routes })
    await router.push(path)
    await router.isReady()
    const wrapper = mount(NewsDetails, {
      global: { plugins: [router], stubs: { RouterLink: RouterLinkStub } },
    })
    await flushPromises()

    await vi.waitFor(() => expect(wrapper.text()).toContain(title))
    expect(useFetchMock).toHaveBeenCalled()
    expect(useHeadMock).toHaveBeenCalled()
  })
})
