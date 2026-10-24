// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import NewsLoader from '@/components/NewsLoader.vue'

describe('NewsLoader', () => {
  it('renders an accessible decorative skeleton', () => {
    const wrapper = mount(NewsLoader)

    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
    expect(wrapper.findAll('rect').length).toBeGreaterThan(0)
  })
})
