import axios from "axios";
import createVuexStore from "../../../mook-data/mock-store";



describe('Vuex: pruebas en el auth-module', () => {


    test('Estado inicial', () => {

        const store = createVuexStore({
            status: 'authenticating',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('authenticating')

        expect(user).toBe(null)

        expect(idToken).toBe(null)

        expect(refreshToken).toBe(null)

    })

    test('Mutation: loginUser', () => {

        const store = createVuexStore({
            status: 'authenticating',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const payload = {
            user: {
                name: 'Luis Carballo',
                email: 'luiscrua@gmail.com'
            },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-456'
        }

        store.commit('auth/loginUser', payload)

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('authenticated')

        expect(user).toEqual({ name: 'Luis Carballo', email: 'luiscrua@gmail.com' })

        expect(idToken).toBe('ABC-123')

        expect(refreshToken).toBe('XYZ-456')

    })

    test('Mutation: logout', () => {

        const store = createVuexStore({
            status: 'authenticating',
            user: null,
            idToken: null,
            refreshToken: null
        })


        store.commit('auth/logout')

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('not-authenticated')

        expect(user).toBe(null)

        expect(idToken).toBe(null)

        expect(refreshToken).toBe(null)

    })

    test('Getters: username', () => {

        const store = createVuexStore({
            status: 'authenticated',
            user: { name: 'Luis Carballo', email: 'luiscrua@gmail.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-456'
        })

        expect(store.getters['auth/username']).toBe('Luis Carballo')

    })

    test('Getters: myGettercurrentState', () => {

        const store = createVuexStore({
            status: 'authenticated',
            user: { name: 'Luis Carballo', email: 'luiscrua@gmail.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-456'
        })

        expect(store.getters['auth/myGettercurrentState']).toBe('authenticated')

    })

    test('Actions: createUser - Error usuario ya existe', async () => {

        const store = createVuexStore({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = {
            name: 'Luis Carballo',
            email: 'luiscrua@gmail.com',
            password: '123456'
        }

        const { ok, msg } = await store.dispatch('auth/createUser', newUser)

        expect(ok).toBeFalsy()

        expect(msg).toBe('EMAIL_EXISTS')

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('not-authenticated')

        expect(user).toBe(null)

        expect(idToken).toBe(null)

        expect(refreshToken).toBe(null)

    })

    test('Actions: createUser - Crea correctamente y se borra', async () => {

        const store = createVuexStore({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = {
            name: 'Coral Carrillo',
            email: 'ccarrillo@gmail.com',
            password: '123456'
        }

        const { ok } = await store.dispatch('auth/createUser', newUser)

        expect(ok).toBeTruthy()

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('authenticated')

        expect(user.name).toBe('Coral Carrillo')

        expect(idToken.length > 1).toBeTruthy()

        expect(refreshToken.length > 1).toBeTruthy()

        const { statusText } = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCRSBstjYJSunzlnMVVbJjAa2xqZcwOQLQ',{
            idToken
        })

        expect(statusText).toBe('OK')

    })


})