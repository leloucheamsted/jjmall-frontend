import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";

//internal import
import useAsync from "@hooks/useAsync";
import Dashboard from "@pages/user/dashboard";
import GenericProductServices from "@services/GenericProductServices";
import Loading from "@component/preloader/Loading";
import { UserContext } from "@context/UserContext";
import { SidebarContext } from "@context/SidebarContext";
import { FiDelete, FiEdit3, FiTrash2 } from "react-icons/fi";
import UpdateGenericProductModal from "@component/modal/UpdateGenericProductModal";
import DeleteGenericProductModal from "@component/modal/DeleteGenericProductModal";

const GenericProducts = () => {
  const router = useRouter();
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const { currentPage, handleChangePage, isLoading, setIsLoading } =
    useContext(SidebarContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUpdateGenericProduct, setShowUpdateGenericProduct] =
    useState(false);
  const [showDeleteGenericProduct, setShowDeleteGenericProduct] =
    useState(false);
  const [genericProductbyId, setGenericProductbyId] = useState({});

  useEffect(() => {
    GenericProductServices.getGenericProduct()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [currentPage]);

  const pageCount = Math.ceil(data?.totalDoc / 8);

  useEffect(() => {
    setIsLoading(false);
    if (!userInfo) {
      router.push("/");
    }
  }, [userInfo]);

  return (
    <>
      {showUpdateGenericProduct && <UpdateGenericProductModal modalOpen={showUpdateGenericProduct} setModalOpen={setShowUpdateGenericProduct} data={genericProductbyId} setData={setData} />}
      {showDeleteGenericProduct && <DeleteGenericProductModal modalOpen={showDeleteGenericProduct} setModalOpen={setShowDeleteGenericProduct} data={genericProductbyId} setData={setData} />}
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Dashboard title="List Generic Products" description="This is user generic products page">
          <div className="overflow-hidden rounded-md font-serif">
            {loading ? (
              <Loading loading={loading} />
            ) : error ? (
              <h2 className="text-xl text-center my-10 mx-auto w-11/12 text-red-400">{error}</h2>
            ) : data?.orders?.length === 0 ? (
              <div className="text-center">
                <span className="flex justify-center my-30 pt-16 text-primary font-semibold text-6xl">
                  <IoBagHandle />
                </span>
                <h2 className="font-medium text-md my-4 text-gray-600">There is no generic product yet!</h2>
              </div>
            ) : (
              <div className="flex flex-col">
                <h2 className="text-xl font-serif font-semibold mb-5">List of Generic Products</h2>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                      <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr className="bg-gray-100">
                            <th scope="col" className="text-left text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                              ID
                            </th>
                            <th scope="col" className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                              Name
                            </th>

                            <th scope="col" className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                              Update
                            </th>
                            <th scope="col" className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {data?.data?.map((generic_Product) => (
                            <tr key={generic_Product.id}>
                              <td className="px-5 py-3 leading-6 whitespace-nowrap">
                                <span className="uppercase text-sm font-medium">{generic_Product.id}</span>
                              </td>
                              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                                <span className="text-sm">{generic_Product.attributes?.name}</span>
                              </td>

                              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                                <span className="text-sm">{generic_Product.attributes?.price}</span>
                              </td>
                              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                                <button
                                  onClick={() => {
                                    setGenericProductbyId(generic_Product);
                                    setShowUpdateGenericProduct(!showUpdateGenericProduct);
                                  }}
                                >
                                  <span className="text-sm font-bold">
                                    <FiEdit3 />
                                  </span>
                                </button>
                              </td>
                              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                                <button
                                  onClick={() => {
                                    setGenericProductbyId(generic_Product);
                                    setShowDeleteGenericProduct(!showDeleteGenericProduct);
                                  }}
                                  className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
                                >
                                  <FiTrash2 />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="paginationOrder">
                        {/* <ReactPaginate
                          breakLabel="..."
                          nextLabel="Next"
                          onPageChange={(e) => handleChangePage(e.selected + 1)}
                          pageRangeDisplayed={3}
                          pageCount={pageCount}
                          previousLabel="Previous"
                          renderOnZeroPageCount={null}
                          pageClassName="page--item"
                          pageLinkClassName="page--link"
                          previousClassName="page-item"
                          previousLinkClassName="page-previous-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-next-link"
                          breakClassName="page--item"
                          breakLinkClassName="page--link"
                          containerClassName="pagination"
                          activeClassName="activePagination"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dashboard>
      )}
    </>
  );
};

export default GenericProducts;
