import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

//internal import
import Loading from "@component/preloader/Loading";
import { UserContext } from "@context/UserContext";
import Layout from "@layout/Layout";
// import ProductServices from "@services/ProductServices";
// import ShopServices from "@services/ShopServices";
// import axios from "axios";
import ShopServices from "./../../services/ShopServices";
import ProductServices from "./../../services/ProductServices";

const ShopDetails = () => {
  const router = useRouter();

  const shopId = router?.query?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [shopData, productsData] = await Promise.all([ShopServices.getShopById(shopId), ProductServices.getProductsByShop(shopId)]);
      // console.log("shopData", shopData);

      setShop(shopData.data);
      console.log(productsData)
      setProducts(productsData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const {
    state: { userInfo },
  } = useContext(UserContext);

  console.log("shop details", shop);

  useEffect(() => {
    if (!userInfo && !shopId) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, shopId]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const goToListProducts = (id, name) => {
    router.push(`/products/?${id}-${name}`);
  };
  const goToAddProduct = (id, name) => {
    router.push(`/product/addProduct/?${id}-${name}`);
  };

  return (
    <>
      <Layout title={'Shop details'} description={'Shop description'}>
        <div className="px-0 py-10 lg:py-10">
          {isLoading ? (
            <Loading loading={isLoading} />
          ) : (
            shop && (
              <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
                <div className="flex items-center pb-4">
                  <ol className="flex items-center w-full overflow-hidden font-serif">
                    <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
                      <Link href="/">
                        <a>Home</a>
                      </Link>
                    </li>
                    <li className="text-sm mt-[1px]">
                      {' '}
                      <FiChevronRight />{' '}
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
                    <li className="text-sm px-1 transition duration-200 ease-in ">{shop?.attributes?.name}</li>
                  </ol>
                </div>
                <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                  <div className="flex flex-col xl:flex-row">
                    <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12">
                      <Image
                        src={shop?.attributes?.logo?.data?.attributes?.url || 'https://picsum.photos/150/?blur=100'}
                        alt={shop?.attributes?.logo?.data?.attributes?.name || ''}
                        layout="responsive"
                        width={150}
                        height={150}
                        priority
                      ></Image>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                        <div className="w-full md:w-7/12 md:pr-4 lg:pr-4 xl:pr-12">
                          <div className="mb-6">
                            <h1 className="leading-7 text-lg md:text-xl lg:text-2xl mb-1 font-semibold font-serif text-gray-800">
                              {shop?.attributes?.name}
                            </h1>
                            <p className="uppercase font-serif font-medium text-gray-500 text-sm">Code :{shop?.attributes?.code}</p>
                            <p className="uppercase font-serif font-medium text-gray-500 text-sm">
                              <span className="font-bold text-gray-600">{shop?.attributes?.registration_number || ''}</span>
                            </p>
                          </div>
                          <div className="mb-4 md:mb-5 block">
                            <span className="bg-emerald-100 text-emerald-600 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold mt-2 font-serif">
                              {shop?.attributes?.status}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm leading-6 text-gray-500 md:leading-7">
                              {shop?.attributes?.description ||
                                `In this shop we sell many products such as Baby Products. 
                            Baby Products are products intended to be used 
                            on infants and children under the age of three. Baby products are specially formulated
                             to be mild and non-irritating and use ingredients that are selected for these properties. 
                             Baby products include baby shampoos and baby lotions, oils, powders and creams.`}
                            </p>

                            <div className="flex flex-col mt-4">
                              <span className="font-serif font-semibold py-1 text-sm d-block">
                                <span className="text-gray-700">Bussinesses:</span> <span className="text-gray-500">{'Type'}</span>
                              </span>
                              {shop?.attributes?.bussinesses?.length > 0 && (
                                <div className="flex flex-row">
                                  {shop?.attributes?.bussinesses?.map((t, i) => (
                                    <span
                                      key={i + 1}
                                      className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {/* <Tags shop={shop.attributes} /> */}
                            </div>

                            <div className="flex flex-col mt-4">
                              <span className="font-serif font-semibold py-1 text-sm d-block">
                                <span className="text-gray-700">Created At:</span>{' '}
                                <span className="text-gray-500">{dayjs(shop?.attributes?.createdAt).format('D/MM/YYYY')}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                          <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
                            <button
                              onClick={() => {
                                goToAddProduct(shop?.id, shop?.attributes?.name);
                                console.log('rien');
                              }}
                              className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12"
                            >
                              Add Product
                            </button>
                            <button
                              onClick={() => {
                                goToListProducts(shop?.id, shop?.attributes?.name);
                                console.log('rien');
                              }}
                              className="my-3 text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12"
                            >
                              <span className="px-2">{'List Products '}</span>
                              <span className="inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100  bg-red-500 rounded-full">
                                {products?.length || 0}
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                router.push('/shop/orders')
                              }}
                              className="my-3 text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12"
                            >
                              <span className="px-2">{'Shop Orders'}</span>
                              
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </Layout>
    </>
  );
};

export default ShopDetails;
