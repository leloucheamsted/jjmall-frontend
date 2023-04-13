import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const SpinLoader = ({ loading }) => {
  return (
    
    <ClipLoader
        color="#ffff"
        loading={loading}
        size={20}
        margin={5}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
   
  );
};

export {SpinLoader}