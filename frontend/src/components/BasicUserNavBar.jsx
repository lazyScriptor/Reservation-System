import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const buttonDetails = [
  {
    id: 1,
    title: "Home",
    destination: "/dashboard-bu",
  },
  {
    id: 5,
    title: "Customers",
    destination: "/customer-bu",
  },
  {
    id: 8,
    title: "Logout",
    destination: "/",
  },
];

function BasicUserNavBar() {
  const [ppImgUrl, setPpImgUrl] = useState("");
  const [userName, setUserName] = useState("");
  const handleNavigation = (button) => {
    // Only navigate if the button has a destination
    if (button.destination) {
      navigate(button.destination);
    }
  };
  const navigate = useNavigate();
  const googleObjectString = localStorage.getItem("googleObject");

  useEffect(() => {
    if (googleObjectString) {
      try {
        const googleObject = JSON.parse(googleObjectString);
        setUserName(googleObject.googleName);
        setPpImgUrl(googleObject.googleImg);
      } catch (error) {
        console.error("Failed to parse googleObjectString:", error);
        // Handle the error appropriately (e.g., set default values)
      }
    }
  }, [googleObjectString]);
  
  return (
    <div className="bg-gray-200 text-gray-500 ">
      <div className="container hidden md:flex overflow-auto justify-between">
        <ul className="flex p-1 gap-4 ">
          {buttonDetails.map((button, index) => (
            <li
              onClick={() => handleNavigation(button)}
              className="p-2 rounded-md text-gray-500  font-semibold px-2 hover:text-brandBlue active:text-brandBlueDark cursor-pointer transition-all duration-200"
              key={index}
            >
              {button.title}
            </li>
          ))}
        </ul>
        <div className="flex ">
          <img
            className="rounded-full aspect-square w-12"
            src={ppImgUrl}
            alt="profile pic"
          />
          <div className="px-3 ">
            <h2>Hola ! </h2>
            <h2>{userName}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicUserNavBar;
