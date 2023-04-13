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

import { notifyError, notifySuccess } from '@utils/toast';
import { useRef } from 'react';
import { SpinLoader } from '@component/preloader/SpinLoader';

const MyGroupScreen = ()=>{
    const router = useRouter();
    const { isLoading, setIsLoading } = useContext(SidebarContext);
    const {dispatch,state:{userInfo,groupInfo,
        allGroupInfo,productGroupInfo}} = useContext(UserContext);

    const idProduct = router?.query?.id;
    const valQuery = router?.query

    return(
        <>
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
                            <div className="hidden md:block flex items-center pb-4 border border-slate-200">
                                <span>Hello</span>
                            </div>
                            <div className="w-full rounded-lg pt-3  bg-white">
                                <div className="flex flex-col xl:flex-row border border-slate-200">
                                    <div className="flex-shrink-0 lg:block w-full md:w-4/12 lg:w-4/12 xl:w-4/12 ">
                                        <div className="border border-slate-100">
                                            <div><span>Filter 1</span></div>
                                            <div><span>Filter 1</span></div>
                                            <div><span>Filter 1</span></div>
                                            <div><span>Filter 1</span></div>
                                        </div>
                                        <div className="w-full flex flex-cols mt-1">
                                            <div><span>Filter 2</span></div>
                                            <div><span>Filter 2</span></div>
                                            <div><span>Filter 2</span></div>
                                            <div><span>Filter 2</span></div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 lg:block w-full md:w-8/12 lg:w-8/12 xl:w-8/12 ">
                                        <div className="border border-slate-100">
                                            <div><span>Filter 1</span></div>
                                            <div><span>Filter 1</span></div>
                                            <div><span>Filter 1</span></div>
                                            <div><span>Filter 1</span></div>
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

export default MyGroupScreen;