import request from 'superagent'
import { get } from './localStorage'
import { isAuthenticated } from './auth'

const baseUrl = '/api'

export default function ajax(method='get', endpoint, data={}, headers={Accept: 'application/json'}) {

    const dataMethod = method.toLowerCase() == 'get' && 'query' || 'send'

    const token = get('token')
    
    if (isAuthenticated()) {
        headers['Authorization'] = `Bearer ${token}`
    }

    return request[method](baseUrl + endpoint)
        .set(headers)[dataMethod](data)
        .then((res) => {
            return res 
        })
        .catch(err => {
            throw err
        })
}
