import request from '@/common/utils/request.js'

export function phoneLogin(data) {
  return request({
    url: "/auth/login/code",
    method: "POST",
    data,
  });
}

export function wxLogin(data) {
  return request({
    url: "/auth/login/wx",
    method: "POST",
    data,
  });
}