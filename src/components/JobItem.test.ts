// @vitest-environment happy-dom
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { defineComponent, h, ref, Suspense } from 'vue'
import JobItem from '@/components/JobItem.vue'
import { createPiniaColadaPlugins } from '@/tests/piniaColada'

const useFetchMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useFetch: useFetchMock,
}))

const mountJob = async (job: object, id: number) => {
  useFetchMock.mockReturnValue({
    get: () => ({
      json: async () => ({ data: ref(job), error: ref(null) }),
    }),
  })
  const Host = defineComponent({
    render: () => h(Suspense, null, { default: () => h(JobItem, { id }) }),
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

describe('JobItem', () => {
  beforeEach(() => {
    useFetchMock.mockReset()
  })

  it('fetches the job and renders its safe external link and domain', async () => {
    const wrapper = await mountJob(
      {
        by: 'hiring-team',
        id: 62,
        score: 5,
        time: Math.floor(Date.now() / 1000) - 3600,
        title: 'Frontend engineer',
        type: 'job',
        url: 'https://jobs.example.com/opening',
      },
      62,
    )

    expect(useFetchMock).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/item/62.json')
    expect(wrapper.text()).toContain('Frontend engineer')
    expect(wrapper.text()).toContain('jobs.example.com')
    expect(wrapper.get('a').attributes()).toMatchObject({
      href: 'https://jobs.example.com/opening',
      rel: 'noopener noreferrer',
      target: '_blank',
    })
  })

  it('renders a job without a URL as a non-navigating title', async () => {
    const wrapper = await mountJob(
      {
        by: 'hiring-team',
        id: 63,
        score: 1,
        time: Math.floor(Date.now() / 1000),
        title: 'Job without a link',
        type: 'job',
      },
      63,
    )

    expect(wrapper.get('a').attributes('href')).toBe('')
    expect(wrapper.text()).not.toContain('Comments')
  })
})
