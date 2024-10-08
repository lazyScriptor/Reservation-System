import React from "react";
import TenantAddForm from "./TenantAddForm";

function TenantBase() {
  return (
    <div className="bg-gray-200">
      <div className="container">
        <TenantAddForm />
      </div>
    </div>
  );
}

export default TenantBase;
