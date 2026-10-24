// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import UserLoader from '@/components/UserLoader.vue'

describe('UserLoader', () => {
  it('renders an accessible decorative skeleton', () => {
    const wrapper = mount(UserLoader)

    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
    expect(wrapper.findAll('rect').length).toBeGreaterThan(0)
  })
})
