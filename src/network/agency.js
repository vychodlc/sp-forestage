import {request} from './request'

export function getAgency(p) {
  return request({
    url: '/get_agency_list.php',
    params: {p},
  })
}

export function addAgency(info) {
  let formData = new FormData();
  formData.append('brand',info.brand);
  formData.append('storage_link',info.storage_link);
  formData.append('account_type',info.account_type);
  formData.append('size',info.size.join(','));
  formData.append('discount_type',info.discount_type);
  formData.append('discount_code',info.discount_code);
  formData.append('order_num',info.order_num);
  formData.append('interval',info.interval);
  formData.append('giftcard_type',info.giftcard_type);
  let giftcards = info.giftcards.filter(item=>{return item.right==true||item.right=='true'})
  formData.append('giftcards',JSON.stringify(giftcards));
  formData.append('price',info.price);
  return request({
    method: 'POST',
    url: '/add_agency.php',
    data: formData
  })
}

export function crawlerGiftcard(info) {
  return request({
    url: '/get_crawler_giftcard.php',
    params: {
      brand: info.brand,
      card_num: info.card_num,
      pin: info.pin,
    }
  })
}