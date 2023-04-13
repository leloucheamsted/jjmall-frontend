import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import MainModal from '@component/modal/MainModal';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { useLoadScript,GoogleMap,MarkerF,CircleF,StandaloneSearchBox  } from '@react-google-maps/api';
import { useMemo } from 'react';

const MapPinModal = ({modalOpen,setModalOpen,title=''})=>{
    const cancelButtonRef = useRef();
    const [lat, setLat] = useState(27.672932021393862);
    const [lng, setLng] = useState(85.31184012689732);
    const libraries = useMemo(() => ['places'], []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        libraries: libraries,
    });
    const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

    return (
        <>
            <Transition appear show={modalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed h-[100%] inset-0 z-30 overflow-scroll text-center"
                    onClose={() => setModalOpen(false)}
                    initialFocus={cancelButtonRef}
                >
                <div className=" px-4">
                    
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                    {/* Bloque contenant laffichage du modal. */}

                    <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <div className="overflow-hidden bg-white mx-auto">
                            <div className="text-center mb-6">
                                <span className="text-xl font-bold font-serif">Location</span>
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
                            <div className='h-100 overflow-y-scroll border border-slate-200'>
                                {!isLoaded &&(
                                  <p>Loading...</p>
                                )}
                                {isLoaded &&(
                                  <GoogleMap
                                    zoom={14}
                                    center={mapCenter}
                                    mapContainerStyle={{ width: '415px', height: '250px' }}
                                    onLoad={() => console.log('Map Component Loaded...')}
                                  >
                                    
                                  </GoogleMap>
                                )}
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
        </>
    );
};
export default React.memo(MapPinModal)