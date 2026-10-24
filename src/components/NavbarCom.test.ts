// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import { createMemoryHistory, createRouter } from 'vue-router'
import { defineComponent } from 'vue'
import NavbarCom from '@/components/NavbarCom.vue'

describe('NavbarCom', () => {
  it('marks the current category and provides links to each category', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:type?', component: defineComponent({ template: '<div />' }) }],
    })
    await router.push('/ask')

    const wrapper = mount(NavbarCom, { global: { plugins: [router] } })
    const askLink = wrapper.findAll('a').find((link) => link.text().trim() === 'Ask')

    expect(askLink?.attributes('aria-current')).toBe('page')
    expect(wrapper.findAll('a').map((link) => link.text().trim())).toContain('Jobs')
  })
})
