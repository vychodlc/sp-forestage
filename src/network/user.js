import { request } from "./request";

let sha1 = require('js-sha1');

export function auth(token) {
  let formData = new FormData();
  formData.append('token',token);
  return request({
    method: 'POST',
    url: '/auth.php',
    data: formData
  })
}

export function getUserInfo() {
  return request({
    url: '/get_user_info.php',
  })
}

export function login(email,password) {
  let formData = new FormData();
  password = sha1(password).toString();
  formData.append('user_email',email);
  formData.append('user_password',password);
  return request({
    method: 'POST',
    url: '/login.php',
    data: formData
  })
}

export function register(email,nickname,password) {
  let formData = new FormData();
  password = sha1(password).toString();
  formData.append('user_email',email);
  formData.append('user_nickname',nickname);
  formData.append('user_password',password);
  return request({
    method: 'POST',
    url: '/register.php',
    data: formData
  })
}

export function getUser() {
  return request({
    url: '/get_user.php',
  })
}

export function editUserinfo(userinfo) {
  let form = new FormData();
  form.append("uuid", userinfo.uuid);
  form.append("user_email", userinfo.email);
  form.append("user_nickname", userinfo.nickname);
  form.append("user_right", userinfo.right);
  return request({
    method: 'POST',
    url: '/edit_user_info.php',
    data: form
  })
}

export function delUser(id) {
  let form = new FormData();
  form.append("uuid", id);
  return request({
    method: 'POST',
    url: '/del_user.php',
    data: form
  })
}

export function setUserRight(id,newRight) {
  let form = new FormData();
  form.append("uuid", id);
  form.append('user_right', newRight);
  return request({
    method: 'POST',
    url: '/set_user_right.php',
    data: form
  })
}

export function getBalance() {
  return request({
    url: '/get_balance.php'
  })
}

export function getCode() {
  return request({
    url: '/get_transship_code.php',
  })
}