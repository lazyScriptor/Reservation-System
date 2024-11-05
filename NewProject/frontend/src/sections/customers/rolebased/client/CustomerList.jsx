import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomersList() {
  const navigate = useNavigate();
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
  const handleClick = (object) => {
    navigate(`/reservations/${object.tenant_id}`);
    console.log(object);
  };
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
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {ObjectList.map((object, index) => (
            <div
              key={index}
              className="hover:cursor-pointer font-semibold hover:text-white transition-all duration-200 border-2 border-white hover:border-gray-400 text-center p-4 rounded-md hover:bg-gray-300 bg-gray-200"
              onClick={() => handleClick(object)}
            >
              {object.tenant_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomersList;
