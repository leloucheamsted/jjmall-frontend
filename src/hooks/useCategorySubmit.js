import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import qs from 'qs'

//internal import
// import UserServices from '@services/UserServices';
import UserServices from '@services/OnboardingServices';
import { UserContext } from '@context/UserContext';
import { notifyError, notifySuccess } from '@utils/toast';
import { ColorSwatchIcon } from '@heroicons/react/outline';
import ProductServices from '@services/ProductServices';
import GenericProductServices from '@services/GenericProductServices';

const useCategorieSubmit = () => {
  console.log("My generic", generic_product_id)
  console.log("My photos list", listAssets)
  console.log("My video list", listVideos)
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {
    state: { phoneNumber },
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const testSubmit = () => {
    console.log("testsubmit ")
  }

  const submitHandler = ({
    price,
    name_product,
    status,
    product_description,
    barcode,
    groupPrice,
    unity,
    category_product,
    quantity,
    generic_product,
    descriptionProduct,
  }) => {
    console.log("first stop")
    setLoading(true);
    // setModalOpen(true);
    const cookieTimeOut = 0.5;

    const data = {
      "data.name": name_product,
      "data.tags[]": tags,
      "data.description": product_description,
      "data.category_product": category_product,
      "data.status": status,
      "data.bar_code": barcode,
      "data.generic_product": generic_product_id,
    }
    const genericData = new FormData();
    var dataJson = {
      name: generateProduct.name,
      price: 100,
    }
    const createProduct = (generic_product_id) => {
      data["data.generic_product"] = generic_product_id
      console.log(data)
      ProductServices.createProduct(data)
        .then((res) => {
          if (res.status == 200) {
            ProductServices.createCategoriesHasProduct(res.data.data.id, category_product)
              .then((res) => {
                if (res.status == 200) {
                  console.log("categorie has setted")
                }
              })
            ProductServices.createPriceOfProduct(res.data.data.id, price)
              .then((res) => {
                if (res.status == 200) {
                  console.log("price has setted")
                }
              })
            ProductServices.createGroupPriceOfProduct(res.data.data.id, groupPrice, unity)
              .then((res) => {
                if (res.status == 200) {
                  console.log("group price has setted")
                }
              })
            ProductServices.addQuantityProduct(res.data.data.id, quantity)
              .then((res) => {
                if (res.status == 200) {
                  console.log("quantity has setted")
                }
              })

            ProductServices.addAssets(res.data.data.id, listAssets, "img")
              .then((res) => {
                // if (res.status == 200) {
                console.log("log assets", res)
                // }
              })
              .catch(e => console.log("insert assets error", e))


            ProductServices.addAssets(res.data.data.id, listVideos, "video")
              .then((res) => {
                // if (res.status == 200) {

                console.log("log videos", res)
                // }
              })
              .catch(e => console.log("insert assets error", e))

          }
          setLoading(false);
          console.log(res)
          notifySuccess('Save Product Success!');
          //setModalOpen(false);
        })
        .catch((err) => {
          console.log(err)
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });

    }
    genericData.append('files.picture', generateProduct.picture);
    genericData.append("data", JSON.stringify(dataJson))
    console.log(genericData.get("files.path"))

    console.log(data)
    // data['data.generic_product'] = generic_product_id
    if (generic_product_id == 0) {
      //--- create generate product before create product
      console.log("create generate product ")
      console.log("Generic data", genericData)
      GenericProductServices.addGenericProduct(genericData)
        .then((res) => {
          let id = res.data.id
          console.log("Id of my generic products", res.data.id)
          data['data.generic_product'] = generic_product_id
          createProduct(id)
        })
        .catch((e) => { console.log(e), setLoading(false) })
      //setLoading(false);
      //--- add product 
    } else {
      console.log("generate product exist ")
      createProduct(generic_product_id)

      //setLoading(false);
    }
    generic_product_id = 0
    console.log("genericData")




  };

  return {
    handleSubmit,
    submitHandler,
    testSubmit,
    register,
    errors,
    loading,
  };
};

export default useCategorieSubmit;
