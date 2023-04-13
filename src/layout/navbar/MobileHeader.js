
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";

import { FiChevronLeft } from "react-icons/fi";

//internal import


const MobileHeader = ({title='Group Buy'}) => {

  const router = useRouter();

  return (
      // sm:static sm:inset-auto inset-y-0 sm:ml-6 sm:pr-0
    <>
      
      <div className="lg:hidden  block bg-gray-100 sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-2">
          <div className="top-bar h-14 lg:h-auto flex items-center justify-between mx-auto">
            {/* <Link href="/" className="">
              <div role="button" className="border border-white items-center justify-center h-8 w-8 hover:bg-primary hover:text-white rounded-full  static inset-auto ml-1 pr-0 flex left-0 relative ">
                <FiChevronLeft className='className="w-5 h-auto drop-shadow-xl"'/>
              </div>
            </Link> */}
            
            <button onClick={()=>{router.back()}} className="border border-white items-center justify-center h-8 w-8 hover:bg-primary hover:text-white rounded-full  static inset-auto ml-1 pr-0 flex left-0 relative ">
              {/* <Image src={logo} alt="logo" objectFit="contain" /> */}
              <FiChevronLeft className='className="w-5 h-auto drop-shadow-xl"'/>
            </button>
            
            <div className="lg:hidden py-4 w-full flex ml-5">
              {/* md:items-center justify-center items-center */}
              {/* lg:mr-12 xl:mr-12 hidden md:hidden lg:block */}

                <span  className='text-center font-serif text-sm font-bold'>{title}</span>
            </div>
          </div>
          
        </div>
        
      </div>
    </>
  );
};

export default MobileHeader;
