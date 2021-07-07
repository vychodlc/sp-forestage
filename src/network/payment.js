import {request} from './request'

export function putOrder(info) {
  console.log(info);
  let formData = new FormData();
  formData.append('order_type',info.order_type);
  formData.append('id',info.id);
  formData.append('pay_type',info.pay_type);
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

export function checkPayment(info) {
  return request({
    url: '/check_payment.php',
    params: {
      order_type: info.order_type,
      id: info.id
    }
  })
}

export function addWithdrawl(info) {
  let formData = new FormData()
  formData.append('amount', parseInt(info.amount*100))
  formData.append('bankcard', info.bankcard)
  return request({
    method: 'POST',
    url: '/add_withdrawl.php',
    data: formData
  })
}

export function getPayment(p) {
  return request({
    url: '/get_payment.php',
    params: {p}
  })
}