import useAuth from "@/modules/auth/composables/useAuth"

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/currentState': 'auhtenticated',
        'auth/username': 'Luis Carballo'
    }
}

jest.mock('vuex', () => ({
    useStore: () => mockStore
}))

describe('Pruebas en useAhut', () => {

    beforeEach(() => jest.clearAllMocks())

    test('createUser exitoso', async () => {

        const { createUser } = useAuth()

        const newUser = {
            name: 'Luis Carballo',
            email: 'luiscrua1987@gmail.com',
        }

        mockStore.dispatch.mockReturnValue({ ok: true })

        const { ok } = await createUser(newUser)

        expect(ok).toBeTruthy()

        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser)

    })

    test('createUser fallido - email existe', async () => {

        const { createUser } = useAuth()

        const newUser = {
            name: 'Luis Carballo',
            email: 'luiscrua1987@gmail.com',
        }

        mockStore.dispatch.mockReturnValue({ ok: false, msg: 'EMAIL_EXIST' })

        const { ok, msg } = await createUser(newUser)

        expect(ok).toBeFalsy()

        expect(msg).toBe('EMAIL_EXIST')

        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser)

    })

    test('logineUser exitoso', async () => {

        const { logineUser } = useAuth()

        const newUser = {
            email: 'luiscrua1987@gmail.com',
            password: '123456'
        }

        mockStore.dispatch.mockReturnValue({ ok: true })

        const { ok } = await logineUser(newUser)

        expect(ok).toBeTruthy()

        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/logineUser", newUser)

    })

    test('logineUser fallido retorna false', async () => {

        const { logineUser } = useAuth()

        const newUser = {
            email: 'luiscrua1987@gmail.com',
            password: '123456'
        }

        mockStore.dispatch.mockReturnValue({ ok: false })

        const { ok } = await logineUser(newUser)

        expect(ok).toBeFalsy()

        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/logineUser", newUser)

    })

    test('checkAuthentication exitoso, retorna true', async () => {

        const { checkAuthentication } = useAuth()

        mockStore.dispatch.mockReturnValue({ ok: true })

        const { ok } = await checkAuthentication()

        expect(ok).toBeTruthy()

        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/checkAuthentication")

    })

    test('checkAuthentication fallido, retorna false', async () => {

        const { checkAuthentication } = useAuth()

        mockStore.dispatch.mockReturnValue({ ok: false })

        const { ok } = await checkAuthentication()

        expect(ok).toBeFalsy()

        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/checkAuthentication")

    })

    test('logout', async () => {

        const { logout } = useAuth()

        logout()

        expect(mockStore.commit).toHaveBeenCalledWith('auth/logout')

        expect(mockStore.commit).toHaveBeenCalledWith('journal/clearEntries')

    })

    test('auhtStatus, username', async () => {

        const { auhtStatus, username } = useAuth()

        expect(auhtStatus.value).toBe('auhtenticated')

        expect(username.value).toBe('Luis Carballo')

    })

    

})