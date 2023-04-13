import { useRouter } from "next/router";
import requests from "./httpJJmallServices";
import Cookies from "js-cookie";

const GenericProductServices = {
  addGenericProduct(body) {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    return requests.post("/generic-products", body, headers);
  },

  getGenericProduct() {
    return requests
      .get(`/generic-products?populate=picture`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        return [];
      });
  },

  getProducts(id) {
    return requests
      .get(
        `/generic-products/${id}?populate[0]=picture&populate[1]=products.assets.path&populate[2]=products.inventories&populate[3]=products.prices`
      )
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        return [];
      });
  },

  getGenericProductById(id, body) {
    return requests.get(`/generic-products/${id}`, body);
  },

  updateGenericProduct(id, body) {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    return requests.put(`/generic-products/${id}`, body, headers);
  },

  deleteGenericProduct(id) {
    return requests.delete(`/generic-products/${id}`);
  },
};

export default GenericProductServices;
