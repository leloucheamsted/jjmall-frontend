import React from "react";

const Tags = ({ product={"tag":[]},shop={"bussinesses":[]} }) => {
  return (
    <>
      {product.attributes.tags.length !== 0 && (
        <div className="flex flex-row">
          {product?.attributes.tags.map((e, index) => (
            <span
              key={index + 1}
              className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2"
            >
              {e}
            </span>
          ))}
        </div>
      )}
      {shop.bussinesses?.length > 0 && (
        <div className="flex flex-row">
          {shop?.bussinesses.map((t, i) => (
            <span
              key={i + 1}
              className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Tags;
