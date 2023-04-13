import React from 'react';
import Label from '@component/form/Label';

const InputSecurityQuestion = ({
  register,
  name,
  label,
  placeholder,
  Icon,
  InputValue1,
  InputValue2,
  InputValue3,
  value,
  setValue
}) => {
  return (
    <>
      <Label label={label} />
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
              <Icon />{" "}
            </span>
          </div>
        )}

        <select
          {...register(`${name}`)}
          className={
            Icon
              ? "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
              : "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
          }
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
          <option value={InputValue1}>{InputValue1}</option>
          <option value={InputValue2}>{InputValue2}</option>
          <option value={InputValue3}>{InputValue3}</option>
        </select>
      </div>
    </>
  );
};

export default InputSecurityQuestion;
