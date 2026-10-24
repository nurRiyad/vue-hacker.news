// @vitest-environment happy-dom
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { defineComponent, h, ref, Suspense } from 'vue'
import AskItem from '@/components/AskItem.vue'
import CommentsCom from '@/components/CommentsCom.vue'
import NewsItems from '@/components/NewsItems.vue'
import ShowItem from '@/components/ShowItem.vue'

const useFetchMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', () => ({ useFetch: useFetchMock }))

const item = (kids?: Array<number>) => ({
  by: 'alice',
  id: 1,
  kids,
  score: 10,
  time: Math.floor(Date.now() / 1000) - 3600,
  title: 'A title',
  type: 'story',
  url: 'https://example.com',
  text: 'body',
})

const mountItem = async (component: object, kids?: Array<number>) => {
  useFetchMock.mockResolvedValue({ data: ref(JSON.stringify(item(kids))) })

  const Host = defineComponent({
    render: () => h(Suspense, null, { default: () => h(component, { id: 1 }) }),
  })
  const wrapper = mount(Host, { global: { stubs: { RouterLink: RouterLinkStub } } })
  await flushPromises()
  return wrapper
}

describe.each([
  ['NewsItems', NewsItems],
  ['ShowItem', ShowItem],
  ['AskItem', AskItem],
])('%s comment count', (_name, component) => {
  beforeEach(() => {
    useFetchMock.mockReset()
  })

  it.each([
    [undefined, '0 Comments'],
    [[], '0 Comments'],
    [[10], '1 Comment'],
    [[10, 11], '2 Comments'],
  ])('renders %j kids as "%s"', async (kids, label) => {
    const wrapper = await mountItem(component, kids)

    expect(wrapper.text()).toContain(label)
  })
})

describe('CommentsCom thread size', () => {
  beforeEach(() => {
    useFetchMock.mockReset()
  })

  // The thread size counts the comment itself plus its direct replies.
  it.each([
    [undefined, '1 Comment'],
    [[10], '2 Comments'],
    [[10, 11, 12], '4 Comments'],
  ])('renders %j kids as "%s"', async (kids, label) => {
    const wrapper = await mountItem(CommentsCom, kids)

    expect(wrapper.text()).toContain(label)
  })
})
