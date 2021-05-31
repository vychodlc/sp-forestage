import axios from 'axios'

export function spider() {
  axios({
    method: 'POST',
    headers: {
      "accept":"application/json",
      "accept-encoding":"gzip, deflate, br",
      "accept-language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5",
      "appid":"orders",
      ":authority": "api.nike.com",
      ":method": "GET",
      ":scheme": "https",
      ":path":"/order_mgmt/user_order_details/v2/C00622025833?filter=email(huang.xi.ng77888877%40gmail.com)",
      "x-nike-visitid": "1",
      "x-nike-visitorid":"951b675d-9b43-4685-85ae-b0c4b9f51311"
    },
    url:"https://api.nike.com/order_mgmt/user_order_details/v2/C00622025833?filter=email(huang.xi.ng77888877%40gmail.com)"
  }).then(res => {
    console.log(res);
  })
}