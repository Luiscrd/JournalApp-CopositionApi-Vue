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

    return {
        createUser,
        logineUser
    }
}

export default useAuth