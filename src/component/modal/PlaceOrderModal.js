import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import MainModal from '@component/modal/MainModal';
import { IoClose } from 'react-icons/io5';
import Uploader from '@component/image-uploader/Uploader';
import { useForm } from 'react-hook-form';
import { notifyError, notifySuccess } from '@utils/toast';
import { useContext } from 'react';
import { UserContext } from '@context/UserContext';
import profile from '@component/images/empty_profile2.png'
import { FiMinus, FiPlus } from 'react-icons/fi';
import Link from 'next/link';

const PlaceOrderModal = ({modalOpen,setModalOpen})=>{
    const [item,setItem] = useState(1);

    return (
        <>
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            
            <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="overflow-hidden bg-white mx-auto">
                <div className="text-center pb-4 mb-6 border-b border-slate-300">
                    <span className="text-sm font-bold font-serif">Place Order</span>
                    <div className="absolute left-5 top-5">
                        <button
                            onClick={() => setModalOpen(false)}
                            type="button"
                            className="inline-flex justify-center px-2 py-2 text-base font-medium text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        >
                            <IoClose />
                        </button>
                    </div>
                </div>
                <div className='flex pb-4 justify-center items-center'>
                    <div className=' w-[100px] border border-slate-200'>
                        <Image
                            className='flex justify-center items-center'
                            src={profile}
                            alt={'product'}
                            layout="responsive"
                            // width={650}
                            // height={650}
                        ></Image>
                    </div>
                    <div className='flex flex-col items-justify mx-5'>
                        <span className='text-md font-bold font-serif'>
                            Heap of  medium size macabo, about 2 kg Excellent as food supplement, good in rapé, 
                        </span>
                        <span className='text-sm font-bold font-serif text-orange-600'>700 XAF</span>
                    </div>
                    
                    
                </div>

                <div className="flex items-center space-s-1 sm:space-s-4 w-full">
                    <span className='text-sm font-serif font-bold'>Select Quantity</span>
                    <div className="group flex items-center mx-6 rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
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
                            {item}
                        </p>
                        <button
                            onClick={() => setItem(item + 1)}
                            // disabled={
                            // product.quantity < item ||
                            // product.quantity === item
                            // }
                            className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                        >
                            <span className="text-dark text-base">
                            <FiPlus />
                            </span>
                        </button>
                    </div>
                    
                </div>

                <div className='my-2'>
                    <span className='text-sm font-serif font-bold'>Select Paiement Method</span>
                </div>
                <div className='my-2 mx-3'>
                    <ul className=''>
                        <li className='flex items-center text-sm font-serif'>
                            <input
                                type="checkbox"
                                className="rounded-full"
                                id="checkbox"
                            />
                            <span className='flex flex-col items-center mx-2'>
                                Digital money ( OM / MOMO / Visa/ Mastercard )
                            </span>
                            
                        </li>
                        <li className='flex items-center text-sm font-serif'>
                            <input
                                type="checkbox"
                                className="rounded-full"
                                id="checkbox"
                            />
                            <span className='flex flex-col items-center mx-2'>
                                Cash upon delivery
                            </span>
                        </li>
                    </ul>
                </div>
                <div className='my-2'>
                    <span className='text-sm font-serif font-bold'>Choose your delivery option</span>
                </div>
                <div className='my-2 mx-3'>
                    <ul>
                        <li className='flex items-center text-sm font-serif'>
                            <input
                                type="checkbox"
                                className="rounded-full"
                                id="checkbox"
                            />
                            <span className='flex flex-col items-center mx-2'>
                                Group leader ( 0  XAF )
                            </span>
                            
                        </li>
                        <li className='flex items-center text-sm font-serif'>
                            <input
                                type="checkbox"
                                className="rounded-full"
                                id="checkbox"
                            />
                            <span className='flex flex-col items-center mx-2'>
                                Drop of point ( 200 XAF )
                            </span>
                                
                        </li>
                        <li className='flex items-center text-sm font-serif'>
                            <input
                                type="checkbox"
                                className="rounded-full"
                                id="checkbox"
                            />
                            <span className='flex flex-col items-center mx-2'>
                                custom delivery  ( 500 XAF )
                            </span>
                                
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col justify-center items-center xl:mx-20 lg:mx-20 mx-12 mt-4'>
                    <button
                        onClick={()=>{handleOpenCongrat()}}
                        className='text-sm text-white leading-4 bg-[#EF7D0A]  items-center cursor-pointer transition ease-in-out duration-300 font-semibold 
                        font-serif text-center justify-center border border-orange-300 rounded-full focus-visible:outline-none 
                        focus:outline-none px-4  md:px-6 lg:px-8 py-2 md:py-2 lg:py-2 hover:text-white hover:bg-emerald-600 
                        w-full h-10'
                    >
                        <span className='text-sm font-serif'>
                            Place your order
                        </span>
                    </button>
                    
                </div>
            </div>
            </div>
        </MainModal>
        </>
    );
};
export default React.memo(PlaceOrderModal)