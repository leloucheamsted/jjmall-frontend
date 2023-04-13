import React from 'react';
import Label from '@component/form/Label';
import Input from 'react-phone-number-input/input'
// import PhoneInput from 'react-phone-number-input'
import { transparent } from 'tailwindcss/colors';

import PhoneInput, { isValidPhoneNumber } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm, Controller } from "react-hook-form";

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

        <PhoneInput
          {...register(`${name}`)}
          inputStyle={{ width: "100%", height: 45 }}
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

const InputTexterea = ({
  register,
  name,
  label,
  type,
  placeholder,
  Icon,
  disable,
  value,
  showLabel,
  id,

}) => {
  return (
    <>
      {showLabel && <Label label={label} />}
      <div className=" h-[100px] w-full ">
        <textarea
          disabled={disable}
          {...register(`${name}`, {
            required: `${label} is required!`,
          })}
          type={type}
          id={id}
          defaultValue={value}
          placeholder={placeholder}
          name={name}
          className="p-1 w-full h-[100px] appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary "
        />
      </div>
    </>
  );
};
export { InputPhoneNumber, InputTexterea };
