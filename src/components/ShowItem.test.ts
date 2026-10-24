// @vitest-environment happy-dom
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import { defineComponent, h, Suspense } from 'vue'
import ShowItem from '@/components/ShowItem.vue'
import { createPiniaColadaPlugins } from '@/tests/piniaColada'
import type { Show } from '@/types/Show'

const show: Show = {
  by: 'bob',
  id: 52,
  kids: [200],
  score: 205,
  time: Math.floor(Date.now() / 1000) - 7200,
  title: 'Show HN: A project',
  type: 'story',
  url: 'https://example.com/project',
}

describe('ShowItem', () => {
  it('renders supplied story data and emits comment and SEO metadata', async () => {
    const Host = defineComponent({
      render: () => h(Suspense, null, { default: () => h(ShowItem, { id: show.id, item: show }) }),
    })
    const wrapper = mount(Host, { global: { plugins: createPiniaColadaPlugins() } })
    await flushPromises()
    const itemWrapper = wrapper.findComponent(ShowItem)

    expect(wrapper.text()).toContain(show.title)
    expect(wrapper.get('a').attributes('href')).toBe(show.url)
    expect(itemWrapper.emitted('kids')).toEqual([[show.kids]])
    expect(itemWrapper.emitted('seo')?.[0]?.[0]).toMatchObject({
      id: show.id,
      title: show.title,
      description: 'A Hacker News story submitted by bob with 205 points.',
      publishedAt: show.time,
    })
  })
})
