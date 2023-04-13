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
import CongratulationsModal from '@component/modal/CongratulationsModal'
import PlaceOrderModal from '@component/modal/PlaceOrderModal'
import DeliveryMethodModal from '@component/modal/DeliveryMethodModal'
import Link from 'next/link';
import { useRouter } from 'next/router';

const BuyGroupModal = ({modalOpen,setModalOpen,product=[]})=>{
    const [showCongratulation,setShowCongratulation] = useState(false);
    const [showDelivery,setShowDelivery] = useState(false);
    const [showBuyGroup,setShowBuyGroup] = useState(true);
    const [typeOpen,setTypeOpen] = useState('create');
    const [title,setTitle] = useState('Congrats 1')
    const [message,setMessage] = useState('Congratulations :  You are part of the group now. Place your order to proceed')
    const {state:{userInfo,isLogger}} = useContext(UserContext);
    const router = useRouter();

    const group_Price = product.attributes.prices.data.filter((elt)=> elt.attributes.type === "group");
    const alone_Price = product.attributes.prices.data.filter((elt)=> elt.attributes.type === "single");

    const handleOpenDelivery= (type='')=>{
        if (type === 'create'){
            setShowDelivery(!showDelivery);
            setShowBuyGroup(!showBuyGroup);
            
            setTypeOpen('create');
        }
        else if (type === 'join'){
            router.push(`/product/groupBuy?id=${product.id}`, null, { scroll: false });
            // setShowDelivery(!showDelivery);
            // setShowBuyGroup(!showBuyGroup);
            // setTypeOpen('join');
        }
        
    }
    useEffect(()=>{
        if(!userInfo && !isLogger){
            router.push('/auth/signin')
            notifySuccess("Please log in to your user account before continuing the group purchase process")
        }
    },[]);
    return (
        <>
        {showDelivery && (
            <DeliveryMethodModal modalOpen={showDelivery} setModalOpen={setShowDelivery}
                product={product} type={typeOpen}
            />
            // <PlaceOrderModal modalOpen={showCongratulation} setModalOpen={setShowCongratulation}
            // />
        )};
        {!showDelivery && (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            
            <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="overflow-hidden bg-white mx-auto">
                <div className="text-center pb-4 mb-6 border-b border-slate-300">
                    <span className="text-sm font-bold font-serif">Buy in group</span>
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
                        Get this product at a cheaper price
                        by buying in group 
                    </span>
                </div>
                <div className='flex flex-col bg-[#288A36] text-white justify-center rounded-[10px] xl:mx-20 lg:mx-20 mx-10 py-5 items-center border border-slate-300'>
                    <span className='text-md font-serif line-through'>
                        {alone_Price.length > 0 ? alone_Price[0].attributes.price : 0}{' XAF'}
                    </span>
                    <span className='text-3xl font-bold font-serif'>
                        {group_Price.length > 0 ? group_Price[0].attributes.price : 0}{' XAF'}
                    </span>
                </div>
                <div className='flex flex-col justify-center items-center py-4 cursor-pointer'>
                    <button onClick={()=>{handleOpenDelivery('join')}}
                    >
                        <span className='text-sm underline font-serif'>
                            Join an existing group
                        </span>
                    </button>
                </div>
                <div className='flex flex-col justify-center items-center xl:mx-20 lg:mx-20 mx-12'>
                    <button
                        onClick={()=>{handleOpenDelivery('create')}}
                        className='text-sm text-white leading-4 bg-[#EF7D0A]  items-center cursor-pointer transition ease-in-out duration-300 font-semibold 
                        font-serif text-center justify-center border border-orange-300 rounded-full focus-visible:outline-none 
                        focus:outline-none px-4  md:px-6 lg:px-8 py-2 md:py-2 lg:py-2 hover:text-white hover:bg-emerald-600 
                        w-full h-10'
                    >
                        <span className='text-sm font-serif'>
                            Create your group
                        </span>
                    </button>
                    
                </div>
            </div>
            </div>
        </MainModal>
        )}
        </>
    );
};
export default React.memo(BuyGroupModal)