import { Login } from '@/api/user'
import { setToken } from '@/utils/cookie'
const state = {

}
const mutations = {

}
const actions = {
    login({commit}, userInfo) {
        return new Promise((resolve, reject) => {
            Login(userInfo).then(response => {
                // commit('SET_TOKEN', 'admin-token')
                let newToken = 'bearer7e364f18-ffda-4392-ac91-9d5445476398'
                setToken('access-token', newToken)
                // setToken('access-token', response.token_type + response.access_token)
                localStorage.setItem('userInfo', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}