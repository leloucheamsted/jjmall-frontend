import { Fragment } from 'react';
import Link from 'next/link';
import { Transition, Popover } from '@headlessui/react';
import { ChevronDownIcon, ShoppingBagIcon, UserGroupIcon } from '@heroicons/react/outline';
import React, { useContext, useState } from 'react';
// import { useSession } from "next-auth/react";

//internal import
import { pages } from '@utils/data';
import AddProduct from '@component/modal/AddProduct';
import { UserContext } from '@context/UserContext';
import Category from '@component/category/Category';
import AddCategorie from '@component/modal/AddCategorie';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const NavbarPromo = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  // const { status, data } = useSession();
  // console.log("session info", status, data);
  const {
    state: { userInfo },
  } = useContext(UserContext);

  const { t: translate } = useTranslation('navbar');

  const OrderBtnStyled = (
    <span
      className={clsx(
        'font-serif mx-4 py-2 font-semibold inline-flex gap-1',
        userInfo ? 'opacity-100 hover:text-emerald-600' : 'opacity-50',
      )}
      title={userInfo ? undefined : 'You must be sign'}
      role={userInfo ? undefined : 'button'}
    >
      <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
      <span>{translate('myorders')}</span>
    </span>
  );
  const GroupsBtnStyled = (
    <span
      className={clsx(
        'font-serif mx-4 py-2 font-semibold inline-flex gap-1',
        userInfo ? 'opacity-100 hover:text-emerald-600' : 'opacity-50',
      )}
      title={userInfo ? undefined : 'You must be sign'}
      role={userInfo ? undefined : 'button'}
    >
      <UserGroupIcon fill="black" className="h-5 w-5" aria-hidden="true" />
      <span>{translate('groups')}</span>
    </span>
  );

  return (
    <>
      {modalOpen && <AddCategorie modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      <div className="hidden lg:block xl:block bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
          <div className="inline-flex">
            <Popover className="relative">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center md:justify-start md:space-x-10">
                  <Popover.Group as="nav" className="md:flex space-x-10 items-center">
                    <Popover className="relative font-serif">
                      <Popover.Button className="group inline-flex items-center py-2 hover:text-emerald-600 focus:outline-none">
                        <span className="font-serif font-semibold">{translate('categories')}</span>
                        <ChevronDownIcon className="ml-1 h-3 w-3 group-hover:text-emerald-600" aria-hidden="true" />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs c-h-65vh bg-white">
                          <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                            <Category />
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>

                    {userInfo ? <Link href={'/order/order-list'} children={<a children={GroupsBtnStyled} />} /> : GroupsBtnStyled}

                    {userInfo ? <Link href={'/order/order-list'} children={<a children={OrderBtnStyled} />} /> : OrderBtnStyled}

                    {userInfo?.user.is_merchant && (
                      <button
                        onClick={() => router.push('/user/dashboard')}
                        className="flex font-serif mx-4 py-2 font-semibold hover:text-emerald-600"
                      >
                        {translate('dashboard')}
                      </button>
                    )}

                    <Link href="/offer">
                      <a className="relative inline-flex items-center h-7 bg-red-100 font-serif ml-4 py-2 px-4 rounded font-semibold text-red-500 hover:text-red-600">
                        {translate('specialoffers')}
                        <div className="absolute flex w-2 h-2 left-auto -right-1 -top-1">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </div>
                      </a>
                    </Link>
                  </Popover.Group>
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;
