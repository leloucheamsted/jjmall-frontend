import useSessionstorage from '@rooks/use-sessionstorage';
import {SidebarContext} from '@context/SidebarContext';
import {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';

//internal import
import Layout from '@layout/Layout';
import Banner from '@component/banner/Banner';
import CardTwo from '@component/cta-card/CardTwo';
import OfferCard from '@component/offer/OfferCard';
import StickyCart from '@component/cart/StickyCart';
import ProductServices from '@services/ProductServices';
import ProductCard from '@component/product/ProductCard';
import MainCarousel from '@component/carousel/MainCarousel';
import FeatureCategory from '@component/category/FeatureCategory';
import Loading from '@component/preloader/Loading';
import AdvanceSearch from '@layout/sidebar/AdvanceSearch';

import {useTranslation} from 'next-i18next';
import i18n from 'i18next';

// {products, popularProducts, discountProducts}
const Home = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  const {locale} = useRouter();

  const [value, set] = useSessionstorage('products1', products);
  const {isLoading, setIsLoading} = useContext(SidebarContext);
  const [data, setData] = useState(popularProducts);

  console.log('test retour ', data);
  // console.log('val products1:',value);

  useEffect(() => {
    console.log('hello useEffect');
    fetchData();
    // if (router.asPath === '/') {
    //   setIsLoading(false);
    // } else {
    //   setIsLoading(false);
    // }
  }, [router]);

  const fetchData = async () => {
    const products = await ProductServices.getShowingProducts();
    console.log('test 1');
    console.log(products.length);

    if (products) {
      setPopularProducts(products);
      setDiscountProducts(products);
      setData(products);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    const popularProducts = products;
    const discountProducts = products;
  };
  const {t: translate} = useTranslation('index');
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            <StickyCart />
            <div className="bg-white">
              <div className="mx-auto max-w-screen-2xl flex flex-row w-full border border-slate-200">
                <div className="hidden md:block w-2/12 border border-slate-200">
                  <AdvanceSearch data={popularProducts} setData={setData} />
                </div>
                <div className="md:w-10/12 w-full border border-slate-200 px-5">
                  {data.length > 0 && (
                    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-7 gap-2 md:gap-3 lg:gap-4">
                      {data.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* feature category's */}
            <div className="bg-gray-100 lg:py-16 py-10">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex justify-center">
                  <div className="text-center w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">{translate('featured-meta-title')}</h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      {translate('featured-title')}
                      {/* {t('metaTitle')} */}
                    </p>
                  </div>
                </div>
                <FeatureCategory />
              </div>
            </div>

            {/* popular products */}
            {/* <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">Popular Products for Daily Shopping</h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    See all our popular products in this week. You can choose your daily needs products from this list and get some special
                    offer with free shipping.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  {popularProducts.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {popularProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div> */}

            {/* promotional banner card */}
            {/* <div className="block mx-auto max-w-screen-2xl">
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                <div className="lg:p-16 p-6 bg-primary shadow-sm border rounded-lg">
                  <CardTwo />
                </div>
              </div>
            </div> */}

            {/* discounted products */}
            {/* <div id="discount" className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">Latest Discounted Products</h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    See Our latest discounted products below. Choose your daily needs from here and get a special discount with free
                    shipping.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  {discountProducts.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {discountProducts?.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div> */}
          </div>
        </Layout>
      )}
    </>
  );
};

export default Home;
