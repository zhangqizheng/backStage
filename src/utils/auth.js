import Cookies from 'js-cookie'

// const TokenKey = ''

export function getToken() {
  // console.log(Cookies.get('token'))
  return Cookies.get('token')
}

export function setToken(token) {
  return Cookies.set('token', token)
}

export function removeToken() {
  return Cookies.remove('token')
}
