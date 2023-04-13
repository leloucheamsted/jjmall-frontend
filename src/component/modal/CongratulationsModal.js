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

const CongratulationsModal = ({modalOpen,setModalOpen,title='',message=''})=>{
    return (
        
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="overflow-hidden bg-white mx-auto">
                <div className="text-center pb-4 mb-6 border-b border-slate-300">
                    <span className="text-sm font-bold font-serif">{title}</span>
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
                <div className='flex flex-col pb-4 xl:mx-10 lg:mx-10 mx-5 justify-center items-center'>
                    <span className='text-md font-bold font-serif text-center'>
                        {message} 
                    </span>
                </div>
                
                <div className='flex flex-col justify-center items-center xl:mx-20 lg:mx-20 mx-12'>
                    <button
                        className='text-sm text-white leading-4 bg-[#EF7D0A]  items-center cursor-pointer transition ease-in-out duration-300 font-semibold 
                        font-serif text-center justify-center border border-orange-300 rounded-full focus-visible:outline-none 
                        focus:outline-none px-4  md:px-6 lg:px-8 py-2 md:py-2 lg:py-2 hover:text-white hover:bg-emerald-600 
                        w-full h-10'
                    >
                        <span className='text-sm font-serif'>
                            {'Place order'}
                        </span>
                    </button>
                    
                </div>
            </div>
            </div>
        </MainModal>
    );
};
export default React.memo(CongratulationsModal)