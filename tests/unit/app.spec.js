import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import authApi from '@/api/authApi'

describe('App Component', () => {

    beforeAll(async () => {

        const { data } = await authApi.post(':signInWithPassword', {
            email: 'luiscrua@gmail.com',
            password: '123456',
            returnSecureToken: true
        })

        localStorage.setItem('idToken', data.isToken)

    })

    let wrapper;

    beforeEach(() => {

        wrapper = shallowMount(App)

    });

    test('Debe de hacer mach con el snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()

    })

})