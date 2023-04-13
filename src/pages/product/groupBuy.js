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
import Router from 'next/router';
import {notifyError,notifySuccess} from '@utils/toast';

const GroupPaiementScreen = () => {
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
  const [valquantity,setValquantity] = useState(1);

  const idProduct = router?.query?.id;
  
  const changeQuantity = (e)=>{
    if(e.target.value > 0){
      setValquantity(e.target.value)
    }
    else if (e.target.value <= 0){
      notifyError('Please enter a value greater than zero')
    }
  }
  useEffect(()=>{
    
    fetchData();
  },[idProduct]);

  const fetchData = async()=>{
    try {
      dispatch({type:'LIST_GROUP_INFO',payload:[]});
      dispatch({type:'LIST_ALLGROUP_INFO',payload:[]});
      dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:[]});

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

          dispatch({type:'LIST_GROUP_INFO',payload:group.data});
          dispatch({type:'LIST_ALLGROUP_INFO',payload:groupsids});
          dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:groups});

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
  const secondButonCreateGroup = (option='create_group',code_group='')=>{

    router.push({
      pathname:'/product/createGroup',
      query:{id:idProduct,quantity:valquantity,
        amount_group: priceGroup.length >0? priceGroup[0].attributes.price:0,
        product:JSON.stringify(product),
        type:option,
        group_code:code_group
      },
    },'/product/createGroup')

  };

  const handleCreateGroup = ()=>{
    Router.push({
      pathname:'/product/createGroup',
      query:{id:idProduct,quantity:valquantity,
        amount_group: priceGroup.length >0? priceGroup[0].attributes.price:0,
        product:JSON.stringify(product),type:"create_group",
      },
    },'/product/createGroup')
    // router.push(`/product/createGroup?id=${idProduct}`, null, { scroll: false })
    // ?id=${product.id}`, null, { scroll: false }
    // setShowDelivery(!showDelivery)
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
            <MobileHeader/>
          </div>

          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="flex items-center pb-4">
                <ol className="flex items-center w-full overflow-hidden font-serif">
                  <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold ">
                    <Link href="/">
                      <a>{product ? product.attributes?.name : ""}</a>
                    </Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  <li className="text-sm px-1 transition duration-200 ease-in ">{"Group buy"}</li>
                </ol>
              </div>
              <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                <div className="flex flex-col xl:flex-row">
                  <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-3/12">
                    <Image
                      src={product?.attributes?.assets?.data.length > 0 ? product?.attributes?.assets?.data[0].attributes?.path?.data.attributes.url : ""}
                      alt={product?.attributes?.sku}
                      layout="responsive"
                      width={650}
                      height={650}
                      priority
                    ></Image>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                      <div className="w-full md:w-7/12 md:pr-4 lg:pr-4 xl:pr-8 xl:w-9/12">
                        <div className="mb-6 flex justify-between ">
                          <div className="">
                            <h1 className="leading-7 text-sm md:text-sm lg:text-sm mb-1  font-serif ">{product?.attributes?.description}</h1>
                            
                          </div>
                          {/* Avatar seller */}
                          {/* <div className='h-[65px] w-[65px] border-2 rounded-[50px]  border-[#000016] bg-red-300 flex justify-center items-center  '>
                            <img
                              className=' overflow-hidden cursor-pointer rounded-[50px]'
                              src="http://dotnethow.net/images/actors/actor-2.jpeg"
                              alt={product.title}
                              layout="responsive"
                              width={65}
                              height={65}
                              priority
                            ></img>
                          </div> */}
                        </div>

                        <div className="mb-4 md:mb-5 block">{/* <Stock product={product} /> */}</div>
                        <div>
                          <p className="text-sm leading-6 text-gray-500 md:leading-7">{/* {product.description} */}</p>

                          {/* <div className="flex items-center mt-4">
                            <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                              <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                                <button
                                  onClick={() => setItem(item - 1)}
                                  disabled={item === 1}
                                  className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                                >
                                  <span className="text-dark text-base">
                                    <FiMinus />
                                  </span>
                                </button>
                                <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                                </p>
                                <button
                                  onClick={() => setItem(item + 1)}
                                  disabled={
                                    product.quantity < item ||
                                    product.quantity === item
                                  }
                                  className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                                >
                                  <span className="text-dark text-base">
                                    <FiPlus />
                                  </span>
                                </button>
                              </div>
                              <button
                                onClick={() => handleAddItem(product)}
                                disabled={product.quantity < 1}
                                className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-primary hover:bg-emerald-600 w-full h-12"
                              >
                                Add To Cart
                              </button>
                            </div>

                          </div> */}
                          <div className='lg:grid lg:grid-cols-2 grid grid-cols-2'>
                            <div className='w-full'>
                              <div className='lg:grid lg:grid-cols-1 grid grid-cols-1'>
                                <div className='w-full'>
                                  
                                  <div className='w-full flex flex-cols'>
                                    <span className="text-[#288A36] font-bold font-[Inter]">{stockFarm.length >0? stockFarm[0].attributes.quantity:0}{' unity in stock'}</span>
                                  </div>
                                  <div className='w-full flex flex-cols'>
                                    <span className="text-[#EF7D0A] font-bold font-[Inter]">{priceGroup.length >0? priceGroup[0].attributes.price:0}{' XAF'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <div className='flex flex-rows items-center justify-center'>
                                <span className='text-sm font-serif font-bold'>Quantity: </span>
                                <input 
                                  className='py-2 ml-2 px-4 md:px-5 w-2/5 appearance-none border text-sm opacity-75 
                                  text-input rounded-md placeholder-body min-h-8 transition duration-200 focus:ring-0
                                   ease-in-out bg-white border-gray-200 
                                  focus:outline-none focus:border-primary h-8 md:h-8' 
                                  type='number' 
                                  min={1}
                                  defaultValue={1}
                                  onChange={(e)=>{changeQuantity(e)}}
                                />
                              
                            </div> */}
                            
                          </div>
                        </div>
                      </div>
                      <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                        
                        <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
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
                                handleCreateGroup();
                              }}
                              // disabled={product.quantity < 1}
                              // style={{backgroundColor:"#EB8712"}}
                              className="text-sm leading-4 inline-flex bg-[#EB8712] items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-emerald-600 w-full h-12"
                            >
                              Create Your Group
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*Other products by the seller */}
              <div>
                <div className="flex justify-between my-0 bg-white-100 border border-gray-100 rounded p-3">
                  <div className='flex'>
                    <span style={{ fontWeight: "bold" }} className="text-sm font-serif">
                      Or Join an existing group
                    </span>
                  </div>
                  <div className='flex'>
                    <span className="text-sm font-serif">
                      <select onChange={(e) => setSortedField(e.target.value)} className="py-0 text-sm font-serif font-medium block w-full rounded border-0 bg-white pr-10 cursor-pointer focus:ring-0">
                        <option className="px-3" value="All" defaultValue hidden>
                          Sort By: number of people
                        </option>
                        <option className="px-3" value="Low">
                          Low to High
                        </option>
                        <option className="px-3" value="High">
                          High to Low
                        </option>
                      </select>
                    </span>
                  </div>
                </div>
                {/* className="w-full xl:w-3/6 lg:w-3/6 md:w-3/6 sm:w-full" */}
                {/* className="xl:flex gap-4 lg:flex" */}
                {/* groups.length */}
                {productGroupInfo.length > 0 && (
                  <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-4 bg-[#F6EEE699]">
                    {/* groups.length */}
                    {productGroupInfo?.map((e, index) => (
                      <div key={index + 1} className="w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 ">
                          <div className="flex flex-rows items-center">
                            {/* AllGroup */}
                            {allGroupInfo?.map((elt, i) => (
                              <div key={i + 1}>
                                {e.attributes.group_code == elt && (
                                  <div key={i + 1} className="xl:h-[50px] xl:w-[50px] lg:h-[50px] lg:w-[50px] h-[30px] w-[30px] rounded-full border border-slate-600">
                                    <Image className="rounded-full flex justify-center items-center" src={profile} alt={"profile item"} layout="responsive"></Image>
                                  </div>
                                )}
                              </div>
                            ))}
                            <span className=' mx-2'></span>
                            {allGroupInfo?.map((elt, i) => (
                              <div key={i+1} className='text-ellipsis overflow-hidden ...'>
                                {(e.attributes.group_code == elt)  &&(
                                <div  className={i+1 ? 'flex items-center' : 'flex items-center '}>
                                  <span className="text-sm font-serif">
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
                                  <span className="text-sm font-serif">{allGroupInfo.filter((item) => item == e.attributes.group_code).length}/5 </span>
                                  <span style={{ color: "#288A36", textDecoration: "underline" }} className="text-sm font-serif">
                                    view details
                                  </span>
                                </div>
                                <div className="">
                                  <span className="text-sm font-serif">
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
                                inline-flex items-center font-semibold font-serif text-center justify-center 
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
        
        // <Layout title={"Group Paiement"} description={"Create Group paiement"}>
        //   <div className="px-0 py-10 lg:py-10">
        //     <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
        //       <div className="flex items-center pb-4">
        //         <ol className="flex items-center w-full overflow-hidden font-serif">
        //           <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold">
        //             <Link href="/">
        //               <a>Home</a>
        //             </Link>
        //           </li>
        //           <li className="text-sm mt-[1px]">
        //             {" "}
        //             <FiChevronRight />{" "}
        //           </li>
        //           <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold ">
        //             <Link href="/">
        //               <a>{product ? product.attributes?.name : ""}</a>
        //             </Link>
        //           </li>
        //           <li className="text-sm mt-[1px]">
        //             {" "}
        //             <FiChevronRight />{" "}
        //           </li>
        //           <li className="text-sm px-1 transition duration-200 ease-in ">{"Group buy"}</li>
        //         </ol>
        //       </div>
        //       <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
        //         <div className="flex flex-col xl:flex-row">
        //           <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-3/12">
        //             <Image
        //               src={product?.attributes?.assets?.data.length > 0 ? product?.attributes?.assets?.data[0].attributes?.path?.data.attributes.url : ""}
        //               alt={product?.attributes?.sku}
        //               layout="responsive"
        //               width={650}
        //               height={650}
        //               priority
        //             ></Image>
        //           </div>
        //           <div className="w-full">
        //             <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
        //               <div className="w-full md:w-7/12 md:pr-4 lg:pr-4 xl:pr-8 xl:w-9/12">
        //                 <div className="mb-6 flex justify-between ">
        //                   <div className="">
        //                     <h1 className="leading-7 text-sm md:text-sm lg:text-sm mb-1  font-serif ">{product?.attributes?.description}</h1>
                            
        //                   </div>
        //                   {/* Avatar seller */}
        //                   {/* <div className='h-[65px] w-[65px] border-2 rounded-[50px]  border-[#000016] bg-red-300 flex justify-center items-center  '>
        //                     <img
        //                       className=' overflow-hidden cursor-pointer rounded-[50px]'
        //                       src="http://dotnethow.net/images/actors/actor-2.jpeg"
        //                       alt={product.title}
        //                       layout="responsive"
        //                       width={65}
        //                       height={65}
        //                       priority
        //                     ></img>
        //                   </div> */}
        //                 </div>

        //                 <div className="mb-4 md:mb-5 block">{/* <Stock product={product} /> */}</div>
        //                 <div>
        //                   <p className="text-sm leading-6 text-gray-500 md:leading-7">{/* {product.description} */}</p>

        //                   {/* <div className="flex items-center mt-4">
        //                     <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
        //                       <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
        //                         <button
        //                           onClick={() => setItem(item - 1)}
        //                           disabled={item === 1}
        //                           className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
        //                         >
        //                           <span className="text-dark text-base">
        //                             <FiMinus />
        //                           </span>
        //                         </button>
        //                         <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
        //                         </p>
        //                         <button
        //                           onClick={() => setItem(item + 1)}
        //                           disabled={
        //                             product.quantity < item ||
        //                             product.quantity === item
        //                           }
        //                           className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
        //                         >
        //                           <span className="text-dark text-base">
        //                             <FiPlus />
        //                           </span>
        //                         </button>
        //                       </div>
        //                       <button
        //                         onClick={() => handleAddItem(product)}
        //                         disabled={product.quantity < 1}
        //                         className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-primary hover:bg-emerald-600 w-full h-12"
        //                       >
        //                         Add To Cart
        //                       </button>
        //                     </div>

        //                   </div> */}

        //                   <div className="flex flex-col mt-4">
        //                     <span className="font-serif font-semibold py-1 text-sm d-block">
        //                       <span className="text-gray-700">Category:</span> <span className="text-gray-500">{/* {product.children} */}</span>
        //                     </span>
        //                     {/* <Tags product={product} /> */}
        //                   </div>
        //                 </div>
        //               </div>
        //               <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
        //                 <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
        //                   <button
        //                     onClick={() => {
        //                       handleCreateGroup();
        //                     }}
        //                     // disabled={product.quantity < 1}
        //                     // style={{backgroundColor:"#EB8712"}}
        //                     className="text-sm leading-4 inline-flex bg-[#EB8712] items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-emerald-600 w-full h-12"
        //                   >
        //                     Create Your Group
        //                   </button>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>

        //       {/*Other products by the seller */}
        //       <div>
        //         <div className="flex justify-between my-0 bg-white-100 border border-gray-100 rounded p-3">
        //           <h6 style={{ fontWeight: "bold" }} className="text-sm font-serif">
        //             Or Join an existing group
        //           </h6>
        //           <span className="text-sm font-serif">
        //             <select onChange={(e) => setSortedField(e.target.value)} className="py-0 text-sm font-serif font-medium block w-full rounded border-0 bg-white pr-10 cursor-pointer focus:ring-0">
        //               <option className="px-3" value="All" defaultValue hidden>
        //                 Sort By: number of people
        //               </option>
        //               <option className="px-3" value="Low">
        //                 Low to High
        //               </option>
        //               <option className="px-3" value="High">
        //                 High to Low
        //               </option>
        //             </select>
        //           </span>
        //         </div>
        //         {/* className="w-full xl:w-3/6 lg:w-3/6 md:w-3/6 sm:w-full" */}
        //         {/* className="xl:flex gap-4 lg:flex" */}
        //         {groups.length > 0 && (
        //           <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-4 ">
        //             {groups?.map((e, index) => (
        //               <div key={index + 1} className="w-full">
        //                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 ">
        //                   <div className="flex flex-rows items-center">
        //                     {AllGroup?.map((elt, i) => (
        //                       <div key={i + 1}>
        //                         {e.attributes.group_code == elt && (
        //                           <div key={i + 1} className="xl:h-[50px] xl:w-[50px] lg:h-[50px] lg:w-[50px] h-[30px] w-[30px] rounded-full border border-slate-600">
        //                             <Image className="rounded-full flex justify-center items-center" src={profile} alt={"profile item"} layout="responsive"></Image>
        //                           </div>
        //                         )}
        //                       </div>
        //                     ))}
        //                     <span className=' mx-2'></span>
        //                     {AllGroup?.map((elt, i) => (
        //                       <div key={i+1} className='text-ellipsis overflow-hidden ...'>
        //                         {(e.attributes.group_code == elt)  &&(
        //                         <div  className={i+1 ? 'flex items-center' : 'flex items-center '}>
        //                           <span className="text-sm font-serif">
        //                             {GroupWithDoublons.filter((item)=>item.attributes.group_code == elt).length >0 ?
        //                               GroupWithDoublons.filter((item)=>item.attributes.group_code == elt)[0]?.attributes.user.data?.
        //                               attributes.person.data?.attributes.first_name
        //                               :''
        //                             }
        //                             {','}
        //                           </span>
        //                         </div>
        //                         )}
        //                       </div>
        //                     ))}
                            
                            
        //                   </div>

        //                   <div className="place-self-end">
        //                     <div className="flex items-center w-full">
        //                       <div className="flex flex-col items-justify">
        //                         <div>
        //                           <span className="text-sm font-serif">{AllGroup.filter((item) => item == e.attributes.group_code).length}/5 </span>
        //                           <span style={{ color: "#288A36", textDecoration: "underline" }} className="text-sm font-serif">
        //                             view details
        //                           </span>
        //                         </div>
        //                         <div className="">
        //                           <span className="text-sm font-serif">
        //                             {GroupWithDoublons.filter((item) => item.attributes.group_code == e.attributes.group_code && item.attributes.rank == 1).length > 0
        //                               ? dayjs(GroupWithDoublons.filter((item) => item.attributes.group_code == e.attributes.group_code && item.attributes.rank == 1)[0]?.attributes.group_created_at).format(
        //                                   "DD/MM/YY H:mm"
        //                                 )
        //                               : ""}
        //                           </span>
        //                         </div>
        //                       </div>

        //                       <button
        //                         style={{ backgroundColor: "#EB8712" }}
        //                         onClick={() => {
        //                           handleOpen(AllGroup, e);
        //                         }}
        //                         className="mx-2 rounded-md bg-orange-300 cursor-pointer text-sm leading-4 
        //                         inline-flex items-center font-semibold font-serif text-center justify-center 
        //                         text-white px-4 py-1 hover:text-white bg-primary hover:bg-emerald-600"
        //                       >
        //                         Join
        //                       </button>
        //                     </div>
        //                   </div>
        //                 </div>
        //               </div>
        //             ))}
        //           </div>
        //         )}
        //       </div>
        //     </div>
        //   </div>
        // </Layout>
      )}
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const { query } = context.query;

//   const idProduct = context.query.id
//   const data = await ProductServices.getProductsById(idProduct);
//   const group = await OrderServices.getShowGroup(idProduct)
  
//   let product = {};
//   let groups = [];
//   let AllGroup = [];
//   let GroupWithDoublons = []
//   if (data){
//     product = data
//   }
//   if (group){
//     // groups = group.data
//     if (group.data.length > 0){
//       const groupsids = group.data.map(o => o.attributes.group_code)
//       groups = group.data.filter((elt, index) => !groupsids.includes(elt.attributes.group_code, index + 1))

//       AllGroup = groupsids
//       GroupWithDoublons = group.data
      
      
//     }
//   }
 
//   return {
//     props: {
//       product,
//       groups,
//       AllGroup,
//       GroupWithDoublons
//     },
//   };
// };

export default GroupPaiementScreen;
