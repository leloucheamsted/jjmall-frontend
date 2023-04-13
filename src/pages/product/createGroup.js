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
import delivery from '@component/images/delivery-location-img.png'
import { useLoadScript,GoogleMap,MarkerF,CircleF,StandaloneSearchBox  } from '@react-google-maps/api';
import { useMemo } from 'react';
import { notifyError, notifySuccess } from '@utils/toast';
import { useRef } from 'react';
import { SpinLoader } from '@component/preloader/SpinLoader';

const CreateGroupScreen = () => {
  // {product,groups,AllGroup,GroupWithDoublons}
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const {dispatch,state:{userInfo,groupInfo,
    allGroupInfo,productGroupInfo}} = useContext(UserContext);

  const idProduct = router?.query?.id;
  const valQuery = router?.query

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
  const [block2,setBlock2] = useState(true);
  const [block3,setBlock3] = useState(false);
  const [block4,setBlock4] = useState(false);
  const [block5,setBlock5] = useState(false);

  const [loading,setLoading] = useState(false);
  const [address,setAddress] = useState('');
  const [chargeDelivery,setChargeDelivery] = useState(0);

  const [lat, setLat] = useState(27.672932021393862);
  const [lng, setLng] = useState(85.31184012689732);
  
  // console.log('value query:',router?.query);
 
  const [optionJoin,setOptionJoin] = useState(valQuery?.type ? valQuery?.type : 'create_group');

  const libraries = useMemo(() => ['places'], []);
 
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  });
  const inputRef = useRef();
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
  const mapOptions = useMemo(() => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  
  const group_code_random = Math.floor(Math.random() * (550000 - 10000));
  const code_random = Math.floor(Math.random() * (15000 - 1000));

  // const CreateDelivery = (order_id,items_delivery)
  const CreateDelivery = (items_delivery)=>{
    const deliveryInfo = {
      "data":{
        "quantity":parseInt(valQuery?.quantity),
        "total_amount":(parseInt(valQuery?.quantity) * parseInt(valQuery?.amount_group))+ chargeDelivery,
        "phone_number":userInfo? userInfo.user.phone_number:'',
        // "order":order_id,
        "delivery_items":items_delivery,
        "address":address,
        "lalitude":block2 ? lat:0,
        "longitude":block2? lng:0
      }
    }
    setLoading(true)
    OrderServices.addDelivery(deliveryInfo)
      .then((res)=>{
        setLoading(false);
        notifySuccess('Delivery success');
        router.push({
          pathname:'/product/confirmOrder',
          query:{id:valQuery?.id,quantity:valQuery?.quantity,
            amount_group: valQuery?.amount_group,
            product:valQuery?.product,fraisDelivery:chargeDelivery,
            delivery_items:items_delivery,
            delivery_id:res?.data ? res?.data?.id: null,
            type:valQuery?.type,
            address:address,
            group_code:valQuery?.type == "join" ? valQuery?.group_code:""
          }
        },'/product/confirmOrder')
      })
      .catch((err)=>{
        setLoading(false);
        console.log('delivery error:',err.response?.data?.error?.message);
        notifyError(err)
      })
  };

  // const CreateDeliveryItem = (order_details,order_id)
  const CreateDeliveryItem = ()=>{
    const deliveryItemInfo = {
      "data":{
        "quantity":parseInt(valQuery?.quantity),
        "status":"pending",
        // "order_detail":order_details,
      }
    }
    setLoading(true)
    OrderServices.addDeliveryItems(deliveryItemInfo)
      .then((res)=>{
        // setLoading(false);
        console.log('res delivery items:',res);
        CreateDelivery(res?.data? res?.data?.id:null);
        notifySuccess('Deliveries items success');
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
        "price_was":(parseInt(valQuery.amount_group) * parseInt(valQuery.quantity)) + chargeDelivery,
        "product":JSON.parse(valQuery.product).id,
        "name":JSON.parse(valQuery.product).attributes?.name
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
      const orderInfo = {
      "data":{
          "recipient":"Group No "+code_random.toString(),
          // "status":"new",
          // "group_code":type == 'create' ? group_code_random.toString() : group_code,
          // "group_code":""+group_code_random.toString(),
          "is_single":false,
          // "code":code_random.toString(),
          "quantity":parseInt(valQuery.quantity),
          "total_amount":(parseInt(valQuery.quantity) * parseInt(valQuery.amount_group)) + chargeDelivery,
          "user":userInfo? userInfo.user.id: null,
          // "group_created_at":new Date(),
          "order_details":orderDetailsId,
          // "rank": type == 'create' ? 1 : null
      }
      }
      OrderServices.addOrder(orderInfo)
      .then((res)=>{
          // groupInfo.push(res.data)
          const tab = groupInfo;
          const obj = {...res.data,userDetails:userInfo}
          tab.push(obj);
          // tab.push(res.data);
          // create delivery item

          // CreateDeliveryItem(orderDetailsId,res.data?res.data.id:null);

          console.log('val tab:',tab);
          dispatch({type:'LIST_GROUP_INFO',payload:tab});
          const groupsids = tab.map(o => o.attributes.group_code);
          const groups = tab.filter((elt, index) => !groupsids.includes(elt.attributes.group_code, index + 1))
          dispatch({type:'LIST_ALLGROUP_INFO',payload:groupsids});
          dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:groups});
          notifySuccess('Group create successfully');

      })
      .catch((err)=>{
          console.log('group ',err.response.data.error.message);
          notifyError(err ? err.response.data.error.message : err.message);
      })
  };
  const JoinGroupMehtod = ()=>{
    // setShowShareModal(!showShareModal)
    
    // if (groupInfo.length > 0 ){
    //     setLoading(true);
    //     const tar = groupInfo.filter((elt)=>elt.attributes?.group_code == group_code && 
    //     elt.attributes?.user?.attributes?.username == userInfo?.user?.username);
    //     console.log('val tar:',tar.length);
    //     if (tar.length > 0){
    //         // alert('Cette utilisateur est deja dans le groupe')
    //         notifyError('Cette utilisateur est deja dans le groupe')
    //         setLoading(false)
    //     }
    //     else{
    //         CreateOrderDetails()
    //     }
    // }
    CreateOrderDetails()
  }
  const CreateGroupMehtod = ()=>{
      // CreateOrderDetails()
      CreateDeliveryItem();
  }
  const handlePlaceChanged = () => { 
      const [ place ] = inputRef.current.getPlaces();
      
      if(place) { 
          setAddress(place.formatted_address)
          console.log(place.formatted_address)
          // console.log(place.geometry.location.lat())
          // console.log(place.geometry.location.lng())
          setLat(place.geometry.location.lat())
          setLng(place.geometry.location.lng())
      } 
  }
  

  // useEffect(()=>{
    
  //   fetchData();
  // },[idProduct]);

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
            <MobileHeader title={'Delivery Location'}/>
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
                        <div className="hidden md:mb-6 md:flex md:justify-between">
                          <div>
                            <span className='text-sm font-["Inter"]'>Just few steps to create your group</span>
                          </div>
                          <div>
                            <span className='text-sm font-["Inter"]'>25% complete</span>
                          </div>
                        </div>
                        {/* second bloque differents steps */}
                        <div className="md:w-full md:mb-3 md:block hidden">
                          <div className='w-full grid grid-cols-4 gap-1'>
                            <div className='h-[5px] rounded-[3px] bg-[#EF7D0A]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#D9D9D9]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#D9D9D9]'></div>
                            <div className='h-[5px] rounded-[3px] bg-[#D9D9D9]'></div>
                            
                          </div>
                        </div>

                        {/* add delivery */}
                        <div className="md:mb-6 md:flex md:justify-between hidden">
                          <div>
                            <span className='text-xl font-["Inter"] font-bold'>Add your delivery location</span>
                          </div>
                        </div>
                        {/* differentes localisation */}
                        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-x-4'>
                          <div>
                            {optionJoin == "join" &&(
                              <div className="mb-6 flex justify-between ">
                                <div className='flex flex-col py-2'>
                                  <div className='flex flex-rows items-center text-sm font-serif w-full'>
                                    <input
                                      type="checkbox"
                                      id="checkbox"
                                      value={"I want to pick Up at a drop of point"}
                                      checked={block5}
                                      onChange={(e)=>{
                                        setBlock5(e.target.checked),setBlock2(false),setBlock1(false),
                                        setChargeDelivery(0)
                                      }}
                                    />
                                      <span className='flex flex-col items-center mx-2 font-[Inter] text-sm font-medium'>
                                        {optionJoin == "create_group"? "I want to pick Up at a drop of point":"I want to pick Up at the group leader"}
                                      </span>
                                      <span className='flex flex-col items-center mx-2 font-[Inter] text-sm font-semibold'>
                                        ( 0 XAF )
                                      </span>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="mb-6 flex justify-between border-t border-slate-200">
                              <div className='flex flex-col py-2'>
                                <div className='flex flex-rows items-center text-sm font-serif w-full'>
                                  <input
                                      type="checkbox"
                                      id="checkbox"
                                      value={"I want to pick Up at a drop of point"}
                                      checked={block1}
                                      onChange={(e)=>{
                                        setBlock1(e.target.checked),setBlock2(false),setBlock5(false),
                                        setChargeDelivery(200)
                                      }}
                                  />
                                  <span className='flex flex-col items-center mx-2 font-[Inter] text-sm font-medium'>
                                    I want to pick Up at a drop of point
                                  </span>
                                  <span className='flex flex-col items-center mx-2 font-[Inter] text-sm font-semibold'>
                                      (200 XAF)
                                  </span>
                                </div>
                              {block1 && (
                                <div className='flex flex-rows my-2 mx-4 py-2'>
                                  <span className='flex flex-col items-center mx-2 font-[Inter] text-sm font-semibold'>
                                    Select a drop of point
                                  </span>
                                </div>
                              )}
                              {block1 && (
                                <div className='flex flex-rows mx-8'>
                                    <ul className=''>
                                        <li className='flex items-center text-sm font-serif'>
                                          <input
                                              type="checkbox"
                                              className="rounded-full"
                                              value={"Makepè bloc L - carefour Wakawaka"}
                                              id="checkbox"
                                              checked={block3}
                                              onChange={(e)=>{
                                                setBlock3(e.target.checked),setBlock4(false),setAddress('Makepè bloc L - carefour Wakawaka')
                                              }}
                                          />
                                          <span className='flex flex-col items-center mx-2 font-[Inter] text-sm'>
                                              Makepè bloc L - carefour Wakawaka
                                          </span>
                                        </li>
                                        <li className='flex items-center text-sm font-serif'>
                                          <input
                                              type="checkbox"
                                              className="rounded-full"
                                              value={"Makepè bloc L - carefour Wakawaka"}
                                              id="checkbox"
                                              checked={block4}
                                              onChange={(e)=>{
                                                setBlock4(e.target.checked),setBlock3(false),setAddress('Makepè bloc L - carefour Wakawaka')
                                              }}
                                          />
                                          <span className='flex flex-col items-center mx-2 font-[Inter] text-sm'>
                                              Makepè bloc L - carefour Wakawaka
                                          </span>
                                        </li>
                                    </ul>
                                </div>
                              )}
                              </div>
                              
                            </div>
                            <div className="mb-4 flex justify-between border-t border-slate-200">
                              <div className='flex flex-col py-2'>
                                <div className='flex flex-rows items-center text-sm font-serif w-full'>
                                  <input
                                      type="checkbox"
                                      id="checkbox"
                                      value={"I want it delivered to me"}
                                      checked={block2}
                                      onChange={(e)=>{
                                        setBlock2(e.target.checked),setBlock1(false),setBlock5(false),setChargeDelivery(500)
                                      }}
                                  />
                                  <span className='flex flex-col items-center mx-2 font-[Inter] text-sm font-medium'>
                                    I want it delivered to me
                                  </span>
                                  <span className='flex flex-col items-center mx-2 font-[Inter] text-sm font-semibold'>
                                    ( 500 XAF )
                                  </span>
                                </div>
                              </div>
                            </div>
                            {block2 &&(
                              <div >
                                <div className="mb-2 flex justify-between">
                                  <span className='text-sm text-[#37474FB2] font-[Inter]'>
                                    Choose your location on the map
                                  </span>
                                </div>
                                {/* input field */}
                                <div className="mb-6 w-full">
                                  {!isLoaded &&(
                                    <p>Loading...</p>
                                  )}
                                  {isLoaded &&(
                                    <StandaloneSearchBox
                                        onLoad={ref => inputRef.current = ref}
                                        onPlacesChanged={handlePlaceChanged}
                                    >
                                        <input
                                          className='px-4 md:px-5 w-full appearance-none border font-[Inter] text-sm opacity-75 text-input rounded-md placeholder-body min-h-9
                                          transition duration-200 focus:ring-0 ease-in-out bg-white border-[#D9D9D9] focus:outline-none 
                                          focus:border-primary h-9 md:h-9'
                                          type="text"
                                          // className="form-control"
                                          placeholder="Enter Location"
                                        />
                                    </StandaloneSearchBox>
                                  )}
                                </div>
                                <div className="mb-6 flex justify-between">
                                  {!isLoaded &&(
                                    <p>Loading...</p>
                                  )}
                                  {isLoaded &&(
                                    <GoogleMap
                                      options={mapOptions}
                                      zoom={14}
                                      center={mapCenter}
                                      mapContainerStyle={{ width: '600px', height: '400px' }}
                                      onLoad={() => console.log('Map Component Loaded...')}
                                    >
                                      <MarkerF position={mapCenter} onLoad={() => console.log('Marker Loaded')} />

                                      {[1000].map((radius, idx) => {
                                        return (
                                          <CircleF
                                            key={idx}
                                            center={mapCenter}
                                            radius={radius}
                                            onLoad={() => console.log('Circle Load...')}
                                            options={{
                                              fillColor: radius > 1000 ? 'red' : 'green',
                                              strokeColor: radius > 1000 ? 'red' : 'green',
                                              strokeOpacity: 0.8,
                                            }}
                                          />
                                        );
                                      })}
                                    </GoogleMap>
                                  )}
                                </div>
                              </div>
                            )}
                            <div className="mt-20 mb-6 flex w-full justify-between">
                              <div className='md:block hidden'>
                              <button 
                                onClick={()=>{CreateGroupMehtod()}}
                                className='bg-[#F37A20] rounded-[8px] py-1 px-20 hover:bg-orange-600'
                              >
                                <SpinLoader loading={loading} />
                                <span className='text-sm text-white font-[Inter]'>
                                  Confirm location
                                </span>
                              </button>
                              </div>
                              <div className='w-full lg:hidden'>
                              <button 
                                onClick={()=>{CreateGroupMehtod()}}
                                className='bg-[#F37A20] w-full rounded-[8px] py-1 px-20 hover:bg-orange-600'
                              >
                                <SpinLoader loading={loading} />
                                <span className='text-sm text-white font-[Inter]'>
                                  Confirm location
                                </span>
                              </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* bloque avec image d'un cycliste */}
                          <div className='lg:block hidden'>
                            <Image
                              width={300}
                              height={200}
                              src={delivery}
                              alt="shop"
                              
                            />
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

// const PlacesAutocomplete = ({setLat=function(){},setLng=function(){}}) => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       /* Define search scope here */
//     },
//     debounce: 300,
//     // cache: 86400,
//   });
//   const ref = useOnclickOutside(() => {
//     // When user clicks outside of the component, we can dismiss
//     // the searched suggestions by calling this method
//     clearSuggestions();
//   });

//   const handleInput = (e) => {
//     // Update the keyword of the input element
//     setValue(e.target.value);
//   };

//   const handleSelect =
//     ({ description }) =>
//     () => {
//       // When user selects a place, we can replace the keyword without request data from API
//       // by setting the second parameter to "false"
//       setValue(description, false);
//       clearSuggestions();

//       // Get latitude and longitude via utility functions
//       getGeocode({ address: description }).then((results) => {
//         const { lat, lng } = getLatLng(results[0]);
//         setLat(lat);
//         setLng(lng);
//         console.log("📍 Coordinates: ", { lat, lng });
//       });
//     };

//   const renderSuggestions = () =>
//     data.map((suggestion) => {
//       const {
//         place_id,
//         structured_formatting: { main_text, secondary_text },
//       } = suggestion;

//       return (
//         <div className='w-full flex justify-between border border-slate-400 cursor-pointer'>
//           <li key={place_id} onClick={handleSelect(suggestion)}>
//             <strong>{main_text}</strong> <small>{secondary_text}</small>
//           </li>
//         </div>
//       );
//     });

//   return (
//     <div
//       className='w-full flex grid grid-cols-1'
//       ref={ref}
//     >
//       <input
//         className='px-4 md:px-5 w-full appearance-none border font-[Inter] text-sm opacity-75 text-input rounded-md placeholder-body min-h-9
//         transition duration-200 focus:ring-0 ease-in-out bg-white border-[#D9D9D9] focus:outline-none 
//         focus:border-primary h-9 md:h-9'
//         value={value}
//         onChange={handleInput}
//         disabled={!ready}
//         placeholder="Where are you going?"
//       />
//       {/* We can use the "status" to decide whether we should display the dropdown or not */}
//       {status === "OK" && (
//         <div lassName='w-full flex justify-between border border-slate-200'>
//           <ul>{renderSuggestions()}</ul>
//         </div>
//       )}
//     </div>
//   );
// };
export default CreateGroupScreen;
