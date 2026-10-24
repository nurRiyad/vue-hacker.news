// @vitest-environment happy-dom
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { defineComponent, h, ref, Suspense } from 'vue'
import CommentsCom from '@/components/CommentsCom.vue'

const useFetchMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useFetch: useFetchMock,
}))

const mountComment = async (comment: object) => {
  useFetchMock.mockReturnValue({
    get: () => ({
      json: async () => ({ data: ref(comment), error: ref(null) }),
    }),
  })

  const Host = defineComponent({
    render: () => h(Suspense, null, { default: () => h(CommentsCom, { id: 70 }) }),
  })
  const wrapper = mount(Host, { global: { stubs: { RouterLink: RouterLinkStub } } })
  await flushPromises()
  return wrapper
}

describe('CommentsCom replies', () => {
  beforeEach(() => {
    useFetchMock.mockReset()
  })

  it('expands and collapses the reply thread', async () => {
    const wrapper = await mountComment({
      by: 'alice',
      id: 70,
      kids: [71, 72],
      parent: 1,
      text: '<p>Parent comment</p>',
      time: Math.floor(Date.now() / 1000) - 60,
      type: 'comment',
    })
    const button = wrapper.get('button')

    expect(button.attributes('aria-expanded')).toBe('false')
    expect(button.text()).toBe('Show Reply 3 [+]')

    await button.trigger('click')
    await flushPromises()
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(button.text()).toBe('Hide Comment [-]')
    expect(wrapper.findAllComponents(CommentsCom)).toHaveLength(3)

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.findAllComponents(CommentsCom)).toHaveLength(1)
  })

  it('does not show a reply toggle when the comment has no children', async () => {
    const wrapper = await mountComment({
      id: 73,
      parent: 1,
      time: Math.floor(Date.now() / 1000),
      type: 'comment',
    })

    expect(wrapper.text()).toContain('No comment available')
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
