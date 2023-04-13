import requests from "./httpJJmallServices";
import ordersList from "./fixtures/orders.json";
import axios from "axios";
import Cookies from "js-cookie";

const headers = {
    "Content-Type": "multipart/form-data",
};
const ReviewService = {

    CreateReview(body) {
        return requests.post("/reviews", body, headers);
    }
}
export default ReviewService