import axios from 'axios'

const api = axios.create({
    baseURL: 'http://api.ifprinteligente.com.br/dm/rest.php',
})

export default api