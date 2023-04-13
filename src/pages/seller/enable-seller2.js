import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import React, { useContext, useEffect, useState } from 'react';

//internal import
import Label from '@component/form/Label';
import Error from '@component/form/Error';
import Dashboard from '@pages/user/dashboard';
import InputArea from '@component/form/InputArea';
import UserServices from '@services/OnboardingServices';
import { UserContext } from '@context/UserContext';
import Uploader from '@component/image-uploader/Uploader';
import { notifySuccess, notifyError } from '@utils/toast';
import {InputPhoneNumber} from '@component/form/InputCustomField'
import SellerServices from '@services/SellerServices';
import { SpinLoader } from '@component/preloader/SpinLoader';
import { useRouter } from 'next/router';

const EnableSeller2 = () => {
  
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [valuePhone, setValuePhone] = useState('');
  const [checkValue,setCheckValue] = useState(false);
  const [valTypeDocument,setValTypeDocument] = useState('cni_front');
  const router = useRouter();

  const {
    state: { userInfo },
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dataSeller = {
      "data":{
        has_accept_disclaimer: checkValue,
        user:userInfo ? userInfo.user.id: null,
        status:"disable"
      }
    };
    
    if (!checkValue){
      notifyError('Please Accepted conditions')
      return true;
    }
    setLoading(true);
    SellerServices.addSeller(dataSeller)
      .then((res) => {
        if (res) {
          setLoading(false);
          notifySuccess('Great You will be notified when your account is activated!');
          router.push('/')
          // Cookies.set('userInfo', JSON.stringify(res));
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err?.response?.data?.message : err.message);
    });

  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="bg-white space-y-6">
          <div>
            <Label label="Terms & Conditions" />
            <div className="mt-1 flex items-center">
              <div
                style={{ height: 400, overflowY: "scroll" }}
                className="py-2 px-4 md:px-5 w-full appearance-none border text-sm 
                opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 
                focus:ring-0 ease-in-out bg-white border-gray-200 
                focus:outline-none focus:border-primary h-11 md:h-12"
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
                  ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the
                  express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above
                  terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                </p>
                <p>
                  We employ the use of cookies. By accessing JJmall, you agreed to use cookies in agreement with the JJmall's Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s
                  details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising
                  partners may also use cookies.
                </p>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-span-6 sm:col-span-3">
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
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid-cols-6 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="lg:mt-6 mt-4 bg-white">
                <div className="grid grid-cols-6 gap-6">
                  {/* <div className="col-span-6">
                    <Label label={"Type Document"} />
                    <div className="relative">
                      <select {...register("type_document")}
                        className={
                          'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12'
                        }
                        onChange={(event)=>{setValTypeDocument(event.target.value)}}
                      >
                        <option value="cni_front">Cni Front</option>
                        <option value="cni_back">Cni Back</option>
                        <option value="passport">Passport</option>
                        <option value="bill">Bill</option>
                      </select>
                    </div>
                    <Error errorName={errors.type_document} />
                  </div>
                  {(valTypeDocument !='passport') &&(
                  <div className="col-span-6 sm:col-span-3">
                    <div>
                      <Label label="Cni front" />
                      <div className="mt-1 flex items-center">
                        <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                      </div>
                    </div>
                  </div>
                  )}{(valTypeDocument !='passport')?(
                  <div className="col-span-6 sm:col-span-3">
                    <div>
                      <Label label="Cni back" />
                      <div className="mt-1 flex items-center">
                        <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                      </div>
                    </div>
                  </div>
                  ):(
                  <div className="col-span-6">
                    <div>
                      <Label label="Passport" />
                      <div className="mt-1 flex items-center">
                        <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                      </div>
                    </div>
                  </div>
                  )} */}
                </div>

                <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                  <button
                    disabled={loading}
                    type="submit"
                    style={{ opacity: loading ? 0.5 : 1 }}
                    className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-primary text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                  >
                    <SpinLoader loading={loading} />
                    Create Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default dynamic(() => Promise.resolve(EnableSeller2), { ssr: false });
