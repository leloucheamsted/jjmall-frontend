import React, { useState } from 'react';
import { ImFacebook, ImGoogle } from 'react-icons/im';

//internal import
import Login from '@component/login/Login';
import Register from '@component/login/Register';
import RegisterPage2 from '@component/login/RegisterPage2';
import RegisterPage3 from '@component/login/RegisterPage3';
import ResetPassword from '@component/login/ResetPassword';
import useLoginSubmit from '@hooks/useLoginSubmit';
import RegisterPage4 from '@component/login/RegisterPage4';

const Common = ({ setModalOpen }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showRegisterPage2, setShowRegisterPage2] = useState(false);
  const [showRegisterPage3, setShowRegisterPage3] = useState(false);
  const [showRegisterPage4, setShowRegisterPage4] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [message,setMessage] = useState('Accept Terms');
  const { handleGoogleSignIn, GoogleLogin } = useLoginSubmit(setModalOpen);

  const handleModal = () => {
    setShowRegister(!showRegister);
    setShowResetPassword(false);
    setShowRegisterPage2(false);
    setShowRegisterPage3(false);
    setShowRegisterPage4(false)
  };

  return (
    <>
      <div className="overflow-hidden bg-white mx-auto">
        {/* {showResetPassword ? (
          <ResetPassword
            setShowResetPassword={setShowResetPassword}
            setModalOpen={setModalOpen}
          />
        ) : showRegister ? (
          <div className="overflow-hidden bg-white mx-auto">
            <Register
              setShowResetPassword={setShowResetPassword}
              setModalOpen={setModalOpen}
              // showRegister={showRegister}
              // setShowRegister={setShowRegister}
            />
            
            <RegisterPage2
              setShowResetPassword={setShowResetPassword}
              setModalOpen={setModalOpen}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
            <RegisterPage3
              setShowResetPassword={setShowResetPassword}
              setModalOpen={setModalOpen}
            />
            <RegisterPage4
              setShowResetPassword={setShowResetPassword}
              setModalOpen={setModalOpen}
              ConditionTerms={message}
            />
          </div>
        ) : (
          <Login
            setShowResetPassword={setShowResetPassword}
            setModalOpen={setModalOpen}
          />
        )} */}

        {showResetPassword ? (
          <ResetPassword setShowResetPassword={setShowResetPassword} setModalOpen={setModalOpen} />
        ) : showRegister ? (
          <div className="overflow-hidden bg-white mx-auto">
            <Register setShowResetPassword={setShowResetPassword} setModalOpen={setModalOpen} setShowRegisterPage2={setShowRegisterPage2} setShowRegister={setShowRegister} />
          </div>
        ) : showRegisterPage2 ? (
          <RegisterPage2
            setShowResetPassword={setShowResetPassword}
            setModalOpen={setModalOpen}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            setShowRegisterPage2={setShowRegisterPage2}
            setShowRegisterPage3={setShowRegisterPage3}
          />
        ) : showRegisterPage3 ? (
          <RegisterPage3 setShowResetPassword={setShowResetPassword} setModalOpen={setModalOpen} setShowRegisterPage3={setShowRegisterPage3} setShowRegisterPage4={setShowRegisterPage4} />
        ) : showRegisterPage4 ? (
          <RegisterPage4 setShowResetPassword={setShowResetPassword} setModalOpen={setModalOpen} setShowRegisterPage4={setShowRegisterPage4} />
        ) : (
          <Login setShowResetPassword={setShowResetPassword} setModalOpen={setModalOpen} />
        )}

        <div className="my-8 after:bg-gray-100 before:bg-gray-100 fo10t-sans text-center font-medium">OR</div>

        <div className="flex justify-between flex-col lg:flex-row">
          <button className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-600 bg-gray-100 shadow-sm md:px-2 my-1 sm:my-1 md:my-1 lg:my-0 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2">
            <ImFacebook /> <span className="ml-2">Login With Facebook</span>
          </button>

          <GoogleLogin
            clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
            render={(renderProps) => (
              <button
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-600 bg-gray-100 shadow-sm md:px-2 my-1 sm:my-1 md:my-1 lg:my-0 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
                onClick={renderProps.onClick}
                // onClick={console.log('je click')}
                disabled={renderProps.disabled}
              >
                <ImGoogle /> <span className="ml-2">Login With Google</span>
              </button>
            )}
            onSuccess={handleGoogleSignIn}
            onFailure={handleGoogleSignIn}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="text-center text-sm text-gray-900 mt-4">
          <div className="text-gray-500 mt-2.5">
            {showRegister ? "Already have a account ?" : "Not have a account ?"}
            <button onClick={handleModal} className="text-gray-800 hover:text-primary font-bold mx-2">
              {showRegister ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Common;
