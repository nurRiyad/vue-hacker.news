// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import Next from '@/components/icons/Next.vue'

describe('Next icon', () => {
  it('supports the default and overridden width', () => {
    expect(mount(Next).get('svg').attributes('width')).toBe('32')
    expect(
      mount(Next, { props: { width: 18 } })
        .get('svg')
        .attributes('width'),
    ).toBe('18')
  })
})
