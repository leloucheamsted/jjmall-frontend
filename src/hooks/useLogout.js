import { UserContext } from "@context/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";

const useLogout = () => {
    const router = useRouter();
    const {dispatch} = useContext(UserContext);
    

    const handleLogOut = ()=>{
        dispatch({ type: 'USER_LOGOUT' });
        dispatch({ type: 'SAVE_ISLOGGER', payload:false});
        dispatch({type: 'SHOP_CONNECTED',payload:null})

        Cookies.remove('userInfo');
        Cookies.remove('couponInfo');
        Cookies.remove('isLogger');
        Cookies.remove('shopInfo');
        router.push('/');
    }

    return {handleLogOut}
};

export {useLogout}