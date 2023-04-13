import Cookies from 'js-cookie';
import React, { createContext, useReducer } from 'react';

export const UserContext = createContext();

const initialState = {
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
  shippingAddress: Cookies.get('shippingAddress')
    ? JSON.parse(Cookies.get('shippingAddress'))
    : {},
  couponInfo: Cookies.get('couponInfo')
    ? JSON.parse(Cookies.get('couponInfo'))
    : {},
  phoneNumber: "",
  shopInfo: Cookies.get('shopInfo')
    ? JSON.parse(Cookies.get('shopInfo'))
    : null,
  listShop: Cookies.get('listShop')
  ? JSON.parse(Cookies.get('listShop'))
  : null,
  dataSeller:null,
  isLogger: Cookies.get('isLogger')
  ? JSON.parse(Cookies.get('isLogger'))
  : false,
  groupInfo:[],
  allGroupInfo:[],
  productGroupInfo:[],
  listOrderShop:[],
};

function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };

    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
      };

    case 'LIST_SHOP_SELLER':
      return { ...state, listShop: action.payload };
    case 'LIST_ORDERSHOP_SELLER':
        return { ...state, listOrderShop: action.payload };
    case 'LIST_GROUP_INFO':
      return { ...state, groupInfo: action.payload };
    case 'LIST_ALLGROUP_INFO':
      return { ...state, allGroupInfo: action.payload };
    case 'LIST_PRODUCTGROUP_INFO':
        return { ...state, productGroupInfo: action.payload };
    case 'SAVE_ISLOGGER':
      return { ...state, isLogger: action.payload };
    case 'SAVE_DATA_SELLER':
      return { ...state, dataSeller: action.payload };
      
    case 'SHOP_CONNECTED':
      return { ...state, shopInfo: action.payload };
    case 'SAVE_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };

    case 'SAVE_SHIPPING_ADDRESS':
      return { ...state, shippingAddress: action.payload };

    case 'SAVE_COUPON':
      return { ...state, couponInfo: action.payload };

    
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
