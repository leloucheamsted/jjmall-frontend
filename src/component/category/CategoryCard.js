import React, {useContext, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {IoChevronForwardOutline, IoChevronDownOutline, IoRemoveSharp} from 'react-icons/io5';
// import category_nofound_img from '../../../public'
import category_nofound_img from '../../../public/category_nofound.svg';

//internal import
import {SidebarContext} from '@context/SidebarContext';

const CategoryCard = ({title, icon, nested}) => {
  const [show, setShow] = useState(false);
  const showCategory = () => setShow(!show);
  const router = useRouter();
  const {closeCategoryDrawer} = useContext(SidebarContext);

  const handleSubCategory = children => {
    router.push(`/search?category=${children.toLowerCase().replace('&', '').split(' ').join('-')}`);
    closeCategoryDrawer();
  };

  return (
    <>
      <a onClick={showCategory} className="p-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600" role="button">
        <Image src={icon || category_nofound_img} width={18} height={18} alt={title} aria-hidden="true" />

        <div className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full hover:text-emerald-600">
          {title}
          <span className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400">
            {show ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
          </span>
        </div>
      </a>
      {show ? (
        <ul className="pl-6 pb-3 pt-1 -mt-1">
          {nested?.map(({attributes: {name: categoryName}}, index) => (
            <li key={index}>
              <a
                onClick={() => handleSubCategory(categoryName)}
                className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
              >
                <span className="text-xs text-gray-500 pr-1">
                  <IoRemoveSharp />
                </span>
                {categoryName}
              </a>
            </li>
          ))}
          {!nested?.length && (
            <li>
              <a
                onClick={() => handleSubCategory(title)}
                className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
              >
                <span className="text-xs text-gray-500 pr-1">
                  <IoRemoveSharp />
                </span>
                {title}
              </a>
            </li>
          )}
        </ul>
      ) : null}
    </>
  );
};

export default CategoryCard;
