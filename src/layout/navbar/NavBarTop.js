import React, {useContext, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {FiPhoneCall, FiUser, FiLogOut} from 'react-icons/fi';
import {signOut, useSession} from 'next-auth/react';
import home_delivery_icon from '../../../public/navbarTop/home_delivery_icon.png';
import best_quality_icon from '../../../public/navbarTop/best_quality_icon.png';
import best_prices_icon from '../../../public/navbarTop/best_prices_icon.png';

//internal import
import LoginModal from '@component/modal/LoginModal';
import {UserContext} from '@context/UserContext';
import Cookies from 'js-cookie';
import {useLogout} from '@hooks/useLogout';

import {useTranslation} from 'next-i18next';

const NavBarTop = () => {
  const {
    dispatch,
    state: {userInfo, isLogger},
  } = useContext(UserContext);
  const router = useRouter();
  const {handleLogOut} = useLogout();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    if (isLogger && userInfo?.user.email) {
      router.push('/user/dashboard');
    } else {
      // setModalOpen(!modalOpen);
      router.push('/auth/signin');
    }
  };

  const {t: translate} = useTranslation('navbar');

  // const handleLogOut = () => {
  //   dispatch({ type: 'USER_LOGOUT' });
  //   dispatch({type: 'SHOP_CONNECTED',payload:null})
  //   dispatch({type: 'SAVE_ISLOGGER',payload:false})
  //   Cookies.remove('userInfo');
  //   Cookies.remove('couponInfo');
  //   Cookies.remove('isLogger');
  //   router.push('/');
  // };

  return (
    <>
      {modalOpen && <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}

      <div className="hidden lg:block bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="text-primary py-2 font-sans text-xs font-medium border-b grid grid-cols-3 divide-x-2 divide-slate-400/75">
            {/* free delivery */}
            <div className="flex">
              <div className=" mr-auto items-center inline-flex gap-x-1">
                {/* illus */}

                <Image src={home_delivery_icon} height={40} alt="home_delivery_icon" objectFit="contain" />

                {/* message */}
                <div>
                  <div children={translate('Free delivery')} className=" font-black text-base" />
                  <div children={translate('above')} className=" text-xs font-semibold" />
                </div>
              </div>
            </div>

            {/* high quality */}
            <div className="flex">
              <div className=" mx-auto items-center inline-flex gap-x-1">
                {/* illus */}

                <Image src={best_quality_icon} height={30} alt="best_quality_icon" objectFit="contain" />

                {/* message */}
                <div children={translate('High quality')} className=" font-black text-base" />
              </div>
            </div>

            {/* best prices */}
            <div className="flex">
              <div className=" ml-auto items-center inline-flex gap-x-1">
                {/* illus */}

                <Image src={best_prices_icon} height={25} alt="best_prices_icon" objectFit="contain" />

                {/* message */}
                <p children={translate('Best prices')} className=" font-black text-base" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarTop;
