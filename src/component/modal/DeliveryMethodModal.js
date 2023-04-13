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
import { FiMap, FiMapPin } from 'react-icons/fi';
import OrderServices from '@services/OrderServices';
import dayjs from "dayjs";
import ShareGroupModal from '@component/modal/ShareGroupModal';
import { SpinLoader } from '@component/preloader/SpinLoader';

const DeliveryMethodModal = ({modalOpen,setModalOpen,product=[],type='create',group_code=''})=>{
    const [checkInput1,setCheckInput1] = useState(false);
    const [checkInput2,setCheckInput2] = useState(false);
    const [checkInput3,setCheckInput3] = useState(false);
    const {state:{userInfo}} = useContext(UserContext);
    const [loading,setLoading]= useState(false)
    const group_code_random = Math.floor(Math.random() * (550000 - 10000));
    const code_random = Math.floor(Math.random() * (15000 - 1000));
    const [showShareModal,setShowShareModal] = useState(false);
    const {dispatch,state:{groupInfo}} = useContext(UserContext)

    const CreateOrderDetails = ()=>{
        const orderDetailsInfo = {
          "data":{
            "quantity":1,
            "price_was":1,
            "product":product.id,
            "name":product.attributes.name
          }
        }
        setLoading(true)
        OrderServices.addOrderDetails(orderDetailsInfo)
          .then((res)=>{
            setLoading(false);
            notifySuccess('Group Details create successfully');
            CreateOrder(res.data ? res.data.id:null);
            setModalOpen(false);
            setShowShareModal(!showShareModal);
          })
          .catch((err) => {
            setLoading(false);
            console.log('group details',err);
            // notifyError(err ? err.response.data.error.message : err.message);
          })
    };
    const CreateOrder = (orderDetailsId)=>{
        const orderInfo = {
        "data":{
            "recipient":"Group No "+code_random.toString(),
            "status":"new",
            "group_code":type == 'create' ? group_code_random.toString() : group_code,
            "is_single":false,
            "code":code_random.toString(),
            "quantity":1,
            "user":userInfo? userInfo.user.id: null,
            "group_created_at":new Date(),
            "order_details":orderDetailsId,
            "rank": type == 'create' ? 1 : null
        }
        }
        OrderServices.addOrder(orderInfo)
        .then((res)=>{
            // groupInfo.push(res.data)
            const tab = groupInfo;
            tab.push(res.data);
            console.log('val tab:',tab);
            dispatch({type:'LIST_GROUP_INFO',payload:tab});
            const groupsids = tab.map(o => o.attributes.group_code)
            const groups = tab.filter((elt, index) => !groupsids.includes(elt.attributes.group_code, index + 1))
            dispatch({type:'LIST_ALLGROUP_INFO',payload:groupsids});
            dispatch({type:'LIST_PRODUCTGROUP_INFO',payload:groups});
            notifySuccess('Group create successfully');
        })
        .catch((err)=>{
            console.log('group ',err.response.data.error.message);
            notifyError(err ? err.response.data.error.message : err.message);
        })
    };
    const JoinGroupMehtod = ()=>{
        // setShowShareModal(!showShareModal)
        
        if (groupInfo.length > 0 ){
            setLoading(true);
            const tar = groupInfo.filter((elt)=>elt.attributes?.group_code == group_code && 
            elt.attributes?.user?.attributes?.username == userInfo?.user?.username);
            console.log('val tar:',tar.length);
            if (tar.length > 0){
                // alert('Cette utilisateur est deja dans le groupe')
                notifyError('Cette utilisateur est deja dans le groupe')
                setLoading(false)
            }
            else{
                CreateOrderDetails()
            }
        }
        // CreateOrderDetails()
    }
    const CreateGroupMehtod = ()=>{
        CreateOrderDetails()
        
    }
    return (
        <>
            {showShareModal && (
                <ShareGroupModal modalOpen={showShareModal} setModalOpen={setShowShareModal}
                    
                />
            )};
        
            <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="overflow-hidden bg-white mx-auto">
                    <div className="text-center mb-4 border-b border-slate-300">
                        <span className="text-sm font-bold font-serif">Choose your delivery method</span>
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
                    {/* grid grid-cols-3 place-content-center h-10 */}
                    <div className='flex items-center pb-2 border-b border-slate-500 h-10'>
                        <div className='flex flex-rows items-center text-sm font-serif'>
                            <input
                                type="checkbox"
                                id="checkbox"
                                
                                checked={checkInput1}
                                onChange={(e)=>{setCheckInput1(e.target.checked);setCheckInput2(false),setCheckInput3(false)}}
                            />
                            <span className='flex flex-col items-center mx-2'>
                                I want to be deliver to the group leader
                            </span>
                            <span className='flex flex-col items-center mx-2'>
                                0 XAF
                            </span>
                        </div>
                    </div>
                    {/* show group */}
                    <div className='flex flex-col py-2 border-b border-slate-500'>
                        <div className='flex flex-rows items-center text-sm font-serif w-full'>
                            <input
                                type="checkbox"
                                id="checkbox"
                                checked={checkInput2}
                                onChange={(e)=>{setCheckInput2(e.target.checked);setCheckInput1(false),setCheckInput3(false)}}
                            />
                            <span className='flex flex-col items-center mx-2'>
                                I prefer to choose a drop of point
                            </span>
                            <span className='flex flex-col items-center mx-2'>
                                200 XAF
                            </span>
                        </div>
                        <div className='flex flex-rows my-2 mx-4'>
                            <ul className=''>
                                <li className='flex items-center text-sm font-serif'>
                                    <input
                                        type="checkbox"
                                        className="rounded-full"
                                        id="checkbox"
                                    />
                                    <span className='flex flex-col items-center mx-2'>
                                        Makepè bloc L - carefour Wakawaka
                                    </span>
                                    <button 
                                        onClick={()=>{console.log('rien')}}
                                        className='flex flex-col items-center mx-2'
                                    >
                                        <FiMapPin/>
                                    </button>
                                </li>
                                <li className='flex items-center text-sm font-serif'>
                                    <input
                                        type="checkbox"
                                        className="rounded-full"
                                        id="checkbox"
                                    />
                                    <span className='flex flex-col items-center mx-2'>
                                        Makepè bloc L - carefour Wakawaka
                                    </span>
                                    <button 
                                        onClick={()=>{console.log('rien')}}
                                        className='flex flex-col items-center mx-2'
                                    >
                                        <FiMapPin/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* list groups members */}
                    <div className='flex items-center py-4 border-b border-slate-500'>
                        <li className='flex items-center text-sm font-serif'>
                            <input
                                type="checkbox"
                                id="checkbox"
                                checked={checkInput3}
                                onChange={(e)=>{setCheckInput3(e.target.checked);setCheckInput2(false),setCheckInput1(false)}}
                            />
                            <span className='flex flex-col items-center mx-2'>
                                I want to be deliver at home
                            </span>
                            <span className='flex flex-col items-center mx-2'>
                                300 XAF
                            </span>
                        </li>
                    </div>
                    
                    <div className="inline-block w-full text-white my-2">
                        {type == 'create' && (
                            <button style={{backgroundColor:"#EB8712",opacity:loading ? 0.5:1}}
                                disabled={loading}
                                className='w-full rounded-[20px] h-8'
                                // style={{borderColor:isactiveButton1? valborderColor : transparent,borderWidth:2}}
                                onClick={()=>{CreateGroupMehtod()}}
                                type="button"
                            >
                                <SpinLoader loading={loading}/>
                                <span className='text-sm font-serif'>Create your group</span>
                            
                            </button>
                    )}
                    {type == 'join' && (
                            <button style={{backgroundColor:"#EB8712",opacity:loading ? 0.5:1}}
                                disabled={loading}
                                className='w-full rounded-[20px] h-8'
                                // style={{borderColor:isactiveButton1? valborderColor : transparent,borderWidth:2}}
                                onClick={()=>{JoinGroupMehtod()}}
                                type="button"
                            >
                                <SpinLoader loading={loading}/>
                                <span className='text-sm font-serif'>Join the group</span>
                            
                            </button>
                    )}
                    </div>

                </div>
                </div>
            </MainModal>
        </>
    );
};
export default React.memo(DeliveryMethodModal);