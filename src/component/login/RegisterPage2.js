import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import React, { useContext, useEffect, useState } from 'react';

//internal import
import Error from '@component/form/Error';
import InputArea from '@component/form/InputArea';
import useLoginSubmit from '@hooks/useLoginSubmit';
import Uploader from '@component/image-uploader/Uploader';
import Label from '@component/form/Label';

import {useForm, Controller} from "react-hook-form";
import { notifyError,notifySuccess } from '@utils/toast';
import UserServices from '@services/OnboardingServices';
import Cookies from 'js-cookie';
import { UserContext } from '@context/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from 'next/router';
import { SpinLoader } from '@component/preloader/SpinLoader';
import OnboardingServices from '@services/OnboardingServices';

const schema = yup.object().shape({
	last_name: yup.string()
		.required('Lastname is required'),
  first_name: yup.string()
		.required('Firstname is required'),
	
});

const RegisterPage2 = ({ setShowResetPassword=()=>{}, setModalOpen=()=>{},imageUrl='',setImageUrl=()=>{},
    setShowRegisterPage2=()=>{},setShowRegisterPage3=()=>{} }) => {

  const {register,handleSubmit,setValue,formState: { errors },control} = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [loading, setLoading] = useState('');
  const {
    state: { userInfo },
  } = useContext(UserContext);

  const router = useRouter();
  const onSubmit = (data) => {
    
    const userData = {
      "data":{
        first_name: data.first_name ? data.first_name: '',
        last_name: data.last_name ? data.last_name: '',
        birthdate:data.birthdate ? data.birthdate: '',
        user:userInfo ? userInfo?.user?.id : null
      }
      
    };

    setLoading(true);
    OnboardingServices.addPerson(userData)
      .then((res) => {
        router.push('/signup/signup03');  
        
        setModalOpen(true);
        
        notifySuccess('Success!');
        setShowRegisterPage3(true);
        setShowRegisterPage2(false);
        setLoading(false);

      })
      .catch((err) => {
        console.log('val err:',err.message);
        notifyError(err ? err.response?.data.error.message :err.message);
        setLoading(false);
      });
  };
  return (
    <>
      {/* <div className="grid grid-cols-1 gap-5">
          <div className="form-group" >
            <div className="bg-white space-y-6">
              <div>
                <Label label="Photo" />
                <div className="mt-1 flex items-center">
                  <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <InputArea
              register={register}
              label="Last Name"
              name="name"
              type="text"
              id="lastnameRegister"
              placeholder="Last Name"
              
              
              Icon={FiUser}
            />

            <Error errorName={errors.name} />
          </div>
          <div className="form-group">
            <InputArea
              register={register}
              label="First Name"
              name="first_name"
              type="text"
              id="first_nameRegister"
              placeholder="First Name"
              Icon={FiUser}

            />

            <Error errorName={errors.first_name} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            // disabled={loading}
            // type="submit"
            type="button"
            onClick={() => {
              setShowRegisterPage2(false);
              setShowRegisterPage3(true);
              console.log('fff:',firstNameValue)
              // dispatch({ type: 'SAVE_FIRSTNAME', payload: document.querySelector('#first_name').value });
            }}
            className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            Next
          </button>
    </div> */}

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Signing Up</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Complete Information Creation account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <div className="bg-white space-y-6">
              <div>
                <Label label="Photo" />
                <div className="mt-1 flex items-center">
                  <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <InputArea register={register} label="Last Name" name="last_name" type="text" placeholder="Last Name" Icon={FiUser} />

            <Error errorName={errors.last_name} />
          </div>
          <div className="form-group">
            <InputArea register={register} label="First Name" name="first_name" type="text" placeholder="First Name" Icon={FiUser} />

            <Error errorName={errors.first_name} />
          </div>
          <div className="form-group">
            <InputArea register={register} label="Birthdate" name="birthdate" type="date" placeholder="Your Birthdate" />
            <Error errorName={errors.birthdate} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={() => {
                  router.push("/auth/reset-password");
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
            // onClick={()=>{router.push('/signup/signup03')}}
            className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            <SpinLoader loading={loading} />
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterPage2;
