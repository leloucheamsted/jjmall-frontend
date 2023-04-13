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

import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
  } from 'react-share';
import { useRouter } from 'next/router';
import { TimesGroups } from '@component/order/TelecoName';

const ShareGroupModal = ({ modalOpen, setModalOpen,groups=[],group_code="",url_group="",id=1 })=>{
    const router = useRouter()
    const {hoursDisplay,minutes,seconds,days} = TimesGroups(groups,group_code);
    
    const handleOpenDelivery = ()=>{
        console.log('')
    }
    return (
      <>
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="overflow-hidden bg-white mx-auto">
              <div className="text-center mb-6">
                <span className="text-xl font-bold font-serif">Group Details</span>
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
              {/* afficher le decompte du temps */}
              {/* grid grid-cols-3 place-content-center h-10 */}
              {/* <div className="flex flex-col">
                <div className="place-self-center flex flex-row gap-2">
                  <div className="p-1 bg-gray-100 border border-slate-500 rounded-[5px] ">
                    <span>23</span>
                  </div>
                  <div className="p-1 bg-gray-100 border border-slate-500 rounded-[5px]   ">
                    <span>50</span>
                  </div>
                  <div className="p-1 bg-gray-100 border border-slate-500 rounded-[5px]   ">
                    <span>10</span>
                  </div>
                </div>
              </div> */}
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
              <div className="mx-20 py-4 flex flex-rows justify-center items-center ">
                <span className="text-sm font-serif text-center">Invite your friend to join the group</span>
              </div>
              {/* creer les icons pour partager le lien du group */}
              <div className="w-full flex flex-col items-center my-4">
                <div className="w-full flex flex-col items-center">
                  <ul className="flex mt-4">
                    <li className="flex flex-col items-center ml-4 text-center  mr-2 transition ease-in-out duration-500">
                      <FacebookShareButton url={`${url_group}/${id}`} quote="KachaBazar">
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <span className='text-sm font-[Inter]'>Facebook</span>
                    </li>
                    <li className="flex flex-col items-center ml-4 text-center rounded-full  mr-2 transition ease-in-out duration-500">
                      <TwitterShareButton
                        // url={`${url_group}/${id}${router.query.slug}`}
                        url={`${url_group}/${id}`}
                        quote="KachaBazar"
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <span className='text-sm font-[Inter]'>Twitter</span>
                    </li>
                    <li className="flex flex-col items-center ml-4 text-center rounded-full  mr-2 transition ease-in-out duration-500">
                      <WhatsappShareButton url={`${url_group}/${id}`} quote="KachaBazar" title="Voici le lien d'integration de notre group d'achat">
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <span className='text-sm font-[Inter]'>Whatsapp</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="flex mt-4">
                    <li className="flex flex-col items-center ml-4 text-center rounded-full  mr-2 transition ease-in-out duration-500">
                      
                      <RedditShareButton url={`${url_group}/${id}`} quote="KachaBazar">
                        <RedditIcon size={32} round />
                      </RedditShareButton>
                      <span className='text-sm font-[Inter]'>Reddit</span>
                    </li>
                    <li className="flex flex-col items-center ml-4 text-center rounded-full  mr-2 transition ease-in-out duration-500">
                      <LinkedinShareButton url={`${url_group}/${id}`} quote="KachaBazar">
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                      <span className='text-sm font-[Inter]'>Linkedin</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="inline-block w-full text-white">
                <button
                  style={{ backgroundColor: "#EB8712" }}
                  className="w-full rounded-[20px] h-8"
                  // style={{borderColor:isactiveButton1? valborderColor : transparent,borderWidth:2}}
                  onClick={() => {
                    handleOpenDelivery();
                  }}
                  type="button"
                >
                  <span className="text-sm font-serif">Copy the Link</span>
                </button>
              </div>
            </div>
          </div>
        </MainModal>
      </>
    );
};
export default React.memo(ShareGroupModal);

