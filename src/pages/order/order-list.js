import OrderHistory from "@component/order/OrderHistory";
import { UserContext } from "@context/UserContext";
import Layout from "@layout/Layout";
import OrderServices from "@services/OrderServices";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect, useState } from "react";

const OrderList = () => {
  const [listOrders, setListOrders] = useState([])
  const router = useRouter();
  const { locale } = useRouter();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    console.log(locale)
    console.log(JSON.parse(Cookies.get("userInfo")))
    const email = JSON.parse(Cookies.get("userInfo")).user.email
    OrderServices.getOrderByUser(email)
      .then((response) => {
        console.log(response.data)
        setListOrders(response.data)
      })
  }, [])

  const goPurchaseProgress = (id) => {
    router.push(`/order/purchaseProgress/?order=${id}`);
  }
  return (
    <Layout>
      <div className="p-[30px] bg-white">
        <div className="flex w-full h-full">
          <div className="basis-1/3  bg-white items-start">
            <h2 className="text-black flex font-bold  items-center text-[33px]">Filters</h2>

            <div className="pl-[30px] my-10">
              <h2 className="text-black mb-3 flex font-bold  items-center text-[28px]">Status</h2>

              <div className="space-y-[10px]">
                <div className="flex  space-x-2">
                  <inpupt type="checkbox" className="border-1 h-[15px] w-[15px] border-black " />
                  <h3 className="flex items-center text-[15px]">All</h3>
                </div>
                <div className="flex  space-x-2">
                  <inpupt type="checkbox" className="border-1 h-[15px] w-[15px] border-black " />
                  <h3 className="flex items-center text-[15px]">In the farm</h3>
                </div>
                <div className="flex  space-x-2">
                  <inpupt type="checkbox" className="border-1 h-[15px] w-[15px] border-black " />
                  <h3 className="flex items-center text-[15px]">On the way</h3>
                </div>
                <div className="flex  space-x-2">
                  <inpupt type="checkbox" className="border-1 h-[15px] w-[15px] border-black " />
                  <h3 className="flex items-center text-[15px]">Done</h3>
                </div>
              </div>
            </div>

            <div className="pl-[30px] my-10">
              <h2 className="text-black mb-3 flex font-bold  items-center text-[28px]">Date</h2>

              <div className="space-y-[10px]">
                <div className="flex  space-x-2">
                  <inpupt type="checkbox" className="border-1 h-[15px] w-[15px] border-black " />
                  <h3 className="flex items-center text-[15px]">increase</h3>
                </div>
                <div className="flex  space-x-2">
                  <inpupt type="checkbox" value="" className="border-1 h-[15px] w-[15px] border-black " />
                  <h3 className="flex items-center text-[15px]">Decrease</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-2/3 ">
            <h2 className="text-black flex font-bold  items-center text-[33px]">My  Orders</h2>
            <h2 className="text-black/70 flex pb-[20px] font-bold  items-center text-[24px]">{listOrders.length} Order(s)</h2>

            {listOrders?.map((order) => (
              <div className="">
                <div className="flex pb-[10px] space-x-2  justify-between">
                  <div className="w-full h-1 bg-[#288A36]"></div>
                  <div style={order.attributes.deliveries.data[0].attributes.status !== "packaging" ? { backgroundColor: "#288A36" } : { backgroundColor: "#D9D9D9" }}
                    className="w-full h-1 "></div>
                  <div style={order.attributes.deliveries.data[0].attributes.status !== "pending" && order.attributes.deliveries.data[0].attributes.status !== "packaging" ? { backgroundColor: "#288A36" } : { backgroundColor: "#D9D9D9" }}
                    className="w-full h-1 "></div>
                  <div style={order.attributes.deliveries.data[0].attributes.status === "successful" ? { backgroundColor: "#288A36" } : { backgroundColor: "#D9D9D9" }}
                    className="w-full h-1 "></div>
                  <div style={order.attributes.deliveries.data[0].attributes.status !== "successful" && order.attributes.deliveries.data[0].attributes.status !== "pending" && order.attributes.deliveries.data[0].attributes.status !== "shipping" && order.attributes.deliveries.data[0].attributes.status !== "packaging" ? { backgroundColor: "#288A36" } : { backgroundColor: "#D9D9D9" }}
                    className="w-full h-1"></div>
                </div>
                <h2 className="text-wrap font-regular text-black">{order.attributes.deliveries.data[0].attributes.status === "packaging" ? "The farm is preparing your order"
                  : order.attributes.deliveries.data[0].attributes.status === "pending" ? "Logistics is on its way to pick up"
                    : order.attributes.deliveries.data[0].attributes.status === "shipping" ? "Logistics has been handed product by farmer" :
                      order.attributes.deliveries.data[0].attributes.status === "successful" ? "we are on our way to you" : "Delivery done"}</h2>
                <div className="flex justify-between items-center">
                  <div className="flex basis-1/2 justify-start my-[5px] items-center">
                    <div className="hidden md:flex space-x-2 justify-start items-start">
                      <img className="h-[100px]"
                        src={order.attributes?.order_details.data[0].attributes.product.data.attributes.assets.data[0].attributes.path.data.attributes.formats.medium.url}
                        alt='orange'
                        layout="responsive"
                        width={100}
                        height={100}
                        priority
                      ></img>
                      <div>
                        <h6 className="text-[#000]/50 ">{order.attributes?.order_details.data[0].attributes.product.data.attributes.description}
                        </h6>
                        <h6 className="text-[#EF7D0A]/50 ">Quantity: {order.attributes?.deliveries.data[0].attributes.quantity}
                        </h6>
                      </div>
                    </div>

                  </div>
                  <div className="">
                    <div onClick={() => goPurchaseProgress(order.id)} className=" flex items-center space-x-1 underline justify-center">
                      <h3>view order details</h3>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.65614 2.17422L12.9749 8.47422C13.0499 8.54922 13.1031 8.63047 13.1346 8.71797C13.1661 8.80547 13.1816 8.89922 13.1811 8.99922C13.1811 9.09922 13.1656 9.19297 13.1346 9.28047C13.1036 9.36797 13.0504 9.44922 12.9749 9.52422L6.65614 15.843C6.48114 16.018 6.26239 16.1055 5.99989 16.1055C5.73739 16.1055 5.51239 16.0117 5.32489 15.8242C5.13739 15.6367 5.04364 15.418 5.04364 15.168C5.04364 14.918 5.13739 14.6992 5.32489 14.5117L10.8374 8.99922L5.32489 3.48672C5.14989 3.31172 5.06239 3.09597 5.06239 2.83947C5.06239 2.58297 5.15614 2.36122 5.34364 2.17422C5.53114 1.98672 5.74989 1.89297 5.99989 1.89297C6.24989 1.89297 6.46864 1.98672 6.65614 2.17422Z" fill="#183D1D" />
                      </svg>

                    </div>
                    <button className=" w-full  md:w-auto bg-[#288A36] py-1 h-[30px] px-7 rounded-[4px] text-white text[24px] font-semibold">Reoder the item </button>

                  </div>
                </div>
                <div className="bg-[#979797] h-[1px]"></div>
              </div>
            ))

            }
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default OrderList;