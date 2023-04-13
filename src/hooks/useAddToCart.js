import { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';

import { notifyError, notifySuccess } from '@utils/toast';

const useAddToCart = () => {
  const [item, setItem] = useState(1);
  const [products, setProducts] = useState([]);
  const { addItem, items, updateItemQuantity } = useCart();

  useEffect(() => {
    const products = sessionStorage.getItem('products1');
    setProducts(JSON.parse(products));
  }, []);

  const handleAddItem = (product,new_price=1) => {
    const result = items.find((i) => i.id === product.id);
    let quantityStore = {};
    let quantityFarm = {};
    let imageStore = {};
    quantityStore = product?.attributes.inventories.data.filter((e)=> e.attributes.type == 'store');
    quantityFarm = product?.attributes.inventories.data.filter((e)=> e.attributes.type == 'farm');
    imageStore = product?.attributes.assets.data.filter((e)=> e.attributes.type == 'img');

    if (result !== undefined) {
      
      if (result.quantity < quantityStore) {
        const produit = {
          price:new_price,
          quantity:quantityStore.length > 0? quantityStore[0].attributes.quantity :1,
          image:imageStore.length > 0? imageStore[0].attributes.path.data.attributes.url :''
        }
        const newItem = {
          ...produit,
          id: product.id,
        };

        // const newItem = {
        //   ...product,
        //   id: product.id,
        // };
        addItem(newItem, item);
        notifySuccess(`${item} ${product.title} added to cart!`);
      } else {
        notifyError('No more quantity available for this product!');
      }
    } else {
      
      if(product.attributes.inventories.data.length > 0){
        
        const produit = {
          price:new_price,
          quantity:quantityStore.length > 0? quantityStore[0].attributes.quantity :1,
          image:imageStore.length > 0? imageStore[0].attributes.path.data.attributes.url :''
        }
        const newItem = {
          ...produit,
          id: product.id,
        };
        // const newItem = {
        //   ...product,
        //   id: product.id,
        // };
        addItem(newItem, item);
        notifySuccess(`${item} ${product.attributes.name} added to cart!`);
      }
    }
  };

  const handleIncreaseQuantity = (item) => {
    let quantityStore = {};
    let quantityFarm = {};
    let imageStore = {};
    
    const result = products?.find((p) => p.id === item.id);

    
    // console.log('val prodcuts2:',products);
    if (result) {
        const storm = result.attributes.inventories.data.length
        quantityStore = storm > 0 ? result?.attributes.inventories.data.filter((e)=> e.attributes.type == 'store'):1;
        quantityFarm = storm > 0 ? result?.attributes.inventories.data.filter((e)=> e.attributes.type == 'farm'):1;
        imageStore = storm > 0 ? result?.attributes.assets.data.filter((e)=> e.attributes.type == 'img'):1;
      
      // console.log('quantity : ',quantityStore);
      const quantity_result = quantityStore.length >0 ? quantityStore[0].attributes.quantity:1
      if (item?.quantity < quantity_result) {
        updateItemQuantity(item.id, item.quantity + 1);
      } else {
        notifyError('No more quantity available for this product!');
      }
    }
  };

  return {
    handleAddItem,
    setItem,
    item,
    handleIncreaseQuantity,
  };
};

export default useAddToCart;
