import React,{useState,useEffect} from 'react';

//internal import
import Common from '@component/login/Common';
import MainModal from '@component/modal/MainModal';
import Label from '@component/form/Label';
import Uploader from '@component/image-uploader/Uploader';
import Error from '@component/form/Error';
import { InputPerso } from '@component/form/InputCustomField';
import ShopServices from '@services/ShopServices';
import { useForm } from 'react-hook-form';
import { notifyError, notifySuccess } from '@utils/toast';
import { UserContext } from '@context/UserContext';
import { useContext } from 'react';
import { SpinLoader } from '@component/preloader/SpinLoader';
import SellerServices from '@services/SellerServices';

const UpdateShopModal = ({ modalOpen, setModalOpen,data,setData }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [valueStatus, setValueStatus] = useState('open');
  const {register,handleSubmit,setValue,formState: { errors },} = useForm();
  const [dataShop, setDataShop] = useState(data);
  const [filesUpload, setFilesUpload] = useState([]);

  const {dispatch,state:{listShop,userInfo}} = useContext(UserContext);
  const getShop = ()=>{
    SellerServices.getSellerByUser(userInfo.user.id)
      .then((res) => {
        
        if (res.data.length > 0){
          setData(res.data[0].attributes.shops);
          dispatch({type:'LIST_SHOP_SELLER',payload:res.data[0].attributes.shops})
        }
        else{
          setData(res);
          dispatch({type:'LIST_SHOP_SELLER',payload:res})
        }
        
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }

  const onSubmit = (data) => {

    const shopData = {
      "data":{
        name: data.shop_name ? data.shop_name: '',
        code: data.code ? data.code: '',
        registration_number: data.registration_number ? data.registration_number: '',
        status: data.status? data.status:'',
      }
      
    };
    const filesData = new FormData();
    for (let i = 0; i < filesUpload.length; i++) {
      // console.log(filesUpload[i]);
      filesData.append('files.logo',filesUpload[i]);
    }
    filesData.append('data',JSON.stringify({
      name: data.shop_name ? data.shop_name: '',
      code: data.code ? data.code: '',
      registration_number: data.registration_number ? data.registration_number: '',
      status: data.status? data.status:'',
    }));

    setLoading(true);
    ShopServices.updateShop(dataShop?.id, filesData)
      .then((res) => {
        if (res) {
          setLoading(false);
          getShop();
          notifySuccess('Shop Update Successfully!');
          setModalOpen(false);
          // Cookies.set('userInfo', JSON.stringify(res));
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err.message ? err.message : err.response.data.message);
      });
  };
  useEffect(() => {
    if (dataShop) {

      setValue('shop_name', data.attributes? data.attributes.name:'');
      setValue('code', data.attributes? data.attributes.code:'');
      setValue('registration_number', data.attributes? data.attributes.registration_number:'');
      setValue('status', data.attributes? data.attributes.status:'open');
      setImageUrl(data.attributes.logo.data? data.attributes.logo.data.attributes.url:'');
    }
  }, []);


  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div className="overflow-hidden bg-white mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold font-serif">Update Shop</h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Update Shop</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-5">
              <div className="form-group">
                <div className="bg-white space-y-6">
                  <div>
                    <Label label="Logo Shop" />
                    <div className="mt-1 flex items-center">
                      <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} setFilesUpload={setFilesUpload} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <InputPerso register={register} label="Shop Name" name="shop_name" type="text" id="shop_name" placeholder="Shop Name" />
                <Error errorName={errors.shop_name} />
              </div>
              <div className="form-group">
                <InputPerso register={register} label="Code" name="code" type="text" id="code" placeholder="Code" />
                <Error errorName={errors.code} />
              </div>
              <div className="form-group">
                <InputPerso register={register} label="Registration Number" name="registration_number" type="text" id="registration_number" placeholder="Registration Number" />
                <Error errorName={errors.registration_number} />
              </div>
              <div className="form-group">
                <Label label={"Status"} />
                <div className="relative">
                  <select
                    {...register("status")}
                    className={
                      "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
                    }
                    name="status"
                    value={valueStatus}
                    onChange={(e) => {
                      setValueStatus(e.target.value);
                    }}
                  >
                    <option value={"open"}>{"open"}</option>
                    <option value={"close"}>{"close"}</option>
                  </select>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                style={{ opacity: loading ? 0.5 : 1 }}
                className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
              >
                <SpinLoader loading={loading} />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainModal>
  );
};

export default React.memo(UpdateShopModal);
