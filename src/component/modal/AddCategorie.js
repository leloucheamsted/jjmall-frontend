import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Label from '@component/form/Label';
import Uploader from '@component/image-uploader/Uploader';
import { IoClose, IoPlay } from 'react-icons/io5';
import Image from 'next/image'
import MainModal from '@component/modal/MainModal';
import CategoryServices from '@services/CategoryServices';
import Loading from '@component/preloader/Loading';
import useAsync from '@hooks/useAsync';
import { InputPerso } from '@component/form/InputCustomField';
import useCategorieSubmit from '@hooks/useCategorySubmit';
import { notifyError, notifySuccess } from '@utils/toast';


const AddCategorie = ({ modalOpen, setModalOpen }) => {

    const [formValue, setformValue] = React.useState({
        name: '',
        description: '',
        parent: 1
    });

    const [isLoading, setIsLoading] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    //-- Validation 
    // Begin
    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    useEffect(() => {
        CategoryServices.getAllCategory().then((res) => {
            setSuggestions(res.data)
            console.log(suggestions)
        })
    }, []);
    const ValidationName = () => {
        if (categoryName == '') {
            setErrorName(true);
        }
    }
    const ValidationDescription = () => {
        if (categoryDescription == '') {
            setErrorDescription(true);
            return errorDescription;
        }
    }
    //-- END

    const CreateCategory = () => {

        if (categoryName != '' && categoryDescription != '') {
            console.log(formValue);
            setIsLoading(true);
            setModalOpen(!modalOpen)
            if (formValue.parent == 0) {
                const data = {
                    name: formValue.name,
                    description: formValue.description,
                    // parent: 0
                }
                CategoryServices.createCategory(data)
                    .then((res) => {
                        notifySuccess("Categorie cree avec succes!")
                        setIsLoading(false);
                    })
                    .catch(e => {
                        notifyError(e ? e.response.data.message : e.message);
                        setIsLoading(false);
                    });
            } else {
                CategoryServices.createCategory(formValue)
                    .then((res) => {
                        notifySuccess("Categorie cree avec succes!")
                        setIsLoading(false);
                    })
                    .catch(e => {
                        notifyError(e ? e.response.data.message : e.message);
                        setIsLoading(false);
                    });
            }
        }
        else if (categoryName == '' || categoryDescription == '') {
            ValidationDescription()
            ValidationName()

            // ValidationParentName()
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
            <h2 className="text-[20px]  m-2 flex justify-center items-center text-black">Create Category</h2>
            <div className="p-4 xl:flex xl:flex-wrap  ">
              <div className="  mb-3 xl:pr-2 w-full ">
                <Label label="Category Name" />
                <input
                  name="name"
                  id="name"
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    setErrorName(false);
                    handleChange(e);
                  }}
                  type="text"
                  placeholder="Name"
                  className={
                    "p-2 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
                  }
                ></input>
                {errorName == true && <label className="p-1 mb-2 text-red-300">Please insert Category Name</label>}
              </div>

              {/* Select parent category */}
              <Label label="Parent Categorie" />
              <div className="relative w-full">
                <select
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  //   {...register(`${name}`, {
                  //     required: `${label} is required!`,
                  //   })}
                  id="parent"
                  name="parent"
                  className={
                    "p-2 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
                  }
                >
                  <option value={0} selected></option>
                  {suggestions.map((tag, index) => (
                    <option value={tag.id} selected>
                      {tag.attributes.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Description */}
              <div className="  my-5 xl:pr-2 w-full">
                <Label label="Descriptiono" />
                <textarea
                  id="description"
                  name="description"
                  onChange={(e) => {
                    setCategoryDescription(e.target.value);
                    setErrorDescription(false);
                    handleChange(e);
                  }}
                  className={
                    "p-2 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
                  }
                  placeholder="Description"
                ></textarea>
                {errorDescription == true && <label className="p-1 mb-2 text-red-300">Category Description is empty</label>}
              </div>

              <button onClick={(e) => CreateCategory()} className="w-full text-center py-3 rounded bg-primary text-white hover:bg-emerald-600 transition-all focus:outline-none my-1">
                Create
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
export default AddCategorie;