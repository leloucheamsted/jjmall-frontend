import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCart } from "react-use-cart";
import { FiHome, FiUser, FiShoppingCart, FiAlignLeft, FiShoppingBag, FiShieldOff, FiMoreHorizontal, FiMoreVertical, FiAlignCenter, FiAlignJustify, FiGrid } from "react-icons/fi";

import { UserContext } from "@context/UserContext";
import LoginModal from "@component/modal/LoginModal";
import { SidebarContext } from "@context/SidebarContext";
import CategoryDrawer from "@component/drawer/CategoryDrawer";
import { IoBookmark, IoBookmarkOutline, IoBookmarks, IoBookmarkSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import useAddToCart from "@hooks/useAddToCart";

// import { useSession } from "next-auth/react";

const MobileFooter = ({product={},show_group=false}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDetails,setIsDetails] = useState(show_group);

  const { handleAddItem, setItem, item } = useAddToCart();
  const { toggleCartDrawer, toggleCategoryDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();

  const {
    state: { userInfo,isLogger },
  } = useContext(UserContext);

  const handleOpenGroup = (e)=>{
    if (e?.attributes?.type == "group") {
      router.push(`/product/groupBuy?id=${product.id}`, null, { scroll: false });
    } else if (e?.attributes?.type == "single") {
      handleAddItem(product, e?.attributes?.price);
    }
  };
  // const { status, data } = useSession();
  return (
    <>
      <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow scrollbar-hide w-full">
        <CategoryDrawer className="w-6 h-6 drop-shadow-xl" />
      </div>
      <footer className="lg:hidden drop-shadow-xl border-t border-slate-400 rounded-tr-[20px] rounded-tl-[5px] fixed z-30 bottom-0 bg-white flex items-center justify-between w-full h-16 px-3 sm:px-10">
        <button
          onClick={()=>{router.push('/')}}
          className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-emerald-600 hover:text-white flex-shrink-0  relative focus:outline-none"
        >
          <span className="text-xl">
            {" "}
            <FiHome className="w-6 h-6 drop-shadow-xl " />
          </span>
        </button>
        {/* <Link href="/">
          <a className="text-xl text-black " rel="noreferrer" aria-label="Home">
            {" "}
            <FiHome className="w-6 h-6 drop-shadow-xl " />
            
          </a>
        </Link> */}
        <button
          aria-label="Bar"
          onClick={toggleCategoryDrawer}
          className="flex items-center w-12 h-12 rounded-full hover:bg-emerald-600 hover:text-white justify-center flex-shrink-0 relative focus:outline-none"
        >
          <span className="text-xl ">
            {/* <FiAlignLeft className="w-6 h-6 drop-shadow-xl" /> */}
            <FiGrid className="w-6 h-6 drop-shadow-xl" />
          </span>
        </button>
        {!isDetails &&(
          <div className="flex items-center w-6/12 justify-between">
            <button
              onClick={toggleCartDrawer}
              className="h-9 w-9 relative w-12 h-12 rounded-full hover:bg-emerald-600 hover:text-white whitespace-nowrap inline-flex items-center justify-center text-[#37474F] text-lg"
            >
              <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 bg-red-500 rounded-full">
                {totalItems}
              </span>
              {/* <FiShoppingCart className="w-6 h-6 drop-shadow-xl" /> */}
              <FiShoppingBag className="w-6 h-6 drop-shadow-xl"/>
            </button>
            <button
              aria-label="User"
              type="button"
              className="flex justify-center items-center text-xl w-12 h-12 rounded-full hover:bg-emerald-600 hover:text-white text-[#37474F] indicator justify-center"
            >
              <FiAlignJustify className="w-6 h-6 drop-shadow-xl" />
              
              {/* {
                (isLogger && userInfo?.user?.image ? (
                    <Link href="/user/dashboard">
                      <a className="relative top-1 w-6 h-6">
                        <Image
                          width={29}
                          height={29}
                          src={userInfo.user.image}
                          alt="user"
                          className="rounded-full"
                        />
                      </a>
                    </Link>
                  ) : (
                    (isLogger && userInfo?.user.username ? (
                        <Link href="/user/dashboard">
                          <a className="leading-none font-bold font-serif block">
                            {userInfo?.user.username [0]}
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
                      ))
                  ))
              } */}
            </button>
        </div>
        )}
        {isDetails &&(
          
          <div className="flex items-center w-6/12 h-16 justify-between">
            {product?.attributes?.prices.data.length > 0 &&(
              <div className="flex w-full ">
                {product?.attributes?.prices.data.map((e,index) => (
              <button 
                onClick={() => {
                  handleOpenGroup(e);
                }}
                key={index + 1}
                className={e.attributes.type == "single"? "w-full flex flex-col items-center justify-center h-16 text-sm text-white font-[Inter] leading-4 bg-[#898A8D3D] \
                cursor-pointer border border-slate-200 hover:text-white hover:bg-slate-300":
                "w-full flex flex-col items-center justify-center h-16 text-sm text-white font-[Inter] leading-4 bg-[#288A36] \
                cursor-pointer border border-slate-200 hover:text-white hover:bg-slate-300"
                }
              >
                <span className="w-full flex text-center justify-center">{e.attributes.price} XAF</span>
                <span className="w-full flex text-center justify-center">{e.attributes.type == "single" ? "single buy" : "buy in group"}</span>
              </button>
              
              ))}
            </div>
            )}
          </div>
        )}
      </footer>
    </>
  );
};

export default dynamic(() => Promise.resolve(MobileFooter), { ssr: false });
