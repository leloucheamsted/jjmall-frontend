import {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {IoAlertOutline, IoBagHandle} from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import Cookies from 'js-cookie';

//internal import
import useAsync from '@hooks/useAsync';
import Dashboard from '@pages/user/dashboard';
import ShopServices from '@services/ShopServices';
import Loading from '@component/preloader/Loading';
import {UserContext} from '@context/UserContext';

import OrderHistory from '@component/order/OrderHistory';
import {SidebarContext} from '@context/SidebarContext';
import {FiDelete, FiEdit3, FiPlus, FiTrash2} from 'react-icons/fi';
import UpdateShopModal from '@component/modal/UpdateShopModal';
import DeleteShopModal from '@component/modal/DeleteShopModal';
import ShopList from '@component/shop/ShopList';
import SellerServices from '@services/SellerServices';
import dayjs from 'dayjs';

const ListShops = () => {
  const router = useRouter();
  const {
    dispatch,
    state: {userInfo, listShop,listOrderShop, shopInfo},
  } = useContext(UserContext);

  const {currentPage, handleChangePage, isLoading, setIsLoading} = useContext(SidebarContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUpdateShop, setShowUpdateShop] = useState(false);
  const [showDeleteShop, setShowDeleteShop] = useState(false);
  const [shopbyId, setShopbyId] = useState({});

  const shopMoreInfo = shop => {
    router.push(`/shop/${shop.id}`);
    setIsLoading(!isLoading);
  };

  // const ConnectShop = shop => {
  //   const cookieTimeOut = 0.5;
  //   dispatch({type: 'SHOP_CONNECTED', payload: shop});
  //   Cookies.set('shopInfo', JSON.stringify(shop), {
  //     expires: cookieTimeOut,
  //   });
  //   shopMoreInfo(shop);
  //   // if (shop.attributes.status === "close"){
  //   //   const shopData = {"data":{"status":"open"}}
  //   //   listShop?.data?.forEach((e)=>{
  //   //     if (e.id == shop.id) e.attributes.status = 'open'
  //   //     if (shopInfo){
  //   //       if (e.id == shopInfo.id) e.attributes.status = 'close'
  //   //     }
  //   //   });
  //   //   ShopServices.updateShop(shop?.id,shopData).then((res) => {
  //   //     dispatch({type:'SHOP_CONNECTED',payload:shop});
  //   //     Cookies.set('shopInfo', JSON.stringify(shop), {
  //   //       expires: cookieTimeOut,
  //   //     })
  //   //   })
  //   //   .catch((err) => {
  //   //     setError(err.message);
  //   //   });

  //   // }
  //   // else{
  //   //   const shopData = {"data":{"status":"close"}}
  //   //   listShop.data.forEach((e)=>{
  //   //     if (e.id == shop.id) e.attributes.status = 'close'
  //   //   });
  //   //   ShopServices.updateShop(shop?.id,shopData).then((res) => {
  //   //     dispatch({type:'SHOP_CONNECTED',payload:null});
  //   //   })
  //   //   .catch((err) => {
  //   //     setError(err.message);
  //   //   });

  //   // }
  // };

  useEffect(() => {
    // ShopServices.getShopByUser({
    //   page: currentPage,
    //   limit: 8,
    // })
    SellerServices.getOrderSellerByUser(userInfo ? userInfo.user.id : null)
      .then(res => {
        if (res.data.length > 0) {
          console.log('val order',res.data);
          setData(res.data[0].attributes.orders);
          dispatch({type: 'LIST_ORDERSHOP_SELLER', payload: res.data[0].attributes?.user?.data?.attributes?.orders});
        } else {
          console.log('val order res',res);
          setData(res);
          dispatch({type: 'LIST_ORDERSHOP_SELLER', payload: res});
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.log('error order:',err)
        setLoading(false);
        setError(err.message);
      });
  }, [currentPage]);

  const pageCount = Math.ceil(data?.totalDoc / 8);

  useEffect(() => {
    setIsLoading(false);
    if (!userInfo?.user?.is_merchant) {
      router.push('/');
    }
  }, [userInfo]);
  if (!userInfo?.user?.is_merchant) {
    return null;
  }

  return (
    <>
      {showUpdateShop && <UpdateShopModal modalOpen={showUpdateShop} setModalOpen={setShowUpdateShop} data={shopbyId} setData={setData} />}
      {showDeleteShop && <DeleteShopModal modalOpen={showDeleteShop} setModalOpen={setShowDeleteShop} data={shopbyId} setData={setData} />}
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Dashboard title="List Shops" description="This is user shops page">
          <div className="overflow-hidden rounded-md font-serif">
            {loading ? (
              <Loading loading={loading} />
            ) : error ? (
              <h2 className="text-xl text-center my-10 mx-auto w-11/12 text-red-400">{error}</h2>
            ) : data?.length === 0 ? (
              <div className="text-center">
                <span className="flex justify-center my-30 pt-16 text-primary font-semibold text-6xl">
                  <IoBagHandle />
                </span>
                <h2 className="font-medium text-md my-4 text-gray-600">You Have no shop Yet!</h2>
              </div>
            ) : (
              <div className="flex flex-col">
                <h2 className="text-xl font-serif font-semibold mb-5">Shop Orders</h2>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                      {/* <button
                        onClick={() => {
                          console.log('rien')
                          // router.push('/shop/shops');
                        }}
                        style={{marginBottom: 5}}
                        className="float-right leading-4 inline-flex items-center cursor-pointer
                         transition ease-in-out duration-300 font-semibold text-center justify-center
                          border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none
                           focus:outline-none bg-primary text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 
                           mt-6 hover:text-white hover:bg-emerald-600 h-10 text-sm lg:text-base w-40 sm:w-40"
                      >
                        <FiPlus />
                        Orders
                      </button> */}

                      <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr className="bg-gray-100">
                            <th
                              scope="col"
                              className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                            >
                              Code
                            </th>

                            <th
                              scope="col"
                              className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                            >
                              Nbre Products
                            </th>
                            <th
                              scope="col"
                              className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                            >
                              Quantity
                            </th>

                            <th
                              scope="col"
                              className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                            >
                              Recipient
                            </th>
                            <th
                              scope="col"
                              className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                            >
                              status
                            </th>
                            <th
                              scope="col"
                              className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                            >
                              creation Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {listOrderShop?.data?.map(order => (
                            <tr className="cursor-pointer " key={order.id}>
                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                              <span className="text-sm">{order.attributes.code ?? 0}</span>
                            </td>
                            <td onClick={() => console.log('')} className="px-5 py-3 leading-6 whitespace-nowrap">
                              {/* {'null'} */}
                              <span className="uppercase text-sm font-medium">{order.attributes.order_details.data.length}</span>
                            </td>
                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                              <span className="text-sm">{order.attributes.quantity ?? 0}</span>
                            </td>

                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                              <span className="text-sm">{order.attributes.total_amount}</span>
                            </td>
                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                              <span className="text-sm font-bold">{order.attributes.recipient}</span>
                            </td>
                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                              {order.attributes.status === "close" && <span className="text-primary">{order.attributes.status}</span>}
                              {order.attributes.status === "pending" && <span className="text-orange-500">{order.attributes.status}</span>}
                              {order.attributes.status === "cancel" && <span className="text-red-500">{order.attributes.status}</span>}
                              {order.attributes.status === "new" && <span className="text-indigo-500">{order.attributes.status}</span>}
                            </td>
                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                              <span className="text-sm">{dayjs(order.attributes.createdAt).format("MMMM D, YYYY")}</span>
                            </td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="paginationOrder">
                        {/* <ReactPaginate
                          breakLabel="..."
                          nextLabel="Next"
                          onPageChange={(e) => handleChangePage(e.selected + 1)}
                          pageRangeDisplayed={3}
                          pageCount={pageCount}
                          previousLabel="Previous"
                          renderOnZeroPageCount={null}
                          pageClassName="page--item"
                          pageLinkClassName="page--link"
                          previousClassName="page-item"
                          previousLinkClassName="page-previous-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-next-link"
                          breakClassName="page--item"
                          breakLinkClassName="page--link"
                          containerClassName="pagination"
                          activeClassName="activePagination"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dashboard>
      )}
    </>
  );
};

export default ListShops;
