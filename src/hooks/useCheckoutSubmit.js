import Cookies from 'js-cookie';
import * as dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from 'react-use-cart';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

//internal import
import useAsync from '@hooks/useAsync';
import { UserContext } from '@context/UserContext';
import OrderServices from '@services/OrderServices';
import CouponServices from '@services/CouponServices';
import { notifyError, notifySuccess } from '@utils/toast';

const useCheckoutSubmit = () => {
  const {
    state: { userInfo, shippingAddress },
    dispatch,
  } = useContext(UserContext);

  const [error, setError] = useState('');
  const [total, setTotal] = useState('');
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState('');
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qtyTotal, setQtyTotal] = useState(0);

  const router = useRouter();
  // const stripe = useStripe();
  const stripe = '';
  // const elements = useElements();
  const elements = '';
  const couponRef = useRef('');
  const { isEmpty, emptyCart, items, cartTotal } = useCart();
  const code_random = Math.floor(Math.random() * (25000 - 17000));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data } = useAsync(CouponServices.getAllCoupons);

  useEffect(() => {
    if (Cookies.get('couponInfo')) {
      const coupon = JSON.parse(Cookies.get('couponInfo'));
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
    }
  }, []);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove('couponInfo');
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  useEffect(() => {

    const result = items?.filter((p) => p.type === discountProductType);
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0
    );
    let totalValue = '';
    let subTotal = (cartTotal + shippingCost).toFixed(2);
    let discountAmount = discountProductTotal * (discountPercentage / 100);
    totalValue = subTotal - discountAmount;

    setDiscountAmount(discountAmount);
    setTotal(totalValue);
    const computeTotal = items?.reduce(
      (preValue, currentValue) => preValue + currentValue.quantity,
      0
    );
    setQtyTotal(computeTotal);
  }, [cartTotal, shippingCost, discountPercentage]);

  //if not login then push user to home page
  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }

    setValue('firstName', shippingAddress.firstName);
    setValue('lastName', shippingAddress.lastName);
    setValue('address', shippingAddress.address);
    setValue('contact', shippingAddress.contact);
    setValue('email', shippingAddress.email);
    setValue('city', shippingAddress.city);
    setValue('country', shippingAddress.country);
    setValue('zipCode', shippingAddress.zipCode);
  }, []);



  const CreateOrderDetails = () => {
    let tab = []
    if (items.length > 0) {
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const orderDetailsInfo = {
          "data": {
            "quantity": element.quantity,
            "price_was": element.price * element.quantity,
            "product": element.id
          }
        }
        OrderServices.addOrderDetails(orderDetailsInfo)
          .then((res) => {
            setLoading(false);
            notifySuccess('Order Details create successfully');
            tab.push(res.data.id);

            if (index == (items.length - 1)) {
              CreateOrder(tab);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log('order details:', err);
            notifyError(err ? err.response.data.error.message : err.message);
          })

      }
    }

  };
  const CreateOrder = (tabIds) => {

    const orderInfo = {
      "data": {
        "recipient": "Simple Order" + code_random.toString(),
        "status": "new",
        "code": code_random.toString(),
        "total_amount": cartTotal,
        "is_single": true,
        "user": userInfo ? userInfo.user.id : null,
        "order_details": tabIds,
        "quantity": qtyTotal
      }
    }
    OrderServices.addOrder(orderInfo)
      .then((res) => {
        setLoading(false);
        setIsCheckoutSubmit(false);
        notifySuccess('Order create successfully');
      })
      .catch((err) => {
        setLoading(false);
        setIsCheckoutSubmit(false);
        console.log('error order:', err);
        notifyError(err ? err.response.data.error.message : err.message);
      })

  };
  const submitHandler = async (data) => {
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: data });
    Cookies.set('shippingAddress', JSON.stringify(data));
    setIsCheckoutSubmit(true);
    setError('');

    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contact,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      paymentMethod: data.paymentMethod,
      status: 'Pending',
      cart: items,
      subTotal: cartTotal,
      shippingCost: shippingCost,
      discount: discountAmount,
      total: total,
    };


    CreateOrderDetails();
    // if (data.paymentMethod === 'Card') {
    //   if (!stripe || !elements) {
    //     return;
    //   }

    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: 'card',
    //     card: elements.getElement(CardElement),
    //   });

    //   console.log('error', error);

    //   if (error && !paymentMethod) {
    //     setError(error.message);
    //     setIsCheckoutSubmit(false);
    //   } else {
    //     setError('');
    //     const orderData = {
    //       ...orderInfo,
    //       cardInfo: paymentMethod,
    //     };

    //     handlePaymentWithStripe(orderData);

    //     // console.log('cardInfo', orderData);
    //     return;
    //   }
    // }
    // if (data.paymentMethod === 'COD') {
    //   OrderServices.addOrder(orderInfo)
    //     .then((res) => {
    //       router.push(`/order/${res._id}`);
    //       notifySuccess('Your Order Confirmed!');
    //       Cookies.remove('couponInfo');
    //       sessionStorage.removeItem('products1');
    //       emptyCart();
    //       setIsCheckoutSubmit(false);
    //     })
    //     .catch((err) => {
    //       notifyError(err.message);
    //       setIsCheckoutSubmit(false);
    //     });
    // }
  };

  const handlePaymentWithStripe = async (order) => {
    try {
      // console.log('try goes here!', order);
      // const updatedOrder = {
      //   ...order,
      //   currency: 'usd',
      // };
      console.log('step payment')
      // OrderServices.createPaymentIntent(order)
      //   .then((res) => {
      //     stripe.confirmCardPayment(res.client_secret, {
      //       payment_method: {
      //         card: elements.getElement(CardElement),
      //       },
      //     });

      //     const orderData = {
      //       ...order,
      //       cardInfo: res,
      //     };
      //     OrderServices.addOrder(orderData)
      //       .then((res) => {
      //         router.push(`/order/${res._id}`);
      //         notifySuccess('Your Order Confirmed!');
      //         Cookies.remove('couponInfo');
      //         emptyCart();
      //         sessionStorage.removeItem('products1');
      //         setIsCheckoutSubmit(false);
      //       })
      //       .catch((err) => {
      //         notifyError(err ? err?.response?.data?.message : err.message);
      //         setIsCheckoutSubmit(false);
      //       });
      //     // console.log('res', res, 'paymentIntent', paymentIntent);
      //   })

      //   .catch((err) => {
      //     console.log('err on creating payment intent', err.message);
      //     notifyError(err ? err?.response?.data?.message : err.message);
      //     setIsCheckoutSubmit(false);
      //   });
    } catch (err) {
      console.log('err', err?.message);
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsCheckoutSubmit(false);
    }
  };

  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current.value) {
      notifyError('Please Input a Coupon Code!');
      return;
    }
    const result = data.filter(
      (coupon) => coupon.couponCode === couponRef.current.value
    );

    if (result.length < 1) {
      notifyError('Please Input a Valid Coupon!');
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError('This coupon is not valid!');
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
      );
      return;
    } else {
      notifySuccess(
        `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      );
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch({ type: 'SAVE_COUPON', payload: result[0] });
      Cookies.set('couponInfo', JSON.stringify(result[0]));
    }
  };

  return {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
  };
};

export default useCheckoutSubmit;
