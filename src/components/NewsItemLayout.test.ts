// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import NewsItemLayout from '@/components/NewsItemLayout.vue'

describe('NewsItemLayout', () => {
  it('renders its slot, score, and hot styling at the threshold', () => {
    const wrapper = mount(NewsItemLayout, {
      props: { score: 200 },
      slots: { default: '<a>Story title</a>' },
    })

    expect(wrapper.text()).toContain('Story title')
    expect(wrapper.get('[title="200 points"]').classes()).toContain('border-accent/50')
  })

  it('uses the regular score styling below the hot threshold', () => {
    const wrapper = mount(NewsItemLayout, { props: { score: 199 } })

    expect(wrapper.get('[title="199 points"]').classes()).toContain('border-line')
  })
})
