import requests from './httpJJmallServices';

const SellerServices = {
  
  addSeller(body) {
    
    return requests.post('/sellers', body);

  },
  addDocument(body) {
    const headers={
      "Content-Type":"multipart/form-data",
    };
    return requests.post('/documents', body, headers);
  },
  
  getSellerByUser(userId) {
    return requests.get(`/sellers?filters[user][id][$eq]=${userId}&filters[status]=enable&populate[shops][populate]=logo`);
  },
  getOrderSellerByUser(userId) {
    return requests.get(`/sellers?filters[user][id][$eq]=${userId}&filters[status]=enable&populate[user][populate][orders][populate]=order_details`);
  },
  getSellerById(id, body) {
    return requests.get(`/sellers/${id}`, body);
  },
  updateSeller(id, body) {
    return requests.put(`/sellers/${id}`, body);
  },
  deleteSeller(id) {
    return requests.delete(`/sellers/${id}`);
  },
};

export default SellerServices;
