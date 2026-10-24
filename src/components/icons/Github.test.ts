// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import Github from '@/components/icons/Github.vue'

describe('Github icon', () => {
  it('supports the default and overridden width', () => {
    expect(mount(Github).get('svg').attributes('width')).toBe('32')
    expect(
      mount(Github, { props: { width: 18 } })
        .get('svg')
        .attributes('width'),
    ).toBe('18')
  })
})
