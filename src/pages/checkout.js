import React from 'react';
import dynamic from 'next/dynamic';
import { CardElement } from '@stripe/react-stripe-js';
import Link from 'next/link';
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from 'react-icons/io5';
import { ImCreditCard } from 'react-icons/im';

//internal import
import Layout from '@layout/Layout';
import Label from '@component/form/Label';
import Error from '@component/form/Error';
import CartItem from '@component/cart/CartItem';
import InputArea from '@component/form/InputArea';
import InputShipping from '@component/form/InputShipping';
import InputPayment, { InputMobileMoney } from '@component/form/InputPayment';
import useCheckoutSubmit from '@hooks/useCheckoutSubmit';
import { InputPerso } from '@component/form/InputCustomField';
import usePayementSubmit from '@hooks/usePayementSubmit';

const Checkout = () => {

  const {
    register,
    errors,
    handleSubmit,
    isLoading,
    BeginPayment,
    setValue,
  } = usePayementSubmit();

  const Change = (value) => {
    setValue('mobileNumber', value);
    console.log(`change ` + value)
  }
  return (
    <>
      <Layout title="Checkout" description="this is checkout page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <form onSubmit={handleSubmit(BeginPayment)}>
                <Label label="Mobile Payment" />
                <div className='space-y-2 pt-2'>
                  <InputMobileMoney
                    register={register}
                    label="Numero de payement"
                    name="mobileNumber"
                    Change={(i) => Change(i)}
                    id="mobileNumber"
                    type="text"
                    placeholder="Numero (688888888)" />
                  <Error errorName={errors.mobileNumber} />
                </div>
                <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                  <div className="col-span-6 sm:col-span-3">
                    <Link href="/">
                      <a className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full">
                        <span className="text-xl mr-2">
                          <IoReturnUpBackOutline />
                        </span>
                        Continue Shopping
                      </a>
                    </Link>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary hover:bg-emerald-600 border border-primary transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                    >
                      {isLoading ? (
                        <span className="flex justify-center text-center">
                          {" "}
                          <img src="/spinner.gif" alt="Loading" width={20} height={10} /> <span className="ml-2">Processing</span>
                        </span>
                      ) : (
                        <span className="flex justify-center text-center">
                          {" "}
                          Confirm
                          <span className="text-xl ml-2">
                            {" "}
                            <IoArrowForward />
                          </span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
