import React, { useCallback, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useState } from 'react';
import Tags from '@component/common/Tags';
import Stock from '@component/common/Stock';
import Price from '@component/common/Price';
import useAddToCart from '@hooks/useAddToCart';
import MainModal from '@component/modal/MainModal';
import { SidebarContext } from '@context/SidebarContext';
import { IoClose, IoPlay } from 'react-icons/io5';
import CarouselVideo from '@component/common/CarouselVideo';
import { notifyError, notifySuccess } from '@utils/toast';
import { useCart } from 'react-use-cart';
import OrderServices from '@services/OrderServices';

const ProductModal = ({ modalOpen, setModalOpen, product }) => {
  const router = useRouter();
  const [modalVideoOpen, setModalVideoOpen] = useState(false);
  const { setIsLoading, isLoading } = useContext(SidebarContext);
  const { handleAddItem, setItem, item } = useAddToCart();
  const [loading, setLoading] = useState(false);
  const { items, cartTotal } = useCart()

  const handleMoreInfo = (slug) => {
    setModalOpen(false);

    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
  };


  return (
    <>
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl overflow-hidden">
            <div onClick={() => handleMoreInfo(product.id)} className="flex-shrink-0 flex items-center justify-center h-[50%] xl:h-auto cursor-pointer">
              <Image src={product.attributes.assets.data.length > 0 ? product.attributes.assets.data[0].attributes.path?.data?.attributes.url : ""} width={420} height={420} alt={product.title} />
            </div>
            {modalVideoOpen == true ? (
              //  Video view
              <div className="relative p-0 md:p-0 flex  text-left bg-black overflow-hidden  xl:w-[500px]">
                {/* <div className='h-full  w-full flex flex-col p-5 md:p-8 text-left'> */}
                <CarouselVideo />
                {/* <iframe allowFullScreen frameborder="0" class="w-full h-full  absolute left-0 top-0 aspect-video hover:aspect-square" src="https://res.cloudinary.com/chris101/video/upload/v1645684663/video_3.mp4">
                  </iframe> */}
                {/* </div> */}
                <div className="absolute object-cover left-3 top-2">
                  <button
                    onClick={() => setModalVideoOpen(false)}
                    type="button"
                    className="inline-flex justify-center px-2 py-2 text-base font-medium text-bl  bg-opacity-60 bg-[#000] text-white border border-transparent rounded-full hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    <IoClose />
                  </button>
                </div>
                {/* Play Button */}

                {/* <div className="absolute left-15 top-5">
                <button
                    onClick={() => setModalVideoOpen(false)}
                    type="button"More
                    className="inline-flex justify-center px-2 py-2 text-base font-medium text-white bg-[#00000] border border-transparent rounded-full hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  > 
                    <IoClose />
                  </button>
                </div> */}
              </div>
            ) : (
              <div className="w-full flex flex-col p-5 md:p-8 text-left">
                <div className="mb-2 md:mb-2.5 block -mt-1.5">
                  <h1 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold font-serif hover:text-black cursor-pointer">{product.title}</h1>

                  <Stock product={product} />
                </div>
                <p className="text-sm leading-6 text-gray-500 md:leading-6">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <Price product={product} />
                  <button onClick={() => setModalVideoOpen(!modalVideoOpen)} className="font-sans font-medium text-sm text-orange-500">
                    View Video
                  </button>
                </div>

                <div className="flex items-center mt-4">
                  <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                    <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                      <button
                        onClick={() => setItem(item - 1)}
                        disabled={item === 1}
                        className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                      >
                        <span className="text-dark text-base">
                          <FiMinus />
                        </span>
                      </button>
                      <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                        {item}
                      </p>
                      <button
                        onClick={() => setItem(item + 1)}
                        disabled={product.quantity < item || product.quantity === item}
                        className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                      >
                        <span className="text-dark text-base">
                          <FiPlus />
                        </span>
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddItem(product)}
                      disabled={product.quantity < 1}
                      className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-primary hover:bg-emerald-600 w-full h-12"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                    <div>
                      <span className="font-serif font-semibold py-1 text-sm d-block">
                        <span className="text-gray-700">Category:</span> <span className="text-gray-500">{product.children}</span>
                      </span>

                      <Tags product={product} />
                    </div>
                    <div>
                      <button onClick={() => handleMoreInfo(product.id)} className="font-sans font-medium text-sm text-orange-500">
                        More Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default React.memo(ProductModal);
