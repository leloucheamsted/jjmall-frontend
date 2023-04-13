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
import MapPinModal from '@component/modal/MapPinModal';
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
import { notifyError, notifySuccess } from '@utils/toast';
import { SpinLoader } from '@component/preloader/SpinLoader';
import InventorieService from '@services/InventorieService';

const ConfirmOrder2Screen = () => {
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
  const [loading,setLoading] = useState(false);
  const idProduct = router?.query?.id;
  const valQuery = router?.query
  const name_provider = operator(userInfo? userInfo.user.phone_number:"");
  const date_create = new Date().toISOString();
  const code_random = Math.floor(Math.random() * (15000 - 1000));
  // console.log('val query:',valQuery);
  
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

  

  const CreateInventaireHistory = (id_inventaire)=>{
    const data = {
      "data":{
        "type":"out",
        "quantity":valQuery?.quantity ? valQuery?.quantity:0,
        "inventory":id_inventaire
      }
    }
    setLoading(true)
    InventorieService.addInventoryHistory(data)
      .then((res)=>{
        setLoading(false)
      })
      .catch((err)=>{
        setLoading(false)
        console.log('err history inventaire:',err)
      })
  };
  const UpdateInventaire = ()=>{
    const ValProduct = valQuery?.product ? JSON.parse(valQuery?.product):{}
    
    const inventory_store = product?.attributes.inventories.data.filter(e => e.attributes.type == 'store');
    // console.log('product:',inventory_store[0].id);
    const id_inventory = inventory_store[0].id
    if (stockFarm.length >0){
      const new_quantity = stockFarm[0].attributes.quantity - valQuery?.quantity
      const data = {
        "data":{
          "quantity":new_quantity
        }
      }
      setLoading(true)
      InventorieService.updateInventory(data,id_inventory)
        .then((res)=>{
          CreateInventaireHistory(id_inventory)
          notifySuccess('Inventory success')
        })
        .catch((err)=>{
          setLoading(false)
          console.log('err inventaire:',err)
        })
    }
    
  };
  const CreateDelivery = (order_id,items_delivery,code_group="")=>{
    const deliveryInfo = {
      "data":{
        "quantity":parseInt(valQuery?.quantity),
        "total_amount":valQuery?.amountWithDiscount,
        "order":order_id,
        "transaction":parseInt(valQuery?.transaction_id)
      }
    }
    setLoading(true)
    OrderServices.updateDelivery(deliveryInfo,valQuery?.delivery_id)
      .then((res)=>{
        setLoading(false);
        notifySuccess('Delivery success');
        UpdateInventaire();
        router.push({
          pathname:'/product/confirmOrder3',
          query:{id:valQuery?.id,quantity:valQuery?.quantity,
            amount_group: valQuery?.amount_group,
            product:valQuery?.product,fraisDelivery:valQuery?.fraisDelivery,
            delivery_items:valQuery?.delivery_items,
            delivery_id:valQuery?.delivery_id,
            type:valQuery?.type,
            order_id:order_id,
            user_has_payment:valQuery?.user_has_payment,
            transaction_id:valQuery?.transaction_id,
            group_code:valQuery?.type == "join" ? valQuery?.group_code:code_group,
            amountWithDiscount:valQuery?.amountWithDiscount,
            address:valQuery?.address,
            methodPaiement:valQuery?.methodPaiement
          }
        },'/product/confirmOrder3')
      })
      .catch((err)=>{
        setLoading(false);
        notifyError(err)
      })
  };

  const CreateDeliveryItem = (order_details,order_id,code_groupe="")=>{
    const deliveryItemInfo = {
      "data":{
        "quantity":parseInt(valQuery?.quantity),
        "order_detail":order_details,
      }
    }
    setLoading(true)
    OrderServices.updateDeliveryItems(deliveryItemInfo,valQuery?.delivery_items)
      .then((res)=>{
        setLoading(false);
        console.log('res delivery items:',res);
        CreateDelivery(order_id,res?.data? res?.data?.id:null,code_groupe);
        // notifySuccess('Deliveries items success');
      })
      .catch((err)=>{
        setLoading(false);
        console.log('error delivery items:',err);
        notifyError(err)
      })
  };

  const CreateOrderDetails = ()=>{
    const orderDetailsInfo = {
      "data":{
        "quantity":parseInt(valQuery.quantity),
        "price_was":valQuery?.amountWithDiscount,
        "product":valQuery?.product? JSON.parse(valQuery.product).id:"",
        "name":valQuery?.product? JSON.parse(valQuery.product).attributes?.name:""
      }
    }
    // console.log('data order details:',orderDetailsInfo)
    setLoading(true)
    OrderServices.addOrderDetails(orderDetailsInfo)
      .then((res)=>{
        setLoading(false);
        notifySuccess('Group Details create successfully');
        CreateOrder(res.data ? res.data.id:null);
        // setModalOpen(false);
        // setShowShareModal(!showShareModal);
      })
      .catch((err) => {
        setLoading(false);
        console.log('group details',err);
        // notifyError(err ? err.response.data.error.message : err.message);
      })
  };
  const CreateOrder = (orderDetailsId)=>{
    const orderInfo = valQuery?.type == "create_group" ?{
      "data":{
          "recipient":"Group No "+code_random.toString(),
          // "status":"new",
          // "group_code":type == 'create' ? group_code_random.toString() : group_code,
          // "group_code":""+group_code_random.toString(),
          "is_single":false,
          // "code":code_random.toString(),
          "quantity":parseInt(valQuery?.quantity),
          "total_amount":valQuery?.amountWithDiscount,
          "user":userInfo? userInfo.user.id: null,
          // "group_created_at":new Date(),
          "order_details":orderDetailsId,
          "transactions":parseInt(valQuery?.transaction_id)
          // "rank": type == 'create' ? 1 : null
      }
    }:{
      "data":{
          "recipient":"Group No "+code_random.toString(),
          "group_code":valQuery?.group_code,
          "is_single":false,
          "quantity":parseInt(valQuery?.quantity),
          "total_amount":valQuery?.amountWithDiscount,
          "user":userInfo? userInfo.user.id: null,
          "group_created_at":date_create,
          "order_details":orderDetailsId,
          "transactions":parseInt(valQuery?.transaction_id)
      }
    }
    OrderServices.addOrder(orderInfo)
    .then((res)=>{
        // groupInfo.push(res.data)
        // const tab = groupInfo;
        // const obj = {...res.data,userDetails:userInfo}
        // tab.push(obj);
        // tab.push(res.data);
        // create delivery item

        CreateDeliveryItem(orderDetailsId,res.data?res.data.id:null,res?.data?.attributes?.group_code);

        // console.log('val tab:',tab);

        // dispatch({type:'LIST_GROUP_INFO',payload:tab});
        // const groupsids = tab.map(o => o.attributes.group_code);
        // const groups = tab.filter((elt, index) => !groupsids.includes(elt.attributes.group_code, index + 1))
        // dispatch({type:'LIST_ALLGROUP_INFO',payload:groupsids});
        // dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:groups});
        notifySuccess('Group create successfully');

    })
    .catch((err)=>{
        console.log('group ',err?.response?.data?.error.message);
        notifyError(err ? err?.response?.data?.error?.message : err?.message);
    })
};

  const handleOpen = ()=>{
    setShowJoinGroup(!showJoinGroup);
    // setUserGroup(data)
    // setIdsGroups(e)
  }
  const handleCreateGroup = ()=>{
    CreateOrderDetails();
    // setShowDelivery(!showDelivery)
  };
  
  return (
    <>
      {showJoinGroup && <MapPinModal modalOpen={showJoinGroup} setModalOpen={setShowJoinGroup} />}
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <div>

          <div className="lg:block md:block hidden">
            <NavBarTop />
            <Navbar />
          </div>
          <div className='lg:hidden'>
            <MobileHeader title={'Confirm your order'}/>
          </div>

          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="md:flex md:items-center md:pb-4 hidden">
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
                            <span className='text-sm font-["Inter"]'>75% complete</span>
                          </div>
                        </div>
                        {/* second bloque differents steps */}
                        <div className="md:block w-full mb-3 hidden">
                          <div className='w-full grid grid-cols-4 gap-1'>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#D9D9D9]'></div>
                            
                          </div>
                        </div>

                        {/* enter quantity */}
                        <div className="mb-6 flex justify-between">
                          <div>
                            <span className='text-xl font-["Inter"] font-bold'>Confirm your order</span>
                          </div>
                        </div>
                        {/* bloque avec les images d'un produits */}
                        <div className="mb-6 flex justify-between">
                          <div className='flex md:w-2/12 w-4/12 border border-slate-100'>
                            <Image
                              src={valQuery?.product ? JSON.parse(valQuery?.product)?.attributes?.assets?.data.length > 0 ? JSON.parse(valQuery?.product)?.attributes?.assets?.data[0].attributes?.path?.data.attributes.url : "":""}
                              alt={"image product"}
                              width={160}
                              height={160}
                            >
                            </Image>
                          </div>
                          <div className='md:w-10/12 w-9/12 mx-2 md:flex md:flex-row flex flex-col '>
                            <div className='md:w-10/12'>
                              <div className='md:flex md:w-full flex w-full '>
                                <span className='text-sm font-["Inter"]'>{valQuery?.product ? JSON.parse(valQuery?.product).attributes.description:""}
                                </span>
                              </div>
                              <div className='md:flex md:w-full w-full items-center '>
                                <div className='flex flex-col mt-2 md:w-8/12 w-full '>
                                  <div className='w-full'>
                                    <span className='text-sm font-["Inter"] text-[#288A36]'>
                                      {stockFarm.length >0? stockFarm[0].attributes.quantity:0}{' unity in stock'}
                                    </span>
                                  </div>
                                  <div>
                                    <span className='text-sm font-["Inter"] text-[#EF7D0A]'>{parseInt(valQuery?.amount_group)} XAF/ heap</span>
                                  </div>
                                </div>
                                
                                {/* <div className=' flex md:w-4/12 w-full mt-2 items-center md:block hidden md:justify-center'>
                                  <span className='text-sm font-["Inter"] font-bold'>Quantity:</span>
                                
                                  <input 
                                    className='py-2 px-4 mx-3 md:px-5 md:w-6/12 w-4/12 appearance-none border text-sm opacity-75 
                                    text-input rounded-md placeholder-body min-h-8 transition duration-200 focus:ring-0
                                    ease-in-out bg-white border-gray-200 
                                    focus:outline-none focus:border-primary h-8 md:h-8' 
                                    type='number' 
                                    min={1}
                                    defaultValue={1}
                                    onChange={(e)=>{console.log('items:',e.target.value)}}
                                  />
                                </div> */}
                              
                              </div>
                            </div>
                            <div className='md:flex md:flex-col md:w-2/12 hidden md:w-full md:justify-center'>
                              <div className='flex md:flex-row-reverse w-full'>
                                <span className='text-sm font-["Inter"] text-[#288A36]'>Total to be paid</span>
                              </div>
                              <div className='flex md:flex-row-reverse w-full'>
                                <span className='text-2xs font-["Inter"] font-bold text-[#288A36]'>{parseInt(valQuery?.amountWithDiscount)} XAF</span>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                        {/* select paiement method */}
                        <div className="mb-6 flex justify-between border-b border-slate-200 py-2">
                          <div>
                            <span className='text-md font-["Inter"] font-bold'>Order summary</span>
                          </div>
                        </div>
                        {/* Discount method */}
                        <div className="md:mb-6 md:flex md:flex-row flex flex-col justify-between ">
                          <div className='flex w-full md:w-7/12 md:flex md:flex-row justify-between'>
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
                                  {(parseInt(valQuery?.amount_group)*parseInt(valQuery?.quantity))-parseInt(valQuery?.amountWithDiscount)}XAF
                                </span>
                              </div>
                              <div className='flex flex-row-reverse w-full py-1'>
                                <span className='text-sm font-["Inter"] text-[#288A36]'>{parseInt(valQuery?.amountWithDiscount)} XAF</span>
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-col md:w-5/12 w-full md:pl-3 mb-6 md:block hidden'>
                            
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
                                onClick={()=>{handleOpen()}}
                              >
                                <FiMapPin/>
                              </button>
                            </div>
                            
                          </div>
                        </div>
                        {/* second block pour la localisation */}
                        <div className="md:mb-6 md:flex md:flex-row mt-6 flex flex-col justify-between ">
                          <div className='flex flex-col md:w-4/12 w-full md:pl-3 mb-6 md:hidden'>
                            
                            <div className='flex w-full py-1'>
                              <span className='text-sm font-["Inter"] text-[#37474F] '>Delivery location</span>
                            </div>
                            <div className='flex w-full py-1'>
                              <div className='flex '>
                                <button
                                  // onClick={()=>{handleOpen()}}
                                  onClick={()=>{console.log('rien')}}
                                >
                                  <FiMapPin/>
                                </button>
                              </div>
                              <span className='ml-3 text-sm font-["Inter"] text-[#000000B2]'>{valQuery?.address}</span>
                            </div>
                            <div className='flex w-full mt-6 py-1'>
                              <span className='text-sm font-["Inter"] text-[#37474F] font-semibold'>Paiement method</span>
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
                        </div>
                        {/* method de paiement cash ou Om */}
                        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-x-4'>
                              <div className='lg:block hidden'>
                                <button 
                                  onClick={()=>{handleCreateGroup()}}
                                  className='bg-[#F37A20] mr-3 rounded-[8px] py-1 px-20 hover:bg-orange-600'
                                >
                                  <SpinLoader loading={loading}/>
                                  <span className='text-sm text-white font-[Inter]'>
                                    Confirm order
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
                                    onClick={()=>{handleCreateGroup()}}
                                    className='bg-[#F37A20] w-full mr-3 rounded-[8px] py-1 px-20 hover:bg-orange-600'
                                  >
                                    <SpinLoader loading={loading}/>
                                  <span className='text-sm text-white font-[Inter]'>
                                    Confirm order
                                  </span>
                                </button>
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

export default ConfirmOrder2Screen;
