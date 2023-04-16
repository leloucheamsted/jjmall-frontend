import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import Linear from "./linear";
import BarChart from "./bar";
import LineChart from "./linear";


const VendorDashboard = () => {
  return (
    <div className=" w-full space-y-5  lg:mt-0 px-4 sm:px-5 lg:px-8 rounded-md overflow-hidden">
      <h2 className='text-[#183D1D] text-[24px]'>Today’s summary</h2>
      {/* Cards */}
      <div className='flex flex-wrap md:flex-nowrap  md:space-x-8 justify-between'>
        <div className="p-2 basis-1/2 md:basis-1/4">
          <div className='rounded-[5px]  bg-white p-3'>
            <h3 className=' text-[18px] md:text-[24px] font-bold text-black'>05</h3>
            <h4 className='text-[#738075] text-[12px] md:text-[18px]'>Unconfirmed orders</h4>
          </div>
        </div>
        <div className="p-2 basis-1/2 md:basis-1/4">
          <div className='rounded-[5px]   bg-white p-3'>
            <h3 className='text-[18px] md:text-[24px] font-bold text-black'>05</h3>
            <h4 className='text-[#738075] text-[12px] md:text-[18px]'>Opened orders</h4>
          </div>
        </div>
        <div className="p-2 basis-1/2 md:basis-1/4">
          <div className='rounded-[5px]  bg-white p-3 '>
            <h3 className='text-[18px] md:text-[24px] font-bold text-black'>05</h3>
            <h4 className='text-[#738075] text-[12px] md:text-[18px]'>Uhandovered orders</h4>
          </div>
        </div>
        <div className="p-2 basis-1/2 md:basis-1/4">
          <div className='rounded-[5px]  bg-white p-3 '>
            <h3 className='text-[18px]  md:text-[24px] font-bold text-black'>05</h3>
            <h4 className='text-[#738075] text-[12px] md:text-[18px]'>completed orders</h4>
          </div>
        </div>

      </div>

      {/* New Orders */}
      <div className='rounded-[5px]  bg-white p-2 '>
        <h3 className='text-[#738075] font-bold text-[18px]'>New orders</h3>
        <div className='md:space-y-8 space-y-0  justify-between'>
          <div className="flex  flex-wrap md:flex-nowrap space-x-0 md:space-x-8 justify-between">
            <div className='basis-auto md:basis-1/2  py-2 flex justify-between items-center '>
              <div className='flex space-x-3  justify-start items-center'>
                <div className='h-[95px] w-[95px] bg-black flex justify-center items-center'>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-[#183D1D] text-[15px] font-bold'>Medium macabo (15)</h3>
                  <h6 className='text-[#8E9990] text-[12px]'>#order3254</h6>
                </div>
              </div>
              <div className='flex justify-between px-3 space-x-5'>
                <div className='h-[40px] w-[40px] bg-[#FCEAEA] rounded-[15px] flex justify-center items-center'>
                  <IoCloseOutline size={24} color="#D21313" />
                </div>
                <div className='h-[40px] w-[40px] bg-[#eaf7ee] rounded-[15px] flex justify-center items-center'>
                  <IoCheckmark size={24} color="#288A36" />
                </div>
              </div>
            </div>
            <div className='basis-auto md:basis-1/2 py-2 flex justify-between items-center '>
              <div className='flex space-x-3  justify-start items-center'>
                <div className='h-[95px] w-[95px] bg-black flex justify-center items-center'>1</div>
                <div className='space-y-4'>
                  <h3 className='text-[#183D1D] text-[15px] font-bold'>Medium macabo (15)</h3>
                  <h6 className='text-[#8E9990] text-[12px]'>#order3254</h6>
                </div>
              </div>
              <div className='flex justify-between px-3 space-x-5'>
                <div className='h-[40px] w-[40px] bg-[#FCEAEA] rounded-[15px] flex justify-center items-center'>
                  <IoCloseOutline size={24} color="#D21313" />
                </div>
                <div className='h-[40px] w-[40px] bg-[#eaf7ee] rounded-[15px] flex justify-center items-center'>
                  <IoCheckmark size={24} color="#288A36" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-8 justify-between">
            <div className='basis-auto md:basis-1/2 py-2 flex justify-between items-center '>
              <div className='flex space-x-3  justify-start items-center'>
                <div className='h-[95px] w-[95px] bg-black flex justify-center items-center'>1</div>
                <div className='space-y-4'>
                  <h3 className='text-[#183D1D] text-[15px] font-bold'>Medium macabo (15)</h3>
                  <h6 className='text-[#8E9990] text-[12px]'>#order3254</h6>
                </div>
              </div>
              <div className='flex justify-between px-3 space-x-5'>
                <div className='h-[40px] w-[40px] bg-[#FCEAEA] rounded-[15px] flex justify-center items-center'>
                  <IoCloseOutline size={24} color="#D21313" />
                </div>
                <div className='h-[40px] w-[40px] bg-[#eaf7ee] rounded-[15px] flex justify-center items-center'>
                  <IoCheckmark size={24} color="#288A36" />
                </div>
              </div>
            </div>
            <div className='basis-auto md:basis-1/2 py-2 flex justify-between items-center '>
              <div className='flex space-x-3  justify-start items-center'>
                <div className='h-[95px] w-[95px] bg-black flex justify-center items-center'>1</div>
                <div className='space-y-4'>
                  <h3 className='text-[#183D1D] text-[15px] font-bold'>Medium macabo (15)</h3>
                  <h6 className='text-[#8E9990] text-[12px]'>#order3254</h6>
                </div>
              </div>
              <div className='flex justify-between px-3 space-x-5'>
                <div className='h-[40px] w-[40px] bg-[#FCEAEA] rounded-[15px] flex justify-center items-center'>
                  <IoCloseOutline size={24} color="#D21313" />
                </div>
                <div className='h-[40px] w-[40px] bg-[#eaf7ee] rounded-[15px] flex justify-center items-center'>
                  <IoCheckmark size={24} color="#288A36" />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className=" justify-center">
          <div className="flex justify-center ">
          <svg className="" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.2471 13.8211L31.2214 5.00704C30.9848 4.87686 30.7191 4.80859 30.449 4.80859C30.1789 4.80859 29.9132 4.87686 29.6766 5.00704L13.6509 13.8211C13.3997 13.9595 13.1901 14.1627 13.0442 14.4097C12.8983 14.6566 12.8213 14.9382 12.8213 15.225C12.8213 15.5118 12.8983 15.7934 13.0442 16.0403C13.1901 16.2872 13.3997 16.4905 13.6509 16.6288L28.8464 24.9862V42.1641L23.981 39.4878L22.4362 42.2939L29.6766 46.2763C29.9131 46.4067 30.1789 46.4752 30.449 46.4752C30.7191 46.4752 30.9849 46.4067 31.2214 46.2763L47.2471 37.4622C47.4984 37.3239 47.7081 37.1207 47.8541 36.8737C48.0001 36.6268 48.0772 36.3452 48.0772 36.0583V15.225C48.0772 14.9381 48.0001 14.6565 47.8541 14.4096C47.7081 14.1626 47.4984 13.9594 47.2471 13.8211ZM30.449 8.24101L43.1493 15.225L30.449 22.209L17.7487 15.225L30.449 8.24101ZM44.8721 35.1112L32.0516 42.1625V24.9846L44.8721 17.9333V35.1112Z" fill="#8E9990" />
            <path d="M16.0256 25.6426H3.20508V22.4375H16.0256V25.6426ZM19.2307 38.4631H6.41021V35.258H19.2307V38.4631ZM22.4358 32.0529H9.61533V28.8478H22.4358V32.0529Z" fill="#8E9990" />
          </svg>
          </div>
          <h4 className="flex  text-[#8E9990] w-full justify-center items-center">There is no new order yet</h4>

        </div>
      </div>

      {/* Sales summary */}
      <div className='rounded-[5px]  bg-white p-2 '>
        <div className='block md:flex mt-4 md:space-x-8 space-y-3 md:space-y-0 justify-between'>
          <div className='basis-1/2  space-y-2 '>
            <h3 className='text-[#738075] font-bold text-[18px]'>Sales summary</h3>

            <div className='flex  justify-between items-center'>
              <div className=''>
                <h3 className='text-[24px] text-[#183D1D] font-bold'>Total sales </h3>
                <h6 className='text-[#414D43] text-[18px]'>since Dec 27, 2022</h6>
              </div>
              <div className='-space-y-2 items-center'>
                <h3 className='text-[24px] pr-9 -mb-6 text-[#183D1D] font-bold'>520 000</h3>
                <h6 className='text-[#183D1D] -mt-[30px] flex justify-end items-end font-bold text-[18px]'>XAF</h6>
              </div>
            </div>
            <div className='space-y-5'>
              <div className='flex space-x-5 md:space-x-8 justify-between '>
                <div className='rounded-[5px] h-auto md:h-[122px] basis-1/2 shadow-md bg-[#008069] p-3 md:p-5'>
                  <h3 className='md:text-[18px]  text-white'>Today</h3>
                  <div className='-space-y-1 h-auto justify-start  items-start'>
                    <h3 className=' text-[18px] md:text-[24px]  -mb-5 md:-mb-6 text-white font-bold'>520 000</h3>
                    <h6 className='text-[#fff] ml-[30px] mb-[60px] md:ml-5 flex justify-center md:justify-center items-start font-bold text-[15px]'>XAF</h6>
                  </div>
                </div>
                <div className='rounded-[5px] h-auto md:h-[122px] basis-1/2  shadow-md bg-[#02512B] p-3 md:p-5 '>
                  <h3 className='text-[18px]  text-white'>Yesterday</h3>
                  <div className='-space-y-1 h-auto justify-start  items-start'>
                    <h3 className='text-[18px] md:text-[24px]  -mb-5 md:-mb-6 text-[#fff] font-bold'>520 000</h3>
                    <h6 className='text-[#fff] ml-8 md:ml-5 flex justify-center items-start font-bold text-[15px]'>XAF</h6>
                  </div>
                </div>
              </div>
              <div className='flex space-x-5 md:space-x-8 justify-between '>
                <div className='rounded-[5px] h-auto md:h-[122px] basis-1/2 shadow-md bg-[#2EBD56] p-4 md:p-5 '>
                  <h3 className='text-[18px]  text-white'>Last Week</h3>
                  <div className='-space-y-1 h-auto justify-start  items-start'>
                    <h3 className='text-[18px] md:text-[24px] -mb-5 md:-mb-6 text-[#fff] font-bold'>520 000</h3>
                    <h6 className='text-[#fff] ml-10 md:ml-7 flex justify-center items-start font-bold text-[15px]'>XAF</h6>
                  </div>
                </div>
                <div className='rounded-[5px] h-auto md:h-[122px] basis-1/2  shadow-md bg-[#288A36] p-4 md:p-5 '>
                  <h3 className='text-[18px]  text-white'> <span>In</span> <span className='font-bold'>April 2023</span></h3>
                  <div className='-space-y-1 h-auto justify-start  items-start'>
                    <h3 className='text-[18px] md:text-[24px]  -mb-5 md:-mb-6 text-[#fff] font-bold'>520 000</h3>
                    <h6 className='text-[#fff] ml-10 md:ml-7 flex justify-center items-start font-bold text-[15px]'>XAF</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='basis-1/2 space-y-3'>
            <div className="flex justify-between">
              <h4 className="font-bold text-[#414D43] text-[18px]">Graph</h4>
              <select className="text-[18px] focus:ring-0 font-bold border-none outline-none outline-0 text-[#414D43] ">
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
            <div className=" h-auto ">
              <LineChart/>
            </div>
          </div>
        </div>
      </div>
      {/* Orders summary */}
      <div className='rounded-[5px]  bg-white p-2 '>
        <div className='block md:flex mt-4 md:space-x-8 space-y-3 md:space-y-0 justify-between'>
          <div className='basis-1/2  space-y-3 '>
            <h3 className='text-[#738075] font-bold text-[18px]'>Orders summary</h3>

            <div className='flex justify-between items-center'>
              <div className=''>
                <h3 className='text-[24px] text-[#183D1D] font-bold'>Total sales </h3>
                <h6 className='text-[#414D43] text-[18px]'>since Dec 27, 2022</h6>
              </div>
              <div className='-space-y-2 items-center'>
                <h3 className='text-[24px]  text-[#183D1D] font-bold'>1500</h3>
              </div>
            </div>
            <div className='space-x-8'>
              <div className='flex space-x-8 justify-between '>
                <div className='rounded-[5px] h-auto md:h-[122px] basis-1/2 shadow-md bg-[#E9FEF0] p-5'>
                  <h3 className='text-[12px] md:text-[18px]  text-[#288A36]'>Confirmed orders</h3>
                  <h4 className='text-[#288A36] font-bold text-[18px] md:text-[24px]'>1000 </h4>
                </div>
                <div className='rounded-[5px] h-auto  md:h-[122px] basis-1/2  shadow-md bg-[#F9ECEC] p-5 '>
                  <h3 className=' text-[12px] md:text-[18px]  text-[#D21313]'>Cancelled orders</h3>
                  <h4 className='text-[#D21313] font-bold text-[18px] md:text-[24px]'>500</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='basis-1/2 space-y-3 '>
            <div className="flex  justify-between items-center ">
              <h4 className="font-bold text-[#414D43] text-[18px]">Numbers of orders per month</h4>
              <select className="text-[18px] focus:ring-0 font-bold border-none outline-none outline-0 text-[#414D43] ">
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
            <div className="">
              <BarChart/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VendorDashboard;