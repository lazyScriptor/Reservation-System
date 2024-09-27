import React from 'react';
import gridImage1 from '../../../assets/gridImage1.jpg';

function ImageGridComponent({ bgColor, heading, description, gridImage }) {
  const bgClass = bgColor === 'brandBlueDark' ? 'bg-brandBlueDark' : bgColor === 'brandBlue' ? 'bg-brandBlue' : 'bg-brandBlueDark'; 

  return (
    <div className="flex justify-start w-full flex-col">
      <div className="h-[40vh] w-full flex">
        {/* 40% of the viewport height */}
        <img
          src={gridImage}
          alt="Grid"
          className="h-full w-full object-cover"
        />
      </div>
      <div className=" text-white">
        <div className={`${bgClass} flex flex-col text-center h-full p-2`}>
          <h2 className="text-xl font-semibold leading-6">{heading}</h2>
          <p className='text-xs py-2'>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ImageGridComponent;
