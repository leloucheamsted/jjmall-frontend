import {useContext, useEffect, useState} from 'react';
import Image from 'next/image';
import image_not_available from '../../../public/image_not_avalaible.png';
import {useCart} from 'react-use-cart';
import {IoBagAddSharp, IoAdd, IoRemove} from 'react-icons/io5';

import Price from '@component/common/Price';
import Discount from '@component/common/Discount';
import ProductModal from '@component/modal/ProductModal';
import {useRouter} from 'next/router';
import {SidebarContext} from '@context/SidebarContext';
import {notifyError} from '@utils/toast';

const ProductCard = ({product}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {items, addItem, updateItemQuantity, inCart} = useCart();
  const {setIsLoading, isLoading} = useContext(SidebarContext);
  const router = useRouter();

  const [mediaData, setMediaData] = useState(null);

  // console.log('product in product card %s', JSON.stringify(product, undefined, 4));

  function prepareMedia() {
    const mediaDataVar = {
      types: ['img'],
      source: image_not_available,
      cover: null,
    };
    const productAssets = product.attributes.assets.data;
    if (!productAssets?.length) return setMediaData(mediaDataVar);

    const imgCoverData = productAssets.find(({attributes}) => attributes?.type === 'img');
    // if (!imgCoverData) return setMediaData(mediaDataVar);

    mediaDataVar.source = imgCoverData?.attributes?.path?.data?.attributes?.url || image_not_available;

    const videoData = productAssets.find(({attributes}) => attributes?.type === 'video');
    if (!videoData) return setMediaData(mediaDataVar);

    mediaDataVar.types = [...mediaDataVar.types, 'video'];
    mediaDataVar.cover = mediaDataVar.source;
    mediaDataVar.source = videoData?.attributes?.path?.data?.attributes?.url;

    setMediaData(mediaDataVar);
  }

  useEffect(() => {
    prepareMedia();
  }, [product]);

  const handleMoreInfo = slug => {
    // setModalOpen(false);
    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
  };

  const handleAddItem = p => {
    let quantityStore = {};
    let quantityFarm = {};
    let imageStore = {};
    let priceStore = [];
    priceStore = p?.attributes.prices.data.filter(e => e.attributes.type == 'single');
    quantityStore = p?.attributes.inventories.data.filter(e => e.attributes.type == 'store');
    quantityFarm = p?.attributes.inventories.data.filter(e => e.attributes.type == 'farm');
    imageStore = p?.attributes.assets.data.filter(e => e.attributes.type == 'img');
    const produit = {
      price: priceStore.length > 0 ? priceStore[0].attributes.price : 1,
      quantity: quantityStore.length > 0 ? quantityStore[0].attributes.quantity : 1,
      image: imageStore.length > 0 ? imageStore[0].attributes.path.data.attributes.url : '',
    };

    // const newItem = {
    //   ...p,
    //   id: p.id,
    // };
    if (priceStore.length > 0) {
      const newItem = {
        ...produit,
        id: p.id,
      };
      addItem(newItem);
    } else {
      notifyError("Ce Produit ne peut être vendu car le prix n'a pas été renseigné");
    }
  };

  const MediaJSX = mediaData ? (
    mediaData.types.includes('video') ? (
      <div className="h-36 w-full">
        <video
          src={mediaData.source}
          controlslist="nodownload"
          muted
          controls
          loop
          preload="metadata"
          // poster={mediaData.cover}
          alt={product.attributes.name}
          className="h-full w-full"
        />
      </div>
    ) : (
      <Image
        src={mediaData.source}
        width={144}
        height={144}
        alt={product.attributes.name}
        className="object-contain transition duration-150 ease-linear transform group-hover:scale-105"
      />
    )
  ) : (
    <></>
  );

  return (
    <>
      <ProductModal modalOpen={modalOpen} setModalOpen={setModalOpen} product={product} />

      <div className="group overflow-hidden shadow-sm bg-white relative space-y-4">
        <div
          // onClick={() => setModalOpen(!modalOpen)}
          onClick={() => handleMoreInfo(product.id)}
          className="relative flex justify-center w-full cursor-pointer"
        >
          {product.attributes.inventories.data[0].attributes.quantity <= 0 && (
            <span className="absolute inline-flex items-center justify-center px-2 py-1 bg-red-100 text-red-600 border-0 rounded-full text-xs font-semibold font-serif z-10 left-4 top-4">
              Stock Out
            </span>
          )}
          <Discount product={product} />
          {mediaData && (
            <div className="rounded-md bg-neutral-50/80 overflow-hidden w-full flex justify-center items-center" children={MediaJSX} />
          )}
        </div>
        <div className="relative mb-4 px-1">
          {/* <span className="text-gray-400 font-medium text-xs d-block mb-1">
              {product.attributes.inventories.data[0].attributes.quantity}
            </span> */}
          <h2 className="text-heading capitalize truncate pb-1 block text-sm font-semibold text-gray-600">
            <span className="line-clamp-2">{product.attributes.name}</span>
          </h2>
          <p className="text-gray-400 font-normal text-xs leading-tight line-clamp-2 h-8">{product.attributes?.description}</p>
        </div>

        <div className="px-1 flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
          <Price product={product} card={true} />
        </div>
        <div className="w-full bg-primary/90 text-white rounded-md items-center font-serif font-semibold">
          {inCart(product.id) ? (
            // j"ai modifié cette partie car elle un role important dans l'ajout des produits dans un panier
            // il faut conserver ces modifications
            <div className="mx-auto">
              {items.map(
                item =>
                  item.id === product.id && (
                    <div key={item.id} className="h-9 w-auto flex flex-wrap items-center justify-evenly py-1 px-2 rounded">
                      <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                        <span className="text-base">
                          <IoRemove />
                        </span>
                      </button>
                      <p className="text-sm px-1">{item.quantity}</p>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        disabled={product.attributes.inventories.data[0].attributes.quantity === item.quantity}
                        // note: pb à ce niveau car l'inventaire peut être celui de type "store" ou bien de type "farm", or là la différenciation est innexistante
                      >
                        <span className=" text-base">
                          <IoAdd />
                        </span>
                      </button>
                    </div>
                  ),
              )}
            </div>
          ) : (
            <button
              onClick={() => handleAddItem(product)}
              disabled={product.attributes.inventories.data[0].attributes.quantity < 1}
              aria-label="cart"
              className="h-9 mx-auto w-auto flex items-center justify-center"
            >
              <IoBagAddSharp />

              <span className="ml-2 font-serif text-sm font-medium">Buy Now</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
