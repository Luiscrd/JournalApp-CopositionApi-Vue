import authApi from "@/api/authApi"
// export const myAction = async ({ commit }) => {

// }

export const createUser = async ({ commit }, user) => {
    const { name, email, password } = user
    try {
        const { data } = await authApi.post(':signUp', { email, password, volverSecureToken: true })
        const { idToken, refreshToken } = data
        await authApi.post(':update', { displayName: name, idToken })
        delete user.password
        commit('loginUser', { user, idToken, refreshToken })
        return { ok: true }
    } catch (error) {
        return {ok: false, msg: error.response.data.error.message}
    }
}

export const logineUser = async ({ commit }, user) => {
    const { email, password } = user
    try {
        const { data } = await authApi.post(':signInWithPassword', { email, password, volverSecureToken: true })
        const { displayName, idToken, refreshToken } = data
        user.name = displayName
        commit('loginUser', { user, idToken, refreshToken })
        return { ok: true }
    } catch (error) {
        return {ok: false, msg: error.response.data.error.message}
    }
}
