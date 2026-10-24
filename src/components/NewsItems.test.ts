// @vitest-environment happy-dom
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { defineComponent, h, ref, Suspense } from 'vue'
import NewsItems from '@/components/NewsItems.vue'
import type { News } from '@/types/News'

const useFetchMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', () => ({ useFetch: useFetchMock }))

const nowInSeconds = () => Math.floor(Date.now() / 1000)

const makeNews = (overrides: Partial<News> = {}): News => ({
  by: 'alice',
  id: 42,
  kids: [101, 102, 103],
  score: 128,
  time: nowInSeconds() - 2 * 60 * 60,
  title: 'Show HN: A tiny Vue app',
  type: 'story',
  url: 'https://example.com/post/1',
  ...overrides,
})

// NewsItems uses top-level await in setup, so it must render inside <Suspense>.
const mountItem = async (news: News) => {
  useFetchMock.mockResolvedValue({ data: ref(JSON.stringify(news)) })

  const Host = defineComponent({
    render: () => h(Suspense, null, { default: () => h(NewsItems, { id: news.id }) }),
  })
  const wrapper = mount(Host, { global: { stubs: { RouterLink: RouterLinkStub } } })
  await flushPromises()
  return wrapper
}

describe('NewsItems', () => {
  beforeEach(() => {
    useFetchMock.mockReset()
  })

  it('requests the item by id', async () => {
    await mountItem(makeNews({ id: 42 }))

    expect(useFetchMock).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/item/42.json?print=pretty',
    )
  })

  it('shows the score, title, domain and age', async () => {
    const wrapper = await mountItem(makeNews())

    expect(wrapper.text()).toContain('128')
    expect(wrapper.text()).toContain('Show HN: A tiny Vue app')
    expect(wrapper.text()).toContain('(example.com)')
    expect(wrapper.text()).toContain('2 hours ago')
    expect(wrapper.get('a').attributes('href')).toBe('https://example.com/post/1')
  })

  it('links to the author and the comments page', async () => {
    const wrapper = await mountItem(makeNews({ id: 42, by: 'alice' }))

    const targets = wrapper.findAllComponents(RouterLinkStub).map((link) => link.props('to'))
    expect(targets).toEqual(['/user/alice', '/news/42'])
  })

  it.each([
    [0, '0 Comments'],
    [1, '1 Comment'],
    [3, '3 Comments'],
  ])('counts %i comments as "%s"', async (count, label) => {
    const kids = Array.from({ length: count }, (_, i) => 100 + i)
    const wrapper = await mountItem(makeNews({ kids }))

    expect(wrapper.text()).toContain(label)
  })

  // Hacker News omits `kids` on stories that have no comments.
  it('shows "0 Comments" when the story has no kids field', async () => {
    const wrapper = await mountItem(makeNews({ kids: undefined }))

    expect(wrapper.text()).toContain('0 Comments')
  })

  it('emits the comment ids so the details page can render them', async () => {
    const wrapper = await mountItem(makeNews({ kids: [101, 102] }))

    expect(wrapper.findComponent(NewsItems).emitted('kids')).toEqual([[[101, 102]]])
  })

  it('hides the domain when the story has no url', async () => {
    const wrapper = await mountItem(makeNews({ url: '' }))

    expect(wrapper.text()).not.toContain('(')
  })
})
