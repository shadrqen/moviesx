import { shallowMount, createLocalVue } from '@vue/test-utils'
import BaseHeader from '@/components/BaseHeader.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()

localVue.use(Vuetify)

describe('Shows correct content on header', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any
  beforeEach(() => {
    wrapper = shallowMount(BaseHeader, {
      localVue
    })
  })
  it('Renders correct toolbar title', () => {
    /* Arrange */
    const toolbarTitle = wrapper.find('.primary-toolbar-title')

    /* Assert */
    expect(toolbarTitle.text()).toMatch('MoviesX')
  })
})
