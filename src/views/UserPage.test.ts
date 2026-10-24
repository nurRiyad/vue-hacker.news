// @vitest-environment happy-dom
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { createMemoryHistory, createRouter } from 'vue-router'
import { ref } from 'vue'
import UserPage from '@/views/UserPage.vue'
import { createPiniaColadaPlugins } from '@/tests/piniaColada'

const useFetchMock = vi.hoisted(() => vi.fn())
const useHeadMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useFetch: useFetchMock,
}))
vi.mock('@vueuse/head', () => ({ useHead: useHeadMock }))

describe('UserPage', () => {
  beforeEach(() => {
    useFetchMock.mockReset()
    useHeadMock.mockReset()
  })

  it('loads the route user and sets profile metadata', async () => {
    useFetchMock.mockReturnValue({
      get: () => ({
        json: async () => ({
          data: ref({
            about: 'Profile bio',
            created: Math.floor(Date.now() / 1000) - 3600,
            id: 'alice',
            karma: 123,
            submitted: [],
          }),
          error: ref(null),
        }),
      }),
    })
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/user/:userid', component: UserPage }],
    })
    await router.push('/user/alice')
    await router.isReady()

    const wrapper = mount(UserPage, {
      global: { plugins: [...createPiniaColadaPlugins(), router] },
    })
    await flushPromises()

    await vi.waitFor(() => expect(wrapper.text()).toContain('Username: alice'))
    expect(wrapper.text()).toContain('Karma: 123')
    expect(useHeadMock).toHaveBeenCalled()
  })
})
