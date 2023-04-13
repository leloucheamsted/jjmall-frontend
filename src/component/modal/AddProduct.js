import React, { useState } from 'react';

//internal import
import Common from '@component/login/Common';
import MainModal from '@component/modal/MainModal';
import Label from '@component/form/Label';
import Uploader from '@component/image-uploader/Uploader';
import Error from '@component/form/Error';
import { InputPerso } from '@component/form/InputCustomField';
import useProductSubmit from '@hooks/useProductSubmit';

const AddProduct = ({ modalOpen, setModalOpen }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [valueStatus, setValueStatus] = useState('available');
  const { handleSubmit, submitHandler, register, errors, loading } =
    useProductSubmit(setModalOpen);
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block h-screen w-full m-[10px]  max-w-lg p-0   text-left align-middle transition-all transform bg-black shadow-xl rounded-2xl">
        <div className="overflow-y-auto h-screen bg-white ">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold font-serif">Add Product</h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Create New Product</p>
          </div>
          <form onSubmit={handleSubmit(submitHandler)} className="flex p-5 flex-col justify-center">
            <div className="grid grid-cols-1 gap-5">
              <div className="form-group">
                <div className=" space-y-6">
                  <div>
                    <Label label="Photo" />
                    <div className="mt-1 flex items-center">
                      <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                    </div>
                  </div>

                  {/* Upload video in the form */}
                  <div>
                    <Label label="Video" />
                    <div className="mt-1 flex items-center">
                      <div class="flex items-center justify-center w-full">
                        <label class="flex flex-col w-full h-32 border-2 rounded-sm border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                          <div class="flex flex-col items-center justify-center pt-7">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <h2 class=" text-sm tracking-wider text-black ">Drag your video here</h2>
                            <p class="pt-1 italic text-gray-400 text-[12px] tracking-wider  group-hover:text-gray-600">(Only the *.mp4 and *.avi will be accepted here)</p>
                          </div>
                          <input type="file" class="opacity-0" accept="video/*" />
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*End  */}
                </div>
              </div>
              <div className="form-group">
                <InputPerso register={register} label="Product Name" name="name_product" type="text" id="name_product" placeholder="Product Name" />
                <Error errorName={errors.name_product} />
              </div>
              <div className="form-group">
                <InputPerso register={register} label="Description" name="product_description" type="text" id="product_description" placeholder="Product Description" />
                <Error errorName={errors.product_description} />
              </div>
              <div className="form-group">
                <InputPerso register={register} label="Barcode" name="barcode" type="text" id="barcode" placeholder="Barcode" />
                {/* <Error errorName={errors.barcode} /> */}
              </div>
              <div className="form-group">
                <Label label={"Status"} />
                <div className="relative">
                  <select
                    {...register("status_product")}
                    className={
                      "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
                    }
                    name="status_product"
                    value={valueStatus}
                    onChange={(e) => {
                      setValueStatus(e.target.value);
                    }}
                  >
                    <option value={"available"}>{"available"}</option>
                    <option value={"not_availaible"}>{"not_availaible"}</option>
                    <option value={"promoted"}>{"promoted"}</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <InputPerso register={register} label="Price" name="price" type="number" id="price" placeholder="Price" />
                {/* <Error errorName={errors.barcode} /> */}
              </div>
              <button disabled={loading} type="submit" className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainModal>
  );
};

export default React.memo(AddProduct);
