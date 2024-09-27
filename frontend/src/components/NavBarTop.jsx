import React from "react";
import logo from "../assets/logo.png";
function NavBarTop() {
  return (
    <div className="bg-gray-200">
      <div className="container">
        <img src={logo} className="w-16" alt="" />
      </div>
    </div>
  );
}

export default NavBarTop;
