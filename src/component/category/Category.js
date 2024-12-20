import {useContext, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {IoClose} from 'react-icons/io5';

//internal import
import {pages} from '@utils/data';
import useAsync from '@hooks/useAsync';
import Loading from '@component/preloader/Loading';
import {SidebarContext} from '@context/SidebarContext';
import CategoryServices from '@services/CategoryServices';
import CategoryCard from '@component/category/CategoryCard';
import logo from '../../../public/logo/jjmall_logo.png';
import {FiShoppingCart} from 'react-icons/fi';
import AddProduct from '@component/modal/AddProduct';
import {Dialog} from '@headlessui/react';
import AddCategorie from '@component/modal/AddCategorie';
import {useRouter} from 'next/router';
import {UserContext} from '@context/UserContext';

const Category = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  //const [modalOpen, setModalOpen] = useState(false);
  const {categoryDrawerOpen, closeCategoryDrawer} = useContext(SidebarContext);
  const {data, loading, error} = useAsync(() => CategoryServices.getShowingCategory());
  const categories = data?.data || []

  const showPopup = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };

  const {
    dispatch,
    state: {userInfo},
  } = useContext(UserContext);

  return (
    <div className="flex flex-col w-full h-full bg-white  scrollbar-hide">
      {/* {modalOpen && (
        <AddProduct modalOpen={modalOpen} setModalOpen={setModalOpen}></AddProduct>
      )} */}
      {categoryDrawerOpen && (
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-primary text-white border-b border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center">
            <Link href="/">
              <a className="mr-10">
                
                <Image width={50} height={40} src={logo} alt="logo" />
              </a>
            </Link>
          </h2>
          <button
            onClick={closeCategoryDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-red-500 p-2 focus:outline-none transition-opacity hover:text-red-600"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      )}
      <div className="overflow-y-scroll scrollbar-hide w-full max-h-full">
        {categoryDrawerOpen && (
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">All Categories</h2>
        )}
        {error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {error}</span>
          </p>
        ) : categories.length === 0 ? (
          <Loading loading={loading} />
        ) : (
          <div className="relative grid gap-2 p-6">
            {categories?.filter(({attributes}) => !attributes?.parent?.data)?.map(category => (
              <CategoryCard key={category.id} title={category.attributes.name} icon={category.attributes.icon?.data?.attributes.url} nested={category.attributes.children.data} />
            ))}
          </div>
        )}

        {categoryDrawerOpen && (
          <div className="relative grid gap-2 mt-5">
            <h3 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">Pages</h3>
            <div className="relative grid gap-1 p-6">
              {userInfo?.user.is_merchant && (
                <button
                  onClick={() => {
                    closeCategoryDrawer();
                    router.push('/product/addProduct');
                  }}
                  className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                >
                  <FiShoppingCart className="flex-shrink-0 h-4 w-4" />
                  <span className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                    Add Products
                  </span>
                </button>
              )}
              {pages.map(item => (
                <a
                  key={item.title}
                  href={item.href}
                  className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                >
                  <item.icon className="flex-shrink-0 h-4 w-4" aria-hidden="true" />
                  <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                    {item.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
