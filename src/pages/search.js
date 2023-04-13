import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

//internal import
import Layout from "@layout/Layout";
import useFilter from "@hooks/useFilter";
import Card from "@component/cta-card/Card";

import ProductCard from "@component/product/ProductCard";
import CategoryCarousel from "@component/carousel/CategoryCarousel";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";
// import GenericProductServices from "@services/GenericProductServices";
// import ProductServices from "@services/ProductServices";
import ProductServices from "./../services/ProductServices"
import GenericProductServices from "./../services/GenericProductServices";
import { useRouter } from "next/router";

const Search = () => {
  // { products }
  // const { isLoading, setIsLoading } = useContext(SidebarContext);
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);
  const [visibleProduct, setVisibleProduct] = useState(18);
  const [products,setProducts] = useState(null);
  const [productsData,setProductsData] = useState([]);
  // const {productData: productsData, setSortedField} = useFilter(products);
  const { setSortedField} = useFilter(products);
  const query = router?.query?.query;
  const genericProductId = router?.query?.genericProductId;

  useEffect(()=>{
    fetchData();
  },[query,genericProductId]);

  const fetchData = async ()=>{
    setIsLoading(true);
    try {
      const data = await ProductServices.getShowingProducts();
      
      let products = [];

      // service filter with child category
      if (genericProductId) {
        const results = await GenericProductServices.getProducts(genericProductId);
        products = results.attributes.products.data;
        setProducts(products);
        // console.log('generict products:',products);
      } else if (query) {
        products = data.filter((product) =>
          product.attributes.name.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(products);
      }
      setProductsData(products);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(false);
  }, [products]);

  return (
    <Layout title="Search" description="This is search page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="flex py-10 lg:py-12">
          <div className="flex w-full">
            <div className="w-full">
              <div className="w-full grid grid-col gap-4 grid-cols-1 2xl:gap-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
                <Card />
              </div>
              <div className="relative">
                <CategoryCarousel />
              </div>
              {productsData?.length === 0 ? (
                <div className="text-center align-middle mx-auto p-5 my-5">
                  <Image className="my-4" src="/no-result.svg" alt="no-result" width={400} height={380} />
                  <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium font-serif text-gray-600">
                    Sorry, we can not find this product 😞
                  </h2>
                </div>
              ) : (
                <div className="flex justify-between my-3 bg-orange-100 border border-gray-100 rounded p-3">
                  <h6 className="text-sm font-serif">
                    Total <span className="font-bold">{productsData?.length}</span> items Found
                  </h6>
                  <span className="text-sm font-serif">
                    <select
                      onChange={e => setSortedField(e.target.value)}
                      className="py-0 text-sm font-serif font-medium block w-full rounded border-0 bg-white pr-10 cursor-pointer focus:ring-0"
                    >
                      <option className="px-3" value="All" defaultValue hidden>
                        Sort By Price
                      </option>
                      <option className="px-3" value="Low">
                        Low to High
                      </option>
                      <option className="px-3" value="High">
                        High to Low
                      </option>
                    </select>
                  </span>
                </div>
              )}

              {isLoading ? (
                <Loading loading={isLoading} />
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {productsData?.slice(0, visibleProduct).map((product, i) => (
                      <ProductCard key={i + 1} product={product} />
                    ))}
                  </div>
                  {productsData?.length > visibleProduct && (
                    <button
                      onClick={() => setVisibleProduct(pre => pre + 10)}
                      className="w-auto mx-auto md:text-sm leading-5 flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none bg-indigo-100 text-gray-700 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-6 text-sm lg:text-sm"
                    >
                      Load More
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

// ne plus utiliser cette methode pour faire la recherche car avec cette methode
// la recherche ne fonctionne pas sur l'application mobile travailler directement dans le fetchData de useEffect

// export const getServerSideProps = async (context) => {
//   const { query } = context.query;
//   // console.log("inside search page");
//   // console.log(context.query.genericProductId);
//   const genericProductId = context.query.genericProductId;
//   const data = await ProductServices.getShowingProducts();
//   console.log('valeur query:',context.query);
//   let products = [];

//   // service filter with child category
//   if (genericProductId) {
//     console.log(genericProductId);
//     const results = await GenericProductServices.getProducts(genericProductId);
//     products = results.attributes.products.data;
//     console.log(products);
//   } else if (query) {
//     products = data.filter((product) =>
//       product.attributes.name.toLowerCase().includes(query.toLowerCase())
//     );
//   }

//   return {
//     props: {
//       products,
//     },
//   };
// };
