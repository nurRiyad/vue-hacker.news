// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import EmptyNews from '@/components/EmptyNews.vue'

describe('EmptyNews', () => {
  it('shows the empty-state message', () => {
    const wrapper = mount(EmptyNews)

    expect(wrapper.text()).toContain('No content available')
  })
})
