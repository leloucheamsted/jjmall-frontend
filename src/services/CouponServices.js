import couponsList from "./fixtures/coupon.json";

// complete _id to every value
let fakeCoupons = couponsList.map((coupon, index) => ({ _id: index.toString(), ...coupon }));

const CouponServices = {
  getAllCoupons() {
    // return requests.get('/coupon');
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(fakeCoupons);
      }, 200);
    });
  },
};

export default CouponServices;
