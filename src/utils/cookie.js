import Cookie from 'js-cookie'

export function getToken(){
    return  Cookie.get('access-token')
 }

export function setToken(type,token){
   return  Cookie.set(type,token)
}

export function removeToken() {
    Cookies.remove('access-token')
    return Cookies.remove(TokenKey)
  }
  