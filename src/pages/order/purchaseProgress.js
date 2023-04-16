import Layout from "@layout/Layout"
import OrderServices from "@services/OrderServices"
import { useEffect, useState } from "react"
import FeedBack from "../../component/order/user/feedback"
import qs from 'qs';
import Loading from "@component/preloader/Loading"
import dayjs from "dayjs"
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "@utils/toast";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
const Steps = {
    step1: "packaging",
    step2: "pending",
    step3: "shipping",
    step4: "successful"
}
const PurchaseProgress = (props) => {
    const [queryParameters] = new URLSearchParams(globalThis.window?.location.search)
    const [order, setOrder] = useState(0)
    const [step, setStep] = useState('')
    const [data, setData] = useState({})
    const [name, setName] = useState('')
    const [onglet, setOnglet] = useState('delivery')
    const [dateCreation, setDateCreation] = useState('')
    const [loading, setLoading] = useState(false)
    const [order_detail, setOrder_details] = useState(0)

    const [showLayout, setShowLayout] = useState(true);
    const [windowWidth, setWindowWidth] = useState(null);

    const isWindow = typeof window !== 'undefined';

    const getWidth = () => isWindow ? window.innerWidth : windowWidth;

    const resize = () => setWindowWidth(getWidth());

    useEffect(() => {
        if (isWindow) {
            setWindowWidth(getWidth());
            if (getWidth() <= 765) {
                setShowLayout(false);
            }
            else {
                setShowLayout(true)
            }
            window.addEventListener('resize', resize);
            console.log(windowWidth)
            return () => window.removeEventListener('resize', resize);
        }
    });

    useEffect(() => {
        setOrder(queryParameters[1])
        OrderServices.getOrderById(queryParameters[1])
            .then((response) => {
                setStep(response.data.data.attributes?.deliveries.data[0].attributes.status)
                setOrder_details(response.data.data.attributes.order_details.data[0].id)
                setData(response.data.data)
                setDateCreation(dayjs(response.data.data.attributes.createdAt).format("MMMM D, YYYY"))
                setName(response.data.data.attributes.order_details.data[0].attributes.name)
                console.log(response)
            })
    }, [step])


    return (
        <> {step == '' ? (<Loading loading={true} />)
            : (
                <>
                    {showLayout == true ? (< Layout title="Purchase" description="Page Purchase progress">
                        <ToastContainer />
                        <div className="md:px-2 xl:px-[39px] bg-white md:py-[27px]">
                            <BreadCrumb orderName={name} />
                            <div className="flex justify-start my-[50px] items-center">
                                <div className="hidden md:flex space-x-2 justify-start items-start">
                                    <img className="h-[100px]"
                                        src={data.attributes?.order_details.data[0].attributes.product.data.attributes.assets.data[0].attributes.path.data.attributes.formats.medium.url}
                                        alt='orange'
                                        layout="responsive"
                                        width={100}
                                        height={100}
                                        priority
                                    ></img>
                                    <div>
                                        <h6 className="text-[#000]/50 ">{data.attributes?.order_details.data[0].attributes.product.data.attributes.description}
                                        </h6>
                                        <h6 className="text-[#EF7D0A]/50 ">Quantity: {data.attributes?.deliveries.data[0].attributes.quantity}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-black font-semibold text-[30px]">Delivery Details</h2>

                            <div className=" py-10 flex justify-start space-x-[15px]">
                                <h2 className="text-black font-semibold text-[30px]">Estimate delivery Date: </h2>
                                <div className="flex space-x-[10px] justify-start items-center">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6667 4.66683V3.50016C18.6667 2.8585 19.1917 2.3335 19.8333 2.3335C20.475 2.3335 21 2.8585 21 3.50016V4.66683H22.1667C23.45 4.66683 24.5 5.71683 24.5 7.00016V23.3335C24.5 24.6168 23.45 25.6668 22.1667 25.6668H5.83333C4.53833 25.6668 3.5 24.6168 3.5 23.3335L3.51167 7.00016C3.51167 5.71683 4.53833 4.66683 5.83333 4.66683H7V3.50016C7 2.8585 7.525 2.3335 8.16667 2.3335C8.80833 2.3335 9.33333 2.8585 9.33333 3.50016V4.66683H18.6667ZM15.1667 15.1668H18.6667C19.3083 15.1668 19.8333 15.6918 19.8333 16.3335V19.8335C19.8333 20.4752 19.3083 21.0002 18.6667 21.0002H15.1667C14.525 21.0002 14 20.4752 14 19.8335V16.3335C14 15.6918 14.525 15.1668 15.1667 15.1668ZM22.1667 9.3335H5.83333V7.00016H22.1667V9.3335ZM7 23.3335H21C21.6417 23.3335 22.1667 22.8562 22.1667 22.2729V11.6668H5.83333V22.2729C5.83333 22.8562 6.35833 23.3335 7 23.3335Z" fill="#37474F" />
                                    </svg>

                                    <h2 className="text-black text-[32px]">{data.attributes?.estimate_duration ?? "No estimate"}</h2>
                                </div>
                            </div>

                            {onglet == 'delivery' ? <ProgressStatut idOrder={order} showLayout={showLayout} createdAt={dateCreation} step={step} /> : <FeedBack order_detail={order_detail} />}
                            <Footer data={data} />
                        </div>
                    </Layout >) :
                        <>
                            <Layout>
                                <ToastContainer />
                                <div className="px-2 xl:px-[39px] bg-white py-[27px]">
                                    <div className="flex mb-[30px] space-x-[18px] justify-start items-center">
                                        <svg onClick={() => router.back()} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.7912 11.3156C19.3412 11.3156 19.7912 11.7656 19.7912 12.3156C19.7912 12.8656 19.3412 13.3156 18.7912 13.3156H7.62124L12.4912 18.2056C12.8812 18.5956 12.8812 19.2256 12.4912 19.6156C12.3044 19.8029 12.0508 19.9081 11.7862 19.9081C11.5217 19.9081 11.2681 19.8029 11.0812 19.6156L4.50124 13.0156C4.11124 12.6256 4.11124 11.9956 4.50124 11.6056L11.0912 5.01564C11.4812 4.62564 12.1112 4.62564 12.5012 5.01564C12.8912 5.40564 12.8912 6.04564 12.5012 6.43564L7.62124 11.3156H18.7912Z" fill="#37474F" />
                                        </svg>
                                        <h2 className="text-black font-semibold text-[20px]">Delivery Details</h2>
                                    </div>
                                    <div className="flex justify-start my-[20px] items-center">
                                        <div className="flex space-x-2 justify-start items-start">
                                            <img className="h-[100px]"
                                                src={data.attributes?.order_details.data[0].attributes.product.data.attributes.assets.data[0].attributes.path.data.attributes.formats.medium.url}
                                                alt='orange'
                                                layout="responsive"
                                                width={100}
                                                height={100}
                                                priority
                                            ></img>
                                            <div>
                                                <h6 className="text-[#000]/50 ">{data.attributes?.order_details.data[0].attributes.product.data.attributes.description}
                                                </h6>
                                                <h6 className="text-[#EF7D0A]/50 ">Quantity: {data.attributes?.deliveries.data[0].attributes.quantity}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="text-black font-semibold text-[20px]">Delivery Details</h2>

                                    <div className=" py-2 pb-5 flex flex-wrap justify-start ">
                                        <h2 className="text-black font-semibold text-[20px]">Estimate delivery Date: </h2>
                                        <div className="flex space-x-[10px] justify-start items-center">
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6667 4.66683V3.50016C18.6667 2.8585 19.1917 2.3335 19.8333 2.3335C20.475 2.3335 21 2.8585 21 3.50016V4.66683H22.1667C23.45 4.66683 24.5 5.71683 24.5 7.00016V23.3335C24.5 24.6168 23.45 25.6668 22.1667 25.6668H5.83333C4.53833 25.6668 3.5 24.6168 3.5 23.3335L3.51167 7.00016C3.51167 5.71683 4.53833 4.66683 5.83333 4.66683H7V3.50016C7 2.8585 7.525 2.3335 8.16667 2.3335C8.80833 2.3335 9.33333 2.8585 9.33333 3.50016V4.66683H18.6667ZM15.1667 15.1668H18.6667C19.3083 15.1668 19.8333 15.6918 19.8333 16.3335V19.8335C19.8333 20.4752 19.3083 21.0002 18.6667 21.0002H15.1667C14.525 21.0002 14 20.4752 14 19.8335V16.3335C14 15.6918 14.525 15.1668 15.1667 15.1668ZM22.1667 9.3335H5.83333V7.00016H22.1667V9.3335ZM7 23.3335H21C21.6417 23.3335 22.1667 22.8562 22.1667 22.2729V11.6668H5.83333V22.2729C5.83333 22.8562 6.35833 23.3335 7 23.3335Z" fill="#37474F" />
                                            </svg>

                                            <h2 className="text-black text-[20px]">{data.attributes?.estimate_duration ?? "No estimate"}</h2>
                                        </div>
                                    </div>

                                    {onglet == 'delivery' ? <ProgressStatut idOrder={order} showLayout={showLayout} createdAt={dateCreation} step={step} /> : <FeedBack order_detail={order_detail} />}
                                    <div className="block  md:hidden   mt-[32px]">
                                        <h2 className=" w-full text-[#000]/30 text-[15px]"> {step === Steps.step1 ? "The farm is preparing you order" : step === Steps.step2 ? "Logistics is on its way for pickUp" : step === Steps.step3 ? "logistics has been handed product by farmer" : step === Steps.step4 ? "we are on our way to you" : "Delivery Done"}</h2>
                                    </div>
                                    <Footer data={data} />

                                </div>
                            </Layout>
                        </>
                    }
                </>
            )
        }
        </>
    )
}

// --- BreadCrumb
const BreadCrumb = ({ orderName }) => {
    return (
        <div className="flex items-center pb-4">
            <ol className="flex items-center w-full overflow-hidden font-serif">
                <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                </li>
                <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold ">
                    <Link
                        href={`/shop/list-shops`}
                    >
                        <a>{"Orders"}</a>
                    </Link>
                </li>

                <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                </li>
                <li className="text-sm px-1 transition duration-200 ease-in ">
                    {orderName}
                </li>
            </ol>
        </div>
    )
}

//--- Progress Statut
const ProgressStatut = ({ idOrder, step, createdAt, showLayout }) => {
    return (
        <>
            <div className="px-0 py-10">


                <div className="flex px-[5px] md:px-[15px]  justify-center  relative items-start ">
                    <div style={step !== Steps.step1 ? { backgroundColor: "#FFEDD5" } : { backgroundColor: "#F7F7F7" }}
                        className="w-full relative h-[10px] md:h-[14px]">as
                    </div>
                    <div style={step === Steps.step3 || step === Steps.step4 || step === Steps.step5 ? { backgroundColor: "#FFEDD5" } : { backgroundColor: "#F7F7F7" }} className=" w-full relative h-[10px] md:h-[14px]">as
                    </div>

                    <div style={step === Steps.step4 || step === Steps.step5 ? { backgroundColor: "#FFEDD5" } : { backgroundColor: "#F7F7F7" }} className=" w-full relative h-[10px] md:h-[14px]">as
                    </div>

                    <div style={step === Steps.step5 ? { backgroundColor: "#FFEDD5" } : { backgroundColor: "#F7F7F7" }} className=" w-full relative h-[10px] md:h-[14px]">as
                    </div>
                    <div className="flex justify-between absolute left-0 right-0 top-0 bottom-0">
                        <div className="    left-0 -mt-5 md:-mt-8 -ml-0 h-[55px] md:h-[77px] w-[55px] md:w-[77px] rounded-[55px] md:rounded-[77px] bg-[#FFEDD5]  flex items-center justify-center">
                            {step === Steps.step1 ? (
                                <>
                                    <div className=" flex absolute  h-[85px] md:h-[117px] w-[85px] md:w-[117px] rounded-[85px] md:rounded-[117px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  items-center justify-center">
                                        <div className="absolute  h-[30px] md:h-[100px] w-[30px] md:w-[100px] rounded-[70px] md:rounded-[100px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px] flex items-center justify-center">
                                            <img className="h-[30px] md:h-[80px]"
                                                src='/guy.png'
                                                alt='orange'
                                                layout="responsive"
                                                width={60}
                                                height={85}
                                                priority
                                            ></img>
                                        </div>
                                        <div className="bg-[#24893A] w-4 h-4  absolute top-[10px] left-[70px]  md:top-[10px]  md:left-[100px] z-20 flex justify-center items-center rounded-xl    ">
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.76368 8.59941L2.8841 6.71982C2.7829 6.61839 2.64551 6.56139 2.50223 6.56139C2.35895 6.56139 2.22155 6.61839 2.12035 6.71982C1.9091 6.93107 1.9091 7.27232 2.12035 7.48357L4.38452 9.74774C4.59577 9.95899 4.93702 9.95899 5.14827 9.74774L10.8791 4.01691C11.0904 3.80566 11.0904 3.46441 10.8791 3.25316C10.7779 3.15173 10.6405 3.09473 10.4972 3.09473C10.3539 3.09473 10.2166 3.15173 10.1154 3.25316L4.76368 8.59941Z" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                </>) :
                                <>
                                    <div className="absolute  flex h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-[70px] md:rounded-[100px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]   items-center justify-center">
                                    </div>
                                </>
                            }
                        </div>
                        <div style={step != Steps.step1 ? { backgroundColor: "#FFEDD5" } : { backgroundColor: "#F7F7F7" }} className="     left-0 -mt-5 md:-mt-8 -ml-0 h-[55px] md:h-[77px] w-[55px] md:w-[77px] rounded-[55px] md:rounded-[77px] bg-[#FFEDD5]  flex items-center justify-center">
                            {step === Steps.step2 ?
                                (
                                    <>

                                        <div className="absolute h-[85px] md:h-[117px] w-[85px] md:w-[117px] rounded-[85px] md:rounded-[117px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">
                                            <div className="absolute  h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-[70px] md:rounded-[100px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">
                                                <img className="h-[80]"
                                                    src='/guy.png'
                                                    alt='orange'
                                                    layout="responsive"
                                                    width={60}
                                                    height={85}
                                                    priority
                                                ></img>
                                            </div>
                                            <div className="bg-[#24893A] w-4 h-4  absolute top-[10px] left-[70px]  md:top-[10px]  md:left-[100px] z-20 flex justify-center items-center rounded-xl    ">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.76368 8.59941L2.8841 6.71982C2.7829 6.61839 2.64551 6.56139 2.50223 6.56139C2.35895 6.56139 2.22155 6.61839 2.12035 6.71982C1.9091 6.93107 1.9091 7.27232 2.12035 7.48357L4.38452 9.74774C4.59577 9.95899 4.93702 9.95899 5.14827 9.74774L10.8791 4.01691C11.0904 3.80566 11.0904 3.46441 10.8791 3.25316C10.7779 3.15173 10.6405 3.09473 10.4972 3.09473C10.3539 3.09473 10.2166 3.15173 10.1154 3.25316L4.76368 8.59941Z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                ) : step === Steps.step1 ? (<></>)
                                    : (<>
                                        <div className="absolute  h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-[70px] md:rounded-[100px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">

                                        </div>
                                    </>)
                            }
                        </div>
                        <div style={step !== Steps.step1 && step !== Steps.step2 ? { backgroundColor: "#FFEDD5" } : { backgroundColor: "#F7F7F7" }} className="    left-0 -mt-5 md:-mt-8 -ml-0 h-[55px] md:h-[77px] w-[55px] md:w-[77px] rounded-[55px] md:rounded-[77px] bg-[#FFEDD5]  flex items-center justify-center">
                            {step === Steps.step3 ?
                                (
                                    <>
                                        <div className="absolute h-[85px] md:h-[117px] w-[85px] md:w-[117px] rounded-[85px] md:rounded-[117px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">
                                            <div className="absolute  h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-[70px] md:rounded-[100px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">
                                                <img className="h-[80]"
                                                    src='/guy.png'
                                                    alt='orange'
                                                    layout="responsive"
                                                    width={60}
                                                    height={85}
                                                    priority
                                                ></img>
                                            </div>
                                            <div className="bg-[#24893A] w-4 h-4  absolute top-[10px] left-[70px]  md:top-[10px]  md:left-[100px] z-20 flex justify-center items-center rounded-xl    ">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.76368 8.59941L2.8841 6.71982C2.7829 6.61839 2.64551 6.56139 2.50223 6.56139C2.35895 6.56139 2.22155 6.61839 2.12035 6.71982C1.9091 6.93107 1.9091 7.27232 2.12035 7.48357L4.38452 9.74774C4.59577 9.95899 4.93702 9.95899 5.14827 9.74774L10.8791 4.01691C11.0904 3.80566 11.0904 3.46441 10.8791 3.25316C10.7779 3.15173 10.6405 3.09473 10.4972 3.09473C10.3539 3.09473 10.2166 3.15173 10.1154 3.25316L4.76368 8.59941Z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                ) : step === Steps.step1 || step === Steps.step2 ? (<></>)
                                    : (<>
                                        <div className="absolute  h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-[70px] md:rounded-[100px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">

                                        </div>
                                    </>)
                            }
                        </div>
                        <div style={step !== Steps.step1 && step !== Steps.step2 && step !== Steps.step3 ? { backgroundColor: "#FFEDD5" } : { backgroundColor: "#F7F7F7" }} className="    left-0 -mt-5 md:-mt-8 -ml-0 h-[55px] md:h-[77px] w-[55px] md:w-[77px] rounded-[55px] md:rounded-[77px] bg-[#FFEDD5]  flex items-center justify-center">
                            {step === Steps.step4 ?
                                (
                                    <>

                                        <div className="absolute h-[85px] md:h-[117px] w-[85px] md:w-[117px] rounded-[85px] md:rounded-[117px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">
                                            <div className="absolute  h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-[70px] md:rounded-[100px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">
                                                <img className="h-[80]"
                                                    src='/guy.png'
                                                    alt='orange'
                                                    layout="responsive"
                                                    width={60}
                                                    height={85}
                                                    priority
                                                ></img>
                                            </div>
                                            <div className="bg-[#24893A] w-4 h-4  absolute top-[10px] left-[70px]  md:top-[10px]  md:left-[100px] z-20 flex justify-center items-center rounded-xl    ">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.76368 8.59941L2.8841 6.71982C2.7829 6.61839 2.64551 6.56139 2.50223 6.56139C2.35895 6.56139 2.22155 6.61839 2.12035 6.71982C1.9091 6.93107 1.9091 7.27232 2.12035 7.48357L4.38452 9.74774C4.59577 9.95899 4.93702 9.95899 5.14827 9.74774L10.8791 4.01691C11.0904 3.80566 11.0904 3.46441 10.8791 3.25316C10.7779 3.15173 10.6405 3.09473 10.4972 3.09473C10.3539 3.09473 10.2166 3.15173 10.1154 3.25316L4.76368 8.59941Z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                ) : step === Steps.step1 || step === Steps.step2 || step === Steps.step3 ? (<></>)
                                    : (<>
                                        <div className="absolute  h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-[70px] md:rounded-[100px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">

                                        </div>
                                    </>)
                            }
                        </div>
                        <div style={step === Steps.step5 ? { backgroundColor: "#FFEDD5" } : { backgroundColor: "#F7F7F7" }} className="    left-0 -mt-5 md:-mt-8 -ml-0 h-[55px] md:h-[77px] w-[55px] md:w-[77px] rounded-[55px] md:rounded-[77px] bg-[#FFEDD5]  flex items-center justify-center">
                            {step === Steps.step5 ?
                                (
                                    <>
                                        <div className="absolute h-[85px] md:h-[117px] w-[85px] md:w-[117px] rounded-[85px] md:rounded-[117px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">
                                            <div className="absolute  h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-[70px] md:rounded-[100px] bg-transparent shadow-lg border-[#FFEDD5] border-[1px]  flex items-center justify-center">
                                                <img className="h-[80]"
                                                    src='/guy.png'
                                                    alt='orange'
                                                    layout="responsive"
                                                    width={60}
                                                    height={85}
                                                    priority
                                                ></img>
                                            </div>
                                            <div className="bg-[#24893A] w-4 h-4  absolute top-[10px] left-[70px]  md:top-[10px]  md:left-[100px] z-20 flex justify-center items-center rounded-xl    ">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.76368 8.59941L2.8841 6.71982C2.7829 6.61839 2.64551 6.56139 2.50223 6.56139C2.35895 6.56139 2.22155 6.61839 2.12035 6.71982C1.9091 6.93107 1.9091 7.27232 2.12035 7.48357L4.38452 9.74774C4.59577 9.95899 4.93702 9.95899 5.14827 9.74774L10.8791 4.01691C11.0904 3.80566 11.0904 3.46441 10.8791 3.25316C10.7779 3.15173 10.6405 3.09473 10.4972 3.09473C10.3539 3.09473 10.2166 3.15173 10.1154 3.25316L4.76368 8.59941Z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                ) : (<></>)

                            }
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex -ml-3 w-full  mt-[122px]   justify-center items-start">
                    <div className=" w-full flex justify-start  relative flex-wrap">
                        <h2 style={step === Steps.step1 ? { color: "#FB7701" } : { color: "#000" }} className="flex  absolute   flex-wrap text-start justify-start items-start text-[15px] xl:text-[20px] py-[11px]">The farm is preparing your <br /> order</h2>
                    </div>
                    <div className="w-full relative">
                        <h2 style={step === Steps.step2 ? { color: "#FB7701" } : { color: "#000" }} className="flex  absolute left-0 justify-center items-start text-center text-[15px] xl:text-[20px] py-[11px]">Logistics is on its way for pickUp</h2>
                    </div>
                    <div className="w-full flex  justify-end">
                        <h2 style={step === Steps.step3 ? { color: "#FB7701" } : { color: "#000" }} className="flex  justify-center items-center text-center text-[15px] xl:text-[20px] py-[11px]">logistics has been handed<br /> product by farmer</h2>
                    </div>
                    <div className="w-full relative">
                        <h2 style={step === Steps.step4 ? { color: "#FB7701" } : { color: "#000" }} className="flex  absolute right-0 justify-end items-start text-center text-[15px]  xl:text-[20px] py-[11px]">we are on our way to you</h2>
                    </div>
                    <div className=" w-full relative">
                        <h2 style={step === Steps.step4 ? { color: "#FB7701" } : { color: "#000" }} className="flex absolute right-0  justify-end items-start text-center text-[15px]  xl:text-[20px] py-[11px]">Delivery Done</h2>
                    </div>
                </div>

            </div>

        </>
    )
}

//--- Checbox
const Checbox = () => {
    return (
        <div className="bg-[#24893A] w-4 h-4 absolute -top-10 left-20  flex justify-center items-center rounded-xl   z-20 ">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.76368 8.59941L2.8841 6.71982C2.7829 6.61839 2.64551 6.56139 2.50223 6.56139C2.35895 6.56139 2.22155 6.61839 2.12035 6.71982C1.9091 6.93107 1.9091 7.27232 2.12035 7.48357L4.38452 9.74774C4.59577 9.95899 4.93702 9.95899 5.14827 9.74774L10.8791 4.01691C11.0904 3.80566 11.0904 3.46441 10.8791 3.25316C10.7779 3.15173 10.6405 3.09473 10.4972 3.09473C10.3539 3.09473 10.2166 3.15173 10.1154 3.25316L4.76368 8.59941Z" fill="white" />
            </svg>
        </div>
    )
}
//--- Footer
const Footer = ({ idOrder, createdAt, data }) => {
    const router = useRouter();
    const cancelOrder = () => {
        const data = {
            "data.status": "cancel"
        }
        var body = qs.stringify(data);
        OrderServices.cancelOrder(idOrder, body)
            .then((response) => {
                notifySuccess("Your command was canceled")
                router.back();
                console.log(response)
            })
            .catch(e => {
                notifyError("An error has occurred")
                console.log(e)
            })
    }
    return (
        <div className="mt-10 md:mt-0">
            <h2 className="text-black  font-semibold text-[20px]">Order Summary</h2>
            <div className="block md:flex  py-5  items-start space-x-0 md:space-x-20 ">

                <div className="space-y-[10px] basis-1/2 flex flex-col justify-center">
                    <div className="flex justify-between">
                        <h2 className="text-[#37474F] text-[15px]">Quantity</h2>
                        <h2 className="text-[#37474F] text-[15px]">{data.attributes?.deliveries.data[0].attributes.quantity}</h2>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-[#37474F] text-[15px]">Subtotal</h2>
                        <h2 className="text-[#37474F] text-[15px]">{data.attributes?.deliveries.data[0].attributes.total_amount} XAF</h2>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-[#37474F] text-[15px]">Delivery Charge</h2>
                        <h2 className="text-[#37474F] text-[15px]">200 XAF</h2>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-[#EF7D0A] font-bold text-[15px]">Discount for digital payment</h2>
                        <h2 className="text-[#EF7D0A] font-bold text-[15px]">-300 XAF</h2>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-[#288A36] font-bold text-[15px]">Total</h2>
                        <h2 className="text-[#288A36] font-bold text-[15px]">200 XAF</h2>
                    </div>
                </div>

                {/* --- */}
                <div className="block md:flex basis-1/2 space-y-1 md:space-y-[30px] pt-[15px] md:pt-0  flex-col justify-start">
                    <h2 className="text-black font-bold text-[20px]">Delivery location: drop of point</h2>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-[#0000]/70 text-[20px]">Drop of point</h2>
                            <h6 className="text-[#37474F] ">{data.attributes?.deliveries.data[0].attributes.book_at ?? "Cameroun"}
                            </h6>
                        </div>
                        <div className="h-[50px]  w-[50px] rounded-[50px] bg-[#236CD9]/10 flex justify-center items-center ">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7152 3.02344C11.417 3.02344 7.13184 7.30856 7.13184 12.6068C7.13184 18.3157 13.183 26.1877 15.6747 29.1859C16.2223 29.8431 17.2217 29.8431 17.7693 29.1859C20.2473 26.1877 26.2985 18.3157 26.2985 12.6068C26.2985 7.30856 22.0134 3.02344 16.7152 3.02344ZM9.86993 12.6068C9.86993 8.8282 12.9366 5.76153 16.7152 5.76153C20.4937 5.76153 23.5604 8.8282 23.5604 12.6068C23.5604 16.5496 19.6175 22.4502 16.7152 26.133C13.8675 22.4776 9.86993 16.5086 9.86993 12.6068ZM13.293 12.6062C13.293 14.4955 14.8263 16.0288 16.7156 16.0288C18.6049 16.0288 20.1382 14.4955 20.1382 12.6062C20.1382 10.7169 18.6049 9.18359 16.7156 9.18359C14.8263 9.18359 13.293 10.7169 13.293 12.6062Z" fill="#37474F" />
                            </svg>
                        </div>

                    </div>
                    <h2 className="text-black font-bold pt-[30px] text-[20px]">Selected paiement method</h2>
                    <div className="flex space-x-2 justify-start items-center">
                        <img className="h-[50px]"
                            src='/orangeMoney.png'
                            alt='orange'
                            layout="responsive"
                            width={50}
                            height={50}
                            priority
                        ></img>
                        <h6 className="text-[#37474F] ">orange money
                        </h6>
                    </div>
                </div>
            </div>

            <div className=" mb-20 md:mb-0 mt-[60px] block md:flex space-x-0 md:space-x-5 space-y-5 md:space-y-0 justify-center items-center w-full">
                <div className=" w-full md:w-auto flex md:hidden relative  justify-center  bg-[#288A36] py-2 px-7 rounded-[4px] text-white text[24px] font-semibold">
                    <h2 className="flex justify-start items-center text-center">Contact Support</h2>
                    <svg className="right-2  absolute" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.9 2.9 2 4 2ZM6 16H19C19.55 16 20 15.55 20 15V5C20 4.45 19.55 4 19 4H5C4.45 4 4 4.45 4 5V18L6 16Z" fill="white" />
                    </svg>
                </div>
                <button className=" w-full hidden md:block md:w-auto bg-[#288A36] py-2 px-7 rounded-[4px] text-white text[24px] font-semibold">Contact Support </button>
                <button onClick={() => cancelOrder()} className=" w-full md:w-auto border-[1px] border-[#288A36] px-7 py-2 rounded-[4px] text-[#288A36]  font-semibold">Cancel Order</button>
            </div>
        </div>
    )
}
export default PurchaseProgress