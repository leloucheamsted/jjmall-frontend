import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiChevronRight, FiMapPin, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

import { useContext, useEffect } from 'react';

//internal import
import ReactStars from 'react-stars'

import Layout from '@layout/Layout';
// import Tags from '@component/common/Tags';
// import Stock from '@component/common/Stock';
// import Price from '@component/common/Price';
// import Card from '@component/slug-card/Card';
// import useAddToCart from '@hooks/useAddToCart';
// import Discount from '@component/common/Discount';

// import ProductCard from '@component/product/ProductCard';
import { SidebarContext } from '@context/SidebarContext';
import Loading from '@component/preloader/Loading';
import GroupAvatar from '@component/common/GroupAvatar';
import profile from '@component/images/empty_profile2.png'
import JoinGroupModal from '@component/modal/JoinGroupModal';
import DeliveryMethodModal from '@component/modal/DeliveryMethodModal'
import { useState } from 'react';
import { UserContext } from '@context/UserContext';
import dayjs from 'dayjs';
// import ProductServices from '@services/ProductServices';
// import OrderServices from '@services/OrderServices';
import ProductServices from './../../services/ProductServices'
import OrderServices from './../../services/OrderServices'
import MobileHeader from '../../layout/navbar/MobileHeader';
import NavBarTop from '@layout/navbar/NavBarTop';
import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import MobileFooter from "@layout/footer/MobileFooter";
import vieuxSage from '@component/images/vieux_sage.png'
import om from '@component/images/om_img.png'
import mtn from '@component/images/mtn_img.png'
import visa from '@component/images/visa_img.png'
import paypal from '@component/images/paypal_img.png'

const ConfirmOrder3Screen = () => {
  // {product,groups,AllGroup,GroupWithDoublons}
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const {dispatch,state:{userInfo,groupInfo,
    allGroupInfo,productGroupInfo}} = useContext(UserContext);

  const [showJoinGroup,setShowJoinGroup] = useState(false)
  const [showDelivery,setShowDelivery] = useState(false);
  const [userGroup,setUserGroup] = useState([]);
  const [idsGroups,setIdsGroups] = useState([]);

  // const [AllGroup,setAllGroup] = useState(groupInfo.length >0 ? groupInfo.map(o => o.attributes.group_code):[]);
  const [AllGroup,setAllGroup] = useState([]);
  // const [GroupWithDoublons,setGroupWithDoublons] = useState(groupInfo);
  const [GroupWithDoublons,setGroupWithDoublons] = useState([]);
  
  // const [groups,setGroups] = useState(bor);
  const [groups,setGroups] = useState([]);
  const [product,setProduct] = useState({});
  const [priceGroup,setPriceGroup] = useState([]);
  const [stockFarm,setStockFarm] = useState([]);
  
  const idProduct = router?.query?.id;
  const valQuery = router?.query
  // console.log('val valQuery:',valQuery)
  useEffect(()=>{
    
    fetchData();
  },[idProduct]);

  const fetchData = async()=>{
    try {
      // dispatch({type:'LIST_GROUP_INFO',payload:[]});
      // dispatch({type:'LIST_ALLGROUP_INFO',payload:[]});
      // dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:[]});

      const data = await ProductServices.getProductsById(idProduct);
      const group = await OrderServices.getShowGroup(idProduct)
      
      let product = {};
      let groups = [];
      let AllGroup = [];

      let quantityStore = {};
      let quantityFarm = {};
      let priceStore = [];
    
      let GroupWithDoublons = []
      
      if (data){
        product = data
        setProduct(data);
        priceStore = data?.attributes.prices.data.filter(e => e.attributes.type == 'group');
        quantityStore = data?.attributes.inventories.data.filter(e => e.attributes.type == 'store');
        quantityFarm = data?.attributes.inventories.data.filter(e => e.attributes.type == 'farm');
        setPriceGroup(priceStore);
        setStockFarm(quantityStore);
        
      }
      if (group){
        // groups = group.data
        if (group.data.length > 0){
          const groupsids = group.data.map(o => o.attributes.group_code)
          groups = group.data.filter((elt, index) => !groupsids.includes(elt.attributes.group_code, index + 1))

          AllGroup = groupsids
          GroupWithDoublons = group.data
          setAllGroup(groupsids);
          setGroupWithDoublons(group.data);
          setGroups(groups);
          // console.log('group :',group.data);
          // dispatch({type:'LIST_GROUP_INFO',payload:group.data});
          // dispatch({type:'LIST_ALLGROUP_INFO',payload:groupsids});
          // dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:groups});

          // console.log('group:',group.data);
        }
      }
      
    } catch (error) {
      console.log('val error groupBuy:',error.response);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [product]);

  useEffect(() => {
    if (!userInfo){
      router.push('/')
    }
  }, [userInfo]);

  const inviteFriend = ()=>{
    router.push({
      pathname:`/group_details/${valQuery?.group_code}`,
      query:{id:valQuery?.id,quantity:valQuery?.quantity,
        amount_group: valQuery?.amount_group,
        product:valQuery?.product,fraisDelivery:valQuery?.fraisDelivery,
        delivery_items:valQuery?.delivery_items,
        delivery_id:valQuery?.delivery_id,
        type:valQuery?.type,
        order_id:valQuery?.order_id,
        user_has_payment:valQuery?.user_has_payment,
        transaction_id:valQuery?.transaction_id,
        group_code:valQuery?.group_code,
        amountWithDiscount:valQuery?.amountWithDiscount
      }
    },`/group_details/${valQuery?.group_code}`)
  };
  const handleOpen = (data,e)=>{
    setShowJoinGroup(!showJoinGroup);
    setUserGroup(data)
    setIdsGroups(e)
  }
  const handleCreateGroup = ()=>{
    setShowDelivery(!showDelivery)
  };
  
  return (
    <>
      {showDelivery && <DeliveryMethodModal modalOpen={showDelivery} setModalOpen={setShowDelivery} product={product} />}
      {showJoinGroup && <JoinGroupModal JoinmodalOpen={showJoinGroup} setJoinModalOpen={setShowJoinGroup} allgroup={userGroup} idsGroups={idsGroups} product={product} Orders={groups} />}
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <div>

          <div className="lg:block md:block hidden">
            <NavBarTop />
            <Navbar />
          </div>
          <div className='lg:hidden'>
            <MobileHeader title='Payment done'/>
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
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  <li className="text-sm px-1 transition duration-200 ease-in font-[Inter]">{"create your group"}</li>
                </ol>
              </div>
              <div className="w-full rounded-lg pt-3  bg-white">
                <div className="flex flex-col xl:flex-row">
                  
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                      <div className="w-full ">
                        {/* premier bloque just few steps */}
                        <div className="md:mb-6 md:flex md:justify-between hidden">
                          <div>
                            <span className='text-sm font-["Inter"]'>Just few steps to create your group</span>
                          </div>
                          <div>
                            <span className='text-sm font-["Inter"]'>100% complete</span>
                          </div>
                        </div>
                        {/* second bloque differents steps */}
                        <div className="md:w-full md:mb-3 md:block hidden">
                          <div className='w-full grid grid-cols-4 gap-1'>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            
                          </div>
                        </div>

                        {/* congratulations bloque */}
                        <div className="mb-6 flex items-center justify-center">
                          <div>
                            <span className='text-xl font-["DejaVu Sans"] font-bold text-[#288A36] text-center'>Congratulations</span>
                          </div>
                        </div>
                        {/* message apres congratulations */}
                        <div className="mb-6 flex  items-center justify-center">
                          <div className='lg:w-5/12  text-center w-full'>
                            <span className='text-md font-["Inter"] text-[#000000] font-bold italic'>
                              The paiement has been successfully done. Your group has been set up.
                              Invite your friends to buy with you
                            </span>
                          </div>
                        </div>
                        {/* remainting time */}

                        {/* <div className="mb-6 flex  items-center justify-center">
                          <div className='mr-2'>
                            <span className='text-md font-["Inter"] text-[#000000]'>Remaining time :  </span>
                          </div>
                          <div className='place-self-center flex flex-row gap-2'>
                            <div className= {'p-1 px-2 bg-[#288A36] border border-slate-500 rounded-[5px] '} 
                            >
                                <span className='text-white font-serif'>23</span>
                            </div>:
                            <div className= {'p-1 px-2 bg-[#288A36] border border-slate-500 rounded-[5px] '} 
                            >
                                <span className='text-white font-serif'>50</span>
                            </div>:
                            <div className= {'p-1 px-2 bg-[#288A36] border border-slate-500 rounded-[5px] '} 
                            >
                                <span className='text-white font-serif'>43</span>
                            </div>
                          </div>
                        </div> */}

                        {/* bloque contenant les boutons d'invitation */}
                        <div className="mb-6  flex  items-center justify-center">
                          <div className='md:w-4/12 w-full mt-6 mb-3 justify-center items-center hover:text-white text-white'>
                            <button
                              onClick={()=>{inviteFriend()}}
                              className='w-full bg-[#F37A20] hover:bg-[#F37A20] hover:text-white rounded-[8px] py-1 border border-[#F37A20]' 
                            >
                              <span className='font-[Inter] text-md'>invite your Friends</span>
                            </button>
                          </div>
                        </div>

                        {/* ancien bloque contenant les boutons d'invitation */}

                        {/* <div className="mb-6 w-full">
                          <div className='grid grid-cols-3 gap-4'>
                            <div className='justify-center items-center hover:text-white text-[#F37A20]'>
                              <button
                                className='w-full hover:bg-[#F37A20] hover:text-white rounded-[8px] py-1 border border-[#F37A20]' 
                              >
                                <span className='font-[Inter] text-md'>invite Friends</span>
                              </button>
                            </div>

                            <div className='justify-center items-center hover:text-white text-[#F37A20]'>
                              <button
                                className='w-full rounded-[8px] hover:bg-[#F37A20] py-1 border border-[#F37A20]' 
                              >
                                <span className='font-[Inter] text-md'>Group details</span>
                              </button>
                            </div>
                            <div className='justify-center items-center hover:text-white text-[#F37A20]'>
                              <button
                                className='w-full rounded-[8px] hover:bg-[#F37A20] py-1 border border-[#F37A20]' 
                              >
                                <span className='font-[Inter] text-md'>order details</span>
                              </button>
                            </div>
                          </div>
                        </div> */}
                        {/* bloque avec les images d'un produits */}
                        <div className="mb-6 flex justify-between ">
                          <div className='flex w-2/12 border border-slate-100'>
                            <Image
                              src={valQuery?.product ? JSON.parse(valQuery?.product)?.attributes?.assets?.data.length > 0 ? JSON.parse(valQuery?.product)?.attributes?.assets?.data[0].attributes?.path?.data.attributes.url : "":""}
                              alt={"image product"}
                              width={160}
                              height={160}
                            >
                            </Image>
                          </div>
                          <div className='md:w-10/12 w-9/12 md:flex md:flex-row flex flex-col '>
                            <div className='md:w-10/12'>
                              <div className='md:flex md:w-full flex w-full '>
                                <span className='text-sm font-["Inter"]'>{valQuery?.product ? JSON.parse(valQuery?.product).attributes.description:""}
                                </span>
                              </div>
                              <div className='md:flex md:w-full w-full items-center'>
                                <div className='flex flex-col mt-2 md:w-8/12 w-full '>
                                  <div className='w-full'>
                                    <span className='text-sm font-["Inter"] text-[#288A36]'>
                                      {stockFarm.length >0? stockFarm[0].attributes.quantity:0}{' unity in stock'}
                                    </span>
                                  </div>
                                  <div>
                                    <span className='text-sm font-["Inter"] text-[#EF7D0A]'>{parseInt(valQuery?.amount_group)}</span>
                                  </div>
                                </div>
                               
                              </div>
                            </div>
                            <div className='md:flex md:flex-col md:w-2/12 hidden md:w-full md:justify-center'>
                              <div className='flex md:flex-row-reverse w-full'>
                                <span className='text-sm font-["Inter"] text-[#288A36]'>Paid in</span>
                              </div>
                              <div className='flex md:flex-row-reverse w-full'>
                                <span className='text-2xs font-["Inter"] font-bold text-[#288A36]'>{parseInt(valQuery?.amountWithDiscount)} XAF</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* select paiement method */}
                        <div className="mb-6 flex justify-between py-2 border-b border-slate-200">
                          <div>
                            <span className='text-md font-["Inter"] font-bold'>Order summary</span>
                          </div>
                        </div>
                        {/* Discount method */}
                        <div className="md:mb-6 md:flex md:flex-row flex flex-col justify-between ">
                          <div className='flex w-full md:w-7/12 mb-8 md:flex md:flex-row justify-between'>
                            <div className='w-6/12'>
                              <div className='flex w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#37474F]'>Quantity</span>
                              </div>
                              <div className='flex w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#37474F]'>Subtotal</span>
                              </div>
                              <div className='flex w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#37474F]'>Delivery Charge</span>
                              </div>
                              <div className='flex w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#EF7D0A]'>Discount for digital payment</span>
                              </div>
                              <div className='flex w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#288A36]'>Total</span>
                              </div>
                            </div>
                            <div className='w-6/12'>
                              
                              <div className='flex flex-row-reverse w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#37474F]'>{parseInt(valQuery?.quantity)}</span>
                              </div>
                              <div className='flex flex-row-reverse w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#37474F]'>
                                  {(parseInt(valQuery?.amount_group)*parseInt(valQuery?.quantity))} XAF
                                </span>
                              </div>
                              <div className='flex flex-row-reverse w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#37474F]'>{parseInt(valQuery?.fraisDelivery)} XAF</span>
                              </div>
                              <div className='flex flex-row-reverse w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#EF7D0A]'>
                                  {(parseInt(valQuery?.amount_group)*parseInt(valQuery?.quantity))-parseInt(valQuery?.amountWithDiscount)} XAF
                                </span>
                              </div>
                              <div className='flex flex-row-reverse w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#288A36]'>{parseInt(valQuery?.amountWithDiscount)} XAF</span>
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-col md:w-5/12 w-full md:pl-10 mb-6'>
                            
                            <div className='flex w-full py-1'>
                              <span className='text-sm font-["Inter"] text-[#37474F] font-semibold'>Delivery location : drop of point</span>
                            </div>
                            <div className='flex w-full py-1'>
                              <span className='text-sm font-["Inter"] text-[#000000B2]'>{valQuery?.address}</span>
                            </div>
                            <div className='flex w-full mt-6 py-1'>
                              <span className='text-sm font-["Inter"] text-[#37474F] font-semibold'>Selected paiement method</span>
                            </div>
                            <div className='flex w-full py-1'>
                              {valQuery?.methodPaiement == "orange-cm" &&(
                                <div className='mr-2'>
                                  <Image src={om} alt='image om' width={20} height={20}></Image>
                                </div>
                              )}
                              {valQuery?.methodPaiement == "mtn-cm" &&(
                                <div className='mr-2'>
                                  <Image src={mtn} alt='image mtn' width={20} height={20}></Image>
                                </div>
                              )}
                              <span className='text-sm font-["Inter"] text-[#000000B2]'>{valQuery?.methodPaiement}</span>
                            </div>
                          </div>
                          <div className='hidden md:flex md:flex-col md:w-1/12 md:justify-center'>
                            
                            <div className='flex flex-row-reverse w-full'>
                              <button
                                // onClick={()=>{handleOpen()}}
                                onClick={()=>{console.log('')}}
                              >
                                <FiMapPin/>
                              </button>
                            </div>
                            
                          </div>
                        </div>
                        
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

export default ConfirmOrder3Screen;
