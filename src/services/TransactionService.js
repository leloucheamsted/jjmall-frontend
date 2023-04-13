import { useRouter } from "next/router";
import requests from "./httpJJmallServices";
import Cookies from "js-cookie";
import axios from 'axios';

const TransactionService = {
    async addUserMethodPayment(body) {
        return requests.post('/users-has-payment-methods', body)
    },
    async createTransactionOperation(body) {
        var data = JSON.stringify(body)
        var config = {
            method: 'post',
            url: `https://api.jjmall.store/api/users-has-payment-methods/${body["data"]["users_has_payment_method"]}/transaction`,
            headers: {
                'Authorization': 'Bearer 014bdef5ea89115ae1b9a0dc983138b953916407e066d0e1633b6fc68f4ab79e96d6b9ece046c8893306f47fc4ee55447c130fa69fc45de69927d7db8b21134c4d2fd710bc9d96b46e826681d1dd1ab4222cb1a932dfbaca81ac44cac77abff7332cf10b5453e133f691d2b68c10d27d4f10111c7eeac661e8ae4da419903bd0',
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios(config)
        //return requests.post(`/users-has-payment-methods/${body["data"]["users_has_payment_method"]}/transaction`, body)
    }
}
export default TransactionService