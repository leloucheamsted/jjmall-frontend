import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

//internal import

import Discount from "@component/common/Discount";
import profile from "@component/images/empty_profile2.png";
import pomme1 from "@component/images/saut_pomme1.png";
import pomme2 from "@component/images/saut_pomme2.png";
import pomme3 from "@component/images/saut_pomme3.png";

import BuyGroupModal from "@component/modal/BuyGroupModal";
import Loading from "@component/preloader/Loading";
import ProductCard from "@component/product/ProductCard";
import { SidebarContext } from "@context/SidebarContext";
import useAddToCart from "@hooks/useAddToCart";
import useAddToStock from "@hooks/useAddToStock";
import Layout from "@layout/Layout";
// import ProductServices from '@services/ProductServices';
// import OrderServices from "@services/OrderServices";
import ProductServices from "./../../services/ProductServices";
import OrderServices from "./../../services/OrderServices";
import NavBarTop from '@layout/navbar/NavBarTop';
import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import MobileFooter from "@layout/footer/MobileFooter";
import dayjs from 'dayjs';
import { UserContext } from '@context/UserContext';
import DeliveryMethodModal from "../modal/DeliveryMethodModal";

const ProductScreen = () => {
  const router = useRouter();

  const { handleAddItem, setItem, item } = useAddToCart();
  const [showBuyGroup, setShowBuyGroup] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const { handleAddStockItem, setStockItem, stockItem } = useAddToStock();

  const slug = router?.query?.slug;
  const [isLoading, setIsLoading] = useState(false);

  const [groups, setGroups] = useState([]);
  const [AllGroup,setAllGroup]= useState([]);
  const [GroupWithDoublons,setGroupWithDoublons] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [product, setProduct] = useState(null);
  const [priceGroup,setPriceGroup] = useState([]);
  const [stockFarm,setStockFarm] = useState([]);

  const {dispatch,state:{userInfo,groupInfo,
    allGroupInfo,productGroupInfo}} = useContext(UserContext);

  useEffect(() => {
    fetchData();
    console.log('first event productscreen')
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      dispatch({type:'LIST_GROUP_INFO',payload:[]});
      dispatch({type:'LIST_ALLGROUP_INFO',payload:[]});
      dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:[]});

      const [productData, productsData, groupData] = await Promise.all([ProductServices.getProductsById(slug), ProductServices.getShowingProducts(), OrderServices.getShowGroup(slug)]);

      let quantityStore = {};
      let quantityFarm = {};
      let priceStore = [];

      let relatedProduct = [];
      let groups = [];
      let AllGroup = [];
      let GroupWithDoublons = []
      if (slug) {
        const selectProduct = productsData.find((product) => product.id === slug);
        relatedProduct = productsData;
      }

      if (groupData) {
        if (groupData.data.length > 0) {
          const groupsids = groupData.data.map((o) => o.attributes.group_code);
          groups = groupData.data.filter((elt, index) => !groupsids.includes(elt.attributes.group_code, index + 1));
          AllGroup = groupsids
          GroupWithDoublons = groupData.data
          setAllGroup(groupsids)
          setGroupWithDoublons(groupData.data)
          console.log('val group data',groupData.data)
          dispatch({type:'LIST_GROUP_INFO',payload:groupData.data});
          dispatch({type:'LIST_ALLGROUP_INFO',payload:groupsids});
          dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:groups});

          priceStore = productData?.attributes.prices.data.filter(e => e.attributes.type == 'group');
          quantityStore = productData?.attributes.inventories.data.filter(e => e.attributes.type == 'store');
          quantityFarm = productData?.attributes.inventories.data.filter(e => e.attributes.type == 'farm');

          setPriceGroup(priceStore);
          setStockFarm(quantityStore);
        }
        
      }
      
      setRelatedProduct(relatedProduct);
      setProduct(productData);
      setGroups(groups);
      
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // useEffect(() => {}, []);

  //

  useEffect(() => {
    setIsLoading(false);
    console.log('second event productscreen')
  }, [product]);

  
  const handleOpenGroup = (e) => {
    if (e.attributes.type == "group") {
      router.push(`/product/groupBuy?id=${product.id}`, null, { scroll: false });
      // setShowBuyGroup(!showBuyGroup);
    } else if (e.attributes.type == "single") {
      handleAddItem(product, e.attributes.price);
    }
  };
  const AddStock = () => {
    console.log(stockItem);
  };
  const secondButonCreateGroup = (option='create_group',code_group="")=>{
    // setShowDelivery(!showDelivery)
    router.push({
      pathname:'/product/createGroup',
      query:{id:product?.id,quantity:1,
        amount_group: priceGroup.length >0? priceGroup[0].attributes.price:0,
        product:JSON.stringify(product),
        type:option,
        group_code:code_group
      },
    },'/product/createGroup')

  };
  //comment this when using getServerSideProps
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showBuyGroup && <BuyGroupModal modalOpen={showBuyGroup} setModalOpen={setShowBuyGroup} product={product} />}
      {showDelivery && <DeliveryMethodModal modalOpen={showDelivery} setModalOpen={setShowDelivery} product={product} />}
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <div>
          <div className="lg:block md:block hidden">
            <NavBarTop />
            <Navbar />
          </div>
          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="flex items-center pb-4 md:block hidden">
                <ol className="flex items-center w-full overflow-hidden font-[Inter]">
                  <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  {/* <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold ">
                    <Link
                      href={`/search?category=${product.children
                        .toLowerCase()
                        .replace("&", "")
                        .split(" ")
                        .join("-")}`}
                    >
                      <a>{product.children}</a>
                    </Link>
                  </li> */}
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  <li className="text-sm px-1 transition duration-200 ease-in ">{product?.attributes?.name}</li>
                </ol>
              </div>
              <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                <div className="flex flex-col xl:flex-row">
                  <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-6/12 xl:w-6/12">
                    <Discount product={product} slug={true} />
                    <div className="border border-slate-100">
                      <Image
                        src={
                          product?.attributes?.assets?.data.length > 0 ? product?.attributes?.assets?.data[0].attributes.path.data.attributes.url : ""
                          // product?.attributes?.assets?.data[0].attributes.path.data
                          //   .attributes.url
                        }
                        alt={product?.attributes?.name}
                        layout="responsive"
                        width={650}
                        height={650}
                        priority
                      ></Image>
                    </div>
                    <div className="w-full flex flex-cols mt-1">
                      {product?.attributes.assets.data.length > 0 && (
                        <div className="w-full flex flex-rows">
                          {product?.attributes.assets.data.map((item, index) =>(
                            <div key={index}>
                            
                            {item.attributes?.type == 'img' &&(
                              <div className="w-[60px] h-[60px] border border-slate-200 mr-1">
                                <Image
                                  src={item.attributes?.path?.data?.attributes.url}
                                  alt={'image product'}
                                  width={60}
                                  height={60}
                                  layout="responsive"
                                ></Image>
                              </div>
                            )}
                            {item.attributes?.type == 'video' && (
                              <div className="w-[60px] h-[60px] border border-slate-200">
                                <video
                                  src={item.attributes?.path?.data?.attributes.url}
                                  controlslist="nodownload"
                                  muted
                                  controls
                                  loop
                                  preload="metadata"
                                  alt={'video product'}
                                  width={60}
                                  height={60}
                                  className="h-full w-full"
                                />
                              </div>
                            )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                      {/* className="w-full md:w-7/12 md:pr-4 lg:pr-4 xl:pr-12" */}
                      <div className="w-full ">
                        <div className="mb-4 flex justify-between ">
                          {/* <div className="">
                            {product?.attributes?.prices.data.length > 0 && (
                              <div>
                                {product?.attributes?.prices.data.map((e, index) => (
                                  <span key={index + 1} style={{ fontWeight: "bold" }} className={e.attributes.type == "single" ? "text-md font-[Inter] text-orange-600" : "mx-2 text-md font-[Inter] text-gray-400"}>
                                    {e.attributes.type == "single" ? e.attributes.price : "for groups or " + e.attributes.price}
                                    {" XAF"}
                                  </span>
                                ))}
                              </div>
                              // <span className='mx-2 text-md font-[Inter] text-gray-400'>
                              //   for groups or {'900'}{' XAF'}
                              // </span>
                            )}
                          </div> */}

                          <div className=''>
                            <h1 className="leading-7 mt-2 text-md md:text-md lg:text-md mb-1 font-semibold font-[Inter] text-gray-800">
                              {product?.attributes?.name}
                            </h1>
                            <p className="text-sm leading-6 text-gray-500 md:leading-7">
                              
                             <span className="">
                                {product?.attributes.description}
                              </span> 
                            </p>
                          </div>
                          
                          
                        </div>
                        {/* price group ang price single */}
                        <div className="mt-4 mb-4 md:mb-5 md:block hidden">
                            {product?.attributes?.prices.data.length > 0 && (
                              <div className="flex items-center justify-between space-s-3 space-s-4 w-full">
                                {product?.attributes?.prices.data.map((e, index) => (
                                  <button
                                    onClick={() => {
                                      handleOpenGroup(e);
                                    }}
                                    key={index + 1}
                                    // disabled={}
                                    className={
                                      e.attributes.type == "single"
                                        ? "text-sm text-white leading-4 bg-[#898A8D3D]  items-center cursor-pointer transition ease-in-out duration-300 font-semibold \
                                font-[Inter] text-center justify-center border border-orange-300 rounded-[10px] focus-visible:outline-none \
                                focus:outline-none px-4  md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-slate-300 \
                                w-full h-15"
                                        : "text-sm text-white mr-2 bg-[#288A36] leading-4 items-center cursor-pointer transition ease-in-out duration-300 \
                                font-semibold font-[Inter] text-center justify-center border border-orange-300  rounded-[10px] \
                                focus-visible:outline-none focus:outline-none px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white \
                                hover:bg-emerald-800 w-full h-15"
                                    }
                                  >
                                    <span className="w-full flex text-center justify-center">{e.attributes.price} XAF</span>
                                    <span className="w-full flex text-center justify-center">{e.attributes.type == "single" ? "buy alone" : "buy in group"}</span>
                                  </button>
                                ))}

                                {/* <button
                                onClick={() => {handleAddItem(product)}}
                                // disabled={}
                                className="text-sm text-[#7E7D7D] bg-[#898A8D3D] leading-4 items-center cursor-pointer transition ease-in-out duration-300 
                                font-semibold font-[Inter] text-center justify-center border border-orange-300  rounded-[10px] 
                                focus-visible:outline-none focus:outline-none px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white 
                                hover:bg-slate-300 w-full h-15"
                              >
                                <span className='w-full flex text-center justify-center'>900 XAF</span>
                                <span className='w-full flex text-center justify-center'>buy alone</span>
                                
                                
                              </button> */}
                              </div>
                            )}
                        </div>
                        <div className="md:w-full md:mb-4 md:flex md:justify-center md:items-center  hidden">
                          <span className="font-[Inter] text-sm font-bold">Bulk Buy</span>
                        </div>
                        {/* bloc qui renseigne les prices en fonction de l'unité */}
                        <div className="mb-4 md:mb-5 md:block hidden">
                          <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                            <button
                              onClick={() => {
                                router.push("/product/groupBuy");
                              }}
                              // disabled={}
                              className="text-sm text-orange-500 leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-[Inter] text-center justify-center border border-orange-300 rounded-full focus-visible:outline-none focus:outline-none px-4  md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-emerald-600 w-full h-12"
                            >
                              Get 10 heaps at 6800 XAF
                            </button>
                            <button
                              onClick={() => {
                                router.push("/product/groupBuy");
                              }}
                              // disabled={}
                              className="text-sm text-orange-500  leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-[Inter] text-center justify-center border border-orange-300  rounded-full focus-visible:outline-none focus:outline-none px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-slate-300 w-full h-12"
                            >
                              Get 20 heaps at 13 000 XAF
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-4 md:mb-5 md:hidden">
                          <div className="flex flex-col items-center justify-between space-s-3 sm:space-s-4 w-full">
                            <button
                              onClick={() => {
                                router.push("/product/groupBuy");
                              }}
                              // disabled={}
                              className="text-sm text-orange-500 leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-[Inter] text-center justify-center border border-orange-300 rounded-full focus-visible:outline-none focus:outline-none px-4  md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-emerald-600 w-full h-12"
                            >
                              Get 10 heaps at 6800 XAF
                            </button>
                            <button
                              onClick={() => {
                                router.push("/product/groupBuy");
                              }}
                              // disabled={}
                              className="text-sm text-orange-500  leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-[Inter] text-center justify-center border border-orange-300  rounded-full focus-visible:outline-none focus:outline-none px-4 mt-2 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-slate-300 w-full h-12"
                            >
                              Get 20 heaps at 13 000 XAF
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          {/* <p className="text-sm leading-6 text-gray-500 md:leading-7">{product?.attributes?.description}</p> */}

                          {/* affichage des differents groupes deja crées*/}
                          <div>
                            {product?.attributes?.prices.data.length > 1 && (
                              <div className="flex justify-between mt-2 bg-white-100 rounded p-3">
                                <div className='lg:flex lg:flex-rows flex flex-cols w-full items-center justify-center'>
                                  <span style={{ fontWeight: "bold" }} className="text-sm font-[Inter] underline">
                                    Or Join an existing group
                                  </span>
                                </div>
                                <div className='lg:flex lg:flex-rows flex flex-cols w-full border-slate-200 rounded-[5px] 
                                  cursor-pointer '>
                                  <button 
                                  onClick={()=>{secondButonCreateGroup()}}
                                  className='w-full h-auto py-2 inline-flex items-center justify-center border border-slate-200 rounded-[5px] 
                                  hover:bg-orange-500 hover:text-white'
                                  >
                                  <span className="text-sm font-[Inter]">Or create your group</span>
                                  </button>
                                </div>
                              </div>
                            )}
                            {/* groups.length */}
                            {productGroupInfo.length > 0 && (
                              <div className="bg-[#F6EEE699] grid xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-4 h-40 overflow-y-auto">
                                {productGroupInfo?.map((e, index) => (
                                  <div key={index + 1} className="w-full">
                                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 ">
                                      <div className="flex flex-rows items-center">
                                        {/* AllGroup */}
                                        {/* <div className="flex mb-5 -space-x-4 relative border border-slate-200"> </div> */}
                                        {allGroupInfo?.map((elt, i) => (
                                          <div key={i + 1} className="">
                                            {e.attributes.group_code == elt && (
                                              <div key={i + 1} className="xl:h-[50px] xl:w-[50px] lg:h-[50px] lg:w-[50px] h-[30px] w-[30px] rounded-full border border-slate-600 ">
                                                <Image className="rounded-full flex justify-center items-center" src={profile} alt={"profile item"} layout="responsive"></Image>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                       
                                        <span className=' mx-2'></span>
                                        {allGroupInfo?.map((elt, i) => (
                                          <div key={i+1} className='truncate'>
                                            {(e.attributes.group_code == elt)  &&(
                                            <div  className={i+1 ? 'flex items-center' : 'flex items-center '}>
                                              <span className="text-sm font-[Inter]">
                                                {/* GroupWithDoublons */}
                                                {groupInfo.filter((item)=>item.attributes.group_code == elt).length >0 ?
                                                  groupInfo.filter((item)=>item.attributes.group_code == elt)[0]?.attributes.user ? groupInfo.filter((item)=>item.attributes.group_code == elt)[0]?.
                                                  attributes.user?.data?.attributes.person.data?.attributes.first_name
                                                  :userInfo.user.username.slice(0,3)

                                                  :''
                                                }
                                                {','}
                                              </span>
                                            </div>
                                            )}
                                          </div>
                                        ))}
                                        
                                        
                                      </div>

                                      <div className="place-self-end">
                                        <div className="flex items-center w-full">
                                          <div className="flex flex-col items-justify">
                                            <div>
                                              <span className="text-sm font-[Inter]">{allGroupInfo.filter((item) => item == e.attributes.group_code).length}/5 </span>
                                              <span style={{ color: "#288A36", textDecoration: "underline" }} className="text-sm font-[Inter]">
                                                view details
                                              </span>
                                            </div>
                                            <div className="">
                                              <span className="text-sm font-[Inter]">
                                                {groupInfo.filter((item) => item.attributes.group_code == e.attributes.group_code && item.attributes.rank == 1).length > 0
                                                  ? dayjs(groupInfo.filter((item) => item.attributes.group_code == e.attributes.group_code && item.attributes.rank == 1)[0]?.attributes.group_created_at).format(
                                                      "DD/MM/YY H:mm"
                                                    )
                                                  : ""}
                                              </span>
                                            </div>
                                          </div>

                                          <button
                                            style={{ backgroundColor: "#EB8712" }}
                                            onClick={() => {
                                              secondButonCreateGroup('join',e?.attributes?.group_code)
                                              // handleOpen(allGroupInfo, e);
                                            }}
                                            className="mx-2 rounded-md bg-orange-300 cursor-pointer text-sm leading-4 
                                            inline-flex items-center font-semibold font-[Inter] text-center justify-center 
                                            text-white px-4 py-1 hover:text-white bg-primary hover:bg-emerald-600"
                                          >
                                            Join
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            
                          </div>

                          {/* <div className="mt-4 mb-4 md:mb-5 block">
                            {product?.attributes?.prices.data.length > 0 && (
                              <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                                {product?.attributes?.prices.data.map((e, index) => (
                                  <button
                                    onClick={() => {
                                      handleOpenGroup(e);
                                    }}
                                    key={index + 1}
                                    className={
                                      e.attributes.type == "single"
                                        ? "text-sm text-white leading-4 bg-[#EF7D0A]  items-center cursor-pointer transition ease-in-out duration-300 font-semibold \
                                font-[Inter] text-center justify-center border border-orange-300 rounded-[10px] focus-visible:outline-none \
                                focus:outline-none px-4  md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-emerald-600 \
                                w-full h-15"
                                        : "text-sm text-[#7E7D7D] bg-[#898A8D3D] leading-4 items-center cursor-pointer transition ease-in-out duration-300 \
                                font-semibold font-[Inter] text-center justify-center border border-orange-300  rounded-[10px] \
                                focus-visible:outline-none focus:outline-none px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white \
                                hover:bg-slate-300 w-full h-15"
                                    }
                                  >
                                    <span className="w-full flex text-center justify-center">{e.attributes.price} XAF</span>
                                    <span className="w-full flex text-center justify-center">{e.attributes.type == "single" ? "buy alone" : "buy in group"}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div> */}

                        </div>
                      </div>
                      {/* <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                        <div className=' flex flex-col justify-center mb-4 items-center'>
                          <h2 className='font-bold text-2xl text-gray-800 flex justify-center'>POTENTIAL BUYERS</h2>
                          <GroupAvatar />
                        </div>
                        <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
                          <Card />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              
              {/*Reviews customers */}
              <div className="pt-5 lg:pt-5 lg:pb-5">
                <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-[Inter] hover:text-gray-600">Customer Reviews</h3>
                <div className="flex">
                  <div className="w-full ">
                    <div className=" grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-4">
                      {/* {relatedProduct?.slice(1, 13).map((product, i) => (
                        <ProductCard key={i + 1} product={product} />
                      ))} */}
                      <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 ">
                          <div className="flex flex-rows items-center">
                            <div className='flex '>
                              <div className="xl:h-[50px] xl:w-[50px] lg:h-[50px] lg:w-[50px] h-[30px] w-[30px] rounded-full border border-slate-600">
                                <Image className="rounded-full flex justify-center items-center" src={profile} alt={"profile item"} layout="responsive"></Image>
                              </div>
                              
                            </div>
                            <span className=' mx-2'></span>
                            <div>
                              <span>Liliane</span>
                            </div>
                          </div>
                          <div className="flex flex-rows items-center">
                            <div className='my-1'>
                              <span className="text-sm font-[Inter]">
                                I bought this product yesterday for 900 fcfa throught a teampurchase and  really loved it
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-rows items-center">
                            <div className='w-full flex pt-3'>
                              <div className="px-1 lg:h-[150px] lg:w-[150px] h-[100px] w-[100px]">
                                <Image className="flex justify-center items-center" src={pomme1} alt={"pomme1"} layout="responsive"></Image>
                              </div>
                              <div className="px-1 lg:h-[150px] lg:w-[150px] h-[100px] w-[100px]">
                                <Image className="flex justify-center items-center" src={pomme2} alt={"pomme2"} layout="responsive"></Image>
                              </div>
                              <div className="px-1 lg:h-[150px] lg:w-[150px] h-[100px] w-[100px]">
                                <Image className="flex justify-center items-center" src={pomme3} alt={"pomme3"} layout="responsive"></Image>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div className="w-full hidden lg:block">
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 ">
                          <div className="flex flex-rows items-center">
                            <div>
                              <div className="xl:h-[50px] xl:w-[50px] lg:h-[50px] lg:w-[50px] h-[30px] w-[30px] rounded-full border border-slate-600">
                                <Image className="rounded-full flex justify-center items-center" src={profile} alt={"profile item"} layout="responsive"></Image>
                              </div>
                            </div>
                            <span className=' mx-2'></span>
                            <div>
                              <span>Liliane</span>
                            </div>
                          </div>
                          <div className="flex flex-rows items-center">
                            <div className='my-1'>
                              <span className="text-sm font-[Inter]">
                                I bought this product yesterday for 900 fcfa throught a teampurchase and  really loved it
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-rows items-center">
                            <div className='w-full flex pt-3'>
                              <div className="px-1 lg:h-[150px] lg:w-[150px] h-[100px] w-[100px]">
                                <Image className="flex justify-center items-center" src={pomme1} alt={"pomme1"} layout="responsive"></Image>
                              </div>
                              <div className="px-1 lg:h-[150px] lg:w-[150px] h-[100px] w-[100px]">
                                <Image className="flex justify-center items-center" src={pomme2} alt={"pomme2"} layout="responsive"></Image>
                              </div>
                              <div className="px-1 lg:h-[150px] lg:w-[150px] h-[100px] w-[100px]">
                                <Image className="flex justify-center items-center" src={pomme3} alt={"pomme3"} layout="responsive"></Image>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-center my-2 hover:text-orange-200'>
                      <button className='w-20'>
                        <span className='underline font-[Inter] font-bold'>See more</span>
                      </button>
                    </div>
                  </div>
                </div>  
              </div>

              {/*Product Advantages */}
              
              <div className="pt-5 lg:pt-5 lg:pb-5 pb-5">
                <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-[Inter] hover:text-gray-600">Product Advantages</h3>
                
                {product?.attributes?.advantages?.length > 0 && (
                  <div className="lg:flex grid grid-cols-2">
                  
                    {product?.attributes?.advantages?.map((t, i) => (
                        <span
                          key={i + 1}
                          className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-[Inter] mt-2"
                        >
                          {t}
                        </span>
                    ))}
                  </div>
                )}
              </div>
              
             
              
            </div>
            <div className="my-auto px-3 lg:px-10 max-w-screen-2xl bg-[#F6EEE699]">
              <div className="mx-auto ">
                {/*description products */}
                <div className="pt-5 lg:pt-5 lg:pb-5 pb-5">
                  <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-[Inter] hover:text-gray-600">Product description</h3>
                  <div className='lg:grid lg:grid-cols-2 grid grid-cols-1 gap-4'>
                      <div className=''>
                        <span className='text-xs font-[Inter]'>
                          {`Macabo, un aliment consommé par les sportifs et des personnes soucieuses de leur ligne du fait de sa teneur en amidon, fournit à l’organisme de l’énergie et apporte de la matière grasse comme des protéines, lipides, glucides.
                            Riches en sucre lents
                            Riche en amidon
                          `}
                        </span>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              {/*Other products by the seller */}
              <div className="pt-10 lg:pt-20 lg:pb-10">
                <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-[Inter] hover:text-gray-600">Similar Products</h3>
                <div className="flex">
                  <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {relatedProduct?.slice(1, 13).map((product, i) => (
                        <ProductCard key={i + 1} product={product} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* related products */}
              {/* <div className="pt-10 lg:pt-20 lg:pb-10">
                <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-[Inter] hover:text-gray-600">Related Products</h3>
                <div className="flex">
                  <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {relatedProduct?.slice(1, 13).map((product, i) => (
                        <ProductCard key={i + 1} product={product} />
                      ))}
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="lg:block md:block hidden">
            <Footer/>
          </div>
          <div>
            <div className="lg:hidden md:hidden h-20 w-full"></div>
            <MobileFooter product={product} show_group={true} />
          </div>
        </div>
        
      )}
    </>
  );
};

export default ProductScreen;

// export const getStaticProps = async (context) => {
//   const { slug } = context.params;
//   // const product = await ProductServices.getProductBySlug(slug);
//   // const products = await ProductServices.getShowingProducts();

//   // console.log(slug);
//   // console.log(product);

//   let relatedProduct = [];
//   let groups = [];
//   if (slug) {
//     const selectProduct = products.find((product) => product.id === slug);
//     relatedProduct = products;
//   }
//   if (group) {
//     if (group.data.length > 0) {
//       const groupsids = group.data.map((o) => o.attributes.group_code);
//       groups = group.data.filter((elt, index) => !groupsids.includes(elt.attributes.group_code, index + 1));
//     }
//   }
//   return {
//     props: {
//       product,
//       relatedProduct,
//       groups,
//     },
//     revalidate: 60,
//   };
// };

// export const getStaticPaths = async () => {
//   const products = await ProductServices.getShowingProducts();

//   const paths = products.map((product) => ({
//     params: { slug: product.id.toString() },
//   }));

//   // console.log("val paths:", paths);
//   return { paths, fallback: true };
// };
