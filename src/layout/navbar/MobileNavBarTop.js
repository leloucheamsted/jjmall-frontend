import { signOut, useSession } from 'next-auth/react';
import home_delivery_icon from '../../../public/navbarTop/home_delivery_icon.png';
import best_quality_icon from '../../../public/navbarTop/best_quality_icon.png';
import best_prices_icon from '../../../public/navbarTop/best_prices_icon.png';
import { ChatIcon, UserIcon, ShoppingCartIcon, ShoppingBagIcon, UserGroupIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCart } from 'react-use-cart';
import { IoSearchOutline } from 'react-icons/io5';
import { FiShoppingCart, FiUser, FiBell, FiTrello, FiMessageSquare, FiGlobe, FiBookmark } from 'react-icons/fi';

//internal import
import LoginModal from '@component/modal/LoginModal';
import { UserContext } from '@context/UserContext';
import Cookies from 'js-cookie';
import { useLogout } from '@hooks/useLogout';
import { SidebarContext } from '@context/SidebarContext';
import logo from '../../../public/logo/jjmall_logo.png';
import MobileNavbarPromo from '@layout/navbar/MobileNavbarPromo';
import useAsync from '@hooks/useAsync';
import CategoryServices from '@services/CategoryServices';
import { FormattedSearchResult } from './Navbar';
import GenericProductServices from '@services/GenericProductServices';



const MobileNavBarTop = () => {
  const { handleLogOut } = useLogout();
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [searchText, setSearchText] = useState('');
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();

  const {
    dispatch,
    state: { userInfo, isLogger, shopInfo },
  } = useContext(UserContext);

  const handleModal = () => {
    if (isLogger && userInfo?.user.email) {
      router.push('/user/dashboard');
    } else {
      // setModalOpen(!modalOpen);
      router.push('/auth/signin');
    }
  };

  // const {status, data} = useSession();

  // get categories
  const { data } = useAsync(() => CategoryServices.getShowingCategory());
  const categories = data?.data?.filter(cat => !cat.attributes?.parent?.data) || [];

  // prepare the search bar | bad way of doing
  const [genericProducts, setGenericProducts] = useState([]);

  useEffect(async () => {
    const results = await GenericProductServices.getGenericProduct();
    const genericProducsVar = [];
    if (results) {
      results.forEach(elt => {
        var obj = { ...elt.attributes, id: elt.id };
        genericProducsVar.push(obj);
      });
    }
    setGenericProducts(genericProducsVar);
  }, []);

  const handleOnSearch = (searchText, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    router.push(`/search?query=${searchText}`, null, { scroll: false });
  };

  const handleOnSelect = item => {
    router.push(`/search?genericProductId=${item.id}`, null, { scroll: false });
  };

  const secondBarNavData = [
    { label: 'Account', IconElm: UserIcon, handleClick: () => { userInfo ? router.push('/user/dashboard') : router.push('/auth/signin') } },
    { label: 'Cart', IconElm: ShoppingCartIcon, handleClick: () => toggleCartDrawer },
    { label: 'Chat', IconElm: ChatIcon, handleClick: () => console.log('Chat') },
    { label: 'My Groups', IconElm: UserGroupIcon, handleClick: () => console.log('My Groups') },
    { label: 'My Orders', IconElm: ShoppingBagIcon, handleClick: () => { userInfo ? router.push('/order/order-list') : console.log('my orders') } },
    // {label: 'My Orders', IconElm: ShoppingBagIcon, handleClick: () => {userInfo? router.push('/user/my-orders'): console.log('my orders')}},
  ];

  return (
    // sm:static sm:inset-auto inset-y-0 sm:ml-6 sm:pr-0
    <>
      {modalOpen && <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      <div className="space-y-4 lg:hidden">
        {/* first bloc header mobile */}
        <div className="bg-primary p-8 pb-0 font-serif">
          {/* search block */}
          <div className="searchNavbar">
            <ReactSearchAutocomplete
              items={genericProducts}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              maxResults={4}
              formatResult={FormattedSearchResult}
              placeholder="Search for products (e.g. fish, apple, oil)"
              styling={{ borderRadius: '4px', zIndex: 200, border: 'none' }}
            />
          </div>

          {/* categorie nav menu scrollable */}
          <div className="text-white sm:text-lg font-bold flex gap-6 capitalize pt-4 overflow-x-auto">
            {categories.slice(0, 3).map(cat => {
              const isCategoryActive = router.query.category === cat.attributes.name;
              return (
                <p
                  // onClick={searchProductByCategory(cat.attributes.name)}
                  className={clsx('w-44 text-center line-clamp-1 whitespace-nowrap', isCategoryActive ? 'text-primary underline underline-offset-4' : "hover:text-primary/80")}
                >
                  {cat.attributes.name}
                </p>
              );
            })}
            <p
              // onClick={searchProductByCategory('cat.attributes.name')}
              className={clsx('w-44 text-center line-clamp-1 whitespace-nowrap', false && 'text-primary underline underline-offset-4')}
            >
              Special offer
            </p>
            {/* [link] have a fix width truncated if necessar (3 on mobile and 5 on medium screen)*/}
          </div>
        </div>

        <div className="shadow-lg bg-white border-l-0 border-r-0 border-3 border border-slate-300 p-3 text-sm font-semibold">
          <div className="grid grid-cols-5 text-neutral-600">
            {secondBarNavData.map(({ label, IconElm, handleClick }, ind) => (
              <div key={ind} onClick={handleClick} role="button" className="flex flex-col items-center justify-center gap-2 overflow-auto">
                <IconElm className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
                <p className="truncate leading-none text-xs sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavBarTop;

// const handleLogOut = () => {
//   dispatch({ type: 'USER_LOGOUT' });
//   dispatch({type: 'SHOP_CONNECTED',payload:null})
//   dispatch({type: 'SAVE_ISLOGGER',payload:false})
//   Cookies.remove('userInfo');
//   Cookies.remove('couponInfo');
//   Cookies.remove('isLogger');
//   router.push('/');
// };
// const { status, data } = useSession();
