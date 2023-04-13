import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiChevronRight,FiMapPin } from "react-icons/fi";

//internal import
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import Discount from "@component/common/Discount";
import vieuxSage from '@component/images/vieux_sage.png';
import profile from '@component/images/empty_profile2.png';
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
import MobileHeader from "@layout//navbar/MobileHeader";

import dayjs from 'dayjs';
import { UserContext } from '@context/UserContext';
import DeliveryMethodModal from "../modal/DeliveryMethodModal";
import ShareGroupModal from "@component/modal/ShareGroupModal";
import { TimesGroups } from "@component/order/TelecoName";

const GroupDetailScreen = () => {
  const router = useRouter();

  const { handleAddItem, setItem, item } = useAddToCart();
  const [showBuyGroup, setShowBuyGroup] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const { handleAddStockItem, setStockItem, stockItem } = useAddToStock();

  const slug = router?.query?.group_code;
  const valQuery = router?.query

  const [isLoading, setIsLoading] = useState(false);
  const url_group = "http://localhost:3000/group_details/"
  const id = valQuery?.id

  const [groups, setGroups] = useState([]);
  const [AllGroup,setAllGroup]= useState([]);
  const [GroupWithDoublons,setGroupWithDoublons] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [product, setProduct] = useState(null);
  const [showShareModal,setShowShareModal] = useState(false);
  const {dispatch,state:{userInfo,groupInfo,
    allGroupInfo,productGroupInfo}} = useContext(UserContext);

  useEffect(() => {
    fetchData2();
  }, []);

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   try {
  //     dispatch({type:'LIST_GROUP_INFO',payload:[]});
  //     dispatch({type:'LIST_ALLGROUP_INFO',payload:[]});
  //     dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:[]});

  //     const [productData, productsData, groupData] = await Promise.all([ProductServices.getProductsById(slug), ProductServices.getShowingProducts(), OrderServices.getShowGroup(slug)]);

  //     let relatedProduct = [];
  //     let groups = [];
  //     let AllGroup = [];
  //     let GroupWithDoublons = []
  //     if (slug) {
  //       const selectProduct = productsData.find((product) => product.id === slug);
  //       relatedProduct = productsData;
  //     }

  //     if (groupData) {
  //       if (groupData.data.length > 0) {
  //         const groupsids = groupData.data.map((o) => o.attributes.group_code);
  //         groups = groupData.data.filter((elt, index) => !groupsids.includes(elt.attributes.group_code, index + 1));
  //         AllGroup = groupsids
  //         GroupWithDoublons = groupData.data
  //         setAllGroup(groupsids)
  //         setGroupWithDoublons(groupData.data)
  //         console.log('val group data',groupData.data)
  //         dispatch({type:'LIST_GROUP_INFO',payload:groupData.data});
  //         dispatch({type:'LIST_ALLGROUP_INFO',payload:groupsids});
  //         dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:groups});
  //       }
  //     }
      
  //     setRelatedProduct(relatedProduct);
  //     setProduct(productData);
  //     setGroups(groups);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsLoading(false);
  // };

  const fetchData2 = async () => {
    setIsLoading(true);
    try {
      const [groupData] = await Promise.all([OrderServices.showSingleGroup(slug)]);

      let relatedProduct = [];
      let groups = [];

      if (groupData) {
        if (groupData.data.length > 0) {
          groups = groupData.data
          console.log('val groups:',groups);
          setGroups(groups);
        }
      }
      // setRelatedProduct(relatedProduct);
      // setProduct(productData);
      setGroups(groups);
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  };

  const {hoursDisplay,minutes,seconds,days} = TimesGroups(groups,valQuery?.group_code);

  useEffect(() => {}, []);

  //

  useEffect(() => {
    setIsLoading(false);
  }, [product]);

  const openModalShare = ()=>{
    setShowShareModal(!showShareModal);
  };
  const handleOpenGroup = (e) => {
    if (e.attributes.type == "group") {
      setShowBuyGroup(!showBuyGroup);
    } else if (e.attributes.type == "single") {
      handleAddItem(product, e.attributes.price);
    }
  };
  const AddStock = () => {
    console.log(stockItem);
  };
  const secondButonCreateGroup = ()=>{
    setShowDelivery(!showDelivery)

  };
  //comment this when using getServerSideProps
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showShareModal &&(
        <ShareGroupModal modalOpen={showShareModal} setModalOpen={setShowShareModal} url_group="http://localhost:3000/group_details/"
         id={"1"} groups={groups} group_code={valQuery?.group_code} />
      )}
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <div>

          <div className="lg:block md:block hidden">
            <NavBarTop />
            <Navbar />
          </div>
          <div className='lg:hidden'>
            <MobileHeader title="Invite join friends"/>
          </div>

          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="md:block hidden flex items-center pb-4">
                <ol className="flex items-center w-full overflow-hidden font-serif">
                  <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold">
                    <Link href="/">
                      <a className='font-["Inter"] text-sm'>Home</a>
                    </Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold ">
                    <Link href="/">
                      <a className='font-["Inter"] text-sm'>group buy</a>
                    </Link>
                  </li>
                  
                </ol>
              </div>
              <div className="w-full rounded-lg pt-3  bg-white">
                <div className="flex flex-col xl:flex-row">
                  
                  <div className="md:block hidden w-full">
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                      <div className="w-full">
                        
                        {/* bloque avec les images d'un produits */}
                        <div className="mb-6 flex justify-between ">
                          <div className='flex lg:w-2/12 w-2/12 border border-slate-100'>
                            <Image
                              src={valQuery?.product ? JSON.parse(valQuery?.product)?.attributes?.assets?.data.length > 0 ? JSON.parse(valQuery?.product)?.attributes?.assets?.data[0].attributes?.path?.data.attributes.url : "":""}
                              alt={"image product"}
                              width={160}
                              height={160}
                            >
                            </Image>
                          </div>
                          <div className='w-7/12 px-2'>
                            <div className='flex w-full '>
                              <span className='text-sm font-["Inter"]'>{valQuery?.product ? JSON.parse(valQuery?.product).attributes.description:""}
                              </span>
                            </div>
                            <div className='flex'>
                              <div className='w-8/12 '>
                                <div className='w-full'>
                                  <span className='text-sm font-["Inter"] text-[#288A36]'>{''}</span>
                                </div>
                                <div>
                                  <span className='text-sm font-["Inter"] text-[#EF7D0A]'>{parseInt(valQuery?.amount_group)}</span>
                                </div>
                              </div>
                             
                            </div>
                          </div>
                          <div className='flex flex-col w-3/12  justify-center'>
                            <div className='flex items-center justify-center py-3'>
                              <div className="h-[50px] w-[50px]  rounded-full border border-slate-600">
                                <Image className="rounded-full flex justify-center items-center" src={vieuxSage} alt={"profile item"} layout="responsive"></Image>
                              </div>
                              <div className="h-[50px] w-[50px] ml-2 rounded-full flex justify-center border-dotted border-2 border-slate-600">
                                <div className='flex flex-rows items-center justify-center'>
                                  <span className='text-lg font-serif font-bold text-center '>?</span>
                                </div>
                              </div>
                            </div>
                            <div className='flex'>
                              <button
                                onClick={() => {
                                  openModalShare();
                                }}
                                // disabled={product.quantity < 1}
                                // style={{backgroundColor:"#EB8712"}}
                                className="text-sm leading-4 inline-flex bg-[#EB8712] items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-emerald-600 w-full h-12"
                              >
                                Invite your friends
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* groups status for information */}
                        <div className="mb-6 flex justify-between py-2">
                          <div>
                            <span className='text-sm font-["Inter"] font-bold'>Group status</span>
                            <span>{' '}</span>
                            <span className='text-sm font-["Inter"] font-bold text-[#EF7D0A]'>waiting for team formation</span>
                          </div>
                        </div>
                        {/* barre de progression */}
                        <div className="mb-1 flex justify-between ">
                          <div className='w-9/12 flex items-center'>
                            <div className='w-full grid grid-cols-5 items-center'>
                              
                              <div style={groups.length >=1 ? {backgrouondColor:"#EF7D0A"}:{backgroundColor:"#D9D9D9" }} className={'h-[5px] rounded-[3px]'}></div>
                              <div  style={groups.length >=1 ? {backgrouondColor:"#EF7D0A"}:{backgroundColor:"#D9D9D9" }} className='h-[5px] rounded-[3px]'></div>
                              <div  style={groups.length >=2 ? {backgrouondColor:"#EF7D0A"}:{backgroundColor:"#D9D9D9" }} className='h-[5px] rounded-[3px]'></div>
                              <div  style={groups.length >=3 ? {backgrouondColor:"#EF7D0A"}:{backgroundColor:"#D9D9D9" }} className='h-[5px] rounded-[3px]'></div>
                              <div  style={groups.length >=4 ? {backgrouondColor:"#EF7D0A"}:{backgroundColor:"#D9D9D9" }} className='h-[5px] rounded-[3px]'></div>
                            </div>
                          </div>
                          <div className='flex flex-row justify-end items-center w-3/12  '>
                            <div className= {days <= 0? 'p-1 px-2 bg-[#288A36] items-center border border-slate-500 rounded-[5px] ':
                                    'p-1 px-2 bg-[#D21313] border border-slate-500 items-center rounded-[5px] '}  
                              >
                                  <span className='text-white font-serif'>{days <= 0 ? hoursDisplay: 0}</span>
                              </div>
                              <span className='px-2'>:</span>
                              <div className= {days <= 0? 'p-1 px-2 bg-[#288A36] items-center border border-slate-500 rounded-[5px] ':
                                    'p-1 px-2 bg-[#D21313] border border-slate-500 items-center rounded-[5px] '} 
                              >
                                  <span className='text-white font-serif'>{days <= 0 ? minutes: 0}</span>
                              </div>
                              <span className='px-2'>:</span>
                              <div className= {days <= 0? 'p-1 px-2 bg-[#288A36] items-center border border-slate-500 rounded-[5px] ':
                                    'p-1 px-2 bg-[#D21313] border border-slate-500 items-center rounded-[5px] '}
                              >
                                  <span className='text-white font-serif'>{days <= 0 ? seconds:0}</span>
                              </div>
                          </div>
                        </div>
                        {/* nombre de membres restant */}
                        <div className="mb-6 flex justify-between">
                          <div>
                            <span className='text-sm font-["Inter"]'>{5 - groups.length} {' members left'}</span>
                          </div>
                        </div>
                        {/* Groups members */}
                        <div className="mb-6 flex justify-between border-b border-slate-200 py-2">
                          <div>
                            <span className='text-md font-["Inter"] font-bold'>Group Members</span>
                          </div>
                        </div>
                        {/* bloque avec membre de group */}
                        <div className="mb-6 flex ">
                          {groups.length > 0 &&(
                            <div className="flex flex-col w-full">
                              {groups.map((e,index)=>(
                                <div key={index+1} className="flex w-full mt-2">
                                  <div className='w-1/12'>
                                    <div className="xl:h-[50px] xl:w-[50px] lg:h-[50px] lg:w-[50px] h-[30px] w-[30px] rounded-full border border-slate-600">
                                      <Image className="rounded-full flex justify-center items-center" src={profile} alt={"profile item"} layout="responsive"></Image>
                                      
                                    </div>
                                    </div>
                                    <div className='flex w-8/12  items-center '>
                                      <div >
                                        <span className="font-[Inter] text-sm">
                                          {e.attributes?.user?.data?.attributes?.person?.data?.attributes?.first_name} {' '}
                                          {e.attributes?.user?.data?.attributes?.person?.data?.attributes?.last_name}
                                        </span>
                                      </div>
                                    </div>
                                    <div className='flex w-3/12 items-center'>
                                      {e?.attributes?.rank == 1 &&(
                                        <div >
                                          <span className="font-[Inter] text-sm">Group leader</span>
                                        </div>
                                      )}
                                    </div>

                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      </div>

                    </div>
                  </div>
                  {/* block pour la version mobile */}
                  <div className="md:hidden w-full ">
                    <div className='flex flex-row justify-center items-center w-full'>
                            <div className= {days <= 0? 'p-1 px-2 bg-[#288A36] items-center border border-slate-500 rounded-[5px] ':
                                    'p-1 px-2 bg-[#D21313] border border-slate-500 items-center rounded-[5px] '}  
                              >
                                  <span className='text-white font-serif'>{days <= 0 ? hoursDisplay: 0}</span>
                              </div>
                              <span className='px-2'>:</span>
                              <div className= {days <= 0? 'p-1 px-2 bg-[#288A36] items-center border border-slate-500 rounded-[5px] ':
                                    'p-1 px-2 bg-[#D21313] border border-slate-500 items-center rounded-[5px] '} 
                              >
                                  <span className='text-white font-serif'>{days <= 0 ? minutes: 0}</span>
                              </div>
                              <span className='px-2'>:</span>
                              <div className= {days <= 0? 'p-1 px-2 bg-[#288A36] items-center border border-slate-500 rounded-[5px] ':
                                    'p-1 px-2 bg-[#D21313] border border-slate-500 items-center rounded-[5px] '}
                              >
                                  <span className='text-white font-serif'>{days <= 0 ? seconds:0}</span>
                              </div>
                    </div>
                    <div className="flex flex-row w-full">
                      <div className='lg:w-5/12  text-center w-full mt-5'>
                        <span className='text-md font-["Inter"] text-[#000000] font-bold italic'>
                            Your order has been saved.

                          Invite your friends in order to complete the group and enjoy your products
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row w-full mt-5">
                      <div className="w-full flex flex-col items-center my-4">
                        <div className="w-full flex flex-col items-center">
                          <ul className="flex mt-4">
                            <li className="flex flex-col items-center ml-4 text-center  mr-2 transition ease-in-out duration-500">
                              <FacebookShareButton url={`${url_group}/${id}`} quote="KachaBazar">
                                <FacebookIcon size={32} round />
                              </FacebookShareButton>
                              <span className='text-sm font-[Inter]'>Facebook</span>
                            </li>
                            <li className="flex flex-col items-center ml-4 text-center rounded-full  mr-2 transition ease-in-out duration-500">
                              <TwitterShareButton
                                // url={`${url_group}/${id}${router.query.slug}`}
                                url={`${url_group}/${id}`}
                                quote="KachaBazar"
                              >
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                              <span className='text-sm font-[Inter]'>Twitter</span>
                            </li>
                            <li className="flex flex-col items-center ml-4 text-center rounded-full  mr-2 transition ease-in-out duration-500">
                              <WhatsappShareButton url={`${url_group}/${id}`} quote="KachaBazar" title="Voici le lien d'integration de notre group d'achat">
                                <WhatsappIcon size={32} round />
                              </WhatsappShareButton>
                              <span className='text-sm font-[Inter]'>Whatsapp</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                    <ul className="flex mt-4">
                      <li className="flex flex-col items-center ml-4 text-center rounded-full  mr-2 transition ease-in-out duration-500">
                        
                        <RedditShareButton url={`${url_group}/${id}`} quote="KachaBazar">
                          <RedditIcon size={32} round />
                        </RedditShareButton>
                        <span className='text-sm font-[Inter]'>Reddit</span>
                      </li>
                      <li className="flex flex-col items-center ml-4 text-center rounded-full  mr-2 transition ease-in-out duration-500">
                        <LinkedinShareButton url={`${url_group}/${id}`} quote="KachaBazar">
                          <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <span className='text-sm font-[Inter]'>Linkedin</span>
                      </li>
                    </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full mt-5 items-center justify-center">
                      <div className="inline-block w-full text-white">
                        <button
                          style={{ backgroundColor: "#EB8712" }}
                          className="w-full rounded-[2px] h-8"
                          // style={{borderColor:isactiveButton1? valborderColor : transparent,borderWidth:2}}
                          onClick={() => {
                            handleOpenDelivery();
                          }}
                          type="button"
                        >
                          <span className="text-sm font-serif">Copy the Link</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>

          <div className="lg:block md:block hidden">
            <Footer/>
          </div>
          <div>
            <div className="lg:hidden md:hidden h-20 w-full"></div>
            <MobileFooter/>
          </div>
        </div>
        
        
      )}
    </>
  );
};

export default GroupDetailScreen;
