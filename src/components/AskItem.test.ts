// @vitest-environment happy-dom
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import { defineComponent, h, Suspense } from 'vue'
import AskItem from '@/components/AskItem.vue'
import type { Ask } from '@/types/Ask'

const ask: Ask = {
  by: 'alice',
  id: 42,
  kids: [100, 101],
  score: 23,
  text: '<p>What is new?</p>',
  time: Math.floor(Date.now() / 1000) - 3600,
  title: 'Ask HN: A question',
  type: 'story',
}

describe('AskItem', () => {
  it('renders supplied story data and emits comment, text, and SEO metadata', async () => {
    const Host = defineComponent({
      render: () => h(Suspense, null, { default: () => h(AskItem, { id: ask.id, item: ask }) }),
    })
    const wrapper = mount(Host, { global: { stubs: { RouterLink: RouterLinkStub } } })
    await flushPromises()
    const itemWrapper = wrapper.findComponent(AskItem)

    expect(wrapper.text()).toContain(ask.title)
    expect(itemWrapper.emitted('kids')).toEqual([[ask.kids]])
    expect(itemWrapper.emitted('text')).toEqual([[ask.text]])
    expect(itemWrapper.emitted('seo')?.[0]?.[0]).toMatchObject({
      id: ask.id,
      title: ask.title,
      description: 'What is new?',
      publishedAt: ask.time,
    })
    expect(wrapper.findAllComponents(RouterLinkStub).map((link) => link.props('to'))).toContain(
      '/ask/42',
    )
  })
})
