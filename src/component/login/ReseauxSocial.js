import { ImFacebook, ImGoogle } from 'react-icons/im';
import useLoginSubmit from '@hooks/useLoginSubmit';
import React, { useState } from 'react';

const ReseauxSocial = ()=>{
    const [modalOpen,setModalOpen] = useState(false);
    const { handleGoogleSignIn, GoogleLogin } = useLoginSubmit(setModalOpen);
    return (
        <>
            <div className="flex justify-between flex-col lg:flex-row">
                <button className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-600 bg-gray-100 shadow-sm md:px-2 my-1 sm:my-1 md:my-1 lg:my-0 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2">
                <ImFacebook /> <span className="ml-2">Login With Facebook</span>
                </button>

                <GoogleLogin
                clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
                render={(renderProps) => (
                    <button
                    className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-600 bg-gray-100 shadow-sm md:px-2 my-1 sm:my-1 md:my-1 lg:my-0 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
                    // onClick={renderProps.onClick}
                    onClick={console.log('je click')}
                    disabled={renderProps.disabled}
                    >
                    <ImGoogle /> <span className="ml-2">Login With Google</span>
                    </button>
                )}
                onSuccess={handleGoogleSignIn}
                onFailure={handleGoogleSignIn}
                cookiePolicy={'single_host_origin'}
                />
            </div>
        </>
    );
};

export default ReseauxSocial