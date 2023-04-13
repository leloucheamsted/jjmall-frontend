import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { IoLockOpenOutline } from 'react-icons/io5';
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from 'react-icons/fi';

//internal import
import Layout from '@layout/Layout';
import useAsync from '@hooks/useAsync';
import useFilter from '@hooks/useFilter';
import { userSidebar } from '@utils/data';
import Card from '@component/order-card/Card';
import { UserContext } from '@context/UserContext';
import OrderServices from '@services/OrderServices';
import RecentOrder from '@pages/user/recent-order';
import { SidebarContext } from '@context/SidebarContext';
import Loading from '@component/preloader/Loading';
import { useLogout } from '@hooks/useLogout';
// import { signOut, useSession } from "next-auth/react";

const Dashboard = ({ title, description, children }) => {
  const router = useRouter();
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);
  const { isLoading, setIsLoading, currentPage } = useContext(SidebarContext);
  const { handleLogOut } = useLogout();
  // const { status } = useSession();

  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderServices.getOrderByUser({
      page: currentPage,
      limit: 8,
    })
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  }, [currentPage]);

  // const handleLogOut = () => {
  //   dispatch({ type: 'USER_LOGOUT' });
  //   dispatch({ type: 'SAVE_ISLOGGER', payload:false});
  //   Cookies.remove('userInfo');
  //   Cookies.remove('couponInfo');
  //   router.push('/');
  // };

  console.log('dashbaord');

  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
  }, [userInfo]);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout title={title ? title : 'Dashboard'} description={description ? description : 'This is User Dashboard'}>
          <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
              <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
                <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
                  {userSidebar.map(item => {
                    if (userInfo?.user.is_merchant && item.title === 'Become Seller') {
                      return null;
                    } else if (
                      !userInfo?.user.is_merchant &&
                      (item.title === 'Shops' || item.title === 'Generic Product' || item.title === 'All Generic Products')
                    ) {
                      return null;
                    } else {
                      return (
                        <span
                          key={item.title}
                          className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                        >
                          <item.icon className="flex-shrink-0 h-4 w-4" aria-hidden="true" />
                          <Link href={item.href}>
                            <a className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                              {item.title}
                            </a>
                          </Link>
                        </span>
                      );
                    }
                  })}
                  <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                    <span className="mr-2">
                      <IoLockOpenOutline />
                    </span>{' '}
                    <button
                      onClick={handleLogOut}
                      className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600"
                    >
                      Logout
                    </button>
                  </span>
                </div>
              </div>
              <div className="hidden w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
                {!children && (
                  <div className="overflow-hidden">
                    <h2 className="text-xl font-serif font-semibold mb-5">Dashboard</h2>
                    <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                      <Card title="Total Order" Icon={FiShoppingCart} quantity={data?.totalDoc} className="text-red-600  bg-red-200" />
                      <Card title="Pending Order" Icon={FiRefreshCw} quantity={data?.pending} className="text-orange-600 bg-orange-200" />
                      <Card title="Processing Order" Icon={FiTruck} quantity={data?.processing} className="text-indigo-600 bg-indigo-200" />
                      <Card title="Complete Order" Icon={FiCheck} quantity={data?.delivered} className="text-emerald-600 bg-emerald-200" />
                    </div>
                    <RecentOrder data={data} loading={loading} error={error} />
                  </div>
                )}
                {children}
              </div>
              <div className=" w-full space-y-5  lg:mt-0 px-4 sm:px-5 lg:px-8 rounded-md overflow-hidden">
                <h2 className='text-[#183D1D] text-[24px]'>Today’s summary</h2>
                {/* Cards */}
                <div className='flex flex-wrap justify-between'>
                  <div className='rounded-[5px] basis-1/2 md:basis-auto bg-white p-5 '>
                    <h3 className='text-[24px] font-bold text-black'>05</h3>
                    <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                  </div>
                  <div className='rounded-[5px] basis-1/2 md:basis-auto bg-white p-5 '>
                    <h3 className='text-[24px] font-bold text-black'>05</h3>
                    <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                  </div>
                  <div className='rounded-[5px] basis-1/2 md:basis-auto bg-white p-5 '>
                    <h3 className='text-[24px] font-bold text-black'>05</h3>
                    <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                  </div>
                  <div className='rounded-[5px] basis-1/2 md:basis-auto bg-white p-5 '>
                    <h3 className='text-[24px] font-bold text-black'>05</h3>
                    <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                  </div>
                </div>

                {/* New Orders */}
                <div className='rounded-[5px]  bg-white p-2 '>
                  <h3 className='text-[#738075] font-bold text-[18px]'>New orders</h3>
                  <div className='flex flex-wrap justify-between'>
                    <div className='basis-auto md:basis-1/2  py-2 flex justify-between items-center '>
                      <div className='flex space-x-3  justify-start items-center'>
                        <div className='h-[95px] w-[95px] bg-black flex justify-center items-center'>1</div>
                        <div className='space-y-4'>
                          <h3 className='text-[#183D1D] text-[15px] font-bold'>Medium macabo (15)</h3>
                          <h6 className='text-[#8E9990] text-[12px]'>#order3254</h6>
                        </div>
                      </div>
                      <div className='flex justify-between px-3 space-x-5'>
                        <div className='h-[40px] w-[40px] bg-[#FCEAEA] rounded-[15px] flex justify-center items-center'>1</div>
                        <div className='h-[40px] w-[40px] bg-[#eaf7ee] rounded-[15px] flex justify-center items-center'>2</div>
                      </div>
                    </div>
                    <div className='basis-auto md:basis-1/2 py-2 flex justify-between items-center '>
                      <div className='flex space-x-3  justify-start items-center'>
                        <div className='h-[95px] w-[95px] bg-black flex justify-center items-center'>1</div>
                        <div className='space-y-4'>
                          <h3 className='text-[#183D1D] text-[15px] font-bold'>Medium macabo (15)</h3>
                          <h6 className='text-[#8E9990] text-[12px]'>#order3254</h6>
                        </div>
                      </div>
                      <div className='flex justify-between px-3 space-x-5'>
                        <div className='h-[40px] w-[40px] bg-[#FCEAEA] rounded-[15px] flex justify-center items-center'>1</div>
                        <div className='h-[40px] w-[40px] bg-[#eaf7ee] rounded-[15px] flex justify-center items-center'>2</div>
                      </div>
                    </div>
                    <div className='basis-auto md:basis-1/2 py-2 flex justify-between items-center '>
                      <div className='flex space-x-3  justify-start items-center'>
                        <div className='h-[95px] w-[95px] bg-black flex justify-center items-center'>1</div>
                        <div className='space-y-4'>
                          <h3 className='text-[#183D1D] text-[15px] font-bold'>Medium macabo (15)</h3>
                          <h6 className='text-[#8E9990] text-[12px]'>#order3254</h6>
                        </div>
                      </div>
                      <div className='flex justify-between px-3 space-x-5'>
                        <div className='h-[40px] w-[40px] bg-[#FCEAEA] rounded-[15px] flex justify-center items-center'>1</div>
                        <div className='h-[40px] w-[40px] bg-[#eaf7ee] rounded-[15px] flex justify-center items-center'>2</div>
                      </div>
                    </div>
                    <div className='basis-auto md:basis-1/2 py-2 flex justify-between items-center '>
                      <div className='flex space-x-3  justify-start items-center'>
                        <div className='h-[95px] w-[95px] bg-black flex justify-center items-center'>1</div>
                        <div className='space-y-4'>
                          <h3 className='text-[#183D1D] text-[15px] font-bold'>Medium macabo (15)</h3>
                          <h6 className='text-[#8E9990] text-[12px]'>#order3254</h6>
                        </div>
                      </div>
                      <div className='flex justify-between px-3 space-x-5'>
                        <div className='h-[40px] w-[40px] bg-[#FCEAEA] rounded-[15px] flex justify-center items-center'>1</div>
                        <div className='h-[40px] w-[40px] bg-[#eaf7ee] rounded-[15px] flex justify-center items-center'>2</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sales summary */}
                <div className='rounded-[5px]  bg-white p-2 '>
                  <h3 className='text-[#738075] font-bold text-[18px]'>Sales summary</h3>
                  <div className='block md:flex mt-4 md:space-x-3 space-y-3 md:space-y-0 justify-between'>
                    <div className='basis-1/2  space-y-3 '>
                      <div className='flex justify-between items-center'>
                        <div className=''>
                          <h3 className='text-[24px] text-[#183D1D] font-bold'>Total sales </h3>
                          <h6 className='text-[#414D43] text-[18px]'>since Dec 27, 2022</h6>
                        </div>
                        <div className='-space-y-2 items-center'>
                          <h3 className='text-[24px] pr-9 -mb-6 text-[#183D1D] font-bold'>520 000</h3>
                          <h6 className='text-[#183D1D] -mt-[30px] flex justify-end items-end font-bold text-[18px]'>XAF</h6>
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <div className='flex space-x-2 justify-between '>
                          <div className='rounded-[2px] h-[122px] basis-1/2 shadow-md bg-[#008069] p-5 '>
                            <h3 className='text-[24px] font-bold text-black'>05</h3>
                            <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                          </div>
                          <div className='rounded-[2px] h-[122px] basis-1/2  shadow-md bg-[#02512B] p-5 '>
                            <h3 className='text-[24px] font-bold text-black'>05</h3>
                            <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                          </div>
                        </div>
                        <div className='flex space-x-2 justify-between '>
                          <div className='rounded-[2px] h-[122px] basis-1/2 shadow-md bg-[#2EBD56] p-5 '>
                            <h3 className='text-[24px] font-bold text-black'>05</h3>
                            <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                          </div>
                          <div className='rounded-[2px] h-[122px] basis-1/2  shadow-md bg-[#288A36] p-5 '>
                            <h3 className='text-[24px] font-bold text-black'>05</h3>
                            <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='basis-1/2 bg-red-300 flex'>2</div>
                  </div>
                </div>
                {/* Orders summary */}
                <div className='rounded-[5px]  bg-white p-2 '>
                  <h3 className='text-[#738075] font-bold text-[18px]'>Orders summary</h3>
                  <div className='block md:flex mt-4 md:space-x-3 space-y-3 md:space-y-0 justify-between'>
                    <div className='basis-1/2  space-y-3 '>
                      <div className='flex justify-between items-center'>
                        <div className=''>
                          <h3 className='text-[24px] text-[#183D1D] font-bold'>Total sales </h3>
                          <h6 className='text-[#414D43] text-[18px]'>since Dec 27, 2022</h6>
                        </div>
                        <div className='-space-y-2 items-center'>
                          <h3 className='text-[24px]  text-[#183D1D] font-bold'>1500</h3>
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <div className='flex space-x-2 justify-between '>
                          <div className='rounded-[2px] h-[122px] basis-1/2 shadow-md bg-[#E9FEF0] p-5 '>
                            <h3 className='text-[24px] font-bold text-black'>05</h3>
                            <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                          </div>
                          <div className='rounded-[2px] h-[122px] basis-1/2  shadow-md bg-[#F9ECEC] p-5 '>
                            <h3 className='text-[24px] font-bold text-black'>05</h3>
                            <h4 className='text-[#738075] text-[18px]'>Unconfirmed orders </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='basis-1/2 bg-red-300 flex'>2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
