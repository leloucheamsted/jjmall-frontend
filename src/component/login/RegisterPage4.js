import { FiLock, FiMail, FiUser, FiPhone } from 'react-icons/fi';

//internal import
import Error from '@component/form/Error';
import InputArea from '@component/form/InputArea';
import useLoginSubmit from '@hooks/useLoginSubmit';
import Label from '@component/form/Label';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { UserContext } from '@context/UserContext';
import { useForm, Controller } from "react-hook-form";
import { notifyError, notifySuccess } from '@utils/toast';
import UserServices from '@services/OnboardingServices';
import { useContext } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SpinLoader } from '@component/preloader/SpinLoader';
import OnboardingServices from '@services/OnboardingServices';

const schema = yup.object().shape({
  accepTerms: yup.boolean()

});

const RegisterPage4 = ({ setShowResetPassword = () => { }, setModalOpen = () => { } }) => {
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  const router = useRouter();
  const { redirect } = router.query;
  const [loading, setLoading] = useState(false);
  const [checkValue, setCheckValue] = useState(false);

  const onSubmit = (data) => {

    const userData = {
      "data": {
        has_accept_disclaimer: data.accepTerms ? data.accepTerms : '',
      }

    };
    if (!userInfo) {
      notifyError('No user connected!');
      return;
    }
    OnboardingServices.updateUser(userInfo?.user?.id, userData)
      .then((res) => {

        router.push('/');
        notifySuccess('Register Success!');
        setLoading(false);
        setModalOpen(false);

      })
      .catch((err) => {
        console.log('val err:', err.message);
        notifyError(err ? err.response?.data.error.message : err.message);
        setLoading(false);
      });

  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Signing Up</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Accept Terms & Conditions</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <Label label={"Accept Terms"} />
            <div
              style={{ height: 300, overflowY: "scroll" }}
              className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
            >
              <p>
                These terms and conditions outline the rules and regulations for the use of JJmall's Website, located at
                <a href="#" style={{ color: "#1CE", textDecoration: "underline" }}>
                  {" "}
                  https://jjmall.com/
                </a>
                . By accessing this website we assume you accept these terms and conditions. Do not continue to use JJmall if you do not agree to take all of the terms and conditions stated on this page.
              </p>
              <p>
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this
                website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and
                ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express
                purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology
                or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
              </p>
              <p>
                We employ the use of cookies. By accessing JJmall, you agreed to use cookies in agreement with the JJmall's Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s
                details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners
                may also use cookies.
              </p>
            </div>
          </div>
          <div className="form-group">
            <input
              {...register("acceptTerms")}
              name="acceptTerms"
              type="checkbox"
              id="acceptTerms"
              onClick={(e) => {
                setCheckValue(e.target.checked);
              }}
            />
            <label for="acceptTerms" style={{ marginLeft: 10 }} className="text-gray-500 font-medium text-sm leading-none mb-2">
              {" "}
              Accept Conditions
            </label>
            <br></br>
            <Error errorName={errors.accepTerms} />
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
            // disabled={loading}
            // type="submit"
            disabled={checkValue ? false : true}
            type="submit"
            style={{ opacity: loading ? 0.5 : 1 }}
            className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            <SpinLoader loading={loading} />
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterPage4;
