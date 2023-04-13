import React,{useState,useEffect,} from 'react';
import Image from 'next/image';
import MainModal from '@component/modal/MainModal';
import { IoClose } from 'react-icons/io5';
import Uploader from '@component/image-uploader/Uploader';
import { useForm } from 'react-hook-form';
import { notifyError, notifySuccess } from '@utils/toast';
import { useContext } from 'react';
import { UserContext } from '@context/UserContext';
import profile from '@component/images/empty_profile2.png'
import DeliveryMethodModal from '@component/modal/DeliveryMethodModal';
import dayjs from 'dayjs';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';


const JoinGroupModal = ({ JoinmodalOpen,setJoinModalOpen,allgroup=[],idsGroups={},product=[],Orders=[],children})=>{
    const cancelButtonRef = useRef();
    const [showDeliveryMethod,setShowDeliveryMethod] = useState(false);

    const handleOpenDelivery = ()=>{
        setShowDeliveryMethod(!showDeliveryMethod);
        // setJoinModalOpen(false)
    };
    const filtre = allgroup.filter((elt) => elt == idsGroups?.attributes.group_code)
    const filterRank = Orders.filter((elt)=> elt == idsGroups?.attributes.group_code && elt.attributes.rank == 1);

    // const dateCompute = idsGroups ? idsGroups.attributes.group_created_at : ''
    const dateCompute = filterRank.length > 0 ? filterRank[0].attributes.group_created_at : idsGroups ? idsGroups.attributes.group_created_at : ''
    
    const countDown = new Date(dateCompute).getTime()
    // const now = new Date(countDown?.getFullYear(),countDown?.getMonth(),countDown?.getDate()+1).getTime();
    // const now = new Date(dayjs(dateCompute).add(1,'day')).getTime();
    const now = new Date().getTime();
    const distanceBase = now - countDown
    const days = Math.floor(distanceBase /(1000 * 60 * 60 * 24))
    const hours = Math.floor((distanceBase % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distanceBase % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distanceBase % (1000 * 60)) / (1000));

    const hoursDisplay = days <= 0 ? (hours <=0 ? Math.floor(24 -(minutes/60)) : 24-hours) :0
    // console.log('val days:',days);
    // console.log('date backend:',new Date(dateCompute));
    // console.log('date now:',new Date());

    return (    
        <>
        {showDeliveryMethod && (
            <DeliveryMethodModal modalOpen={showDeliveryMethod} setModalOpen={setShowDeliveryMethod}
                type={'join'} group_code={idsGroups ? idsGroups?.attributes.group_code:''}
                product = {product}
            />
        )};
        {!showDeliveryMethod && (
            <Transition appear show={JoinmodalOpen} as={Fragment}>
                <Dialog
                as="div"
                className="fixed h-[100%] inset-0 z-30 overflow-scroll text-center"
                onClose={() => setJoinModalOpen(false)}
                initialFocus={cancelButtonRef}
                >
                <div className=" px-4">
                    
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                    {/* Bloque contenant laffichage du modal. */}

                    <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <div className="overflow-hidden bg-white mx-auto">
                            <div className="text-center mb-6">
                                <span className="text-xl font-bold font-serif">Group Details</span>
                                <div className="absolute left-5 top-5">
                                    <button
                                        onClick={() => setJoinModalOpen(false)}
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 text-base font-medium text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                            </div>
                            {/* grid grid-cols-3 place-content-center h-10 */}
                            <div className='flex flex-col'>
                                <div className='place-self-center flex flex-row gap-2'>
                                <div className= {days <= 0? 'p-1 px-2 bg-[#288A36] border border-slate-500 rounded-[5px] ':
                                    'p-1 px-2 bg-[#D21313] border border-slate-500 rounded-[5px] '} 
                                >
                                    <span className='text-white font-serif'>{days <= 0 ? hoursDisplay: 0}</span>
                                </div>:
                                <div className= {days <= 0? 'p-1 px-2 bg-[#288A36] border border-slate-500 rounded-[5px] ':
                                    'p-1 px-2 bg-[#D21313] border border-slate-500 rounded-[5px] '} 
                                >
                                    <span className='text-white font-serif'>{days <= 0 ? minutes: 0}</span>
                                </div>:
                                <div className= {days <= 0? 'p-1 px-2 bg-[#288A36] border border-slate-500 rounded-[5px] ':
                                    'p-1 px-2 bg-[#D21313] border border-slate-500 rounded-[5px] '} 
                                >
                                    <span className='text-white font-serif'>{days <= 0 ? seconds:0}</span>
                                </div>
                                </div>
                                
                            </div>
                            {/* show group */}
                            <div>
                                <span className='text-sm font-serif'>Group Members</span>
                            </div>
                            {/* list groups members */}

                            {allgroup?.map((elt, i) => (
                                <div key={i+1} className='w-full flex flex-row'>
                                    {(idsGroups.attributes.group_code == elt)  &&(
                                        <div className='flex flex-rows items-center mx-2 py-1'>
                                            <div style={{height:50,width:50}} className=' rounded-full border border-slate-600'>
                                            <Image
                                                className='rounded-full flex justify-center items-center'
                                                src={profile}
                                                alt={'profile item'}
                                                layout="responsive"
                                                width={50}
                                                height={50}
                                                ></Image>
                                            </div>
                                            
                                            <span className='mx-2 text-sm font-serif'>Liliane Kenmogne</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* compte le nombre de membre dans le group */}
                            <div className='my-3'>
                                <span className='text-sm font-serif'>{filtre.length} member left</span>
                            </div>
                            <div className="inline-block w-full text-white">
                                <button style={{backgroundColor:"#EB8712"}}
                                className='w-full rounded-[20px] h-8'
                                // style={{borderColor:isactiveButton1? valborderColor : transparent,borderWidth:2}}
                                onClick={()=>{handleOpenDelivery()}}
                                type="button"
                                >
                                    <span className='text-sm font-serif'>Join the group</span>
                                
                                </button>
                            
                            </div>

                        </div>
                    </div>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                    >
                    &#8203;
                    </span>
                </div>
                </Dialog>
            </Transition>
        )};
    </>
       
    );
};
export default React.memo(JoinGroupModal);