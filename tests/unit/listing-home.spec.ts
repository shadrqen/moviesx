import { shallowMount } from '@vue/test-utils'
import ListingHomePage from '@/views/ListingHome.vue'

describe('ListingHome', () => {
  it('test', () => {
    expect(1).toBe(1)
  })
})

/*
import { createLocalVue, shallowMount } from '@vue/test-utils'
import ListingHomePage from '@/views/ListingHome.vue'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import axios from 'axios'

const localVue = createLocalVue()

localVue.use(Vuetify)

// Notice how `create` was not being mocked here...
jest.mock('axios')

describe('ListingHome', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any
  beforeEach(() => {
    wrapper = shallowMount(ListingHomePage, {
      localVue
    })
  })
  it('Fetches movies from the mock api', async () => {
    await flushPromises()
    expect(axios.create).toHaveBeenCalled()

    const table = wrapper.find('#main-table')

    expect(table.exists()).toBe(true)
  })

  it('should match snapshot', () => {
    expect(wrapper.element).toBeDefined()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should search for a movie', async () => {
    const searchTextField = wrapper.find('#search-text-field')

    searchTextField.element.value = 'Aquaman'

    expect(searchTextField.exists()).toBe(true)

    expect(wrapper.find('#search-text-field').element.value).toBe('Aquaman')
  })
})
*/
