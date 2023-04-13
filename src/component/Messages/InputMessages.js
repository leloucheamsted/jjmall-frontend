import React, {useState, useRef} from 'react';
import Image from 'next/image';
import {BsImage} from 'react-icons/bs';
import {AiOutlineSend} from 'react-icons/ai';
import {IoClose} from 'react-icons/io5';

const InputMessages = ({value, handleChange, sendMessage, chatCode, image, setImage}) => {
  const imageRef = useRef();

  const [file, setFile] = useState(null);

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setImage({image: URL.createObjectURL(event.target.files[0])});
    }
  };

  return (
    <div className="messages-box flex items-center justify-between h-full relative">
      {image && (
        <div className="absolute bottom-0 h-14 w-14 overflow-hidden">
          <div className="h-4 w-4 rounded-full bg-white flex items-center justify-center absolute top-1 right-1 z-10 cursor-pointer">
            <IoClose className="text-red-600 font-bold" onClick={() => setImage(null)} />
          </div>
          <Image src={image.image} width={'100%'} height={'100%'} className="object-cover" />
        </div>
      )}
      <input
        type="text"
        placeholder={!image && 'Type something here...'}
        className={`${
          image && 'pointer-events-none select-none '
        } border-transparent focus:border-transparent focus:ring-0 bg-white h-[85%] w-full md:text-[1rem] text-[.8rem]`}
        value={value}
        onChange={handleChange}
      />
      <div className="flex items-center gap-2">
        <input type="file" className="hidden" id="file" ref={imageRef} onChange={onImageChange} />

        <label htmlFor="file" className="lg:block md:block hidden cursor-pointer" onClick={() => imageRef.current.click}>
          <BsImage size={35} color="#288a36" />
        </label>
        <label htmlFor="file" className="md:hidden cursor-pointer" onClick={() => imageRef.current.click}>
          <BsImage size={25} color="#288a36" />
        </label>

        <button
          type=""
          className="lg:flex md:flex hidden cursor-pointer bg-[#288a36] px-6 py-2 text-white capitalize rounded"
          onClick={() => sendMessage(value, file, chatCode)}
        >
          <AiOutlineSend size={25} />
        </button>
        <button
          type=""
          className="md:hidden cursor-pointer bg-[#288a36] px-6 py-2 text-white capitalize rounded"
          onClick={() => sendMessage(value, file, chatCode)}
        >
          <AiOutlineSend size={15} />
        </button>
      </div>
    </div>
  );
};

export default InputMessages;
