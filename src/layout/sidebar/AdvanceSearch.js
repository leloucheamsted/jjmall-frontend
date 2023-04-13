import {useRef, useState} from 'react';

const AdvanceSearch = ({data, setData}) => {
  const [checked, setChecked] = useState([]);
  const inputMin = useRef(null);
  const inputMax = useRef(null);
  const inputTag = useRef(null);

  const handleCustomSearch = () => {
    console.log(inputTag.current.value);
    const tag = inputTag.current.value;
    const result = data.filter(elt => elt.attributes.name.includes(tag) || elt.attributes.description.includes(tag));
    inputTag.current.value = '';
    setData(result);
  };

  const resetData = () => {
    const result = data;
    inputTag.current.value = '';
    setData(result);
  };

  const handleCheck = (event, min, max) => {
    console.log('array of data ', data);
    console.log(min);
    console.log(max);
    const isChecked = event.target.checked;
    if (min == 'min' && max == 'max') {
      const amount_min = parseInt(inputMin.current.value);
      const amount_max = parseInt(inputMax.current.value);
      const result = data.filter(
        elt => elt.attributes.prices.data[0].attributes.price >= amount_min && elt.attributes.prices.data[0].attributes.price < amount_max,
      );
      console.log('result of search ', result);
      setData(result);
    } else {
      const amount_min = parseInt(min);
      if (isChecked) {
        if (max == 'max') {
          const result = data.filter(elt => elt.attributes.prices.data[0].attributes.price >= amount_min);
          console.log('result of search ', result);
          setData(result);
        } else {
          const amount_max = parseInt(max);
          const result = data.filter(
            elt =>
              elt.attributes.prices.data[0].attributes.price >= amount_min && elt.attributes.prices.data[0].attributes.price < amount_max,
          );
          console.log('result of search ', result);
          setData(result);
        }
      }
    }
  };

  return (
    <div className="app-search mx-5">
      <div className="checkList-searh">
        <div className="font-[500] font-[Inter] text-[22px] mt-[15px]">Prices</div>
        <div>
          <div className="pb-1 text-gray-600 font-[Inter]">
            <input value="2000" type="radio" onChange={event => handleCheck(event, 0, 2000)} name="prices" />
            <span className="ml-1 font-[Inter]">Less than 2000 xaf</span>
          </div>
          <div className="pb-1 text-gray-600">
            <input value="3000" type="radio" onChange={event => handleCheck(event, 2000, 3000)} name="prices" />
            <span className="ml-1 font-[Inter]">2000 to 3000xaf</span>
          </div>
          <div className="pb-1  text-gray-600">
            <input value="4000" type="radio" onChange={event => handleCheck(event, 3000, 4000)} name="prices" />
            <span className="ml-1 font-[Inter]">3000 to 4000xaf</span>
          </div>
          <div className="pb-1 text-gray-600">
            <input value="5000" type="radio" onChange={event => handleCheck(event, 4000, 'max')} name="prices" />
            <span className="ml-1 font-[Inter]">More than 4000xaf</span>
          </div>
          <div className="grid grid-cols-3 gap-3 font-[Inter]">
            <input type="number" className="input-searh" ref={inputMin} id="min_amount" name="min_amount" placeholder="min" />
            <input type="number" className="input-searh" ref={inputMax} id="max_amount" name="max_amount" placeholder="max" />
            <button type="button" className="border border-slate-600" onClick={event => handleCheck(event, 'min', 'max')}>
              Go
            </button>
          </div>
        </div>
      </div>
      <div className="checkList-searh">
        <div className="font-[500] text-[22px] mt-[15px]">Customer feedbacks:</div>
        <div className="list-container-searh">
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <span key={index} className="star on h-[20px] text-[20px]">
                  &#9733;
                </span>
              );
            })}{' '}
            Stars
          </div>
          <div className="star-rating">
            {[...Array(4)].map((star, index) => {
              index += 1;
              return (
                <span key={index} className="star on text-[20px]">
                  &#9733;
                </span>
              );
            })}
            <span className="star of h-[20px] text-[20px]">&#9733;</span> Stars
          </div>
          <div className="star-rating">
            {[...Array(3)].map((star, index) => {
              index += 1;
              return (
                <span key={index} className="star on text-[20px]">
                  &#9733;
                </span>
              );
            })}
            {[...Array(2)].map((star, index) => {
              index += 1;
              return (
                <span key={index} className="star of text-[20px]">
                  &#9733;
                </span>
              );
            })}{' '}
            Stars
          </div>
          <div className="star-rating">
            {[...Array(2)].map((star, index) => {
              index += 1;
              return (
                <span key={index} className="star on text-[20px]">
                  &#9733;
                </span>
              );
            })}
            {[...Array(3)].map((star, index) => {
              index += 1;
              return (
                <span key={index} className="star of text-[20px]">
                  &#9733;
                </span>
              );
            })}{' '}
            Stars
          </div>
          <div className="star-rating">
            {[...Array(1)].map((star, index) => {
              index += 1;
              return (
                <span key={index} className="star on text-[20px]">
                  &#9733;
                </span>
              );
            })}
            {[...Array(4)].map((star, index) => {
              index += 1;
              return (
                <span key={index} className="star of text-[20px]">
                  &#9733;
                </span>
              );
            })}{' '}
            Star
          </div>
        </div>
      </div>
      <div className="checkList-searh">
        <div className="font-[500] text-[22px] mt-[15px]">Custom tag:</div>
        <div className="list-container-searh">
          <div className="w-full font-[Inter] mb-5">
            <input type="text" className="w-full" ref={inputTag} id="tag" name="tag" placeholder="custom tag" />
          </div>
          <div className="w-full bg-primary/90 text-white rounded-md items-center font-serif font-semibold">
            <button onClick={() => handleCustomSearch()} aria-label="cart" className="h-9 mx-auto w-auto flex items-center justify-center">
              <span className="ml-2 font-serif text-sm font-medium">Search</span>
            </button>
          </div>
          <div className="w-full bg-indigo-500 mt-2 text-white rounded-md items-center font-serif font-semibold">
            <button onClick={() => resetData()} aria-label="cart" className="h-9 mx-auto w-auto flex items-center justify-center">
              <span className="ml-2 font-serif text-sm font-medium">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* <div>{`Items checked are: ${checkedItems}`}</div> */}
    </div>
  );
};

export default AdvanceSearch;
