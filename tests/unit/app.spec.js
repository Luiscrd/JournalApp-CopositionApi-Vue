import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App Component', () => {

    let wrapper;

    beforeEach(() => {

        wrapper = shallowMount(App)

    });

    test('Debe de hacer mach con el snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()

    })

})