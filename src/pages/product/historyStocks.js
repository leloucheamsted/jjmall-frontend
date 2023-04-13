import Layout from "@layout/Layout";
import InventorieService from "@services/InventorieService";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

const HistoryStocks = () => {
    const [listHistories, setListHistories] = useState([])
    const [queryParameters] = new URLSearchParams(globalThis.window?.location.search)
    const [productID, setProductID] = useState(0)
    const [productName, setProductName] = useState('')
    useEffect(() => {
        setProductID(queryParameters[0])
        InventorieService.getInventoriesHistoryByProduct(queryParameters[0])
            .then((response) => {
                setProductName(response.data[0].attributes.product.data.attributes.name)
                setListHistories(response.data[0].attributes.inventory_histories.data)
                console.log(listHistories)
            })
    }, [])

    return (
        <Layout>
            <div>
                <div className="relative  py-10 w-screen ">
                    <div className="mx-auto px-3 lg:px-10 ">
                        <div className="flex items-center pb-4">
                            <ol className="flex items-center w-full overflow-hidden font-serif">
                                <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
                                    <Link href="/">
                                        <a>Home</a>
                                    </Link>
                                </li>
                                <li className="text-sm mt-[1px]">
                                    {" "}
                                    <FiChevronRight />{" "}
                                </li>
                                <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold ">
                                    <Link
                                        href={`/shop/list-shops`}
                                    >
                                        <a>{"Shops"}</a>
                                    </Link>
                                </li>

                                <li className="text-sm mt-[1px]">
                                    {" "}
                                    <FiChevronRight />{" "}
                                </li>
                                <li className="text-sm px-1 transition duration-200 ease-in ">
                                    {"productName"}
                                </li>
                                <li className="text-sm mt-[1px]">
                                    {" "}
                                    <FiChevronRight />{" "}
                                </li>
                                <li className="text-sm px-1 transition duration-200 ease-in ">
                                    Historique de stock
                                </li>
                            </ol>
                        </div>
                        <div className="  w-full rounded-lg p-3 lg:p-12 bg-white">
                            <div className="overflow-auto ">
                                {/* Table */}
                                <table className="p-2 overflow-scroll w-full">
                                    <thead className="bg-gray-50">
                                        <tr className="bg-gray-100">
                                            <th
                                                scope="col"
                                                className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                            >
                                                Product Name
                                            </th>

                                            <th
                                                scope="col"
                                                className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                            >
                                                Quantity
                                            </th>
                                            {/* <th
                                                scope="col"
                                                className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                            >
                                                Remaining quantity
                                            </th> */}
                                            <th
                                                scope="col"
                                                className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                            >
                                                History Type
                                            </th>

                                            <th
                                                scope="col"
                                                className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                            >
                                                Date of release
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {listHistories?.map((historie) => (
                                            <tr key={historie.id} >
                                                <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                                                    {productName}
                                                </td>
                                                <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                                                    {historie.attributes.quantity}
                                                </td>
                                                {/* <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                                                    {historie.attributes.inventory.data.attributes.quantity - historie.attributes.quantity}
                                                </td> */}
                                                <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                                                    {historie.attributes.type}
                                                </td>
                                                <td className="px-5 py-3 leading-6 text-end whitespace-nowrap">
                                                    {new Date(historie.attributes.createdAt).toDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default HistoryStocks;