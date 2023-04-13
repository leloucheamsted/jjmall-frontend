import React, { useState, useEffect, useContext } from 'react';
import Label from '@component/form/Label';
import Input from 'react-phone-number-input/input'
import { transparent } from 'tailwindcss/colors';
import Image from 'next/image'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm, Controller } from "react-hook-form";
import CategoryServices from '@services/CategoryServices';
import GenericProductServices from '@services/GenericProductServices';
import Avatar from '@component/common/Avatar';
const genericProduct = GenericProductServices.getGenericProduct();

const InputPhoneNumber = ({
  register,
  name,
  label,
  placeholder,
  Icon,
  id,
  international = true,
  withCountryCallingCode = true,
  country,
  setValue,
  value,
  onChange,
}) => {
  const { control } = useForm();
  return (
    <>
      <Label label={label} />
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
              <Icon />{' '}
            </span>
          </div>
        )}
        {/* <PhoneInput
          {...register(`${name}`, {
            required: `${label} is required!`,
          })}
          style={{borderWidth:1.5,borderRadius:5}}
          inputStyle={{width:"100%",borderWidth:1}}
          defaultCountry={country}
          international={international}
          withCountryCallingCode={withCountryCallingCode}
          id={id}

          placeholder={placeholder}
          country={country}
          value={value}
          onChange={setValue}
          
          name={name}
          
        /> */}

        <PhoneInput
          {...register(`${name}`)}
          inputStyle={{ width: "100%", height: 45 }}
          // inputProps={{
          //   name: {name},
          // }}
          id={id}
          placeholder={placeholder}
          country={country}
          value={value}
          onChange={setValue}
          name={name}
        />

      </div>
    </>
  );
};

const InputPerso = ({
  disable,
  register,
  name,
  label,
  type,
  placeholder,
  isNotRequired,
  Icon,
  id,

}) => {
  return (
    <>
      <Label label={label} />
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
              <Icon />{' '}
            </span>
          </div>
        )}
        <input
          {...register(`${name}`, isNotRequired ?? {
            required: `${label} is required!`,
          })}
          type={type}
          id={id}
          disabled={disable}
          placeholder={placeholder}
          name={name}
          className={
            Icon
              ? "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
              : "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
          }
        />
      </div>
    </>
  );
};

const InputSelectPerso = ({
  register,
  name,
  label,
  status,
  disable,
  type,
  placeholder,
  Icon,
  id,

}) => {
  const [valueStatus, setValueStatus] = useState('disable');

  return (
    <>
      <Label label={label} />
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
              <Icon />{' '}
            </span>
          </div>
        )}
        <select
          {...register(`${name}`)}
          type={type}
          id={id}
          value={valueStatus}
          disabled={disable}
          placeholder={placeholder}
          name={name}
          className={
            Icon
              ? "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
              : "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
          }
        >
          {status.map((tag, index) => (
            <option value={tag} selected>{tag}</option>
          ))}
        </select>
      </div>
    </>
  );
};

const InputCategory = ({
  register,
  name,
  label,
  type,
  placeholder,
  Icon,
  id,
}) => {

  const handleChange = (e) => {
    console.log("Category Selected!!", e.target.value);
  }
  const [categories, setCategories] = useState([])

  useEffect(() => {
    CategoryServices.getAllCategory().then((res) => {
      setCategories(res.data)
      console.log(categories)
    })
  }, []);

  return (

    <>

      <Label label={label} />
      <div className="relative">
        <select

          {...register(`${name}`, {
            required: `${label} is required!`,
          })}
          id={id}
          defaultValue={1}
          name={name}
          onChange={(e) => handleChange(e)}
          className={
            Icon
              ? " pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
              : " px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
          }
        >
          {categories.map((tag, index) => (
            <option value={tag.id} selected>{tag.attributes.name}</option>
          ))}
        </select>
      </div>
    </>
  );
};


const InputGenericProduct = ({
  register,
  name,
  createGenerateProduct,
  completeDescription,
  completeDisable,
  label,
  imageProduct,
  type,
  placeholder,
  Icon,
  id,
  onChange

}) => {
  const [listCategories, setlistCategories] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [description, setDescription] = useState('');
  const [listProducts, setListProducts] = useState([])
  const [picture, setPicture] = useState('');
  const [enablePicture, setEnablePicture] = useState(false)
  const [disable, setDisable] = useState(false);
  const [genericImage, setGenericImage] = useState('');

  const selectCategorie = (e, i) => {
    document.getElementById(id).value = e.target.innerText;
    completeDescription(i.attributes)
    console.log(i.attributes.price)
    setGenericImage(i.attributes.picture.data.attributes.url)
    setEnablePicture(true)
    completeDisable(true)
    setlistCategories(false)
  }
  useEffect(() => {
    GenericProductServices.getGenericProduct().then((res) => {
      setSuggestions(res)
      setListProducts(res)
      // console.log(res)
    })
  }, []);
  const changeParentCategory = async (e) => {

    // console.log("suggestions initiales", listProducts);
    var value = e.target.value;
    if (value != '') {
      listProducts = listProducts?.filter(element => element.attributes.name.includes(value));
      console.log(listProducts)
      if (listProducts.length == 0) {
        setEnablePicture(false)
        listCategories = false;
        setDescription('')
        completeDisable(true)
        setlistCategories(false);
        setListProducts(suggestions)
      } else {
        setListProducts(listProducts)
        setlistCategories(true);
      }
    } else {
      //suggestions = []
      setEnablePicture(false)
      listCategories = false
      setListProducts(suggestions)
      // setDescription('')
      completeDescription('')
      setlistCategories(false);
      // setDisable(true)
      completeDisable(false);
    }


  }
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      const generate = listProducts.find(item => item.attributes.name == e.target.value)
      console.log(generate)
      if (generate) {
        console.log(generate.attributes.price)
        completeDescription(generate.attributes.price)
        //setDescription(generate.attributes.price)
        //  console.log(description)
        setGenericImage(generate.attributes.picture.attributes.data.url)
        setEnablePicture(false)
        // setDisable(true)
        completeDisable(false)
        onChange(generate)
      } else {
        setDisable(false)
        completeDisable(true)
        setEnablePicture(false)
        completeDescription('')
      }
      setlistCategories(false)
    }
  }
  const onChangeInputPhoto = (e) => {
    let url = URL.createObjectURL(e.target.files[0])
    setGenericImage(url)
    setEnablePicture(true)
    const data = {
      file: e.target.files[0]
    }
    console.log(genericImage)
  }
  return (
    <>
      <Label label={label} />
      <div className="relative ">
        <div className="space-y-2 mt-2">
          <div className="h-11 flex flex-wrap space-x-3 items-center  w-full  appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out border-gray-200 focus:outline-none focus:border-primary  md:h-12 ">
            <div className="bg-black relative flex justify-center items-center w-20 h-full">
              {enablePicture == true ? (
                <img
                  className=' absolute h-full w-full top-0 left-0 right-0 bottom-0 overflow-hidden cursor-pointer '
                  src={genericImage != '' ? genericImage : "https://i.ibb.co/sWBMfVP/Freshmaker-Baby-Wet-Wipes-With-Cover-72pcs.jpg"}

                  layout="responsive"
                  width={40}
                  height={40}

                ></img>
              ) : <svg xmlns="http://www.w3.org/2000/svg" class="w-[30px] h-[30px] text-[#10b981] group-hover:text-[#10b981"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              }

              <input
                onChange={(e) => { onChangeInputPhoto(e), createGenerateProduct({ picture: e.target.files[0] }) }} type="file" className="opacity-0 w-full h-full absolute left-0 bottom-0 right-0 top-0" accept='image/*' disabled={disable} ></input>
            </div>
            <div>
              <input      {...register(`${name}`, {
                required: `${label} is required!`,
              })}
                type={type}
                id={id}
                onChange={(e) => { changeParentCategory(e), onChange(0), createGenerateProduct({ name: e.target.value }) }}
                placeholder={placeholder}
                name={name}
                onKeyDown={(e) => handleKeyDown(e)}
                className='border-none outline-none focus:outline-none focus:border-none focus:ring-1 focus:ring-[#fff] focus:border-white h-10'></input>
            </div>
          </div>
          {listCategories == true ?
            <div className='h-55 w-55 bg-white border-none shadow-sm  rounded-sm p-2'>
              {listProducts.map((i, index) => {
                return (
                  <>
                    <div onClick={(e) => { selectCategorie(e, i); onChange(i.id) }} className='hover:bg-gray-100 hover:text-[#10b981] p-1 cursor-pointer  text-black font-semibold'>
                      {i.attributes.name}
                    </div>
                  </>
                )
              })}
            </div>
            : <div className='hidden'></div>}
        </div>
      </div>
    </>
  );
};
export { InputPhoneNumber, InputSelectPerso, InputPerso, InputCategory, InputGenericProduct };
