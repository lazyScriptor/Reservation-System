import React from "react";
import { useNavigate } from "react-router-dom";
const buttonDetails = [
  {
    id: 1,
    title: "Home",
    destination:"/dashboard-c"
  },
  {
    id: 4,
    title: "Demo",
    destination: "/demo",
  },
  {
    id: 5,
    title: "Customers",
    destination: "/customer-c",

  },
  {
    id: 6,
    title: "Create",
    destination:"/forms-c"
  },
  {
    id: 8,
    title: "Logout",
    destination:"/"
  },
];

function NavBar() {
  const handleNavigation = (button) => {
    // Only navigate if the button has a destination
    if (button.destination) {
      navigate(button.destination);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="bg-gray-200">
      <div className="container hidden md:flex overflow-auto">
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
      </div>
    </div>
  );
}

export default NavBar;
