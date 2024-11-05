import React from "react";
import CustomersList from "./rolebased/client/CustomerList";

function CustomerBase() {
  return <div className="bg-gray-200 text-gray-700 py-12 rounded-lg">
   <CustomersList/>
  </div>;
}

export default CustomerBase;
