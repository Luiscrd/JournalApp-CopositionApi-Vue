import { computed } from "vue"
import { useStore } from "vuex"

const useAuth = () => {

    const store = useStore()

    const createUser = async(user) => {
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    const logineUser = async(user) => {
        const resp = await store.dispatch('auth/logineUser', user)
        return resp
    }

    const checkAuthentication = async() => {
        const resp = await store.dispatch('auth/checkAuthentication')
        return resp
    }

    const logout = () => {
        store.commit('auth/logout')
    }

    return {
        createUser,
        logineUser,
        checkAuthentication,
        auhtStatus: computed(() => store.getters['auth/currentState']),
        username: computed(() => store.getters['auth/username']),
        logout
    }
}

export default useAuth