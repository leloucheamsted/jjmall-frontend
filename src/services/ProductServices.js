import productsList from './fixtures/products.json';
import qs from 'qs';
import axios from 'axios';
import requests from './httpJJmallServices';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// import fs from 'fs';
let headers = {
  Authorization: 'Bearer ',
  'Content-Type': 'application/json',
};

// complete _id to every value
let fakeProducts = productsList.map((product, index) => ({
  _id: index.toString(),
  ...product,
}));

const ProductServices = {
  //get all products
  getProducts() {
    const queryObj = {
      populate: {
        inventories: true,
        prices: true,
        assets: {
          populate: ['path'],
        },
      },
    };

    const query = qs.stringify(queryObj, { encodeValuesOnly: true });
    return requests
      .get(`/products?${query}`)
      .then(res => {
        // return res.data;
        var result = res.data.filter(function (el) {
          return el.attributes.inventories.data.length >= 1 && el.attributes.prices.data.length >= 1 && el.attributes.assets.data >= 1;
        });

        return result;
      })
      .catch(e => {
        return [];
      });
  },

  //filter product by name
  async filterProducts(slug) {
    return requests
      .get(`/products?populate[0]=inventories&populate[1]=prices&populate[2]=assets.path&filters[name][$containsi]=${slug}`)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        return [];
      });
  },
  getProductsById(id) {
    return requests
      .get(`/products/${id}?populate[0]=inventories&populate[1]=prices&populate[2]=assets.path`)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        return [];
      });
  },
  getProductsByShop(shopId) {
    return requests
      .get(`/products?populate[0]=inventories&populate[1]=prices&populate[2]=assets.path&filters[shop][id][$eq]=${shopId}`)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        return [];
      });
  },

  getShowingProducts() {
    console.log('test 0');
    return requests
      .get(`/products?populate[0]=inventories&populate[1]=prices&populate[2]=assets.path`)
      .then(res => {
        var result = res.data.filter(function (el) {
          return (
            el.attributes.inventories.data.length >= 1 && el.attributes.prices.data.length >= 1 && el.attributes.assets.data.length >= 1
          );
        });

        return result;
      })
      .catch(e => {
        // return false;
        // lorsqu"on retourne false et qu"il ya pas de connexion internet la page retourne une erreur
        // avec un tableau vide l"erreur est mieux gérée
        return [];
      });
    // return new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res(fakeProducts);
    //   }, 200);
    // });
  },

  getDiscountedProducts() {
    return requests
      .get(`/products?populate[0]=inventories&populate[1]=prices&populate[2]=assets.path`)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        return [];
      });
  },

  getProductBySlug(slug) {
    return requests
      .get(`/products?populate[0]=inventories&populate[1]=prices&populate[2]=assets.path&filters[name][$containsi]=${slug}`)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        return [];
      });
  },
  async addAssets(product_id, files, type) {
    console.log('My files list', files);

    files.forEach((file, index) => {
      console.log(file.file);
      var dataJson = {
        type: type,
        size: file.file.size,
        product: product_id,
      };
      var data = new FormData();
      data.append('files.path', file.file);
      data.append('data', JSON.stringify(dataJson));
      console.log('Log data assets', data);
      return requests.post('/assets', data);
    });
  },

  async createPriceOfProduct(product_id, price) {
    const data = {
      price: price,
      currency: 'CFA',
      is_active: 1,
      type: 'single',
      pool_size: 1,
      product: product_id,
    };
    return requests.post('/prices', { data: data }, headers);
  },
  async createGroupPriceOfProduct(product_id, groupPrice, pool_size) {
    const data = {
      price: groupPrice,
      currency: 'CFA',
      is_active: 1,
      type: 'group',
      pool_size: pool_size,
      product: product_id,
    };
    return requests.post('/prices', { data: data }, headers);
  },
  async createCategoriesHasProduct(product_id, category_id) {
    const data = {
      product: product_id,
      category: category_id,
    };
    return requests.post('/products-has-categories', { data: data }, headers);
  },
  async addQuantityProduct(product_id, quantity) {
    const data = {
      product: product_id,
      quantity: quantity,
      min_quantity: 0,
    };
    return requests.post('/inventories', { data: data }, headers);
  },
  async createProduct(body) {
    var data = qs.stringify(body);
    var config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_BASE_JJMALL_URL}/products`,
      headers: {
        Authorization:
          'Bearer 014bdef5ea89115ae1b9a0dc983138b953916407e066d0e1633b6fc68f4ab79e96d6b9ece046c8893306f47fc4ee55447c130fa69fc45de69927d7db8b21134c4d2fd710bc9d96b46e826681d1dd1ab4222cb1a932dfbaca81ac44cac77abff7332cf10b5453e133f691d2b68c10d27d4f10111c7eeac661e8ae4da419903bd0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    return axios(config);
  },

  getProductByShop(id) {
    return requests.get(
      `/products?populate=shop&filters[shop][id]=${id}&populate[0]=inventories&populate[1]=prices&populate[2]=assets.path`,
    );
  },
  getProductById(id) {
    return requests.get(`/products/${id}?populate[0]=inventories&populate[1]=prices&populate[2]=assets.path`);
  },
  deleteProductById(id) {
    return requests.delete(`/products/${id}`);
  },
};

export default ProductServices;
