import { request } from "./request";

export function addApply(brand,order) {
  let formData = new FormData();
  formData.append('brand', brand);
  formData.append('order', JSON.stringify(order));
  return request({
    method: 'POST',
    url: '/add_transship_apply.php',
    data: formData
  })
}

export function getApplyList(p) {
  return request({
    url: '/get_transship_apply_list.php',
    params: {p},
  })
}

export function filterApplyList(filter,value,p) {
  return request({
    url: '/filter_transship_apply.php',
    params: {filter,value,p},
  })
}

export function getStorageList(p) {
  return request({
    url: '/get_transship_storage_list.php',
    params: {p},
  })
}

export function filterStorageList(filter,value,p) {
  return request({
    url: '/filter_transship_storage.php',
    params: {filter,value,p},
  })
}

export function getOutputList(p) {
  return request({
    url: '/get_transship_outbound_list.php',
    params: {p},
  })
}

export function filterOutputList(filter,value,p) {
  return request({
    url: '/filter_transship_outbound.php',
    params: {filter,value,p},
  })
}

export function addOutput(info) {
  let formData = new FormData();
  formData.append('storage_nums',info.storage_nums.join(','));
  formData.append('outbound_type',info.outbound_type);
  formData.append('material',info.material);
  formData.append('address',info.address);
  formData.append('price',info.price);
  return request({
    method: 'POST',
    url: '/add_transship_outbound.php',
    data: formData,
  })
}

export function addImg(file) {
  let formData = new FormData();
  formData.append('img',file);
  return request({
    method: 'POST',
    url: '/add_img.php',
    data: formData
  })
}

export function transmitCrawler(info) {
  let formData = new FormData()
  formData.append('id',info.id)
  formData.append('email',info.email)
  formData.append('brand',info.brand)
  return request({
    method: 'POST',
    url: '/get_crawler_order.php',
    data: formData
  })
}