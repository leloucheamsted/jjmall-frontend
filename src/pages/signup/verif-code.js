import { FiLock, FiMail, FiUser,FiPhone,FiEdit } from 'react-icons/fi';

import Layout from '@layout/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import InputArea from '@component/form/InputArea';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Error from '@component/form/Error';
import { SpinLoader } from '@component/preloader/SpinLoader';
import { notifyError, notifySuccess } from '@utils/toast';
import OnboardingServices from '@services/OnboardingServices';

const schema = yup.object().shape({
	// code: yup.string()
  //   .required('Code email is required')
  //   .min(6, 'Code email must be at least 6 characters')
  //   .max(6, 'Code email must have 6 characters max'),
  codePhone: yup.string()
  .required('Code Phone Number is required')
  .min(6, 'Code Phone Number must be at least 6 characters')
  .max(6, 'Code Phone Number must have 6 characters max'),
});

const VerifCode = ()=>{
    const [modalOpen,setModalOpen] = useState(false);
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const {register,handleSubmit,setValue,formState: { errors },control} = useForm({
      mode: "onBlur",
      resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
      // const dico = {
      //   code:data.code ? data.code:"",
      // }
      const dico2 = {
        code:data.codePhone ? data.codePhone:"",
      }
      setLoading(true);
      // .then((res)=>{

      //   // OnboardingServices.confirmationCode(dico2)
      //   // .then((res)=>{
      //   //   setLoading(false);
      //   //   router.push('/signup/signup02');
      //   //   notifySuccess('Verify Code successfully');
      //   // })
      //   // .catch((err)=>{
      //   //   setLoading(false);
      //   //   notifyError(err ? err.response.data.error.message: err.message)
      //   //   // notifyError(err.message)
      //   // })

      //   setLoading(false);
      //   router.push('/signup/signup02');
      //   notifySuccess('Send Code successfully');
      // })
      OnboardingServices.confirmationCode(dico2).then(
        (res)=>{

          // OnboardingServices.confirmationCode(dico2)
          // .then((res)=>{
          //   setLoading(false);
          //   router.push('/signup/signup02');
          //   notifySuccess('Verify Code successfully');
          // })
          // .catch((err)=>{
          //   setLoading(false);
          //   notifyError(err ? err.response.data.error.message: err.message)
          //   // notifyError(err.message)
          // })

          setLoading(false);
          router.push('/signup/signup02');
          notifySuccess('Send Code successfully');
        }
      ).catch((err)=>{
        setLoading(false);
        console.log('val err:',err)
        notifyError(err ? err.response?.data.error.message: err.message)
        // notifyError(err.message)
      })
    };
    // const onSubmit = (data) => {
    //     router.push('/signup/signup02')
    //     console.log('')
    // };
    return (
      <Layout title="Verif-Account" description="Page Verification Account">
        <div className="bg-white">
          <div className="px-0 py-0 lg:py-0">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                <div className="flex flex-col xl:flex-row">
                  <div className="w-full xl:w-3/12 lg:w-3/12 md:w-3/12"></div>

                  <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <div className="text-center mb-6">
                      <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Verify Account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
                      <div className="grid grid-cols-1 gap-5">
                        {/* <div className="form-group">
                            <InputArea
                              register={register}
                              label="Code Email"
                              name="code"
                              type="number"
                              id="code"
                              placeholder="Enter Code Email"
                            />

                            <Error errorName={errors.code} />
                          </div> */}
                        <div className="form-group">
                          <InputArea register={register} label="Code Phone Number" name="codePhone" type="number" id="codePhone" placeholder="Enter Code Phone" />

                          <Error errorName={errors.codePhone} />
                        </div>
                      </div>
                      <button
                        disabled={loading}
                        type="submit"
                        style={{ marginTop: 20, opacity: loading ? 0.5 : 1 }}
                        className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
                      >
                        <SpinLoader loading={loading} />
                        Verify Account
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

export default VerifCode;