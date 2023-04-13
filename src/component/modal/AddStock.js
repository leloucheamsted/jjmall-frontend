import React, { useState, useEffect } from 'react';
import Label from '@component/form/Label';
import MainModal from '@component/modal/MainModal';
import CategoryServices from '@services/CategoryServices';
import Loading from '@component/preloader/Loading';
import InventorieService from '@services/InventorieService';
import qs from 'qs';
import { notifyError, notifySuccess } from '@utils/toast';

const AddStock = ({ product, modalOpen, setModalOpen }) => {

    const [formValue, setformValue] = React.useState({
        "data.quantity": 0,
        "data.name": ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);

    //-- Validation 
    // Begin
    const [errorQuantity, setErrorQuantity] = useState(false);

    useEffect(() => {

    }, []);
    const ValidationQuantity = () => {
        if (quantity == '') {
            setErrorQuantity(true);
            return errorQuantity;
        }
    }
    //-- END

    const RemoveStock = () => {

        if (quantity != '') {
            console.log(formValue);
            setIsLoading(true);
            setModalOpen(!modalOpen)
            InventorieService.removeQuantityInventory(product.id, formValue)
                .then((res) => { notifySuccess("Retrait de stock effectue!!!"), setIsLoading(false); })
                .catch(e => { notifyError("Erreur de retrait de stock!!!"), setIsLoading(false); });
        }
        else if (quantity == '') {
            ValidationQuantity()
        }
    }
    const handleChange = (event) => {
        console.log(event.target.value)
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
        console.log(formValue)
    }
    return (
      <>
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <div className="bg-white relative p-5 inline-block  overflow-y-auto  max-w-lg h-auto max-h-[650px]  text-left align-middle transition-all transform  shadow-xl rounded-2xl">
            <h2 className="text-[20px]  m-2 flex justify-center items-center text-black">Entree de Stock</h2>
            <div className="p-4 xl:flex xl:flex-wrap  ">
              <div className="  mb-3 xl:pr-2 w-full ">
                <Label label="Product  Name" />
                <input
                  name="name"
                  id="name"
                  defaultValue={product.attributes.name ?? ""}
                  onChange={(e) => {
                    setName(e.target.value);
                    handleChange(e);
                  }}
                  type="text"
                  placeholder="Name"
                  disabled={true}
                  className={
                    "p-2 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
                  }
                ></input>
              </div>
              <div className="  mb-3 xl:pr-2 w-full ">
                <Label label="Quantite" />
                <input
                  name="data.quantity"
                  id="quantity"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setErrorQuantity(false);
                    handleChange(e);
                  }}
                  type="number"
                  placeholder="Quantity"
                  className={
                    "p-2 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
                  }
                ></input>
                {errorQuantity == true && <label className="p-1 mb-2 text-red-300">Please insert Category Name</label>}
              </div>

              <button onClick={(e) => RemoveStock()} className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1">
                Enregistrer
              </button>
            </div>
            {isLoading ? (
              <div className="absolute bg-black/50 flex justify-center items-center left-0 top-0 right-0 bottom-0">
                <Loading className="" loading={isLoading} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </MainModal>
      </>
    );
}
export default AddStock;