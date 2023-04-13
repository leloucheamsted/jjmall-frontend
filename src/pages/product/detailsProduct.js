import Label from "@component/form/Label";
import AddStock from "@component/modal/AddStock";
import RemoveStock from "@component/modal/RemoveStock";
import Loading from "@component/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import Layout from "@layout/Layout";
import InventorieService from "@services/InventorieService";
import ProductServices from "@services/ProductServices";
import { notifyError, notifySuccess } from "@utils/toast";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronUp } from "react-icons/fi";
import { ToastContainer } from "react-toastify";


const DetailsProduct = () => {
    const [queryParameters] = new URLSearchParams(globalThis.window?.location.search)
    const [productName, setProductName] = useState('')
    const [modalStockOpen, setModalStockOpen] = useState(false); // modal stock 
    const [modalAddStockOpen, setModalAddStockOpen] = useState(false); // modal stock 
    const [productID, setProductID] = useState(0)
    const [product, setProduct] = useState({})
    const [formValue, setformValue] = useState({
        "data.quantity": product,
    });
    const [isLoding, setIsLoding] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const router = useRouter();

    //-- Validation 
    // Begin

    useEffect(() => {
        setProductName(queryParameters[0].split('-')[1])
        setProductID(queryParameters[0].split('-')[0])
        ProductServices.getProductById(queryParameters[0].split('-')[0])
            .then((res) => {
                setProduct(res.data)
                setIsLoding(false)
                setQuantity(res.data.attributes?.inventories?.data[0]?.attributes.quantity)
                console.log(res.data.attributes?.assets.data[0].attributes.path.data.attributes.url)
            })
            .catch((e) => console.log(e))
        console.log(product)
    }, [])
    const AddStock = (q) => {
        setIsLoading(true);
        console.log(q)
        // setQuantity(formValue["data.quantity"])
        if (q < 1) {
            console.log(q)
            notifyError("Impossible d'avoir un stock negatif!!!")
            setIsLoading(false);
            return
        }

        InventorieService.removeQuantityInventory(product.attributes?.inventories.data[0].id, formValue, "in")
            .then((res) => { notifySuccess("Ajjout de stock effectue!!!"), setQuantity(q); document.getElementById('quantity').value = ''; setIsLoading(false); })
            .catch(e => { notifyError("Erreur d'ajout de stock!!!"), console.log(e), setIsLoading(false); });
        // setIsLoading(false);
    }
    const RemoveStock = (q) => {
        setIsLoading(true);
        console.log(q)
        // setQuantity(formValue["data.quantity"])
        if (q < 1) {
            console.log(q)
            notifyError("Impossible d'avoir un stock negatif!!!")
            setIsLoading(false);
            return
        }

        InventorieService.removeQuantityInventory(product.attributes?.inventories.data[0].id, formValue, "out")
            .then((res) => { notifySuccess("Retrait de stock effectue!!!"), setQuantity(q); document.getElementById('quantity').value = ''; setIsLoading(false); })
            .catch(e => { notifyError("Erreur de retrait de stock!!!"), console.log(e), setIsLoading(false); });
        //  setIsLoading(false);
    }
    const goToHistory = (id) => {
        router.push(`/product/historyStocks/?${id}`)
    }
    return (
        <>
            {isLoding ? (
                <Loading loading={isLoding} />
            ) : (

                <Layout>
                    <ToastContainer />
                    <div className='relative'>
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
                                            {productName}
                                        </li>
                                        <li className="text-sm mt-[1px]">
                                            {" "}
                                            <FiChevronRight />{" "}
                                        </li>
                                        <li className="text-sm px-1 transition duration-200 ease-in ">
                                            Details
                                        </li>
                                    </ol>
                                </div>
                                <div className="  w-full rounded-lg p-3 lg:p-12 bg-white">
                                    <div className="flex flex-col xl:flex-row">
                                        <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12">
                                            <img className="w-[250px] h-[150px]"
                                                src={product.attributes?.assets.data[0].attributes.path.data.attributes.url ?? ''}
                                                alt={product.attributes?.assets.data[0].attributes.path.data.attributes.name ?? ''}
                                                layout="responsive"
                                                width={150}
                                                height={150}
                                                priority
                                            ></img>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                                                <div className="w-full md:w-7/12 md:pr-4 lg:pr-4 xl:pr-12">
                                                    <div className="mb-6">
                                                        <h1 className="leading-7 text-lg md:text-xl lg:text-2xl mb-1 font-semibold font-serif text-gray-800">
                                                            {product.attributes?.name}
                                                        </h1>
                                                        <p className="uppercase font-serif font-medium text-gray-500 text-sm">
                                                            Code :{product.attributes?.bar_code}

                                                        </p>
                                                        <p className="uppercase font-serif font-medium text-gray-500 text-sm">

                                                            <span className="font-bold text-gray-600">
                                                                {product.attributes?.sku
                                                                    ? product.attributes.sku
                                                                    : ""}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="">
                                                        {product.attributes?.prices.data.length > 0 && (
                                                            <div>
                                                                {product.attributes?.prices.data.map((e, index) => (
                                                                    <span key={index + 1} style={{ fontWeight: "bold" }} className={e.attributes.type == "single" ? 'text-md font-serif text-orange-600' :
                                                                        'mx-2 text-md font-serif text-gray-400'}>
                                                                        {e.attributes.type == 'single' ? e.attributes.price : 'for groups or ' + e.attributes.price}{' XAF'}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            // <span className='mx-2 text-md font-serif text-gray-400'>
                                                            //   for groups or {'900'}{' XAF'}
                                                            // </span>
                                                        )}
                                                    </div>
                                                    <div className="mb-4 md:mb-5 block">
                                                        <span className="bg-emerald-100 text-emerald-600 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold mt-2 font-serif">
                                                            {product.attributes?.status}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm leading-6 text-gray-500 md:leading-7">
                                                            {product.attributes?.description ? product.attributes.description : `In this shop we sell many products such as Baby Products. 
                            Baby Products are products intended to be used 
                            on infants and children under the age of three. Baby products are specially formulated
                             to be mild and non-irritating and use ingredients that are selected for these properties. 
                             Baby products include baby shampoos and baby lotions, oils, powders and creams.`}
                                                        </p>







                                                        <div className="flex flex-col mt-4">
                                                            <span className="font-serif font-semibold py-1 text-sm d-block">
                                                                <span className="text-gray-700">Created At:</span>{" "}
                                                                <span className="text-gray-500">
                                                                    {dayjs(product.attributes?.createdAt).format('D/MM/YYYY')}
                                                                </span>
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                                                    <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">

                                                        <h1 className="leading-7 mb-5 flex justify-center text-lg md:text-xl lg:text-2xl mb-1 font-semibold font-serif text-gray-800">
                                                            Quantite: <span>{quantity}</span>
                                                        </h1>
                                                        <Label label="Enregistrer une sortie de stock" />
                                                        <input
                                                            name='data.quantity'
                                                            id='quantity'
                                                            onChange={(e) => {
                                                                setformValue({
                                                                    ...formValue,
                                                                    [e.target.name]: e.target.value
                                                                });
                                                                console.log(e.target.value, formValue["data.quantity"]);
                                                            }}
                                                            type="number"
                                                            placeholder="Quantity"
                                                            className={
                                                                'p-2 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12'
                                                            }
                                                        ></input>
                                                        <button
                                                            //  disabled={formValue["data.quantity"] > 0 ? false : true}
                                                            onClick={(e) => RemoveStock(quantity - parseInt(formValue["data.quantity"]))}
                                                            className="w-full text-center h-12  rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
                                                        >
                                                            sortir de stock
                                                        </button>
                                                        <button
                                                            //  disabled={quantity + formValue["data.quantity"] < 0 ? false : true}
                                                            onClick={(e) => AddStock(quantity + parseInt(formValue["data.quantity"]))}
                                                            className="w-full text-center h-12  rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
                                                        >
                                                            Entrer de stock
                                                        </button>
                                                        <div className="flex justify-end p-3 items-center">
                                                            <h3 onClick={() => goToHistory(product.id)} className="flex justify-end items-center cursor-pointer hover:text-emerald-500">Consulter l'historique des stocks</h3>
                                                        </div>
                                                        {/* <button
                                                        onClick={() => { setModalAddStockOpen(true); console.log('rien') }}
                                                        className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12"
                                                    >
                                                        Enregistrer une Entree de stock
                                                    </button>
                                                    <button
                                                        onClick={() => { setModalStockOpen(true); console.log('rien') }}
                                                        className="my-3 text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12"
                                                    >

                                                        <span className="px-2">
                                                            {"Enregistrer une Sortie de stock "}
                                                        </span>

                                                    </button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className='absolute bg-black/50 flex justify-center items-center left-0 top-0 right-0 bottom-0'>
                                <Loading className="" loading={isLoading} />
                            </div>

                        ) : (
                            <div></div>
                        )
                        }
                    </div>
                </Layout>
            )
            }
        </>
    )
}
export default DetailsProduct;