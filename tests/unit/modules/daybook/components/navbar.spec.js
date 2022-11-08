import { shallowMount } from "@vue/test-utils"
import Navbar from '@/modules/daybook/components/Navbar.vue'
import createVuexStore from "../../../mook-data/mock-store"

import { VueRouterMock, createRouterMock, injectRouterMock } from 'vue-router-mock'
import { config } from '@vue/test-utils'

const router = createRouterMock()
beforeEach(() => {
    injectRouterMock(router)
})

config.plugins.VueWrapper.install(VueRouterMock)

describe('Pruebas en el Navbar component', () => {

    const store = createVuexStore({
        user: {
            name: 'Luis Carballo',
            email: 'lus@mail.com'
        },
        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    })

    beforeEach(() => jest.clearAllMocks())


    test('Debe de mostrar el componente correctamente', async () => {

        const wrapper = shallowMount(Navbar, {
            global: {
                plugins: [store]
            }
        })
      
        expect(wrapper.html()).toMatchSnapshot()

    })

    test('Click en logout debe de cerrar sesión', async () => {

        const wrapper = shallowMount(Navbar, {
            global: {
                plugins: [store]
            }
        })
      
        const butons = wrapper.findAll('button')

        const [_, btn] = butons

        await btn.trigger('click')

        expect( wrapper.router.push ).toHaveBeenCalledWith({name: 'login'})

        expect( store.state.auth ).toEqual({
            user: null,
            status: 'not-authenticated',
            idToken: null,
            refreshToken: null
        })

    })

})