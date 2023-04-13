import {useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {useCart} from 'react-use-cart';
import {IoSearchOutline} from 'react-icons/io5';
import {FiShoppingCart, FiUser, FiBell, FiTrello, FiMessageSquare, FiGlobe} from 'react-icons/fi';

import {ReactSearchAutocomplete} from 'react-search-autocomplete';

//internal import
import NavbarPromo from '@layout/navbar/NavbarPromo';
import {UserContext} from '@context/UserContext';
import LoginModal from '@component/modal/LoginModal';
import CartDrawer from '@component/drawer/CartDrawer';
import {SidebarContext} from '@context/SidebarContext';
import logo from '../../../public/logo/jjmall_logo.png';
import French from '../../../public/french.png';
import British from '../../../public/british.png';
import GenericProductServices from '@services/GenericProductServices';
import clsx from 'clsx';

import {useTranslation} from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const {toggleCartDrawer} = useContext(SidebarContext);
  const {totalItems} = useCart();
  const router = useRouter();
  const [genericProducs, setGenericProducts] = useState([]);
  const {locale} = useRouter();
  const {t: translate} = useTranslation('navbar');

  useEffect(async () => {
    console.log('navbar');
    const results = await GenericProductServices.getGenericProduct();
    var genericProducs = [];
    // cette fonction genere une erreur sur la page d'acceuil lorsqu'il ya pas de connexion
    // donc il faut verifier que results contient bien des données avant le faire forEach
    // raison pour laquelle j'ai mis un if
    if (results) {
      results.forEach(elt => {
        var obj = {...elt.attributes, id: elt.id};
        genericProducs.push(obj);
      });
    }
    setGenericProducts(genericProducs);
    // console.log(genericProducs[0]);
  }, []);

  const handleOnSearch = (searchText, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(searchText, results);
    router.push(`/search?query=${searchText}`, null, {scroll: false});
    searchText = '';
  };

  const handleOnHover = result => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = item => {
    // the item selected
    console.log(item);
    router.push(`/search?genericProductId=${item.id}`, null, {scroll: false});
    searchText = '';
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const {
    state: {shopInfo, isLogger, userInfo},
  } = useContext(UserContext);

  // console.log('val isLog:',isLogger);
  // console.log('val userInfo:',userInfo)

  const handleSubmit = e => {
    e.preventDefault();
    if (searchText) {
      console.log(searchText);
      router.push(`/search?query=${searchText}`, null, {scroll: false});
      setSearchText('');
    } else {
      router.push(`/ `, null, {scroll: false});
      setSearchText('');
    }
  };

  return (
    <>
      <CartDrawer />
      {modalOpen && <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}

      <div className="hidden lg:block lg:bg-primary bg-gray-100 sticky top-24 z-20 lg:top-0 lg:z-20">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="top-bar h-16 lg:h-auto flex items-center justify-between mx-auto">
            <Link href="/" className="">
              <div role="button" className="border border-white mr-3 relative lg:mr-12 xl:mr-12 hidden md:hidden lg:block h-20 -my-10 w-20">
                <Image src={logo} alt="logo" objectFit="contain" />
              </div>
            </Link>

            <div className="searchNavbar w-full py-4 transition-all duration-200 ease-in-out lg:flex lg:max-w-[520px] xl:max-w-[750px] 2xl:max-w-[900px] md:mx-12 lg:mx-4 xl:mx-0">
              <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
                <div className="flex flex-col mx-auto w-full">
                  <ReactSearchAutocomplete
                    items={genericProducs}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    maxResults={4}
                    formatResult={FormattedSearchResult}
                    placeholder={translate('searchText')}
                    styling={{borderRadius: '4px', zIndex: 200, border: 'none'}}
                  />
                </div>
              </div>
            </div>
            <div className="hidden py-4 md:hidden md:items-center lg:flex absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* {userInfo && (
                <button className="pr-5 text-white text-2xl font-bold" aria-label="Alert">
                  <FiBell className="w-6 h-6 drop-shadow-xl" />
                </button>
              )} */}

              <button aria-label="Total" onClick={toggleCartDrawer} className="relative px-6 text-white text-2xl font-bold">
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalItems}
                </span>
                <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
              </button>
              {/* Profile dropdown */}

              {/* accès language */}
              <button className="pr-5 text-white text-2xl font-bold" aria-label="Language">
                {/* <span className="leading-none font-bold font-serif block">
                  <FiGlobe className="w-6 h-6 drop-shadow-xl" />
                  <h1>current local {locale}</h1>
                  {locales.map(l => (
                    <button key={l} onClick={handleClick(l)} className="ml-1 p-1 bg-gray-300 rounded">
                      {l}
                    </button>
                  ))}
                </span> */}
                <LanguageSwitcher British={British} French={French} />
              </button>

              {/* accès messagerie */}
              {userInfo && (
                <Link href="/chat/chat">
                  <a className="pr-5 relative text-white text-2xl font-bold" aria-label="Chats">
                    <span className="leading-none font-bold font-serif block">
                      <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-2 w-2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"></span>
                      <FiMessageSquare className="w-6 h-6 drop-shadow-xl" />
                    </span>
                  </a>
                </Link>
              )}

              <button className="text-white text-2xl font-bold" aria-label="Shop">
                {/* <FiTrello className="w-6 h-6 drop-shadow-xl" /> */}
                {shopInfo?.attributes.logo ? (
                  <Link href="/">
                    <a className="relative top-1 w-6 h-6">
                      <Image
                        width={29}
                        height={29}
                        src={shopInfo.attributes.logo.data ? shopInfo?.attributes.logo.data.attributes.url : ''}
                        alt="shop"
                        className="bg-white rounded-full"
                      />
                    </a>
                  </Link>
                ) : shopInfo?.attributes?.name ? (
                  <Link href="/">
                    <a className="leading-none font-bold font-serif block">
                      {shopInfo?.attributes.name[0]}
                      {shopInfo?.attributes.name[1]}
                    </a>
                  </Link>
                ) : null}
              </button>

              <button className="pl-8 text-white text-2xl font-bold group" aria-label="Login">
                {userInfo && isLogger ? (
                  <Link href="/user/dashboard">
                    <a
                      className={clsx(
                        userInfo?.user?.image
                          ? 'relative top-1 w-6 h-6'
                          : 'font-bold font-serif h-8 w-8 border text-lg border-white rounded-full group-hover:text-primary group-hover:bg-white flex items-center justify-center',
                      )}
                    >
                      {userInfo?.user?.image ? (
                        <Image
                          width={29}
                          height={29}
                          src={imageUrl || userInfo?.user?.image}
                          alt="user"
                          className="bg-white rounded-full"
                        />
                      ) : (
                        <span className="align-middle">
                          {userInfo?.user?.username[0]?.toUpperCase()}
                          {/* {userInfo.user.username[1]} */}
                        </span>
                      )}
                    </a>
                  </Link>
                ) : (
                  <Link href="/auth/signin">
                    <a className="leading-none font-bold font-serif block">
                      <FiUser className="w-6 h-6 drop-shadow-xl" />
                    </a>
                  </Link>
                )}
                {/* {isLogger && userInfo?.user?.image ? (
                  <Link href="/user/dashboard">
                    <a className="relative top-1 w-6 h-6">
                      <Image width={29} height={29} src={imageUrl || userInfo?.user?.image} alt="user" className="bg-white rounded-full" />
                    </a>
                  </Link>
                ) : isLogger && userInfo.user.username ? (
                  <Link href="/user/dashboard">
                    <a className="leading-none font-bold font-serif block">
                      {userInfo.user.username[0]}
                      {userInfo.user.username[1]}
                    </a>
                  </Link>
                ) : (
                  <Link href="/auth/signin">
                    <a className="leading-none font-bold font-serif block">
                      <FiUser className="w-6 h-6 drop-shadow-xl" />
                    </a>
                  </Link>
                  // <span onClick={() => setModalOpen(!modalOpen)}>
                  //   <FiUser className="w-6 h-6 drop-shadow-xl" />
                  // </span>
                )} */}
              </button>
            </div>
          </div>
        </div>

        {/* second header */}
        <NavbarPromo />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), {ssr: false});

export const FormattedSearchResult = item => {
  return (
    <>
      <div className="tengah py-2 px-3 flex items-center justify-items-start">
        <figure>
          <Image src={item?.picture?.data?.attributes?.url} alt={item.name} width={80} height={80} className="rounded-lg" />
        </figure>
        <div className="ml-3">
          <div className="flex items-center font-serif">
            <h6 className="pl-1 text-base font-medium text-gray-600">
              <span className="text-lg md:text-xl lg:text-xl text-red-500 font-bold">{item.price}</span> XAF
            </h6>
          </div>
          <h2 className="pl-1 font-serif text-base text-gray-700 leading-6 font-semibold mb-2">{item.name}</h2>
        </div>
      </div>
    </>
  );
};
