import { Fragment } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { useContext, useState } from "react";
// import { useSession } from "next-auth/react";

//internal import
import { pages } from '@utils/data';
import AddProduct from '@component/modal/AddProduct';
import { UserContext } from "@context/UserContext";
import Category from "@component/category/Category";
import AddCategorie from "@component/modal/AddCategorie";

const MobileNavbarPromo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const { status, data } = useSession();
  // console.log("session info", status, data);
  const { state: { userInfo } } = useContext(UserContext);
  return (
    <>
      {modalOpen && (
        <AddCategorie modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      <div className="lg:hidden block bg-gray-100 border-b">
        <div className="max-w-screen-2xl mx-auto h-10 flex justify-between items-center">
          {/* <div className="inline-flex">
          </div> */}
          <div className="flex">
            <Link href="/privacy-policy">
              <a className="font-serif mx-4 py-2 text-sm text-[#24893A] font-medium hover:text-emerald-600">
                High volume sales
              </a>
            </Link>
            <Link href="/terms-and-conditions">
              <a className="font-serif mx-4 py-2 text-[#24893A] text-sm font-medium hover:text-emerald-600">
                Fruits
              </a>
            </Link>
            <Link href="/terms-and-conditions">
              <a className="font-serif mx-4 py-2 text-[#24893A] text-sm font-medium hover:text-emerald-600">
                Vegetables
              </a>
            </Link>
            <Link href="/terms-and-conditions">
              <a className="font-serif mx-4 py-2 text-primary text-sm font-medium hover:text-emerald-600">
                Meat
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbarPromo;
