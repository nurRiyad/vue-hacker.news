// @vitest-environment happy-dom
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { defineComponent, h, ref, Suspense } from 'vue'
import User from '@/components/User.vue'
import { createPiniaColadaPlugins } from '@/tests/piniaColada'

const useFetchMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useFetch: useFetchMock,
}))

const mountUser = async (user: object, userid: string) => {
  useFetchMock.mockReturnValue({
    get: () => ({
      json: async () => ({ data: ref(user), error: ref(null) }),
    }),
  })
  const Host = defineComponent({
    render: () => h(Suspense, null, { default: () => h(User, { userid }) }),
  })
  const wrapper = mount(Host, {
    global: {
      plugins: createPiniaColadaPlugins(),
      stubs: { RouterLink: RouterLinkStub },
    },
  })
  await flushPromises()
  return wrapper
}

describe('User', () => {
  beforeEach(() => {
    useFetchMock.mockReset()
  })

  it('renders the profile fields and bio from the fetched user', async () => {
    const wrapper = await mountUser(
      {
        about: '<p>Vue developer</p>',
        created: Math.floor(Date.now() / 1000) - 3600,
        id: 'alice',
        karma: 321,
        submitted: [],
      },
      'alice',
    )

    expect(useFetchMock).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/user/alice.json',
    )
    expect(wrapper.text()).toContain('Username: alice')
    expect(wrapper.text()).toContain('Karma: 321')
    expect(wrapper.text()).toContain('Vue developer')
  })

  it('handles a missing bio without rendering markup', async () => {
    const wrapper = await mountUser(
      {
        created: Math.floor(Date.now() / 1000),
        id: 'bob',
        karma: 0,
        submitted: [],
      },
      'bob',
    )

    expect(wrapper.text()).toContain('About:')
    expect(wrapper.find('p').text()).toBe('Username: bob')
  })
})
