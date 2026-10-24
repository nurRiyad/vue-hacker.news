// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import LinkedIn from '@/components/icons/LinkedIn.vue'

describe('LinkedIn icon', () => {
  it('supports the default and overridden width', () => {
    expect(mount(LinkedIn).get('svg').attributes('width')).toBe('32')
    expect(
      mount(LinkedIn, { props: { width: 18 } })
        .get('svg')
        .attributes('width'),
    ).toBe('18')
  })
})
