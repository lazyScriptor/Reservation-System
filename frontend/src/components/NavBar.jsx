import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Importing Menu and Close icons

const buttonDetails = [
  {
    id: 1,
    title: "Home",
    destination: "/dashboard-c",
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
    destination: "/forms-c",
  },
  {
    id: 8,
    title: "Logout",
    destination: "/",
  },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the mobile menu
  const navigate = useNavigate();

  const handleNavigation = (button) => {
    // Only navigate if the button has a destination
    if (button.destination) {
      navigate(button.destination);
    }
    // Close the menu after navigation on mobile
    setMenuOpen(false);
  };

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-gray-50">
      <div className="container md:flex justify-between items-center p-4 relative z-10">
        {/* Icon for mobile navigation */}
        <div className="flex justify-between items-center md:hidden">
          <h1 className="text-lg font-bold text-brandBlue">AppName</h1>
          <button onClick={toggleMenu} className="text-2xl text-brandBlue">
            {menuOpen ? <FiX /> : <FiMenu />} {/* Menu and Close buttons */}
          </button>
        </div>

        {/* Full navigation menu */}
        <ul
          className={`flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-0 bg-gray-50 md:bg-transparent fixed md:static top-0 left-0 h-full w-2/3 md:w-auto transition-transform duration-300 ease-in-out z-10 md:z-auto ${
            menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          {buttonDetails.map((button, index) => (
            <li
              onClick={() => handleNavigation(button)}
              className="p-2 rounded-md text-gray-500 font-semibold hover:text-brandBlue active:text-brandBlueDark cursor-pointer transition-all duration-200"
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
