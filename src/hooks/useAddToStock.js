import { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';

import { notifyError, notifySuccess } from '@utils/toast';

const useAddToStock = () => {
  const [stockItem, setStockItem] = useState(1);
  const [products, setProducts] = useState([]);
  const { addItem, items, updateItemQuantity } = useCart();

  useEffect(() => {
    const products = sessionStorage.getItem('products1');
    setProducts(JSON.parse(products));
  }, []);

  const handleAddStockItem = (product) => {
    const result = items.find((i) => i.id === product._id);

    if (result !== undefined) {
      if (result?.quantity < product?.quantity) {
        const newItem = {
          ...product,
          id: product._id,
        };
        addItem(newItem, stockItem);
        notifySuccess(`${stockItem} ${product.title} added to cart!`);
      } else {
        notifyError('No more quantity available for this product!');
      }
    } else {
      const newItem = {
        ...product,
        id: product._id,
      };
      addItem(newItem, stockItem);
      notifySuccess(`${stockItem} ${product.title} added to cart!`);
    }
  };

  const handleIncreaseQuantity = (item) => {
    const result = products?.find((p) => p._id === item.id);
    if (result) {
      if (item?.quantity < result?.quantity) {
        updateItemQuantity(item.id, item.quantity + 1);
      } else {
        notifyError('No more quantity available for this product!');
      }
    }
  };

  return {
    handleAddStockItem,
    setStockItem,
    stockItem,
    handleIncreaseQuantity,
  };
};

export default useAddToStock;
