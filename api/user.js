import request from '@/common/utils/request.js'	

export function getInfo() {
  return request({
    url: "/users/getInfo",
		isLogin: true
  });
}

export function wxGetInfo() {
  return request({
    url: "/users/getInfo/wx"
  });
}

export function getMyCourse() {
  return request({
    url: "/users/course"
  });
}