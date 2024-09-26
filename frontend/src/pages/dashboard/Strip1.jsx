import React from "react";

function Strip1() {
  return (
    <div className="bg-gray-400 py-4">
      <div className="container grid grid-cols-1 md:grid-cols-2 ">
        <div className=" text-white order-2 md:order-1">
          <h2 className="text-2xl font-semibold">Booking system</h2>
          <h2 className="text-md font-semibold">
            for gyms, classes, creche and more
          </h2>
          <p className="py-4 text-xs">
            Easy to use and customisable online booking system you can trust{" "}
          </p>
          <button className="bg-brandBlue hover:bg-brandBlue/55 active:bg-brandBlue p-2 rounded-e-full px-4 text-white font-semibold text-xs duration-200 transition-all">
            {" "}
            Features and Functions{" "}
          </button>
        </div>
        <div className="order-1 md:order-2">
          <img src="" alt="image section " />
        </div>
      </div>
    </div>
  );
}

export default Strip1;
