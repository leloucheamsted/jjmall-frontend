import { FiLock, FiMail,FiPhone, FiUser } from 'react-icons/fi';

//internal  import
import Error from '@component/form/Error';
import useLoginSubmit from '@hooks/useLoginSubmit';
import InputArea from '@component/form/InputArea';
import {InputPhoneNumber} from '@component/form/InputCustomField';
import { useState } from 'react';
import { transparent } from 'tailwindcss/colors';
import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useRouter } from 'next/router';
import { SpinLoader } from '@component/preloader/SpinLoader';


const Login = ({ setShowResetPassword, setModalOpen }) => {
  const { handleSubmit, submitHandler, register, errors, loading,setValuePhone,valuePhone } =
    useLoginSubmit(setModalOpen);
  const [valborderColor,setValBorderColor] = useState('#1ce');
  const [isactiveButton1,setIsactiveButton1] = useState(true);
  const [isactiveButton2,setIsactiveButton2] = useState(false);
  const [value, setValue] = useState('')
  const router = useRouter();
  

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Login</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Login with your email and password</p>
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <div class="flex w-full">
              <button
                class="text-sm w-full px-2 font-medium leading-5 h-10 bg-white text-thirdly
                border-2 py-1 shadow-sm 
                duration-150 ease-in-out"
                style={{ borderColor: isactiveButton1 ? valborderColor : transparent, borderWidth: 2 }}
                onClick={() => {
                  setIsactiveButton1(true);
                  setIsactiveButton2(false);
                }}
                type="button"
              >
                E-mail
              </button>
              <button
                class="text-sm w-full px-2 font-medium leading-5 h-10 bg-white text-thirdly
                border border-transparent py-1 shadow-sm 
                duration-150 ease-in-out"
                style={{ borderColor: isactiveButton2 ? valborderColor : transparent, borderWidth: 2 }}
                onClick={() => {
                  setIsactiveButton2(true);
                  setIsactiveButton1(false);
                }}
                type="button"
              >
                Phone Number
              </button>
            </div>
          </div>

          <div className="form-group">
            {isactiveButton1 ? (
              <div>
                <InputArea register={register} label="Email" name="registerEmail" type="email" placeholder="Email" Icon={FiMail} />
                <Error errorName={errors.registerEmail} />
              </div>
            ) : (
              <div>
                <InputPhoneNumber
                  register={register}
                  label="Mobile Phone"
                  id="mobile_phone"
                  country="cm"
                  // value={value}
                  // setValue={setValue}
                  value={valuePhone}
                  setValue={setValuePhone}
                />
                {/* {value} */}
                <Error errorName={errors.mobile_phone} />
              </div>
            )}
          </div>
          {/* <div className="form-group">
            <InputArea
              register={register}
              label="Username"
              name="identifier"
              type="text"
              placeholder="Username"
              Icon={FiUser}
            />
            <Error errorName={errors.identifier} />
          </div> */}

          <div className="form-group">
            <InputArea register={register} label="Password" name="password" type="password" placeholder="Password" Icon={FiLock} />

            <Error errorName={errors.password} />
          </div>
          {/* <div className="form-group">
            <InputArea
              register={register}
              defaultValue="696535814"
              label="Moblie Phone"
              name="mobile_phone"
              type="mobile_phone"
              placeholder="Moblie Phone"
              Icon={FiPhone}
            />

            <Error errorName={errors.password} />
          </div> */}

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
            className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            <SpinLoader loading={loading} />
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
