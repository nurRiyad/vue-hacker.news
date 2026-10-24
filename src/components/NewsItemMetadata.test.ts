// @vitest-environment happy-dom
import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'

describe('NewsItemMetadata', () => {
  it('renders author, domain, time, and the comments destination', () => {
    const wrapper = mount(NewsItemMetadata, {
      props: {
        author: 'alice',
        commentsTo: '/news/42',
        domain: 'example.com',
        kids: [1, 2],
        time: 1_700_000_000,
      },
      global: { stubs: { RouterLink: RouterLinkStub } },
    })

    expect(wrapper.text()).toContain('example.com')
    expect(wrapper.text()).toContain('by alice')
    expect(wrapper.text()).toContain('2 Comments')
    expect(wrapper.findAllComponents(RouterLinkStub).map((link) => link.props('to'))).toEqual([
      '/user/alice',
      '/news/42',
    ])
  })

  it('uses a fallback author and renders a zero-comment link when kids are omitted', () => {
    const wrapper = mount(NewsItemMetadata, {
      props: { commentsTo: '/news/42', time: 1_700_000_000 },
      global: { stubs: { RouterLink: RouterLinkStub } },
    })

    expect(wrapper.text()).toContain('by no author available')
    expect(wrapper.text()).toContain('0 Comments')
    expect(wrapper.getComponent(RouterLinkStub).props('to')).toBe('/user/no author available')
  })
})
