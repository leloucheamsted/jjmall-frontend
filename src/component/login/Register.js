import { FiLock, FiMail, FiUser,FiPhone,FiEdit } from 'react-icons/fi';

//internal import
import Error from '@component/form/Error';
import InputArea from '@component/form/InputArea';
import {InputPerso, InputPhoneNumber} from '@component/form/InputCustomField';
import useRegisterSubmit from '@hooks/useRegisterSubmit';
import { useState,useContext } from 'react';
import RegisterPage2 from '@component/login/RegisterPage2';
import RegisterPage3 from '@component/login/RegisterPage3';
import RegisterPage4 from '@component/login/RegisterPage4';
import Uploader from '@component/image-uploader/Uploader';
import Label from '@component/form/Label';
import InputSecurityQuestion from '@component/form/InputSecurityQuestion';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { UserContext } from '@context/UserContext';
import {useForm, Controller} from "react-hook-form";
import { notifyError,notifySuccess } from '@utils/toast';
import UserServices from '@services/OnboardingServices';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { SpinLoader } from '@component/preloader/SpinLoader';
import OnboardingServices from '@services/OnboardingServices';

const schema = yup.object().shape({
	email: yup.string()
		.required('Email is required')
		.email('Email is invalid'),
	password: yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
  confirm_password: yup.string().equals(
    [yup.ref("password"), null],
    "Passwords do not match"
  ),
 
});


const Register = ({ setShowResetPassword=()=>{}, setModalOpen=()=>{},setShowRegisterPage2=()=>{},setShowRegister=()=>{}}) => {
  // const { handleSubmit, submitHandler, register, errors, loading } =
  // useRegisterSubmit(setModalOpen);
  

  const {register,handleSubmit,setValue,formState: { errors },control} = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  // const {control,formState: { errors }} = useForm({mode:"onTouched"})
  const [valuePhone, setValuePhone] = useState('');
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [showRegisterView, setShowRegisterView] = useState(true);
  // const [showRegisterPage2, setShowRegisterPage2] = useState(false);
  const [showRegisterPage3, setShowRegisterPage3] = useState(false);
  const [showRegisterPage4, setShowRegisterPage4] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [message,setMessage] = useState('Accept Terms');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const router = useRouter();

  const onSubmit = (data) => {
    
    const userData = {
      email: data.email ? data.email: '',
      phone_number: valuePhone ? "+"+valuePhone: '',
      username:data.email ? data.email: '',
      password: data.password ? data.password : ''
    };
    
    if (!valuePhone){
      notifyError('Phone Number is required!');
      return
    }
    else if (valuePhone){
      let tel =''
      tel = valuePhone.replace('237', '') || valuePhone.replace('+237', '');
      if (tel.length < 9 || tel.length > 9) return notifyError('Phone Number have must 9 char!') ;
    }
    // console.log('val data:',{userData})
    
    setLoading(true);
    OnboardingServices.userRegister(userData)
      .then((res) => {
        router.push('/signup/verif-code');
        
        setModalOpen(true);
        
        notifySuccess('Create User Success!');
        setShowRegister(false);
        setShowRegisterPage2(true);
        setLoading(false);
        dispatch({ type: 'USER_LOGIN', payload: res });
      
      })
      .catch((err) => {
        // console.log('val err:',err.response);
        notifyError(err ? err.response?.data.error.message :err.message);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Signing Up</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Create an account</p>
      </div>
      <form
        // onSubmit={handleSubmit(submitHandler)}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
      >
        {/* {showRegisterView && ( */}
        <div className="grid grid-cols-1 gap-5">
          {/* ################### Ajout du champ mobile phone ####################### */}
          <div className="form-group">
            <InputPhoneNumber
              register={register}
              label="Mobile Phone"
              name="mobile_phone"
              type="text"
              id="mobile_phoneRegister"
              country="cm"
              // onChange={onChange}
              // value={value}
              value={valuePhone}
              setValue={setValuePhone}
            />

            {/* {value} */}
            <Error errorName={errors.mobile_phone} />
          </div>
          <div className="form-group">
            <InputArea register={register} label="Email" name="email" type="email" id="emailRegister" placeholder="Email" Icon={FiMail} />

            <Error errorName={errors.email} />
          </div>

          {/* <div className="form-group">
            <InputArea
              register={register}
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
              Icon={FiUser}
            />

            <Error errorName={errors.username} />
          </div> */}

          <div className="form-group">
            <InputArea register={register} label="Password" name="password" type="password" id="passwordRegister" placeholder="Password" Icon={FiLock} />

            <Error errorName={errors.password} />
          </div>

          {/* ################### Ajout du champ confirm password ####################### */}

          <div className="form-group">
            <InputArea register={register} label="Confirm Password" name="confirm_password" type="password" id="confirm_passwordRegister" placeholder="Confirm Password" Icon={FiLock} />

            <Error errorName={errors.confirm_password} />
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
            // onClick={() => {router.push('/signup/signup02')}}
            className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            <SpinLoader loading={loading} />
            Next
          </button>
        </div>
        {/* ) } */}
      </form>
    </>
  );
};

export default Register;
