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
import TransactionService from '@services/TransactionService';
const usePayementSubmit = (setLoading) => {
  const {
    state: { userInfo, shippingAddress },
    dispatch,
  } = useContext(UserContext);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const router = useRouter();
  const { isEmpty, items, cartTotal } = useCart();
  const code_random = Math.floor(Math.random() * (25000 - 17000));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //if not login then push user to home page
  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
    // setValue('mobileNumber', shippingAddress.firstName);
  }, []);

  const checkProvider = ({ mobileNumber }) => {
    //  console.log(mobileNumber)
    if (mobileNumber.startsWith("69") ||
      mobileNumber.startsWith("655") ||
      mobileNumber.startsWith("656") ||
      mobileNumber.startsWith("657") ||
      mobileNumber.startsWith("658") ||
      mobileNumber.startsWith("659")) {
      return "ORANGE"
    }
    else {
      return "MTN"
    }
  }
  const createPayement = async ({ mobileNumber }) => {
    var data = {
      "number": `+237${mobileNumber}`,
      "provider": `${checkProvider({ mobileNumber })}`,
      "is_default": true,
      "is_verified": true
    };
    console.log(`My request body___:` + JSON.stringify(data))

    return TransactionService.addUserMethodPayment({ data })

  }

  const ExecuteTransaction = async ({ mobileNumber }) => {
    var data = {
      "data": {
        "status": "new",
        "amount": 50,
        "mno_id": "1123",
        "type": "refund",
        "order": 1,
        "users_has_payment_method": 1
      }
    };
    createPayement({ mobileNumber })
      .then(async response => {
        console.log(`My request response___:` + JSON.stringify(response.data))
        console.log(response.data.id)
        data.data.users_has_payment_method = response.data.id
        console.log(JSON.stringify(data))
        console.log(` Mes data: ${data}`)
        return TransactionService.createTransactionOperation(data)
          .then((res) => {
            console.log(`Transactions effectuee avec succes!\n ${JSON.stringify(res.data)}`)
          }).catch(ex => console.log(ex))
      })

  }
  const BeginPayment = async ({ mobileNumber }) => {
    ExecuteTransaction({ mobileNumber });
  }
  return {
    handleSubmit,
    BeginPayment,
    register,
    isLoading,
    errors,
    setValue,
    error,
  };
};

export default usePayementSubmit;
