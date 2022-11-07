import axios from 'axios'

const jounalApi = axios.create({
    baseURL: 'https://daybook-85030-default-rtdb.europe-west1.firebasedatabase.app'
})

jounalApi.interceptors.request.use((config) => {

    config.params = {
        auth: localStorage.getItem('idToken')
    }

    return config
})

export default jounalApi