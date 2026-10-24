// @vitest-environment happy-dom
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vite-plus/test'
import { createMemoryHistory, createRouter } from 'vue-router'
import { defineComponent } from 'vue'
import App from '@/App.vue'

const useHeadMock = vi.hoisted(() => vi.fn())
vi.mock('@vueuse/head', () => ({ useHead: useHeadMock }))

describe('App', () => {
  it('composes the navigation, current route, footer, and document language', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/:type?',
          component: defineComponent({ template: '<p>Route content</p>' }),
        },
      ],
    })
    await router.push('/ask')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    await flushPromises()

    expect(wrapper.text()).toContain('Route content')
    expect(wrapper.text()).toContain('Riyad')
    expect(wrapper.find('a[aria-current="page"]').text()).toBe('Ask')
    expect(useHeadMock).toHaveBeenCalledWith({ htmlAttrs: { lang: 'en' } })
  })
})
