import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";

//internal import
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import Dashboard from "@pages/user/dashboard";
import InputArea from "@component/form/InputArea";
import { UserContext } from "@context/UserContext";
import Uploader from "@component/image-uploader/Uploader";
import { notifySuccess, notifyError } from "@utils/toast";
import { InputPerso } from "@component/form/InputCustomField";
import GenericProductServices from "@services/GenericProductServices";
import { useRouter } from "next/router";

const typeBussineess = [
  { value: "Restaurant", label: "Restaurant" },
  { value: "Hair Salon", label: "Hair Salon" },
  { value: "Supermarket", label: "Supermarket" },
  { value: "Pharmacy", label: "Pharmacy" },
  { value: "Snack bar", label: "Snack bar" },
];
const GenericProduct = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [valuePhone, setValuePhone] = useState("");
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);

  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userData = {
      name: data.name ? data.name : "",
      price: data.price ? data.price : "",
    };
    const filesData = new FormData();
    for (let i = 0; i < filesUpload.length; i++) {
      // console.log(filesUpload[i]);
      filesData.append("files.picture", filesUpload[i]);
    }
    filesData.append("data", JSON.stringify(userData));

    console.log(filesData);

    GenericProductServices.addGenericProduct(filesData)
      .then((res) => {
        if (res) {
          setLoading(false);
          reset({
            name: "",
            price: "",
          });
          router.push(redirect || "/generic-product/list-generic-products");
          notifySuccess("Create Product Successfully!");
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err.message ? err.message : err?.response?.data?.message);
      });
  };

  return (
    <Dashboard title="Update-Profile" description="This is edit profile page">
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">Create Generic Product</h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="bg-white space-y-6">
              <div>
                <Label label="Product Image" />
                <div className="mt-1 flex items-center">
                  <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} setFilesUpload={setFilesUpload} />
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid-cols-6 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="lg:mt-6 mt-4 bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea register={register} label="Name Product" name="name" type="text" placeholder="Name Product" />
                        <Error errorName={errors.name} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputPerso register={register} label="Price" name="price" type="number" placeholder="Price" />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                      <button
                        disabled={loading}
                        type="submit"
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-primary text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                      >
                        Create Generic Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default dynamic(() => Promise.resolve(GenericProduct), { ssr: false });
