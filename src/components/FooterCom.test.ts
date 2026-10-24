// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import FooterCom from '@/components/FooterCom.vue'

describe('FooterCom', () => {
  it('renders external profile and source links safely', () => {
    const wrapper = mount(FooterCom)

    expect(wrapper.get('a[href="https://github.com/nurriyad"]').attributes('rel')).toBe(
      'noopener noreferrer',
    )
    expect(wrapper.get('a[href="https://www.linkedin.com/in/nur-riyad"]').attributes('rel')).toBe(
      'noopener noreferrer',
    )
    expect(wrapper.get('a[href="http://github.com/nurriyad/hacker-news"]').text()).toBe(
      'Source Code',
    )
  })
})
