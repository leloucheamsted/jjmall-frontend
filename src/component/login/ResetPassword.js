import Link from 'next/link';
import React,{useState} from 'react';
import { FiClock, FiEdit, FiLock, FiMail, FiPhone } from 'react-icons/fi';

//internal import
import Error from '@component/form/Error';
import InputArea from '@component/form/InputArea';
import useLoginSubmit from '@hooks/useLoginSubmit';
import { transparent } from 'tailwindcss/colors';
import InputSecurityQuestion from '@component/form/InputSecurityQuestion';
import { useForm, useFormState } from 'react-hook-form';
import { InputPhoneNumber } from '@component/form/InputCustomField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import OnboardingServices from '@services/OnboardingServices';
import { notifyError, notifySuccess } from '@utils/toast';
import { useRouter } from 'next/router';
import { SpinLoader } from '@component/preloader/SpinLoader';

const ResetPassword = ({ setShowResetPassword=()=>{}, setModalOpen=()=>{} }) => {
  // const { handleSubmit, submitHandler, register, errors, loading } =
  //   useLoginSubmit(setModalOpen);

  const {register,handleSubmit,setValue,formState: { errors },control} = useForm({
    mode: "onBlur",
    // resolver: yupResolver(schema)
  });
  const [valborderColor,setValBorderColor] = useState('#1ce');
  const [isactiveButton1,setIsactiveButton1] = useState(true);
  const [isactiveButton2,setIsactiveButton2] = useState(false);
  const [isactiveButton3,setIsactiveButton3] = useState(false);
  const [value1, setValue1] = useState('');
  const [valuePhone, setValuePhone] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (data) => {
    const userData = {
      "email":data.verifyEmail? data.verifyEmail:""
    }
    if (isactiveButton2){
      notifyError('Phone Number is required!');
      return
    }
    else if (valuePhone){
      let tel =''
      tel = valuePhone.replace('237', '') || valuePhone.replace('+237', '');
      if (tel.length < 9 || tel.length > 9) return notifyError('Phone Number have must 9 char!') ;
    }
    setLoading(true);
    OnboardingServices.forgetPassword(userData)
      .then((res)=>{
        setLoading(false);
        router.push('/auth/reset-password02');
        notifySuccess('Send Code successfully');
      })
      .catch((err)=>{
        setLoading(false);
        notifyError(err ? err.response.data.error.message: err.message)
      })
  };
  return (
    <>
      <div className="text-center mb-6">
        <Link href="/">
          <a className="text-3xl font-bold font-serif">Forget Password</a>
        </Link>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Reset Your Password</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <div class="flex w-full">
              <button
                class="text-sm w-full px-3 font-medium leading-5 h-10 bg-white text-thirdly
                border-2 py-1 shadow-sm 
                duration-150 ease-in-out"
                style={{ borderColor: isactiveButton1 ? valborderColor : transparent, borderWidth: 2 }}
                onClick={() => {
                  setIsactiveButton1(true);
                  setIsactiveButton2(false);
                  setIsactiveButton3(false);
                }}
                type="button"
              >
                E-mail
              </button>
            </div>
            <div class="flex w-full">
              <button
                class="text-sm w-full px-3 font-medium leading-5 h-10 bg-white text-thirdly
                border border-transparent py-1 shadow-sm 
                duration-150 ease-in-out"
                style={{ borderColor: isactiveButton2 ? valborderColor : transparent, borderWidth: 2 }}
                onClick={() => {
                  setIsactiveButton2(true);
                  setIsactiveButton1(false), setIsactiveButton3(false);
                }}
                type="button"
              >
                Phone Number
              </button>
              <button
                class="text-sm w-full px-3 font-medium leading-5 h-10 bg-white text-thirdly
                border border-transparent py-1 shadow-sm 
                duration-150 ease-in-out"
                style={{ borderColor: isactiveButton3 ? valborderColor : transparent, borderWidth: 2 }}
                onClick={() => {
                  setIsactiveButton3(true);
                  setIsactiveButton1(false), setIsactiveButton2(false);
                }}
                type="button"
              >
                Security Question
              </button>
            </div>
          </div>
          {isactiveButton1 ? (
            <div className="form-group">
              <InputArea register={register} label="Email" name="verifyEmail" id="verifyEmail" type="email" placeholder="Your Register Email" Icon={FiMail} />
              <Error errorName={errors.verifyEmail} />
            </div>
          ) : isactiveButton2 ? (
            <div className="form-group">
              <InputPhoneNumber register={register} label="Mobile Phone" name="mobile_phone" type="text" id="mobile_phoneRegister" country="cm" value={valuePhone} setValue={setValuePhone} />

              <Error errorName={errors.verifyPhone} />
            </div>
          ) : (
            <div>
              <div className="form-group">
                <InputSecurityQuestion
                  register={register}
                  label="Select Question1"
                  name="security_question1"
                  placeholder="Security Question"
                  Icon={FiLock}
                  InputValue1={"What is the your mother last name"}
                  value={value1}
                  setValue={setValue1}
                />
              </div>
              <div className="form-group">
                <InputArea register={register} label="Answer" name="answer1" type="text" placeholder="Enter a Answer" Icon={FiEdit} />
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={() => {
                  console.log("");
                }}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            style={{ opacity: loading ? 0.5 : 1 }}
            className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            <SpinLoader loading={loading} />
            Recover password
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
