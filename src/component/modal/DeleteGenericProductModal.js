import React, { useState, useEffect } from "react";

//internal import
import Common from "@component/login/Common";
import MainModal from "@component/modal/MainModal";
import Label from "@component/form/Label";
import Uploader from "@component/image-uploader/Uploader";
import Error from "@component/form/Error";
import { InputPerso } from "@component/form/InputCustomField";
import ShopServices from "@services/ShopServices";
import GenericProductServices from "@services/GenericProductServices";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "@utils/toast";

const DeleteGenericProductModal = ({
  modalOpen,
  setModalOpen,
  data,
  setData,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [valueStatus, setValueStatus] = useState("open");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [dataGenericProduct, setDataGenericProduct] = useState(data);

  const getGenericProduct = () => {
    GenericProductServices.getGenericProduct()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // setError(err.message);
      });
  };

  const deleteGenericProduct = () => {
    GenericProductServices.deleteGenericProduct(dataGenericProduct?.id)
      .then((res) => {
        if (res) {
          setLoading(false);
          getGenericProduct();
          notifySuccess("Delete GenericProduct Successfully!");
          setModalOpen(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err.message ? err.message : err.response.data.message);
      });
  };

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div className="overflow-hidden bg-white mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold font-serif">Delete Generic Product</h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">Delete Generic Product</p>
          </div>
          <div className="form-group">
            <div class="flex w-full">
              <button
                class="text-sm w-full px-2 font-medium leading-5 h-10 bg-primary text-white
                border-2 py-1 shadow-sm hover:text-white hover:bg-emerald-600
                duration-150 ease-in-out"
                // style={{borderColor:isactiveButton1? valborderColor : transparent,borderWidth:2}}
                onClick={() => {
                  deleteGenericProduct();
                }}
                type="button"
              >
                Delete
              </button>
              <button
                class="text-sm w-full px-2 font-medium leading-5 h-10 bg-white text-white
                border-2 py-1 shadow-sm hover:text-white
                duration-150 ease-in-out"
                style={{ backgroundColor: "#cf624b" }}
                onClick={() => {
                  setModalOpen(false);
                }}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainModal>
  );
};

export default React.memo(DeleteGenericProductModal);
