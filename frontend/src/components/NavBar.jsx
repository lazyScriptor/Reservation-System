import React from "react";

const buttonDetails = [
  {
    id: 1,
    title: "Home",
  },
  {
    id: 2,
    title: "Features",
  },
  {
    id: 3,
    title: "Products",
  },
  {
    id: 4,
    title: "Demo",
  },
  {
    id: 5,
    title: "Customers",
  },
  {
    id: 6,
    title: "Pricing",
  },
  {
    id: 7,
    title: "Contact",
  },
];

function NavBar() {
  return (
    <div className="bg-gray-200">
      <div className="container hidden md:flex overflow-auto">
        <ul className="flex p-1 gap-4 ">
          {buttonDetails.map((button, index) => (
            <li
              className="p-2 rounded-md text-brandBlueDark  font-semibold px-2 hover:text-brandBlueDark/55 active:text-brandBlueDark cursor-pointer transition-all duration-200"
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
