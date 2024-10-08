import axios from "axios";
import React, { useEffect, useState } from "react";

function CustomersList() {
  const [ObjectList, setObjectList] = useState([
    {
      id: 1,
      link: "123",
    },
    {
      id: 2,
      link: "3",
    },
  ]);
  useEffect(() => {
    const func = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/brand-names`
      );
      console.log(response.data);
      setObjectList(response.data);
    };
    func();
  }, []);

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex justify-center flex-col py-4">
          <h1 className="text-center pb-4 text-2xl font-semibold">
            Our Customers
          </h1>
          <hr className="border-2 rounded-full w-10 self-center  border-brandBlue " />
        </div>
        {/* Customer section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
          {ObjectList.map((object, index) => (
            <div>{object.brand_name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomersList;
