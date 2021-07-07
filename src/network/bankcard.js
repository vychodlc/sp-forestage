import { request } from './request.js'

export function addBankcardApply(info) {
  let formData = new FormData()
  formData.append('pic',info.pic.join(','))
  formData.append('addr',info.addr)
  return request({
    method: 'POST',
    url: '/add_bankcard_apply.php',
    data: formData
  })
}

export function getBankcard() {
  return request({
    url: '/get_bankcard.php'
  })
}

export function getWithdrawlCardnum() {
  return request({
    url: '/get_withdraw_cardnum.php'
  })
}