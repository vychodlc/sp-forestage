import {request} from './request'

export function addAddress(info) {
  let formData = new FormData;
  formData.append('address', info.address);
  formData.append('name', info.name);
  formData.append('phone', info.phone);
  return request({
    method: 'POST',
    url: '/add_address.php',
    data: formData,
  })
}
export function editAddress(info) {
  let formData = new FormData;
  formData.append('address_ID', info.address_ID);
  formData.append('address', info.address);
  formData.append('phone', info.phone);
  formData.append('name', info.name);
  return request({
    method: 'POST',
    url: '/edit_address.php',
    data: formData,
  })
}
export function changeAddressDefault(address_ID) {
  let formData = new FormData;
  formData.append('address_ID', address_ID);
  return request({
    method: 'POST',
    url: '/change_address_default.php',
    data: formData,
  })
}
export function delAddress(address_ID) {
  let formData = new FormData;
  formData.append('address_ID', address_ID);
  return request({
    method: 'POST',
    url: '/del_address.php',
    data: formData,
  })
}
export function getAddress(p) {
  return request({
    url: '/get_address_list.php',
    params: {p},
  })
}