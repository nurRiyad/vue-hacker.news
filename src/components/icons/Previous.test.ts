// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import Previous from '@/components/icons/Previous.vue'

describe('Previous icon', () => {
  it('supports the default and overridden width', () => {
    expect(mount(Previous).get('svg').attributes('width')).toBe('32')
    expect(
      mount(Previous, { props: { width: 18 } })
        .get('svg')
        .attributes('width'),
    ).toBe('18')
  })
})
