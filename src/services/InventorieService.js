import requests from "./httpJJmallServices";
import qs from 'qs'
import axios from "axios";

const headers = {
    'Authorization': 'Bearer ',
    'Content-Type': 'application/x-www-form-urlencoded'
};
const InventorieService = {

    updateInventory(body,id){
        return requests.put(`/inventories/${id}`,body)
    },
    addInventoryHistory(body){
        return requests.post(`/inventory-histories`,body)
    },
    getInventoriesHistory() {
        return requests.get(`/inventory-histories?populate=*`);
    },
    createInventoryHistory(body) {
        return requests.post('/inventory-histories', { data: body })
    },
    getInventoriesHistoryByProduct(id) {
        return requests.get(`/inventories?populate[0]=inventory_histories&filters[product][id]=${id}&populate[1]=product`)
    },
    async removeQuantityInventory(id, body) {
        console.log(body)
        var data = qs.stringify(body);
        var config = {
            method: 'put',
            url: `${process.env.NEXT_PUBLIC_API_BASE_JJMALL_URL}inventories/${id}`,
            headers: {
                'Authorization': 'Bearer 014bdef5ea89115ae1b9a0dc983138b953916407e066d0e1633b6fc68f4ab79e96d6b9ece046c8893306f47fc4ee55447c130fa69fc45de69927d7db8b21134c4d2fd710bc9d96b46e826681d1dd1ab4222cb1a932dfbaca81ac44cac77abff7332cf10b5453e133f691d2b68c10d27d4f10111c7eeac661e8ae4da419903bd0',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        return axios(config)
            .then((res) => {
                console.log(res)
                const data = {
                    "quantity": body["data.quantity"],
                    "type": "out",
                    "inventory": id
                }
                this.createInventoryHistory(data)
                    .then((res) => {
                        console.log("Sortie de stocks effectuee!!!!")
                    })
            })
            .catch(e => console.log(e))
        // requests.put(`/inventories/${id}`, body, headers)
    },
    async addQuantityInventory(id, body) {
        console.log(body)
        var data = qs.stringify(body);
        var config = {
            method: 'put',
            url: `${process.env.NEXT_PUBLIC_API_BASE_JJMALL_URL}products/inventories/${id}`,
            headers: {
                'Authorization': 'Bearer 014bdef5ea89115ae1b9a0dc983138b953916407e066d0e1633b6fc68f4ab79e96d6b9ece046c8893306f47fc4ee55447c130fa69fc45de69927d7db8b21134c4d2fd710bc9d96b46e826681d1dd1ab4222cb1a932dfbaca81ac44cac77abff7332cf10b5453e133f691d2b68c10d27d4f10111c7eeac661e8ae4da419903bd0',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        return axios(config)
            .then((res) => {
                console.log(res)
                const data = {
                    "quantity": body["data.quantity"],
                    "type": "in",
                    "inventory": id
                }
                this.createInventoryHistory(data)
                    .then((res) => {
                        console.log("Sortie de stocks effectuee!!!!")
                    })
            })
        // requests.put(`/inventories/${id}`, body, headers)
    }
}

export default InventorieService;