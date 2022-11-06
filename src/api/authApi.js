import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyCRSBstjYJSunzlnMVVbJjAa2xqZcwOQLQ'
    }
})

export default authApi