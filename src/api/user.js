import request from '@/utils/request'

export function login(data = {}) {
  return request({
    url: '/tmao-app-auth/auth/user/login/account',
    method: 'POST',
    data
  })
}

export function loginPhone(data = {}) {
  return request({
    url: '/tmao-app-auth/auth/user/login/phone',
    method: 'POST',
    data
  })
}

export function getInfo(data = {}) {
  return request({
    url: '/tmao-app-auth/auth/user/login/phone',
    method: 'POST',
    data
  })
}

export function captcha(data = {}) {
  return request({
    url: '/tmao-app-auth/auth/captcha/sms',
    method: 'POST',
    data
  })
}

export function logout(data = {}) {
  return request({
    url: '/tmao-app-auth/auth/user/logout',
    method: 'POST',
    data
  })
}

export function checkLogin(data = {}) {
  return request({
    url: '/tmao-app-auth/auth/user/check_login',
    method: 'POST',
    data
  })
}
