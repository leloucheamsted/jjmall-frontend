import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import {useForm} from 'react-hook-form';
import React, {useContext, useEffect, useState, CSSProperties} from 'react';

//internal import
import Label from '@component/form/Label';
import Error from '@component/form/Error';
import Dashboard from '@pages/user/dashboard';
import InputArea from '@component/form/InputArea';
import UserServices from '@services/OnboardingServices';
import {UserContext} from '@context/UserContext';
import Uploader from '@component/image-uploader/Uploader';
import {notifySuccess, notifyError} from '@utils/toast';
import {InputPhoneNumber} from '@component/form/InputCustomField';
import EnableSeller2 from '@pages/seller/enable-seller2';
import SellerServices from '@services/SellerServices';
import {SpinLoader} from '@component/preloader/SpinLoader';
import {useRouter} from 'next/router';

const EnableSeller = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [loading, setLoading] = useState(false);
  const [valuePhone, setValuePhone] = useState('');
  const [checkValue, setCheckValue] = useState(false);
  const [valTypeDocument, setValTypeDocument] = useState('cni_front');
  const [showPage1, setShowPage1] = useState(true);
  const [fileCniFront, setFileCniFront] = useState([]);
  const [fileCniBack, setFileCniBack] = useState([]);
  const [filePassPort, setFilePassPort] = useState([]);
  const [fileCommerce, setFileCommerce] = useState([]);

  const {
    state: {userInfo},
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    const dataSeller = {
      has_accept_disclaimer: checkValue,
    };
    const dataDocument = {
      type: data.type_document ? data.type_document : 'cni-front',
    };
    setLoading(true);

    if (fileCniFront.length > 0 && fileCniBack.length > 0 && fileCommerce.length > 0) {
      const dir = [];
      const filesData1 = new FormData();
      filesData1.append('files.path', fileCniFront[0]);
      filesData1.append('data', JSON.stringify({type: 'cni_front', user: userInfo ? userInfo.user.id : null}));
      dir.push(filesData1);
      const filesData2 = new FormData();
      filesData2.append('files.path', fileCniBack[0]);
      filesData2.append('data', JSON.stringify({type: 'cni_back', user: userInfo ? userInfo.user.id : null}));
      dir.push(filesData2);
      const filesData3 = new FormData();
      filesData3.append('files.path', fileCommerce[0]);
      filesData3.append('data', JSON.stringify({type: 'bill', user: userInfo ? userInfo.user.id : null}));
      dir.push(filesData3);
      console.log('formData:', dir);

      for (let i = 0; i < dir.length; i++) {
        SellerServices.addDocument(dir[i])
          .then(res => {
            if (res) {
              if (i == 2) {
                setLoading(false);
                notifySuccess('Upload Document Successfully!');
                setShowPage1(false);
              }
            }
          })
          .catch(err => {
            setLoading(false);
            if (i == 2) {
              notifyError(err.message ? err.message : err?.response?.data?.message);
            }
          });
      }
    } else if (filePassPort.length > 0 && fileCommerce.length > 0) {
      const dir = [];
      const filesData1 = new FormData();
      filesData1.append('files.path', filePassPort[0]);
      filesData1.append('data', JSON.stringify({type: 'passport', user: userInfo ? userInfo.user.id : null}));
      dir.push(filesData1);
      const filesData2 = new FormData();
      filesData2.append('files.path', fileCommerce[0]);
      filesData2.append('data', JSON.stringify({type: 'cni_back', user: userInfo ? userInfo.user.id : null}));
      dir.push(filesData2);

      console.log('formData:', dir);
      for (let i = 0; i < dir.length; i++) {
        SellerServices.addDocument(dir[i])
          .then(res => {
            if (res) {
              if (i == 1) {
                setLoading(false);
                setShowPage1(false);
                notifySuccess('Upload Document Successfully!');
              }
            }
          })
          .catch(err => {
            if (i == 1) {
              setLoading(false);
              notifyError(err.message ? err.message : err?.response?.data?.message);
            }
          });
      }
    } else {
      setLoading(false);
      notifyError('Upload Files for the registration!');
    }
  };

  const router = useRouter();
  useEffect(() => {
    console.log('userInfo is', userInfo);
    if (userInfo?.user?.is_merchant) {
      router.push('/');
    }
  }, [userInfo]);
  if (userInfo?.user?.is_merchant) {
    return null;
  }

  return (
    <Dashboard title="Enable-Seller" description="This is edit seller account">
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">Become Seller Account</h2>
            </div>
          </div>
        </div>
        {showPage1 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="bg-white space-y-6">
                <div>
                  <Label label="Commercial Register" />
                  <div className="mt-1 flex items-center">
                    <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} setFilesUpload={setFileCommerce} />
                  </div>
                </div>
                {/* <div>
                  <Label label="Terms & Conditions" />
                  <div  className="mt-1 flex items-center">
                    <div style={{height:200,overflowY:"scroll"}} className="py-2 px-4 md:px-5 w-full appearance-none border text-sm 
                      opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 
                      focus:ring-0 ease-in-out bg-white border-gray-200 
                      focus:outline-none focus:border-primary h-11 md:h-12"
                      >
                      <p>
                        These terms and conditions outline the rules and regulations for
                        the use of JJmall's Website, located at
                        <a href='#' style={{color:"#1CE",textDecoration:"underline"}}> https://jjmall.com/</a>. By accessing this website we assume you
                        accept these terms and conditions. Do not continue to use
                        JJmall if you do not agree to take all of the terms and
                        conditions stated on this page.
                      </p>
                      <p>
                        The following terminology applies to these Terms and Conditions,
                        Privacy Statement and Disclaimer Notice and all Agreements:
                        "Client", "You" and "Your" refers to you, the person log on this
                        website and compliant to the Company’s terms and conditions.
                        "The Company", "Ourselves", "We", "Our" and "Us", refers to our
                        Company. "Party", "Parties", or "Us", refers to both the Client
                        and ourselves. All terms refer to the offer, acceptance and
                        consideration of payment necessary to undertake the process of
                        our assistance to the Client in the most appropriate manner for
                        the express purpose of meeting the Client’s needs in respect of
                        provision of the Company’s stated services, in accordance with
                        and subject to, prevailing law of Netherlands. Any use of the
                        above terminology or other words in the singular, plural,
                        capitalization and/or he/she or they, are taken as
                        interchangeable and therefore as referring to same.
                      </p>
                      <p>
                        We employ the use of cookies. By accessing JJmall, you
                        agreed to use cookies in agreement with the JJmall's Privacy
                        Policy. Most interactive websites use cookies to let us retrieve
                        the user’s details for each visit. Cookies are used by our
                        website to enable the functionality of certain areas to make it
                        easier for people visiting our website. Some of our
                        affiliate/advertising partners may also use cookies.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <div className="col-span-6 sm:col-span-3">
                    <input 
                        {...register('acceptTerms')}
                        name="acceptTerms"
                        type="checkbox"
                        id="acceptTerms"
                    />
                    <label for="acceptTerms" style={{marginLeft:10}}
                      className="text-gray-500 font-medium text-sm leading-none mb-2"
                    > Accept Conditions</label><br></br>
                    <Error errorName={errors.accepTerms} />
                  </div>
                </div> */}
              </div>

              <div className="mt-10 sm:mt-0">
                <div className="md:grid-cols-6 md:gap-6">
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="lg:mt-6 mt-4 bg-white">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <Label label={'Type Document'} />
                          <div className="relative">
                            <select
                              {...register('type_document')}
                              className={
                                'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12'
                              }
                              onChange={event => {
                                setValTypeDocument(event.target.value);
                              }}
                            >
                              <option value="cni_front">Cni</option>
                              {/* <option value="cni_back">Cni Back</option> */}
                              <option value="passport">Passport</option>
                              {/* <option value="bill">Bill</option> */}
                            </select>
                          </div>
                          <Error errorName={errors.type_document} />
                        </div>
                        {valTypeDocument != 'passport' && (
                          <div className="col-span-6 sm:col-span-3">
                            <div>
                              <Label label="Cni front" />
                              <div className="mt-1 flex items-center">
                                <Uploader imageUrl={imageUrl1} setImageUrl={setImageUrl1} setFilesUpload={setFileCniFront} />
                              </div>
                            </div>
                          </div>
                        )}
                        {valTypeDocument != 'passport' ? (
                          <div className="col-span-6 sm:col-span-3">
                            <div>
                              <Label label="Cni back" />
                              <div className="mt-1 flex items-center">
                                <Uploader imageUrl={imageUrl2} setImageUrl={setImageUrl2} setFilesUpload={setFileCniBack} />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="col-span-6">
                            <div>
                              <Label label="Passport" />
                              <div className="mt-1 flex items-center">
                                <Uploader imageUrl={imageUrl3} setImageUrl={setImageUrl3} setFilesUpload={setFilePassPort} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                        <button
                          disabled={loading}
                          type="submit"
                          style={{opacity: loading ? 0.5 : 1}}
                          className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition 
                          ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-primary text-white px-5 md:px-6 lg:px-8 py-2 md:py-3
                           lg:py-3 hover:text-white h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                        >
                          <SpinLoader loading={loading} />
                          <span>Upload Document</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <EnableSeller2 />
        )}
      </div>
    </Dashboard>
  );
};

export default dynamic(() => Promise.resolve(EnableSeller), {ssr: false});
