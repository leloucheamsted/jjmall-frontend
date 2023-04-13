import requests from "./httpJJmallServices";
import ordersList from "./fixtures/orders.json";
import axios from "axios";
import Cookies from "js-cookie";

// complete _id to every value
let fakeOrders = ordersList.map((order, index) => ({ _id: index.toString(), ...order }));
const headers = {
  // authorization: userInfo ? `Bearer ${userInfo.token}` : null,
  // authorization: userInfo ? `Bearer ${userInfo.jwt}` : null,
  authorization: `Bearer 014bdef5ea89115ae1b9a0dc983138b953916407e066d0e1633b6fc68f4ab79e96d6b9ece046c8893306f47fc4ee55447c130fa69fc45de69927d7db8b21134c4d2fd710bc9d96b46e826681d1dd1ab4222cb1a932dfbaca81ac44cac77abff7332cf10b5453e133f691d2b68c10d27d4f10111c7eeac661e8ae4da419903bd0`,
}
const OrderServices = {
  // addOrder(body, headers) {
  //   return requests.post("/order/add", body, headers);
  // },
  addOrder(body, headers) {
    return requests.post("/orders", body, headers);
  },
  addOrderDetails(body) {
    let headers = { "Accept": "application/json", "Content-Type": "application/json" };
    return requests.post("/order-details", body, headers);
  },
  addDelivery(body) {
    return requests.post("/deliveries", body);
  },
  addDeliveryItems(body) {
    return requests.post("/delivery-items", body);
  },

  updateDelivery(body, id) {
    return requests.put(`/deliveries/${id}`, body);
  },
  updateDeliveryItems(body, id) {
    return requests.put(`/delivery-items/${id}`, body);
  },
  getShowGroup(idProduct) {
    return requests.get(`/orders?filters[is_single]=false&filters[order_details][product][id]=${idProduct}&populate[user][populate][0]=person`);
  },
  showSingleGroup(group_code) {
    return requests.get(`/orders?filters[is_single]=false&filters[group_code]=${group_code}`);
  },
  addtransaction(body) {
    return requests.post("/transactions", body);
  },
  createTransaction(body, id) {
    return requests.post(`/users-has-payment-methods/${id}/transaction`, body);
  },
  addUserHasPayament(body) {
    return requests.post("/users-has-payment-methods", body);
  },
  createPaymentIntent(body) {
    return requests.post("/order/create-payment-intent", body);
  },

  getOrderByUser(email) {
    console.log(email)
    const fakeMail = "dwandji@peexit.com"
    return requests.get(`/orders?filters[user][email]=${email}&populate[0]=order_details.product.assets.path&populate[1]=user&populate[2]=deliveries`);
  },
  getOrderById(id, body) {
    var config = {
      method: "get",
      headers: headers,
      url: `${process.env.NEXT_PUBLIC_API_BASE_JJMALL_URL}orders/${id}?populate[0]=order_details.product.assets.path&populate[1]=deliveries`,
    };
    return axios(config);
    // return requests.get(`/order/${id}`, body);
    return new Promise((res, rej) => {
      setTimeout(() => {
        const filteredOrder = fakeOrders.find(({ _id: idFromDB }) => _id === idFromDB);
        res(filteredOrder);
      }, 200);
    });
  },
  cancelOrder(id, body) {
    var config = {
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_API_BASE_JJMALL_URL}orders/${id}`,
      headers: {
        Authorization:
          'Bearer 014bdef5ea89115ae1b9a0dc983138b953916407e066d0e1633b6fc68f4ab79e96d6b9ece046c8893306f47fc4ee55447c130fa69fc45de69927d7db8b21134c4d2fd710bc9d96b46e826681d1dd1ab4222cb1a932dfbaca81ac44cac77abff7332cf10b5453e133f691d2b68c10d27d4f10111c7eeac661e8ae4da419903bd0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: body,
    };

    return axios(config);
    // return requests.put(`/orders/${id}`)
  }
};

export default OrderServices;
