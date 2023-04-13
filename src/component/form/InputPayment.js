import React, { useEffect, useState } from 'react';
import Label from './Label';
const Numbers = ["682323467", "698756734"]
const InputPayment = ({ register, Icon, name, value, setShowCard }) => {
  return (
    <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
      <label className="cursor-pointer label">
        <div className="flex item-center justify-between">
          <div className="flex items-center">
            <span className="text-xl mr-3 text-gray-400">
              <Icon />
            </span>
            <h6 className="font-serif font-medium text-sm text-gray-600">{name}</h6>
          </div>
          <input
            onClick={() => setShowCard(value === "Card" ? true : false)}
            {...register("paymentMethod", {
              required: "Payment Method is required!",
            })}
            type="radio"
            value={value}
            name="paymentMethod"
            className="form-radio outline-none focus:ring-0 text-primary"
          />
        </div>
      </label>
    </div>
  );
};


const InputMobileMoney = ({ disable, register, name, label, type, placeholder, Icon, id, Change }) => {
  const [number, setNumber] = useState('');
  const [showList, setShowList] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [listNumbers, setListNumbers] = useState([]);

  useEffect(() => {
    setSuggestions(Numbers)
  }, []);

  const handleChange = value => {
    const result = value.replace(/[^0-9]/gi, '');
    setNumber(result);
    console.log(`My result ====` + number)
  }

  const showChoiceNumber = async (e) => {
    // number = e.target.value.replace(/[^0-9]/gi, '');
    document.getElementById(id).value = e.target.value.replace(/[^0-9]/gi, '');
    // setNumber(e.target.value.replace(/[^0-9]/gi, ''));
    var value = e.target.value.replace(/[^0-9]/gi, '');
    console.log(`My result === ` + number)
    if (value != '') {
      listNumbers = suggestions?.filter(element => element.startsWith(value) === true);
      console.log(listNumbers)
      if (listNumbers.length == 0) {
        setShowList(false)
      } else {
        setListNumbers(listNumbers)
        setShowList(true);
      }
    } else {
      setListNumbers([])
      setShowList(false);
    }

  }
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      handleChange(e.value)
      setNumber(e.value)
    }

  }
  const selectNumber = async (i) => {
    number = i;
    document.getElementById(id).value = i
    setNumber(i)
    setShowList(false)
    Change(i)
    console.log(`numbre` + i)
  }
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
          {...register(`${name}`, {
            required: `${label} is required!`,
          })}
          type={type}
          id={id}
          maxLength={9}
          disabled={disable}
          placeholder={placeholder}
          onChange={(e) => { showChoiceNumber(e) }}
          onKeyDown={(e) => handleKeyDown(e)}
          name={name}
          className={
            Icon
              ? "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
              : "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-primary h-11 md:h-12"
          }
        />
        {showList && (
          <div className=' border-primary border-1 '>
            {listNumbers.map((i, index) => {
              return (
                <>
                  <div onClick={(e) => { selectNumber(i) }} className='   flex  p-3 hover:text-[#10b981]  cursor-pointer  text-black font-semibold'>
                    <span className='h-5 hover:bg-[#10b981] w-5 mr-3 rounded-[20px] bg-gray-300'></span> {i}
                  </div>
                  <hr className='h-1' />
                </>
              )
            })}
          </div>
        )

        }
      </div>
    </>
  );
};
export { InputPayment, InputMobileMoney };
