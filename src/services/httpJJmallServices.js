import axios from 'axios';
import Cookies from 'js-cookie';
console.log(`${process.env.NEXT_PUBLIC_API_BASE_JJMALL_URL}`);
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_JJMALL_URL}`,
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let userInfo;
  if (Cookies.get('userInfo')) {
    userInfo = JSON.parse(Cookies.get('userInfo'));
    config.headers.authorization = `Bearer ${userInfo.jwt}`;
  }

  return {
    ...config,
    headers: {
      // authorization: userInfo ? `Bearer ${userInfo.token}` : null,
      // authorization: userInfo ? `Bearer ${userInfo.jwt}` : null,
      authorization: `Bearer 014bdef5ea89115ae1b9a0dc983138b953916407e066d0e1633b6fc68f4ab79e96d6b9ece046c8893306f47fc4ee55447c130fa69fc45de69927d7db8b21134c4d2fd710bc9d96b46e826681d1dd1ab4222cb1a932dfbaca81ac44cac77abff7332cf10b5453e133f691d2b68c10d27d4f10111c7eeac661e8ae4da419903bd0`,
    },
  };
});

// console.log(process.env.API_BASE_URL);
const responseBody = response => response.data;

const requests = {
  get: (url, body) => {
    let ln = Cookies.get("locale") === "in" ? "en" : "fr"
    if (url.split("?")[0] === "/generic-products" || url.split("?")[0] === "/categories") {
      let newUrl = url.split("?")[0] + `?locale=${ln}&` + url.split('?')[1]
      // console.log(newUrl)
      return instance.get(newUrl, body).then(responseBody)
    }
    else {
      return instance.get(`${url}`, body).then(responseBody)
    }
  },

  post: (url, body, headers) => instance.post(url, body, headers).then(responseBody),

  put: (url, body) => instance.put(url, body).then(responseBody),
  delete: url => instance.delete(url).then(responseBody),
};

export default requests;
