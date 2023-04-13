import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiChevronRight, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

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
import {operator} from '@component/order/TelecoName'
import { SpinLoader } from '@component/preloader/SpinLoader';
import { notifyError, notifySuccess } from '@utils/toast';

const ConfirmOrderScreen = () => {
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
  const jir = groupInfo.length > 0 ? groupInfo.map(o => o.attributes?.group_code):[];
  const bor = groupInfo.length > 0 ? groupInfo.filter((elt, index) => !jir.includes(elt.attributes?.group_code, index + 1)):[];
  // const [groups,setGroups] = useState(bor);
  const [groups,setGroups] = useState([]);
  const [product,setProduct] = useState({});
  const [priceGroup,setPriceGroup] = useState([]);
  const [stockFarm,setStockFarm] = useState([]);
  const [block1,setBlock1] = useState(false);
  const [block2,setBlock2] = useState(false);
  const [block11,setBlock11] = useState(false);
  const [block12,setBlock12] = useState(false);
  const [block13,setBlock13] = useState(false);
  const [block14,setBlock14] = useState(false);
  const [valueInputPhone,setValueInputPhone] = useState(userInfo? userInfo?.user?.phone_number:"")
  const [loading,setLoading] = useState(false);
  const [selectQuantity,setSelectQuantity] = useState(1)
  const [methodPaiement,setMethodPaiement] = useState('');
  const idProduct = router?.query?.id;
  const valQuery = router?.query;

  const name_provider = operator(valueInputPhone);
  const remise = block1 ? (selectQuantity * parseInt(valQuery?.amount_group)*5/100):0
  const amountWithDiscount = block1? (parseInt(valQuery?.amount_group)*selectQuantity)+(parseInt(valQuery?.fraisDelivery)) - remise
    :(parseInt(valQuery?.amount_group)*selectQuantity)+parseInt(valQuery?.fraisDelivery)

  // console.log('val query:',valQuery);
  // console.log('userInfo:',userInfo)

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

  const userHasPayment = (trans_id)=>{
    const hasPaymentData = {
      "data":{
        "user": userInfo? userInfo.user.id : null,
        "number":userInfo? userInfo?.user?.phone_number: null,
        "provider":name_provider,
        "is_verified":true,
        "transactions":trans_id
      }
    }
    setLoading(true)
    OrderServices.addUserHasPayament(hasPaymentData)
      .then((res)=>{
        setLoading(false);
        notifySuccess('user has payment method create success')
        router.push({
          pathname:'/product/confirmOrder2',
          query:{id:valQuery?.id,quantity:selectQuantity,
            amount_group: valQuery?.amount_group,
            product:valQuery?.product,fraisDelivery:valQuery?.fraisDelivery,
            delivery_items:valQuery?.delivery_items,
            delivery_id:valQuery?.delivery_id,
            type:valQuery?.type,
            user_has_payment:res.data? res.data.id:null,
            transaction_id:trans_id,
            group_code:valQuery?.type == "join" ? valQuery?.group_code:"",
            amountWithDiscount:amountWithDiscount,
            address:valQuery?.address,
            methodPaiement:methodPaiement
          }
        },'/product/confirmOrder2')
      })
      .catch((err)=>{
        setLoading(false);
        console.log('user has payment error:',err);
        notifyError(err)
      })
  };

  const CreateTransaction = ()=>{
    const data = {
      "data":{
        "amount":amountWithDiscount,
        "type":"paid",
      }
    }
    if (userInfo?.user?.users_has_payment_methods){
      setLoading(true)
      
      OrderServices.createTransaction(data,userInfo?.user?.users_has_payment_methods[0]?.id)
        .then((res)=>{
          setLoading(false);
          console.log('success')
          router.push({
            pathname:'/product/confirmOrder2',
            query:{id:valQuery?.id,quantity:selectQuantity,
              amount_group: valQuery?.amount_group,
              product:valQuery?.product,fraisDelivery:valQuery?.fraisDelivery,
              delivery_items:valQuery?.delivery_items,
              delivery_id:valQuery?.delivery_id,
              type:valQuery?.type,
              user_has_payment:userInfo?.user?.users_has_payment_methods?.id,
              transaction_id:res.data ? res.data?.id: null,
              group_code:valQuery?.type == "join" ? valQuery?.group_code:"",
              amountWithDiscount:amountWithDiscount,
              address:valQuery?.address,
              methodPaiement:methodPaiement
            }
          },'/product/confirmOrder2')
        })
        .catch((err)=>{
          setLoading(false);
          console.log('err transaction:',err)
        })
    }
    else{
      setLoading(true)
      OrderServices.addtransaction(data)
       .then((res)=>{
          // setLoading(false);
          userHasPayment(res?.data ? res?.data?.id: null);
          notifySuccess('create transaction successfully')
       })
       .catch((err)=>{
        setLoading(false);
        console.log('error transaction:',err)
       })
    }
    
  };

  const savePayment = ()=>{
    CreateTransaction();
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
            <MobileHeader title='Place your order'/>
          </div>

          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="hidden md:block flex items-center pb-4">
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
                        <div className="hidden  md:mb-6 md:flex md:justify-between">
                          <div>
                            <span className='text-sm font-["Inter"]'>Just few steps to create your group</span>
                          </div>
                          <div>
                            <span className='text-sm font-["Inter"]'>50% complete</span>
                          </div>
                        </div>
                        {/* second bloque differents steps */}
                        <div className="hidden md:block w-full mb-3">
                          <div className='w-full grid grid-cols-4 gap-1'>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#D9D9D9]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#D9D9D9]'></div>
                            
                          </div>
                        </div>

                        {/* enter quantity */}
                        <div className="hidden md:block mb-6 flex justify-between">
                          <div>
                            <span className='text-xl font-["Inter"] font-bold'>Enter the quantity</span>
                          </div>
                        </div>
                        {/* bloque avec les images d'un produits */}
                        <div className="mb-6 md:flex flex flex-row w-full">
                          <div className='flex md:w-2/12 w-4/12 border border-slate-100'>
                            <Image
                              src={valQuery?.product ? JSON.parse(valQuery?.product)?.attributes?.assets?.data.length > 0 ? JSON.parse(valQuery?.product)?.attributes?.assets?.data[0].attributes?.path?.data.attributes.url : "":""}
                              alt={"image product"}
                              width={160}
                              height={160}
                            >
                            </Image>
                          </div>
                          <div className='md:w-10/12 md:flex md:flex-row w-8/12 flex flex-col px-2'>
                            <div className='md:w-10/12'>
                              <div className='md:flex md:w-full flex w-full '>
                                <span className='text-sm font-["Inter"]'>{valQuery?.product ? JSON.parse(valQuery?.product).attributes.description:""}
                                </span>
                              </div>
                              <div className='md:flex md:w-full w-full items-center justify-center'>
                                <div className='flex flex-col mt-2 md:w-8/12 w-full'>
                                  <div className='w-full'>
                                    <span className='text-sm font-["Inter"] text-[#288A36]'>
                                      {stockFarm.length >0? stockFarm[0].attributes.quantity:0}{' unity in stock'}
                                    </span>
                                  </div>
                                  <div>
                                    <span className='text-sm font-["Inter"] text-[#EF7D0A]'>{parseInt(valQuery.amount_group)} XAF/ heap</span>
                                  </div>
                                </div>
                                
                                <div className='hidden md:block flex md:w-4/12 w-full mt-2 md:items-center md:justify-center items-center'>
                                  <span className='text-sm font-["Inter"] font-bold'>Quantity:</span>
                                
                                  <input 
                                    className='py-2 px-4 mx-3 md:px-5 w-6/12 appearance-none border text-sm opacity-75 
                                    text-input rounded-md placeholder-body min-h-8 transition duration-200 focus:ring-0
                                    ease-in-out bg-white border-gray-200 
                                    focus:outline-none focus:border-primary h-8 md:h-8' 
                                    type='number' 
                                    min={1}
                                    defaultValue={parseInt(valQuery.quantity)}
                                    onChange={(e)=>{setSelectQuantity(e.target.value)}}
                                  />
                                </div>
                              
                              </div>

                            </div>
                            <div className='hidden md:block md:flex md:flex-col md:w-2/12 justify-center flex flex-col'>
                              <div className='flex md:flex-row-reverse w-full'>
                                <span className='text-2xs font-["Inter"] text-[#288A36]'>Subtotal</span>
                              </div>
                              <div className='flex md:flex-row-reverse w-full'>
                                <span className='text-2xs font-["Inter"] font-bold text-[#288A36]'>
                                  {(selectQuantity *parseInt(valQuery.amount_group))+parseInt(valQuery.fraisDelivery)} 
                                  {' XAF'}
                                </span>
                              </div>
                            </div>

                          </div>
                          
                        </div>
                        {/* second bloc quantity */}
                        <div className="mb-6 flex justify-between ">
                          <div className='md:hidden flex md:w-4/12 w-5/12 mt-2 md:items-center md:justify-center items-center'>
                            <span className='text-sm font-["Inter"] font-bold'>Quantity:</span>
                          
                            <input 
                              className='py-2 px-4 mx-3 md:px-5 w-6/12 appearance-none border text-sm opacity-75 
                              text-input rounded-md placeholder-body min-h-8 transition duration-200 focus:ring-0
                              ease-in-out bg-white border-gray-200 
                              focus:outline-none focus:border-primary h-8 md:h-8' 
                              type='number' 
                              min={1}
                              defaultValue={parseInt(valQuery.quantity)}
                              onChange={(e)=>{setSelectQuantity(e.target.value)}}
                            />
                          </div>
                        </div>

                        {/* select paiement method */}
                        <div className="mb-6 flex justify-between ">
                          <div>
                            <span className='text-xl font-["Inter"] font-bold'>Select Paiement Method</span>
                          </div>
                        </div>
                        {/* Discount method */}
                        <div className="mb-6 flex justify-between ">
                          <div className='flex md:w-10/12 w-full bg-[#288A361A] justify-left items-center'>
                            <span className='text-2xs font-["Inter"] font-semibold'>👉 Get  5% OFF buy choosing digital money</span>
                          </div>
                          <div className='md:w-2/12 hidden md:block'>
                            
                            <div className='flex flex-row-reverse w-full'>
                              <span className='text-xs font-["Inter"] text-[#EF7D0A]'>Discount</span>
                            </div>
                            <div className='flex flex-row-reverse w-full'>
                              <span className='text-2xs font-["Inter"] font-bold text-[#EF7D0A]'>
                                {block1 ? - remise : 0}
                                {' XAF'}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* second block subtotal */}
                        <div className="mb-3 flex justify-between ">
                          <div className='md:hidden md:flex md:flex-row w-full justify-between flex flex-row'>
                            <div className='flex flex-row w-full'>
                              <span className='text-2xs font-["Inter"] text-[#288A36]'>Subtotal</span>
                            </div>
                            <div className='flex flex-row w-full'>
                              <span className='text-2xs font-["Inter"] font-bold text-[#288A36]'>
                                {(selectQuantity *parseInt(valQuery.amount_group))+parseInt(valQuery.fraisDelivery)} 
                                {' XAF'}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* second block discount*/}
                        <div className="mb-4 flex justify-between ">
                          <div className='md:hidden md:flex md:flex-row w-full justify-between flex flex-row'>
                            <div className='flex flex-row w-full'>
                              <span className='text-2xs font-["Inter"] text-[#EF7D0A]'>Discount for digital payment</span>
                            </div>
                            <div className='flex flex-row w-full'>
                              <span className='text-2xs font-["Inter"] font-bold text-[#EF7D0A]'>
                                {block1 ? - remise : 0}
                                {' XAF'}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* method de paiement cash ou Om */}
                        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-x-4'>
                          <div>
                            <div className="mb-6 flex justify-between">
                              <div className='flex flex-col py-2'>
                                <div className='flex flex-rows items-center text-sm font-serif w-full'>
                                  <input
                                      type="checkbox"
                                      id="checkbox"
                                      checked={block1}
                                      onChange={(e)=>{setBlock1(e.target.checked),setBlock2(false)}}
                                  />
                                  <span className='flex flex-col items-center mx-2 font-[Inter] text-sm font-semibold'>
                                    Digital money ( OM / MOMO / Visa/ Mastercard )
                                  </span>
                                  
                                </div>
                              {block1 && (
                                <div>
                                  <div className='mt-6 flex flex-rows mx-8'>
                                    <span className='text-sm font[Inter]'>
                                      Enter the payment number
                                    </span>
                                  </div>
                                  {(block11 || block12) &&(
                                    <div className='mt-6 flex flex-rows mx-4 w-full'>
                                      <input
                                        className='mx-4 py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-8 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-8 md:h-8'
                                        type={"tel"}
                                        defaultValue={userInfo? userInfo?.user?.phone_number:""}
                                        placeholder="Ex : 697922444"
                                        onChange={(e)=>{setValueInputPhone(e.target.value)}}
                                      />
                                    </div>
                                  )}
                                  <div className='mt-6 flex flex-rows mx-8 w-full'>
                                      
                                      <ul className=' w-full'>
                                          <li className='flex items-center text-sm font-[Inter] py-2 border-b border-slate-200'>
                                            <input
                                                type="checkbox"
                                                className="rounded-full mr-2"
                                                id="checkbox"
                                                checked={block11}
                                                onChange={(e)=>{setBlock11(e.target.checked),setBlock12(false),
                                                  setBlock13(false),setBlock14(false),setMethodPaiement('orange-cm')
                                                }}
                                            />
                                            <Image
                                              src={om}
                                              alt='image om'
                                              width={20}
                                              height={20}
                                              
                                            ></Image>
                                            <span className='flex flex-col items-center mx-2 font-[Inter] text-sm'>
                                              Orange money
                                            </span>
                                          </li>
                                          <li className='flex items-center text-sm font-[Inter] py-2 border-b border-slate-200'>
                                            <input
                                                type="checkbox"
                                                className="rounded-full mr-2"
                                                id="checkbox"
                                                checked={block12}
                                                onChange={(e)=>{setBlock12(e.target.checked),setBlock11(false),
                                                  setBlock13(false),setBlock14(false),setMethodPaiement('mtn-cm')
                                                }}
                                            />
                                            <Image
                                              src={mtn}
                                              alt='image mtn'
                                              width={20}
                                              height={20}
                                            ></Image>
                                            <span className='flex flex-col items-center mx-2 font-[Inter] text-sm'>
                                              MTN mobile money
                                            </span>
                                          </li>
                                          <li className='flex items-center text-sm font-[Inter] py-2 border-b border-slate-200'>
                                            <input
                                                type="checkbox"
                                                className="rounded-full mr-2"
                                                id="checkbox"
                                                checked={block13}
                                                onChange={(e)=>{setBlock13(e.target.checked),setBlock12(false),
                                                  setBlock11(false),setBlock14(false),setMethodPaiement('visa')
                                                }}
                                            />
                                            <Image
                                              src={visa}
                                              alt='image visa'
                                              width={20}
                                              height={20}
                                            ></Image>
                                            <span className='flex flex-col items-center mx-2 font-[Inter] text-sm'>
                                              Visa / mastercard
                                            </span>
                                          </li>
                                          <li className='flex items-center text-sm font-[Inter] py-2 border-b border-slate-200'>
                                            <input
                                                type="checkbox"
                                                className="rounded-full mr-2"
                                                id="checkbox"
                                                checked={block14}
                                                onChange={(e)=>{setBlock14(e.target.checked),setBlock12(false),
                                                  setBlock13(false),setBlock11(false),setMethodPaiement('paypal')
                                                }}
                                            />
                                            <Image
                                              src={paypal}
                                              alt='image paypal'
                                              width={20}
                                              height={20}
                                              
                                            ></Image>
                                            <span className='flex flex-col items-center mx-2 font-[Inter] text-sm'>
                                              Paypal
                                            </span>
                                          </li>
                                      </ul>
                                  </div>
                                </div>
                              )}
                              </div>
                            </div>
                            <div className="mb-4 flex justify-between">
                              <div className='flex flex-col py-2'>
                                <div className='flex flex-rows items-center text-sm font-[Inter] w-full'>
                                  <input
                                      type="checkbox"
                                      id="checkbox"
                                      checked={block2}
                                      onChange={(e)=>{setBlock2(e.target.checked),setBlock1(false)}}
                                  />
                                  <span className='flex flex-col items-center mx-2 font-[Inter] text-sm font-semibold'>
                                    Cash upon delivery
                                  </span>
                                  
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-10 mb-6 flex">
                              <div className='lg:block hidden'>
                                <button
                                  onClick={()=>{savePayment()}}
                                  className='bg-[#F37A20] mr-3 rounded-[8px] py-1 px-20 hover:bg-orange-600'
                                >
                                  <SpinLoader loading={loading}/>
                                  <span className='text-sm text-white font-[Inter]'>
                                    Place the order
                                  </span>
                                </button>
                                {/* <button 
                                  className='bg-[#F5F5F5] rounded-[8px] py-1 px-20 hover:border border-orange-600'
                                >
                                  <span className='text-sm text-[#EF7D0A] font-[Inter]'>
                                    Go back
                                  </span>
                                </button> */}
                              </div>
                              <div className='w-full md:hidden'>
                                <button 
                                    onClick={()=>{savePayment()}}
                                    className='bg-[#F37A20] w-full mr-3 rounded-[8px] py-1 px-20 hover:bg-orange-600'
                                  >
                                    <SpinLoader loading={loading}/>
                                  <span className='text-sm text-white font-[Inter]'>
                                    Place the order
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 md:mb-5 block">{/* <Stock product={product} /> */}</div>
                        
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

export default ConfirmOrderScreen;
