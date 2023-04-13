import requests from './httpJJmallServices';

const ShopServices = {
  
  addShop(body) {
    const headers={
      "Content-Type":"multipart/form-data",
    };
    return requests.post('/shops', body, headers);

  },

  getShopByUser({ page = 1, limit = 8 }) {
    return requests.get(`/shops?populate[]=logo`);
    // return requests.get(`/shops?limit=${limit}&page=${page}`);
  },
  getShopById(id, body) {
    return requests.get(`/shops/${id}?populate[]=logo`, body);
  },
  updateShop(id, body) {
    const headers={
      "Content-Type":"multipart/form-data",
    };
    return requests.put(`/shops/${id}`, body);
  },
  deleteShop(id) {
    return requests.delete(`/shops/${id}`);
  },
};

export default ShopServices;
