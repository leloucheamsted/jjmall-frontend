import Image from 'next/image';
import React from 'react';

const ProductList = ({ product }) => {
    return (
        <>
            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <Image width={50} height={50} src={product.attributes?.assets?.data[0]?.attributes.path.data.attributes.formats.small.url} />
                {/* <span className="text-sm">
                    {product.attributes?.assets?.data[0]?.attributes.path.data.attributes.formats.small.url}
                </span> */}
            </td>
            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm">
                    {product.attributes?.name}
                </span>
            </td>
            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm">
                    {product.attributes?.bar_code}
                </span>
            </td>

            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm">{product.attributes?.inventories?.data[0]?.attributes?.quantity}</span>
            </td>
            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm">
                    {product.attributes?.prices?.data[0]?.attributes?.price} XAF
                </span>
            </td>

        </>
    );
};
export default ProductList;