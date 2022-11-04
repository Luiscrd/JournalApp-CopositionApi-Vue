import axios from 'axios'

const jounalApi = axios.create({
    baseURL: 'https://daybook-85030-default-rtdb.europe-west1.firebasedatabase.app'
})

export default jounalApi