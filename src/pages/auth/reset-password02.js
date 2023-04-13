import { FiLock, FiMail, FiUser,FiPhone,FiEdit } from 'react-icons/fi';

import Layout from '@layout/Layout';
import { useState } from 'react';
import ReseauxSocial from '@component/login/ReseauxSocial';
import { useRouter } from 'next/router';
import ResetPassword from '@component/login/ResetPassword';
import InputArea from '@component/form/InputArea';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Error from '@component/form/Error';
import Link from 'next/link';

const schema = yup.object().shape({
  code: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(6, 'Password must have 6 characters max'),
    
	password: yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
  confirm_password: yup.string().equals(
    [yup.ref("password"), null],
    "Passwords do not match"
  ),
  
 
});

const ResetPass02 = ()=>{
    const [modalOpen,setModalOpen] = useState(false);
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const {register,handleSubmit,setValue,formState: { errors },control} = useForm({
      mode: "onBlur",
      resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
      const userData = {
        "code":data.code ? data.code :"",
        "password":data.password? data.password: "",
        "passwordConfirmation":data.confirm_password? data.confirm_password:""
      }
      OnboardingServices.resetPassword(userData)
        .then((res)=>{
          setLoading(false);
          notifySuccess('Reset Password successfully');
          router.push('/');
        })
        .catch((err)=>{
          setLoading(false);
          notifyError(err ? err.response.data.error.message: err.message)
        })
    };
    return (
      <Layout title="Reset-Password" description="Page auth Reset Password 02">
        <div className="bg-white">
          <div className="px-0 py-0 lg:py-0">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                <div className="flex flex-col xl:flex-row">
                  <div className="w-full xl:w-3/12 lg:w-3/12 md:w-3/12"></div>

                  <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    {/* <ResetPassword setModalOpen={setModalOpen}/> */}
                    <div className="text-center mb-6">
                      <Link href="/">
                        <a className="text-3xl font-bold font-serif">Forget Password</a>
                      </Link>
                      <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Reset Your Password</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
                      <div className="grid grid-cols-1 gap-5">
                        <div className="form-group">
                          <InputArea register={register} label="Code" name="code" type="number" id="code" placeholder="Enter Code" />

                          <Error errorName={errors.code} />
                        </div>
                        <div className="form-group">
                          <InputArea register={register} label="New Password" name="password" type="password" id="passwordRegister" placeholder="New Password" Icon={FiLock} />

                          <Error errorName={errors.password} />
                        </div>
                        {/* ################### Ajout du champ confirm password ####################### */}
                        <div className="form-group">
                          <InputArea register={register} label="Confirm Password" name="confirm_password" type="password" id="confirm_passwordRegister" placeholder="Confirm Password" Icon={FiLock} />

                          <Error errorName={errors.confirm_password} />
                        </div>
                      </div>
                      <button
                        disabled={loading}
                        type="submit"
                        style={{ marginTop: 20 }}
                        className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
                      >
                        Reset password
                      </button>
                    </form>
                  </div>

                  <div className="w-full xl:w-3/12 lg:w-3/12 md:w-3/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
};

export default ResetPass02;