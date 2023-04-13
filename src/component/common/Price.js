import React, {useEffect, useState} from 'react';

const Discount = ({product, card}) => {
  const [GroupPrice, setGroupPrice] = useState(0);
  const [SinglePrice, setSinglePrice] = useState(0);

  const dislockPrice = () => {
    let priceSingle = [];
    let priceGroup = [];
    priceSingle = product?.attributes?.prices?.data.filter(e => e.attributes?.type == 'single');
    priceGroup = product?.attributes?.prices?.data.filter(e => e.attributes?.type == 'group');

    setGroupPrice(priceGroup.length > 0 ? priceGroup[0]?.attributes.price : 0);
    setSinglePrice(priceSingle.length > 0 ? priceSingle[0]?.attributes.price : 0);
  };
  useEffect(() => {
    dislockPrice();
  }, []);

  return (
    <div className="w-full font-serif product-price font-bold ">
      {product.discount ? (
        <span className={card ? 'inline-block text-lg font-semibold text-gray-800' : 'inline-block text-2xl'}>
          XAF {product.attributes.prices.data[0].attributes.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </span>
      ) : (
        <div className="flex justify-between gap-x-2">
          {Boolean(GroupPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")) && <div className="flex justify-center items-center">
            <div className="text-2xl text-secondary font-bold leading-tight">
              <span>{GroupPrice}</span>&nbsp;
              <span className="text-[7px] text-secondary/90 rounded-full px-1 py-0.5 border border-secondary leading-none align-middle">
                XAF
              </span>
              <i className=" font-semibold block text-[10px] text-secondary/70">Group Buy</i>
            </div>
          </div>}

          

          {Boolean(SinglePrice) &&<div className="flex justify-center items-center">
            <div className="text-2xl text-neutral-400 font-bold leading-tight">
              <span>{SinglePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>&nbsp;
              <span className="text-[7px] text-neutral-500 rounded-full px-1 py-0.5 border border-neutral-500 leading-none align-middle">
                XAF
              </span>
              <i className=" font-medium block text-[10px] text-neutral-500">Single Buy</i>
            </div>
          </div>}
        </div>
      )}
      {product.discount ? (
        <del className={card ? 'sm:text-sm font-normal text-base text-gray-400 ml-1' : 'text-lg font-normal text-gray-400 ml-1'}>
          XAF {product.attributes.prices.data[0].attributes.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </del>
      ) : null}
    </div>
  );
};

export default Discount;
