import {request} from './request'

export function putOrder(info) {
  let formData = new FormData();
  formData.append('order_type',info.order_type);
  formData.append('id',info.id);
  formData.append('price',info.price);
  return request({
    method: 'POST',
    url: '/put_order.php',
    data: formData,
  })  
}

export function paymentBalance(info) {
  console.log(info);
  let formData = new FormData();
  formData.append('order_type',info.order_type);
  formData.append('id',info.id);
  return request({
    method: 'POST',
    url: '/payment_balance.php',
    data: formData,
  })  
}

export function checkOrder(info) {
  return request({
    url: '/check_order.php',
    params: {
      order_type: info.order_type,
      id: info.id,
    }
  })
}

export function getOrder(info) {
  return request({
    url: '/get_order.php',
    params: {
      order_type: info.order_type,
      id: info.id,
    }
  })
}