import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from 'react-google-login';

//internal import
// import UserServices from '@services/UserServices';
import UserServices from '@services/OnboardingServices';
import { UserContext } from '@context/UserContext';
import { notifyError, notifySuccess } from '@utils/toast';
import { ColorSwatchIcon } from '@heroicons/react/outline';

const useRegisterSubmit = (setModalOpen) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {
    state: { phoneNumber },
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  
  const submitHandler = ({
    name,
    email,
    registerEmail,
    verifyEmail,
    password,
    identifier,
    confirm_password,
    mobile_phone,
    first_name,
    last_name,
    verifyPhone,
    security_question1
  }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;
    
    
    console.log('valeur security question:',security_question1);
      const data = {
        "username":last_name,
        "email":email,
        "name":last_name,
        "phone_number":phoneNumber,
        "password":password,
        "status":"new",
        "provider":"local"
      }
      console.log('valeur data:',data);
      UserServices.userRegister(data)
        .then((res) => {
          setLoading(false);
          notifySuccess('Register Success!');
          setModalOpen(false);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    
  };

  const handleGoogleSignIn = (user) => {
    console.log('google sign in', user);
  };

  return {
    handleSubmit,
    submitHandler,
    handleGoogleSignIn,
    register,
    errors,
    GoogleLogin,
    loading,
  };
};

export default useRegisterSubmit;
