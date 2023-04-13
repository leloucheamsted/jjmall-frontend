import { FiLock, FiMail, FiEdit,FiPhone } from 'react-icons/fi';

//internal import
import Error from '@component/form/Error';
import InputArea from '@component/form/InputArea';
import useLoginSubmit from '@hooks/useLoginSubmit';
import { useState } from 'react';
import InputSecurityQuestion from '@component/form/InputSecurityQuestion';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { UserContext } from '@context/UserContext';
import {useForm, Controller} from "react-hook-form";
import { notifyError,notifySuccess } from '@utils/toast';
import UserServices from '@services/OnboardingServices';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { SpinLoader } from '@component/preloader/SpinLoader';
import OnboardingServices from '@services/OnboardingServices';
import { useEffect } from 'react';

const schema = yup.object().shape({
	answer1: yup.string()
		.required('Answer1 is required'),
  answer2: yup.string()
		.required('Answer2 is required'),
  answer3: yup.string()
		.required('Answer3 is required'),
 
});
const RegisterPage3 = ({ setShowResetPassword=()=>{}, setModalOpen=()=>{},setShowRegisterPage3=()=>{},
    setShowRegisterPage4=()=>{} }) => {
  // const { handleSubmit, submitHandler, register, errors, loading } =
  //   useLoginSubmit(setModalOpen);

  const {register,handleSubmit,setValue,formState: { errors },control} = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const addAnswer = (data,index,securityId)=>{
    const answerData = {
      "data":{
        answer: data['answer'+index] ? data['answer'+index]: '',
        security_question:data['security_question'+index] ? securityId: null,
        user:userInfo ? userInfo?.user?.id : null
      }
    };
    OnboardingServices.addAnswer(answerData)
        .then((res) => {
          setModalOpen(true);
        })
        .catch((err) => {
          console.log('val err:',err.message);
        });
  };
  const onSubmit = (data) => {
    
    for (let index = 1; index < 4; index++) {
      const element = data['answer'+index]
      const dataSecurity = {
        "data":{
          "question":data['security_question'+index] ? data['security_question'+index]: null,
        }
      };
      // console.log('val userData',userData);
      setLoading(true);
      OnboardingServices.addSecurityQuestion(dataSecurity)
      .then((res)=>{
        addAnswer(data,index,res.data.id)
        if (index == 3){
          console.log('val answer:',res)
          router.push('/signup/signup04');
          notifySuccess('Success!');
          setShowRegisterPage3(false);
          setShowRegisterPage4(true);
          setLoading(false);
        }
      })
      .catch((err)=>{
        if (index == 3){
          notifyError(err ? err.response?.data.error.message :err.message);
          setLoading(false);
        }
      });
      // OnboardingServices.addAnswer(userData)
      //   .then((res) => {
      //     setModalOpen(true);
          
      //     // notifySuccess('Create User Success!');
      //     if (index == 3){
      //       console.log('val answer:',res)
      //       router.push('/signup/signup04');
      //       notifySuccess('Success!');
      //       setShowRegisterPage3(false);
      //       setShowRegisterPage4(true);
      //       setLoading(false);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log('val err:',err.message);
      //     if (index == 3){
      //       notifyError(err ? err.response.data.error.message :err.message);
      //       setLoading(false);
      //     }
          
      //   });
      
    }
    // setShowRegisterPage3(false);
    // setShowRegisterPage4(true)
  };
  useEffect(()=>{})
  return (
    <>
      {/* <div className="grid grid-cols-1 gap-5">
          
          <div className="form-group">
            <InputSecurityQuestion
              label="Select Question1"
              name="security_question1"
              id="security_question1"
              placeholder="Security Question"
              Icon={FiLock}
              InputValue1={"What is the your mother last name"}
              InputValue2={"What is your city of birth"}
              InputValue3={"What is the name of your dog"}
              value={value1}
              setValue={setValue1}
            />

          </div>
          <div className="form-group">
            <InputArea
                register={register}
                label="Answer1"
                name="answer1"
                id="answer1"
                type="text"
                placeholder="Enter a Answer"
                Icon={FiEdit}
            />
          </div>
          <div className="form-group">
            <InputSecurityQuestion
              label="Select Question2"
              name="security_question2"
              id="security_question2"
              placeholder="Security Question"
              Icon={FiLock}
              InputValue1={"In what city were you born?"}
              InputValue2={"What is the name of your favorite pet?"}
              InputValue3={"What is your mother's maiden name?"}
              value={value2}
              setValue={setValue2}
            />
          </div>
          <div className="form-group">
            <InputArea
                register={register}
                label="Answer2"
                name="answer2"
                id="answer2"
                type="text"
                placeholder="Enter a Answer"
                Icon={FiEdit}
            />
          </div>
          <div className="form-group">
            <InputSecurityQuestion
              label="Select Question3"
              name="security_question3"
              id="security_question3"
              placeholder="Security Question"
              Icon={FiLock}
              InputValue1={"What high school did you attend?"}
              InputValue2={"What was the name of your elementary school?"}
              InputValue3={"What was the make of your first car?"}
              value={value3}
              setValue={setValue3}
            />
          </div>
          <div className="form-group">
            <InputArea
                register={register}
                label="Answer3"
                name="answer3"
                id="answer3"
                type="text"
                placeholder="Enter a Answer"
                Icon={FiEdit}
            />
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
            onClick={() => {setShowRegisterPage3(false);setShowRegisterPage4(true)}}
            className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            Next
          </button>
    </div> */}

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Signing Up</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Security Question</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <InputSecurityQuestion
              register={register}
              label="Select Question1"
              name="security_question1"
              placeholder="Security Question"
              Icon={FiLock}
              InputValue1={"What is the your mother last name"}
              InputValue2={"What is your city of birth"}
              InputValue3={"What is the name of your dog"}
              value={value1}
              setValue={setValue1}
            />
          </div>
          <div className="form-group">
            <InputArea register={register} label="Answer1" name="answer1" type="text" placeholder="Enter a Answer" Icon={FiEdit} />
          </div>
          <div className="form-group">
            <InputSecurityQuestion
              register={register}
              label="Select Question2"
              name="security_question2"
              placeholder="Security Question"
              Icon={FiLock}
              InputValue1={"In what city were you born?"}
              InputValue2={"What is the name of your favorite pet?"}
              InputValue3={"What is your mother's maiden name?"}
              value={value2}
              setValue={setValue2}
            />
          </div>
          <div className="form-group">
            <InputArea register={register} label="Answer2" name="answer2" type="text" placeholder="Enter a Answer" Icon={FiEdit} />
          </div>
          <div className="form-group">
            <InputSecurityQuestion
              register={register}
              label="Select Question3"
              name="security_question3"
              placeholder="Security Question"
              Icon={FiLock}
              InputValue1={"What high school did you attend?"}
              InputValue2={"What was the name of your elementary school?"}
              InputValue3={"What was the make of your first car?"}
              value={value3}
              setValue={setValue3}
            />
          </div>
          <div className="form-group">
            <InputArea register={register} label="Answer3" name="answer3" type="text" placeholder="Enter a Answer" Icon={FiEdit} />
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
            // onClick={()=>{router.push('/signup/signup04')}}
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

export default RegisterPage3;
