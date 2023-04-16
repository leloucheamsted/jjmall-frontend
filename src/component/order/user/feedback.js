import Loading from "@component/preloader/Loading";
import Layout from "@layout/Layout"
import OrderServices from "@services/OrderServices";
import ReviewService from "@services/ReviewService";
import { notifyError, notifySuccess } from "@utils/toast";
import Cookies from "js-cookie";
import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react"
import ReactStars from "react-stars"
import { ToastContainer } from "react-toastify";

var picture;
const FeedBack = ({ order_detail }) => {
    return (
        // <Layout title="FeedBack" description="Page Purchase progress">
        <div className="pt-[29px] xl:px-[39px] bg-white">
            {/* <BreadCrumb /> */}
            {/* <Headers /> */}
            <Review order_detail={order_detail} />
        </div>
        // </Layout>
    )
}

// --- BreadCrumb
const BreadCrumb = () => {
    return (
        <div className="bg-white">
            <div>Home {">"} group by {">"} #1</div>

        </div>
    )
}

// --- Headers
const Headers = () => {
    return (
        <div className=" py-[27px]">
            <div className="bg-[#D9D9D9] h-50 w-full px-5 flex justify-center items-center">
                <div className="basis-1/4">
                    <h2 className="flex  justify-start items-start py-[11px]">Wait for team formation</h2>
                </div>
                <div className="basis-1/4">
                    <h2 className="flex  justify-start items-start py-[11px]">Confirm your order</h2>
                </div>
                <div className="basis-1/4">
                    <h2 className="flex  justify-center items-start py-[11px]">Follow the delivery process</h2>
                </div>
                <div className="basis-1/4">
                    <h2 className="flex  justify-end items-start py-[11px]">Leave a review</h2>
                </div>
            </div>
        </div>
    )
}

// --- Review
const Review = ({ order_detail }) => {
    const [comment, setComment] = useState('')
    const [rate, setRate] = useState('')
    const [picture, setPicture] = useState('')
    const [photo, setPhoto] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const PublishReview = () => {
        setLoading(true)
        const userID = JSON.parse(Cookies.get("userInfo")).user.id
        const review = new FormData()
        var dataJson = {
            comment: comment,
            rate: `${rate}`,
            type: "img",
            order_detail: order_detail,
            user: userID
        }

        review.append('files.file', picture);
        review.append("data", JSON.stringify(dataJson))
        console.log(JSON.stringify(dataJson))
        ReviewService.CreateReview(review)
            .then((res) => {
                notifySuccess('Your feedback was send with success');
                setComment('');
                document.getElementById("comment").value = ''
                setPicture('')
                setPhoto('')
                setRate('')
                setLoading(false)
                // console.log(res)
            })
            .catch((e) => { notifyError('error sending feedback'); console.log(e); setLoading(false) })
        console.log(comment, rate, picture)
    }
    return (

        <>
            <div>
                <ToastContainer />
                <div className="px-5 md:px-0 pt-0 md:pt-20 relative">
                    <div className=" md:hidden px-15 py-5 justify-center  items-center">
                        <h2 className="flex justify-center items-center p-30 text-black font-bold text-[24px] text-center">Please share your experience with us</h2>
                        <h2 className="flex justify-center my-5 items-center p-30 text-black font-bold text-[30px] text-center"> {rate ? rate === 1 || rate === 2 || rate === 3 || rate === 4 || rate === 5 ? rate + ".0" : rate : 0} </h2>

                        <div className="flex justify-center text-[48px] items-center" style={{ fontSize: '48px' }}>
                            <ReactStars
                                onChange={(e) => setRate(e)}
                                count={5}
                                size={56}
                                color2={'#ffd700'} />
                        </div>
                    </div>
                    <h2 className="hidden md:block text-black text-[20px] pb-[14px]">Enter the text of your review : </h2>
                    <div className="md:flex w-full  h-auto xl:space-x-[35px] pb-[20px]">
                        <div className=" w-full  xl:flex  mb-5 xl:mb-0  xl:basis-1/2 ">
                            <div className="relative w-full bg-[#F0F1F2] h-[160px] rounded-t-[8px] p-[20px]">
                                <div className="flex text-[12px] text-[#236CD9]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 7C4.45 7 4 6.55 4 6C4 5.45 4.45 5 5 5H19C19.55 5 20 5.45 20 6C20 6.55 19.55 7 19 7H5ZM5 9H19C19.55 9 20 9.45 20 10C20 10.55 19.55 11 19 11H5C4.45 11 4 10.55 4 10C4 9.45 4.45 9 5 9ZM5 17H13C13.55 17 14 17.45 14 18C14 18.55 13.55 19 13 19H5C4.45 19 4 18.55 4 18C4 17.45 4.45 17 5 17ZM5 15H19C19.55 15 20 14.55 20 14C20 13.45 19.55 13 19 13H5C4.45 13 4 13.45 4 14C4 14.55 4.45 15 5 15Z" fill="#37474F" />
                                    </svg>
                                    Review
                                </div>
                                <textarea id="comment" onChange={(e) => setComment(e.target.value)} className="bg-[#F0F1F2] focus:ring-0 focus:border-transparent focus:border-none w-full h-[100px] resize-none border-none" placeholder="Tap review here." />
                                <div className="absolute bottom-0 left-0 right-0  bg-[#236CD9] h-[2px]"></div>
                            </div>
                        </div>
                        <div className="hidden md:block w-full mb-5 xl:mb-0   justify-start xl:basis-1/2  md:px-[34px] ">
                            <h2 className="text-black flex justify-start text-[20px] pb-[14px]">Rate the product </h2>
                            <ReactStars
                                onChange={(e) => setRate(e)}
                                count={5}
                                size={24}
                                color2={'#ffd700'} />
                        </div>
                    </div>


                    <h2 className="hidden  text-black md:flex justify-starttext-[20px] pb-[24px]">Enter the media of your review : </h2>
                    <div className="hidden md:flex w-full  justify-center  h-auto md:space-x-[35px]">
                        <UploadImagesView photo={photo} setPhoto={setPhoto} picture={picture} setPicture={setPicture} />
                        <UploadVideosView />
                    </div>
                    <div className="hidden md:flex justify-center">
                        <Publish onClick={PublishReview} />
                    </div>
                    <div className=" md:hidden space-y-4">
                        <div onClick={() => PublishReview()} className="flex relative text-white space-x-2 py-[15px] md:py-[5px] px-[20px] bg-[#24893A] flex-row justify-center items-center rounded-[8px]"><h3 className="flex justify-center">Submit</h3>
                            <svg className="absolute right-4" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.79506 15.8749L5.32506 12.4049C5.13823 12.2176 4.88458 12.1124 4.62006 12.1124C4.35554 12.1124 4.10189 12.2176 3.91506 12.4049C3.52506 12.7949 3.52506 13.4249 3.91506 13.8149L8.09506 17.9949C8.48506 18.3849 9.11506 18.3849 9.50506 17.9949L20.0851 7.41489C20.4751 7.02489 20.4751 6.39489 20.0851 6.00489C19.8982 5.81764 19.6446 5.7124 19.3801 5.7124C19.1155 5.7124 18.8619 5.81764 18.6751 6.00489L8.79506 15.8749Z" fill="white" />
                            </svg>
                        </div>
                        <div onClick={() => router.back()} className="flex relative text-white space-x-2 py-[15px] md:py-[5px] px-[20px] bg-[#F37A20] flex-row justify-center items-center rounded-[8px]"><h3 className="flex justify-center">Skip</h3>
                            <svg className="absolute right-4" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.20898 13.0002H16.379L11.499 17.8802C11.109 18.2702 11.109 18.9102 11.499 19.3002C11.889 19.6902 12.519 19.6902 12.909 19.3002L19.499 12.7102C19.889 12.3202 19.889 11.6902 19.499 11.3002L12.919 4.7002C12.7322 4.51295 12.4785 4.40771 12.214 4.40771C11.9495 4.40771 11.6958 4.51295 11.509 4.7002C11.119 5.0902 11.119 5.7202 11.509 6.1102L16.379 11.0002H5.20898C4.65898 11.0002 4.20898 11.4502 4.20898 12.0002C4.20898 12.5502 4.65898 13.0002 5.20898 13.0002Z" fill="white" />
                            </svg>

                        </div>
                    </div>
                    {loading ? (
                        <div className='absolute bg-white/60 flex justify-center items-center left-0 top-0 right-0 bottom-0'>
                            <Loading className="absolute" loading={loading} />
                        </div>

                    ) : (
                        <div></div>
                    )
                    }
                </div>
            </div>
        </>
    )
}

//--- Pusblish button
const Publish = ({ onClick }) => {
    return (
        <div className="flex py-10 justify-center items-center">
            <button onClick={onClick} className="text-[#000] text-[24px] bg-[#D9D9D9] rounded-[100px] h-[60px] p-[14px] w-[200px]">Pusblish</button>
        </div>
    )
}


const UploadImagesView = ({ photo, setPhoto, picture, setPicture }) => {
    //const [photo, setPhoto] = useState('')


    const onChangeInputPhoto = (e) => {
        let url = URL.createObjectURL(e.target.files[0])
        console.log(url)
        setPicture(e.target.files[0])
        //console.log(picture)
        setPhoto(url)

    }
    return (
        <div className='xl:basis-1/2   w-full'>
            {/* Upload photo in the form */}
            <div className=''>
                <div className="mt-1 flex items-center">
                    <div class="flex items-center justify-center w-full">
                        <label
                            class="flex flex-col justify-center items-center w-full h-[300px] border-[3px] rounded-[10px]  border-[#888888] border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div class="flex flex-col items-center justify-center cursor-pointer pt-7">
                                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M87.4993 70.8337H29.166V12.5003H87.4993M87.4993 4.16699H29.166C26.9559 4.16699 24.8363 5.04497 23.2735 6.60777C21.7107 8.17057 20.8327 10.2902 20.8327 12.5003V70.8337C20.8327 73.0438 21.7107 75.1634 23.2735 76.7262C24.8363 78.289 26.9559 79.167 29.166 79.167H87.4993C89.7095 79.167 91.8291 78.289 93.3919 76.7262C94.9547 75.1634 95.8327 73.0438 95.8327 70.8337V12.5003C95.8327 10.2902 94.9547 8.17057 93.3919 6.60777C91.8291 5.04497 89.7095 4.16699 87.4993 4.16699ZM12.4993 20.8337H4.16602V87.5003C4.16602 89.7105 5.04399 91.8301 6.60679 93.3929C8.1696 94.9557 10.2892 95.8337 12.4993 95.8337H79.166V87.5003H12.4993M66.4993 42.8753L55.041 57.6253L46.8743 47.792L35.416 62.5003H81.2493L66.4993 42.8753Z" fill="#D9D9D9" />
                                </svg>
                                <h2 class=" text-[20px] pt-3 tracking-wider text-black ">
                                    ADD PHOTOS</h2>

                            </div>
                            <input id="comment" onChange={(e) => { onChangeInputPhoto(e) }} type="file" class="opacity-0" accept='image/*' />
                        </label>
                    </div>
                    {/* Show image */}

                </div>
                {photo !== '' && (<>
                    <div className='relative   flex justify-center items-center w-full h-[100px] m-1 bg-white'>
                        {photo && (<Image className='absolute top-0 left-0 right-0 bottom-0'
                            src={photo}
                            alt="Picture of the product"
                            width="90px"
                            height="90px"
                        />
                        )
                        }
                    </div>
                </>)
                }
            </div>



        </div>
    )
}


const UploadVideosView = () => {
    const [video, setVideo] = useState('')


    const onChangeInputVideo = (e) => {
        let url = URL.createObjectURL(e.target.files[0])
        console.log(url)
        setVideo(url)

    }
    return (
        <div className=' xl:basis-1/2  w-full '>
            {/* Upload photo in the form */}
            <div className=''>
                <div className="mt-1 flex items-center">
                    <div class="flex items-center justify-center w-full">
                        <label
                            class="flex flex-col justify-center items-center w-full h-[300px] border-[3px] rounded-[10px]  border-[#888888] border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div class="flex flex-col items-center justify-center cursor-pointer pt-7">
                                <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M31.584 30.8538V53.1455C31.584 54.7427 32.3132 55.958 33.7715 56.7913C35.2298 57.6247 36.6534 57.5552 38.0423 56.583L55.334 45.5413C56.6534 44.708 57.3132 43.5275 57.3132 41.9997C57.3132 40.4719 56.6534 39.2913 55.334 38.458L38.0423 27.4163C36.6534 26.4441 35.2298 26.3747 33.7715 27.208C32.3132 28.0413 31.584 29.2566 31.584 30.8538ZM42.0007 83.6664C36.2368 83.6664 30.8201 82.5719 25.7507 80.383C20.6812 78.1969 16.2715 75.2289 12.5215 71.4789C8.77149 67.7289 5.80343 63.3191 3.61732 58.2497C1.42843 53.1802 0.333984 47.7636 0.333984 41.9997C0.333984 36.2358 1.42843 30.8191 3.61732 25.7497C5.80343 20.6802 8.77149 16.2705 12.5215 12.5205C16.2715 8.77051 20.6812 5.80106 25.7507 3.61217C30.8201 1.42606 36.2368 0.333008 42.0007 0.333008C47.7645 0.333008 53.1812 1.42606 58.2507 3.61217C63.3201 5.80106 67.7298 8.77051 71.4798 12.5205C75.2298 16.2705 78.1979 20.6802 80.384 25.7497C82.5729 30.8191 83.6673 36.2358 83.6673 41.9997C83.6673 47.7636 82.5729 53.1802 80.384 58.2497C78.1979 63.3191 75.2298 67.7289 71.4798 71.4789C67.7298 75.2289 63.3201 78.1969 58.2507 80.383C53.1812 82.5719 47.7645 83.6664 42.0007 83.6664Z" fill="#D9D9D9" />
                                </svg>
                                <h2 class=" text-[20px] pt-3 tracking-wider text-black ">
                                    ADD VIDEOS</h2>

                            </div>
                            <input onChange={(e) => onChangeInputVideo(e)} type="file" class="opacity-0" accept='video/*' />
                        </label>
                    </div>
                </div>
                {video !== '' && (
                    <>
                        <div className='relative w-full flex justify-center items-center h-[100px] m-1'>
                            <video src={video} autoPlay muted loop id='video' className='w-[100px] h-[100px]  ' >
                                <source src={video} />
                            </video>

                        </div>
                    </>
                )
                }
            </div>



        </div>
    )
}
export default FeedBack