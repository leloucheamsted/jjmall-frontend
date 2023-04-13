import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

import { notifyError, notifySuccess } from "@utils/toast";

const useUpdateStock = () => {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const { addItem, items, updateItemQuantity } = useCart();

  useEffect(() => {
    const products = sessionStorage.getItem("products");
    setProducts(JSON.parse(products));
  }, []);

  const handleIncreaseQuantity = (item) => {
    const result = products?.find((p) => p._id === item.id);
    if (result) {
      updateItemQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (item) => {
    const result = products?.find((p) => p._id === item.id);
    if (result) {
      updateItemQuantity(item.id, item.quantity - 1);
    }
  };

  return {
    setQuantity,
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useUpdateStock;
