
const Avatar = ({ img }) => {
    return (
        <div className='h-[65px] w-[65px] border-2 rounded-[50px]  border-[#000016] bg-red-300 flex justify-center items-center  '>
            <img
                className=' overflow-hidden cursor-pointer rounded-[50px]'
                src={!img ? "https://i.ibb.co/sWBMfVP/Freshmaker-Baby-Wet-Wipes-With-Cover-72pcs.jpg" : img}

                layout="responsive"
                width={65}
                height={65}
                priority
            ></img>
        </div>
    );
}
export default Avatar;