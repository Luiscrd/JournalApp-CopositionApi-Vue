import { shallowMount } from "@vue/test-utils"
import Login from '@/modules/auth/views/Login.vue'
import createVuexStore from "../../../mook-data/mock-store"
import Swal from "sweetalert2"

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

import { VueRouterMock, createRouterMock, injectRouterMock } from 'vue-router-mock'
import { config } from '@vue/test-utils'

const router = createRouterMock()
beforeEach(() => {
    injectRouterMock(router)
})

config.plugins.VueWrapper.install(VueRouterMock)

describe('Pruebas en el Login view', () => {

    const store = createVuexStore({
        user: null,
        status: 'not-authenticated',
        idToken: null,
        refreshToken: null
    })

    beforeEach(() => jest.clearAllMocks())


    test('Debe de mostrar el componente correctamente', async () => {

        const wrapper = shallowMount(Login, {
            global: {
                plugins: [store]
            }
        })
      
        expect(wrapper.html()).toMatchSnapshot()

    })

    test('Credenciales incorrectas disparan el Swal', async () => {

        const wrapper = shallowMount(Login, {
            global: {
                plugins: [store]
            }
        })

        store.dispatch = jest.fn().mockReturnValue({ ok: false, msg: 'Error en credenciales' })

        await wrapper.find('form').trigger('submit')

        expect(store.dispatch).toHaveBeenCalledWith("auth/logineUser", {email: '', password: ''})

        expect(Swal.fire).toHaveBeenCalledWith({icon: 'error', text: 'Error en credenciales', title: 'Error'})

    })

})