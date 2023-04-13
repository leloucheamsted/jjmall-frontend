import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Label from '@component/form/Label';
import Error from '@component/form/Error';

import { IoClose, IoPlay } from 'react-icons/io5';
import Image from 'next/image';
import { InputCategory, InputGenericProduct, InputPerso, InputSelectPerso } from '@component/form/InputCustomField';
import useProductSubmit from '@hooks/useProductSubmit';
import { InputTexterea } from '@component/form/InputCustomTexterea';
import Loading from '@component/preloader/Loading';
import { ToastContainer } from 'react-toastify';
import Layout from '@layout/Layout';
import { FiChevronRight, FiChevronUp } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { UserContext } from '@context/UserContext';
const AddProduct = () => {
  const [queryParameters] = new URLSearchParams(globalThis.window?.location.search);
  const [shopName, setShopName] = useState('');
  const [shopID, setShopID] = useState(0);
  const params = queryParameters;
  const [name, setName] = useState('');
  const [, setPrice] = useState('');
  const [modeOpen, setModalOpen] = useState(true);
  const status = ['disable', 'active', 'illicite'];
  const [selectedTag, setSelectedTag] = useState([]);
  const [genericName, setGenericName] = useState('');
  const [disable, setDisable] = useState(true);
  const [genericPrice, setgenericPrice] = useState(null);
  const [genericPicturre, setGenericPicture] = useState('');
  const [generic_product, setGeneric_product] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [listVideos, setListVideos] = useState([]);
  const [generateProduct, setGenerateProduct] = useState({
    name: '',
    price: '',
    picture: '',
  });
  const [listPhotos, setListPhotos] = useState([]);
  const { handleSubmit, setValue, submitHandler, register, errors, loading } = useProductSubmit(
    setIsLoading,
    selectedTag,
    generic_product,
    listPhotos,
    listVideos,
    generateProduct,
    shopID,
  );

  useEffect(() => {
    console.log(params[0].split('-')[0]);
    setShopID(queryParameters[0].split('-')[0]);
    setShopName(queryParameters[0].split('-')[1]);
  }, []);

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setSelectedTag([...selectedTag, value]);
    e.target.value = '';
  }
  function completeField(product) {
    console.log(product);
    setName(product.name);
    setValue('name_product', product.name);
    setValue('price', product.price);
    document.getElementById('name_product').value = product.name;
    document.getElementById('price').value = product.price;
    setgenericPrice(price);
    genericPrice = price;
  }
  function completeDisable(disable) {
    setDisable(disable);
  }
  function removeTag(index) {
    setSelectedTag(selectedTag.filter((el, i) => i !== index));
  }

  const onChangeInputPhoto = e => {
    let url = URL.createObjectURL(e.target.files[0]);
    // console.log(listPhotos)
    setListPhotos([
      ...listPhotos,
      {
        url: url,
        file: e.target.files[0],
      },
    ]);
    console.log(listPhotos);
  };
  const onChangeInputVideo = e => {
    let url = URL.createObjectURL(e.target.files[0]);
    console.log(listVideos);
    setListVideos([
      ...listVideos,
      {
        url: url,
        file: e.target.files[0],
      },
    ]);
  };
  const removeItemPhoto = url => {
    setListPhotos(listPhotos.filter(a => a.url !== url));
  };
  const removeItemVideo = url => {
    setListVideos(listVideos.filter(a => a.url !== url));
  };

  const createGenerateProduct = p => {
    generic_product = 0;
    if (p.hasOwnProperty('name')) {
      setGenericName(p.name);
      generateProduct['name'] = p.name;
    }

    if (p.hasOwnProperty('description')) {
      setgenericPrice(p.name);
      generateProduct['description'] = p.description;
    }
    if (p.hasOwnProperty('picture')) {
      setGenericPicture(p.picture);
      generateProduct['picture'] = p.picture;
    }
    setGenerateProduct(generateProduct);

    console.log(generateProduct);
  };
  const getGenericProduct = id => {
    console.log('My generic', id);
    setGeneric_product(id);
  };

  const router = useRouter();
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);
  useEffect(() => {
    if (!userInfo?.user.is_merchant) {
      router.push('/');
    }
  }, [userInfo]);

  if (!userInfo?.user.is_merchant) {
    return null;
  }

  return (
    <div className="relative">
      <Layout>
        <ToastContainer />
        <div className="relative">
          <div className="relative  py-10 w-screen ">
            <div className="mx-auto px-3 lg:px-10 ">
              <div className="flex items-center pb-4">
                <ol className="flex items-center w-full overflow-hidden font-serif">
                  <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {' '}
                    <FiChevronUp />{' '}
                  </li>
                  <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold ">
                    <Link href={`/shop/list-shops`}>
                      <a>{'Shops'}</a>
                    </Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {' '}
                    <FiChevronRight />{' '}
                  </li>
                  <li className="text-sm px-1 transition duration-200 ease-in ">{shopName}</li>
                  <li className="text-sm mt-[1px]">
                    {' '}
                    <FiChevronRight />{' '}
                  </li>
                  <li className="text-sm px-1 transition duration-200 ease-in ">Add Product</li>
                </ol>
              </div>
              <div className="  w-full rounded-lg p-3 lg:p-12 bg-white">
                <form
                  autoComplete="off"
                  autocomplete="off"
                  onKeyPress={e => {
                    e.key === 'Enter' && e.preventDefault();
                  }}
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex w-full p-0 flex-col"
                >
                  <h4 className="text-[#515365] text-[25px] font-bold">General informations</h4>
                  <hr />
                  {/* Select Generic product */}
                  <div className="form-group my-5">
                    <InputGenericProduct
                      register={register}
                      createGenerateProduct={p => createGenerateProduct(p)}
                      label="Generic product"
                      name="generic_product"
                      completeDisable={disable => completeDisable(!disable)}
                      completeDescription={product => completeField(product)}
                      type="text"
                      id="generic_product"
                      onChange={id => getGenericProduct(id)}
                      placeholder="generic_product"
                    />
                    <Error errorName={errors.generic_product} />
                  </div>
                  <div className="md:flex w-full flex-wrap">
                    {/* Product name */}
                    <div className="w-full md:basis-1/2 md:pr-2 form-group my-5">
                      <InputPerso
                        register={register}
                        isNotRequired={true}
                        disable={disable}
                        label="Product Name"
                        name="name_product"
                        value={name}
                        type="text"
                        id="name_product"
                        placeholder="Product Name"
                      />

                      <Error errorName={errors.name_product} />
                    </div>
                    {/* Bar code */}
                    <div className="form-group basis-1/2 my-5">
                      <InputPerso
                        register={register}
                        disable={disable}
                        label="Barcode"
                        name="barcode"
                        type="text"
                        id="barcode"
                        placeholder="Barcode"
                      />
                      <Error errorName={errors.barcode} />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="form-group ">
                    <InputTexterea
                      disable={disable}
                      register={register}
                      label="Product Description"
                      showLabel={true}
                      name="product_description"
                      type="text"
                      id="product_description"
                      placeholder="Description"
                    />
                    <Error errorName={errors.product_description} />
                  </div>
                  <div className="md:flex w-full ">
                    {/* Select Category */}
                    <div className="form-group my-5 md:pr-2 basis-1/2 ">
                      <InputCategory
                        register={register}
                        label="Category"
                        name="category_product"
                        type="text"
                        id="category_product"
                        placeholder="Category"
                      />
                    </div>
                    {/* Tags  */}
                    <div className="form-group my-5 basis-1/2 ">
                      <div>
                        <Label label="Tags"></Label>

                        <div
                          id="tags"
                          className="pl-1 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12 flex items-center flex-wrap"
                        >
                          {selectedTag.map((tag, index) => (
                            <div className="rounded-[20px] mx-1 inline-block p-[.2em] bg-emerald-500" key={index}>
                              <span className="text-white">{tag}</span>
                              <span
                                onClick={() => removeTag(index)}
                                className="h-[20px] w-[20px] cursor-pointer text-[18px] text-[#fff] inline-flex justify-center items-center rounded-[50%] ml-[.5em] bg-[#000016]"
                              >
                                &times;
                              </span>
                            </div>
                          ))}
                          <input
                            type="text"
                            onKeyDown={handleKeyDown}
                            className="border-none outline-none focus:outline-none focus:border-none focus:ring-1 focus:ring-[#fff] focus:border-white h-10"
                            placeholder="Insert tags"
                          />
                        </div>
                      </div>
                      <Error errorName={errors.genericProduct} />
                    </div>
                  </div>
                  {/* Statut */}
                  <div className="form-group mb-5">
                    <InputSelectPerso
                      register={register}
                      label="Status"
                      disable={true}
                      status={status}
                      name="status"
                      type="text"
                      id="status"
                      placeholder="Status"
                    />
                    {/* <Error errorName={errors.statut} /> */}
                  </div>

                  {/*Generic product Description */}

                  {/* <div className='form-group  mb-5'>
                                    <div className=" h-[100px] w-full ">
                                        <textarea
                                            disabled={disable}
                                            // {...register(`generic_description`, {
                                            //     // required: `Generic product Description is required!`,
                                            // })}
                                            onChange={(e) => setGenerateProduct({ ...generateProduct, "description": e.target.value })}
                                            name="generic_description"
                                            label="Generic product Description"
                                            type="text"
                                            id="generic_description"
                                            defaultValue={genericPrice}
                                            placeholder="Generic product Description"
                                            className='p-1 w-full h-[100px] appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary '

                                        />
                                    </div>
                                    <Error errorName={errors.generic_description} />
                                </div> */}

                  <h4 className="text-[#515365]  text-[25px]  font-bold">Pricing</h4>
                  <hr />
                  {/* Quantity */}
                  <div className="md:flex w-full ">
                    <div className="form-group basis-1/2 md:pr-2 my-5">
                      <InputPerso
                        register={register}
                        label="Quantity"
                        name="quantity"
                        type="number"
                        disable={disable}
                        id="quantity"
                        placeholder="Quantity"
                      />
                      <Error errorName={errors.quantity} />
                    </div>

                    {/* Price */}
                    <div className="form-group basis-1/2   my-5">
                      <InputPerso
                        disable={disable}
                        register={register}
                        isNotRequired={true}
                        label="Price"
                        name="price"
                        type="number"
                        id="price"
                        placeholder="Price"
                      />
                      <Error errorName={errors.price} />
                    </div>
                  </div>
                  {/* Wholesale price */}
                  <div class="flex items-center w-full justify-items-between  ">
                    {/* Price */}
                    <div className="form-group w-full mb-5">
                      <InputPerso
                        register={register}
                        label="Group Price"
                        name="groupPrice"
                        disable={disable}
                        type="number"
                        id="groupPrice"
                        placeholder="Group Price"
                      />
                      <Error errorName={errors.groupPrice} />
                    </div>
                  </div>

                  <h4 className="text-[#515365] text-[25px]  font-bold">Assets</h4>
                  <hr />
                  <div className="md:flex w-full">
                    {/* Photo of product */}
                    <div className="basis-1/2 my-5 md:pr-2  w-full">
                      {/* Upload photo in the form */}
                      <div className="mb-5">
                        <Label label="Photos" />
                        <div className="mt-1 flex items-center">
                          <div class="flex items-center justify-center w-full">
                            <label class="flex flex-col w-full h-32 border-2 rounded-sm border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                              <div class="flex flex-col items-center justify-center pt-7">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="w-8 h-8 text-[#10b981] group-hover:text-[#10b981"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                                <h2 class=" text-sm tracking-wider text-black ">Drag your image here</h2>
                                <p class="pt-1 italic text-gray-400 text-[12px] tracking-wider  group-hover:text-gray-600">
                                  (Only the *.jg and *.png will be accepted here)
                                </p>
                              </div>
                              <input
                                disabled={disable}
                                onChange={e => onChangeInputPhoto(e)}
                                type="file"
                                class="opacity-0"
                                accept="image/*"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      {/*End  */}
                      <div className="flex flex-wrap">
                        {listPhotos.map((item, index) => {
                          return (
                            <>
                              <div className="relative w-[100px] h-[100px] m-1 bg-white">
                                <Image
                                  className="absolute top-0 left-0 right-0 bottom-0"
                                  src={item.url}
                                  alt="Picture of the author"
                                  width="90px"
                                  height="90px"
                                />

                                {/* delete photo item */}

                                <div className="absolute object-cover right-3 top-2">
                                  <button
                                    onClick={() => removeItemPhoto(item.url)}
                                    type="button"
                                    className="inline-flex justify-center px-1 py-1 text-base font-medium text-bl  bg-opacity-60 bg-[#000] text-white border border-transparent rounded-full hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                  >
                                    <IoClose />
                                  </button>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>

                    {/* Videos lists */}
                    <div className="basis-1/2 md:my-5  w-full">
                      {/* Upload video in the form */}
                      <div className="mb-5">
                        <Label label="Video" />
                        <div className="mt-1 flex items-center">
                          <div class="flex items-center justify-center w-full">
                            <label class="flex flex-col w-full h-32 border-2 rounded-sm border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                              <div class="flex flex-col items-center justify-center pt-7">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="w-8 h-8 text-[#10b981] group-hover:text-[#10b981"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                                <h2 class=" text-sm tracking-wider text-black ">Drag your video here</h2>
                                <p class="pt-1 italic text-gray-400 text-[12px] tracking-wider  group-hover:text-gray-600">
                                  (Only the *.mp4 and *.avi will be accepted here)
                                </p>
                              </div>
                              <input
                                disabled={disable}
                                onChange={e => onChangeInputVideo(e)}
                                type="file"
                                class="opacity-0"
                                accept="video/*"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      {/*End  */}
                      <div className="xl:flex xl:flex-wrap">
                        {listVideos.map((item, index) => {
                          return (
                            <>
                              <div className="relative w-[100px] h-[100px] m-1 bg-black">
                                <video
                                  src={item.url}
                                  autoPlay
                                  muted
                                  loop
                                  id="video"
                                  className="w-[100px] h-[100px] absolute top-0 left-0 right-0 bottom-0 "
                                >
                                  <source src={item.url} />
                                </video>

                                {/* delete video item */}

                                <div className="absolute object-cover right-3 top-2">
                                  <button
                                    onClick={() => removeItemVideo(item.url)}
                                    type="button"
                                    className="inline-flex justify-center px-1 py-1 text-base font-medium text-bl  bg-opacity-60 bg-[#000] text-white border border-transparent rounded-full hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                  >
                                    <IoClose />
                                  </button>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    // onClick={() => CreateProduct()}
                    className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {isLoading ? (
        <div className="absolute right-0 left-0 bottom-0 top-10 xl:flex p-5">
          {isLoading ? (
            <div className="absolute bg-black/50 flex justify-center items-center left-0 top-0 right-0 bottom-0">
              <Loading className="" loading={loading} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default React.memo(AddProduct);
