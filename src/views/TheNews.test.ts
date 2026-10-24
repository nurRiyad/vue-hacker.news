// @vitest-environment happy-dom
import { enableAutoUnmount, flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { ref } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import TheNews from '@/views/TheNews.vue'
import { createPiniaColadaPlugins } from '@/tests/piniaColada'

enableAutoUnmount(afterEach)

const useFetchMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useFetch: useFetchMock,
}))
vi.mock('@vueuse/head', () => ({ useHead: vi.fn() }))

const categories = [
  { type: 'top', ids: [101, 102], commentsPath: '/news/101' },
  { type: 'new', ids: [201, 202], commentsPath: '/news/201' },
  { type: 'best', ids: [301, 302], commentsPath: '/news/301' },
  { type: 'ask', ids: [401, 402], commentsPath: '/ask/401' },
  { type: 'show', ids: [501, 502], commentsPath: '/show/501' },
  { type: 'jobs', ids: [601, 602], commentsPath: undefined },
] as const

const defaultStoryLists: Record<string, number[]> = {
  topstories: [101, 102],
  newstories: [201, 202],
  beststories: [301, 302],
  askstories: [401, 402],
  showstories: [501, 502],
  jobstories: [601, 602],
}
const storyLists = { ...defaultStoryLists }

beforeEach(() => {
  Object.assign(storyLists, defaultStoryLists)
  useFetchMock.mockReset()
  useFetchMock.mockImplementation((url: string) => {
    const list = Object.entries(storyLists).find(([endpoint]) => url.includes(`/${endpoint}.json`))
    if (list) {
      return {
        get: () => ({
          json: async () => ({ data: ref(list[1]), error: ref(null) }),
        }),
      }
    }

    const id = Number(url.match(/item\/(\d+)\.json/)?.[1])
    const news = {
      by: `author-${id}`,
      id,
      kids: [],
      score: 10,
      time: Math.floor(Date.now() / 1000) - 3600,
      title: `Story ${id}`,
      type: 'story',
      url: `https://example.com/${id}`,
    }

    return {
      get: () => ({
        json: async () => ({ data: ref(news), error: ref(null) }),
      }),
    }
  })
})

const mountPage = async (type: string) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: TheNews },
      { path: '/:type', component: TheNews },
    ],
  })
  await router.push(`/${type}`)
  await router.isReady()

  const wrapper = mount(TheNews, {
    global: {
      plugins: [...createPiniaColadaPlugins(), router],
      stubs: { RouterLink: RouterLinkStub },
    },
  })
  await flushPromises()
  return { wrapper, router }
}

describe('TheNews', () => {
  it.each(categories)(
    'renders the $type list and links stories to their relevant pages',
    async ({ type, ids, commentsPath }) => {
      const { wrapper } = await mountPage(type)

      await vi.waitFor(() => expect(wrapper.text()).toContain(`Story ${ids[0]}`))
      expect(wrapper.text()).toContain(`Story ${ids[1]}`)
      expect(wrapper.text()).not.toContain('Story 999')

      const links = wrapper.findAllComponents(RouterLinkStub).map((link) => link.props('to'))
      expect(links).toContain(`/user/author-${ids[0]}`)
      if (commentsPath) expect(links).toContain(commentsPath)
    },
  )

  it('paginates a category and resets to the first page when the category changes', async () => {
    storyLists.topstories = Array.from({ length: 21 }, (_, index) => index + 1)
    const { wrapper, router } = await mountPage('top')
    const pageLabel = () =>
      wrapper
        .findAll('p')
        .find((item) => item.text().startsWith('Page '))
        ?.text()

    await vi.waitFor(() => expect(wrapper.text()).toContain('Story 20'))
    expect(wrapper.text()).not.toContain('Story 21')
    expect(pageLabel()).toBe('Page 1 of 2')

    await wrapper.get('button[aria-label="Next page"]').trigger('click')
    await flushPromises()
    await vi.waitFor(() => expect(wrapper.text()).toContain('Story 21'))
    expect(wrapper.text()).not.toContain('Story 20')
    expect(pageLabel()).toBe('Page 2 of 2')

    await router.push('/ask')
    await flushPromises()

    expect(pageLabel()).toBe('Page 1 of 1')
    await vi.waitFor(() => expect(wrapper.text()).toContain('Story 401'))
    expect(wrapper.text()).toContain('Story 402')
  })

  it('shows a retry action when a story list request fails', async () => {
    useFetchMock.mockImplementationOnce(() => ({
      get: () => ({
        json: async () => ({ data: ref(null), error: ref(new Error('network down')) }),
      }),
    }))
    const { wrapper } = await mountPage('top')

    expect(wrapper.get('[role="alert"]').text()).toContain("Couldn't load Hacker News data")

    await wrapper.get('[role="alert"] button').trigger('click')
    await vi.waitFor(() => expect(wrapper.text()).toContain('Story 101'))
  })
})
