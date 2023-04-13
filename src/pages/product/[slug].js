import dynamic from "next/dynamic";

//internal import
const ProductScreen = dynamic(() => import("./../../component/product/ProductScreen"), { ssr: false });

export default function Index() {
  return <ProductScreen />;
}
