import React from "react";
import Strip1Image from "../../assets/Strip1Image.png";
import Button1 from "../../components/Button1";
function Strip1() {
  return (
    <div className=" py-8 rounded-2xl ">
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-r p-8 from-gray-800 to-gray-500 rounded-xl">
          <div className=" text-white order-2 md:order-1">
            <h2 className="text-2xl font-semibold">Booking system</h2>
            <h2 className="text-md font-semibold">
              for gyms, classes, creche and more
            </h2>
            <p className="py-4 text-xs text-ellipsis">
              Easy to use and customisable online booking system you can trust{" "}
            </p>

            <Button1 content={"  Features and Functions"} />
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <img
              src={Strip1Image}
              alt="image section"
              className="max-w-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Strip1;
