import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {IoChevronForwardSharp} from 'react-icons/io5';
import category_nofound_img from '../../../public/category_nofound.svg'

//internal import
import useAsync from '@hooks/useAsync';
import CategoryServices from '@services/CategoryServices';

const FeatureCategory = () => {
  const router = useRouter();
  const {data, error} = useAsync(() => CategoryServices.getShowingCategory());
// console.log('categories', data)
  return (
    <>
      {error ? (
        <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
          <span> {error}</span>
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
          {data?.data
            ?.filter(({attributes}) => !attributes?.parent?.data)
            ?.map((data, i) => {
              const category = data.attributes;
              return (
                <li className="group" key={i + 1}>
                  <div
                    // onClick={() => router.push(`/search?Category=${category.parent.toLowerCase().replace("&", "").split(" ").join("-")}`)}
                    className="flex w-full h-full border border-gray-100 shadow-sm bg-white p-4 cursor-pointer transition duration-200 ease-linear transform group-hover:shadow-lg"
                  >
                    <div className="flex items-center">
                      <div>
                        {category.icon?.data ? 
                        <Image src={category.icon?.data?.attributes.url} alt={category.name} width={35} height={35} />
                        : 
                        <Image src={category_nofound_img} alt={category.name} width={35} height={35} />
                        }
                      </div>
                      <div className="pl-4">
                        <h3 className="text-sm text-gray-600 font-serif font-medium leading-tight line-clamp-1 group-hover:text-primary">
                          {category.name}
                        </h3>
                        <ul className="pt-1 mt-1">
                          {category.children?.data?.slice(0, 3).map(children => (
                            <li key={children.id} className="pt-1">
                              <Link href={`/search?category=${children?.attributes?.name}`}>
                                <a className="flex items-center font-serif text-xs text-gray-400 hover:text-emerald-600 cursor-pointer">
                                  <span className="text-xs text-gray-400 hover:text-emerald-600">
                                    <IoChevronForwardSharp />
                                  </span>
                                  {children?.attributes?.name}
                                </a>
                              </Link>
                            </li>
                          ))}
                          {!category?.children?.data && (
                            <li className="pt-1">
                              <Link href={`/search?category=${category.name}`}>
                                <a className="flex items-center font-serif text-xs text-gray-400 hover:text-emerald-600 cursor-pointer">
                                  <span className="text-xs text-gray-400 hover:text-emerald-600">
                                    <IoChevronForwardSharp />
                                  </span>
                                  {category.name}
                                </a>
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
};

export default FeatureCategory;
