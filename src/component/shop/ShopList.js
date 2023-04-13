import React from 'react';

const ShopList = ({ shop }) => {
    return (
        <>
            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm">
                    {shop.attributes?.name}
                </span>
            </td>
            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm">
                    {shop.attributes?.code}
                </span>
            </td>

            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm">{shop.attributes?.registration_number}</span>
            </td>
            
            
        </>
  );
};
export default ShopList;