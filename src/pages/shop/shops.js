import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import {useForm} from 'react-hook-form';
import React, {useContext, useEffect, useState} from 'react';

//internal import
import Label from '@component/form/Label';
import Error from '@component/form/Error';
import Dashboard from '@pages/user/dashboard';
import InputArea from '@component/form/InputArea';
import UserServices from '@services/OnboardingServices';
import {UserContext} from '@context/UserContext';
import Uploader from '@component/image-uploader/Uploader';
import {notifySuccess, notifyError} from '@utils/toast';
import {InputPerso, InputPhoneNumber} from '@component/form/InputCustomField';
import Select from 'react-select';
import ShopServices from '@services/ShopServices';
import {useRouter} from 'next/router';
import {SpinLoader} from '@component/preloader/SpinLoader';

const typeBussineess = [
  {value: 'Restaurant', label: 'Restaurant'},
  {value: 'Hair Salon', label: 'Hair Salon'},
  {value: 'Supermarket', label: 'Supermarket'},
  {value: 'Pharmacy', label: 'Pharmacy'},
  {value: 'Snack bar', label: 'Snack bar'},
];
const Shops = () => {
  const router = useRouter();
  const {redirect} = router.query;
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [valuePhone, setValuePhone] = useState('');
  const {
    state: {userInfo, dataSeller},
  } = useContext(UserContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);

  const setHandle = e => {
    setSelectedOptions(Array.isArray(e) ? e.map(hotel => hotel.label) : []);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    // const userData = {
    //   "data":{
    //     name: data.name_shop ? data.name_shop: '',
    //     registration_number: data.registration? data.registration:'',
    //     logo: imageUrl ? imageUrl: '',
    //     status:data.status ? data.status: '',
    //     bussinesses:selectedOptions? JSON.stringify(selectedOptions): {}
    //   }
    // };

    const userData = {
      name: data.name_shop ? data.name_shop : '',
      registration_number: data.registration ? data.registration : '',
      status: 'open',
      bussinesses: selectedOptions ? JSON.stringify(selectedOptions) : {},
      seller: dataSeller ? (dataSeller.data.length > 0 ? dataSeller.data[0].id : null) : null,
    };
    const filesData = new FormData();
    for (let i = 0; i < filesUpload.length; i++) {
      // console.log(filesUpload[i]);
      filesData.append('files.logo', filesUpload[i]);
    }
    filesData.append('data', JSON.stringify(userData));

    // console.log('image val:',filesData.getAll('files.media'));
    setLoading(true);
    ShopServices.addShop(filesData)
      .then(res => {
        if (res) {
          setLoading(false);
          reset({
            name_shop: '',
            registration: '',
          });
          router.push('/shop/list-shops');
          notifySuccess('Create Shop Successfully!');
        }
      })
      .catch(err => {
        setLoading(false);
        notifyError(err.message ? err.message : err?.response?.data?.message);
      });
  };

  useEffect(() => {
    console.log('userInfo is', userInfo);
    if (!userInfo?.user?.is_merchant) {
      router.push('/');
    }
  }, [userInfo]);
  if (!userInfo?.user?.is_merchant) {
    return null;
  }

  if (!userInfo?.user.is_merchant) {
    return null;
  }
  return (
    <Dashboard title="Update-Profile" description="This is edit profile page">
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">Create Shop</h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="bg-white space-y-6">
              <div>
                <Label label="Logo Shops" />
                <div className="mt-1 flex items-center">
                  <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} setFilesUpload={setFilesUpload} />
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid-cols-6 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="lg:mt-6 mt-4 bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea register={register} label="Name Shop" name="name_shop" type="text" placeholder="Name Shop" />
                        <Error errorName={errors.name_shop} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <Label label={'Type Bussiness'} />
                        <div className="relative">
                          <Select
                            required={true}
                            name="bussiness"
                            options={typeBussineess}
                            onChange={setHandle}
                            className={'w-full py-2'}
                            placeholder="Type Bussiness"
                            isMulti
                          />
                        </div>
                        <Error errorName={errors.bussiness} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputPerso
                          register={register}
                          label="Registration Number"
                          name="registration"
                          type="text"
                          placeholder="Registration Number"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <Label label={'Status'} />
                        <div className="relative">
                          <select
                            {...register('status')}
                            className={
                              'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12'
                            }
                          >
                            <option value="open">Open</option>
                            <option value="close">Close</option>
                          </select>
                        </div>
                        <Error errorName={errors.status} />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                      <button
                        disabled={loading}
                        type="submit"
                        style={{opacity: loading ? 0.5 : 1}}
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-primary text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                      >
                        <SpinLoader loading={loading} />
                        Create Shop
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default dynamic(() => Promise.resolve(Shops), {ssr: false});
