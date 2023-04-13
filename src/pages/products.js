import AddCategorie from "@component/modal/AddCategorie";
import RemoveStock from "@component/modal/RemoveStock";
import ProductList from "@component/product/ProductList";
import ShopList from "@component/shop/ShopList";
import Layout from "@layout/Layout";
import ProductServices from "@services/ProductServices";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { FiChevronRight, FiEdit3, FiTrash2 } from "react-icons/fi";
import { ToastContainer } from "react-toastify";

const Products = () => {
  const [modalStockOpen, setModalStockOpen] = useState(false); // modal stock
  const [queryParameters] = new URLSearchParams(globalThis.window?.location.search);
  const [shopName, setShopName] = useState("");
  const [shopID, setShopID] = useState(0);
  const shop = queryParameters;
  const [products, setProduts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setShopName(shop[0].split("-")[1]);
    setShopID(shop[0].split("-")[0]);
    console.log(shop[1].split("-")[0]);
    ProductServices.getProductByShop(queryParameters[0].split("-")[0]).then((res) => {
      console.log(res.data);
      setProduts(res.data);
    });
  }, []);
  const goToDetails = (id, name) => {
    console.log(id, name);
    router.push(`/product/detailsProduct/?${id}-${name}`);
  };
  return (
    <>
      <Layout>
        <ToastContainer />
        {modalStockOpen && <RemoveStock modalOpen={modalStockOpen} setModalOpen={setModalStockOpen} />}
        <div className="relative  py-10 w-screen h-screen ">
          <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
            <div className="flex items-center pb-4">
              <ol className="flex items-center w-full overflow-hidden font-serif">
                <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold">
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li className="text-sm mt-[1px]">
                  {" "}
                  <FiChevronRight />{" "}
                </li>
                <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-primary font-semibold ">
                  <Link href={`/shop/list-shops`}>
                    <a>{"Shops"}</a>
                  </Link>
                </li>
                <li className="text-sm mt-[1px]">
                  {" "}
                  <FiChevronRight />{" "}
                </li>
                <li className="text-sm px-1 transition duration-200 ease-in ">{shopName}</li>
                <li className="text-sm mt-[1px]">
                  {" "}
                  <FiChevronRight />{" "}
                </li>
                <li className="text-sm px-1 transition duration-200 ease-in ">List Products</li>
              </ol>
            </div>

            <div className="  w-full rounded-lg px-3 p-12 bg-white">
              <div className="flex justify-end pb-5">
                <Link href={`/product/addProduct/?${shopID}-${shopName}`}>
                  <button className="  py-[5px]  text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8  md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-auto h-12">
                    New Product
                  </button>
                </Link>
              </div>
              <div className="mb-[40px] overflow-auto">
                <table className="overflow-scroll w-full  min-w-full border border-gray-100 divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="bg-gray-100">
                      <th scope="col" className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                        Picture
                      </th>
                      <th scope="col" className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                        Name
                      </th>

                      <th scope="col" className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                        Bar Code
                      </th>
                      <th scope="col" className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                        quantity
                      </th>

                      <th scope="col" className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                        price
                      </th>
                      <th scope="col" className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                        Delete
                      </th>
                      <th scope="col" className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products?.map((product) => (
                      <tr key={product.id}>
                        <ProductList product={product} />
                        {/* <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
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
                              </td> */}

                        {/* <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                                                <button
                                                    onClick={() => { setShopbyId(shop); setShowUpdateShop(!showUpdateShop) }}
                                                >
                                                    <span className="text-sm font-bold"><FiEdit3 /></span>
                                                </button>
                                            </td> */}
                        <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              deleteProduct();
                            }}
                            className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                        <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              goToDetails(product.id, product.attributes.name);
                            }}
                          >
                            <span className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold rounded-full">Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <div className="flex w-full h-[100px] p-2">
                    <button onClick={() => setModalStockOpen(true)}
                        className=" text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-primary hover:bg-emerald-600 w-auto h-12"
                    >
                        Save stock removal
                    </button>
                    <Link href="/product/historyStocks">
                        <button
                            className=" text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-primary hover:bg-emerald-600 w-auto h-12"
                        >
                            History stock removal
                        </button>
                    </Link>

                </div> */}
          {/* Add new product */}
        </div>
      </Layout>
    </>
  );
};

export default Products;
