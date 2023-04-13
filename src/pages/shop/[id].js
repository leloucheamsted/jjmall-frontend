import Image from "next/image";
import Link from "next/link";
import dayjs from 'dayjs';
import { useRouter } from "next/router";
import { FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

//internal import
const ShopDetails = dynamic(() => import("./../../component/shop/ShopDetails"), { ssr: false });

export default function Index() {
  return <ShopDetails />;
}
