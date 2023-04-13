import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

//internal import
import Error from '@component/form/Error';
import Dashboard from '@pages/user/dashboard';
import InputArea from '@component/form/InputArea';
import UserServices from "@services/OnboardingServices";
import { notifyError, notifySuccess } from '@utils/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useContext } from 'react';
import { UserContext } from '@context/UserContext';
import { useRouter } from 'next/router';
import { SpinLoader } from '@component/preloader/SpinLoader';
import { useState } from 'react';

const schema = yup.object().shape({
  currentPassword: yup.string()
  .required('Password is required')
  .max(40, 'Password must not exceed 40 characters'),
	password: yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
  passwordConfirmation: yup.string().equals(
    [yup.ref("password"), null],
    "Passwords do not match"
  ),
});
const ChangePassword = () => {
  const [loading,setLoading] = useState(false)
  const {state:{userInfo}} = useContext(UserContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({mode: "onBlur",resolver: yupResolver(schema)});

  

  const onSubmit = ({currentPassword, password,passwordConfirmation }) => {
    const data = {currentPassword, password,passwordConfirmation }
    setLoading(true);
    UserServices.changePassword(data,userInfo?.jwt)
      .then((res) => {
        setLoading(false);
        router.push('/')
        notifySuccess('Password Change successfully');
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err.message ? err.message : err.response.data.message);
      });
  };

  useEffect(() => {
    if (Cookies.get('userInfo')) {
      const user = JSON.parse(Cookies.get('userInfo'));
      setValue('email', user.email);
    }
  });

  return (
    <Dashboard title="Change-Password" description="This is change-password page">
      <h2 className="text-xl font-serif font-semibold mb-5">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:grid-cols-6 md:gap-6">
          <div className="md:mt-0 md:col-span-2">
            <div className="lg:mt-6 bg-white">
              <div className="grid grid-cols-6 gap-6">
                {/* <div className="col-span-6 sm:col-span-6">
                  <InputArea
                    register={register}
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                  />
                  <Error errorName={errors.email} />
                </div> */}
                <div className="col-span-6 sm:col-span-6">
                  <InputArea register={register} label="Current Password" name="currentPassword" type="password" placeholder="Your Current Password" />
                  <Error errorName={errors.currentPassword} />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <InputArea register={register} label="New Password" name="password" type="password" placeholder="Your New Password" />
                  <Error errorName={errors.password} />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <InputArea register={register} label="Confirmation Password" name="passwordConfirmation" type="password" placeholder="Confirmation Password" />
                  <Error errorName={errors.passwordConfirmation} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 text-right">
          <button
            disabled={loading}
            type="submit"
            style={{ opacity: loading ? 0.5 : 1 }}
            className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-primary text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
          >
            <SpinLoader loading={loading} />
            Change Password
          </button>
        </div>
      </form>
    </Dashboard>
  );
};

export default ChangePassword;
