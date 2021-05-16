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
