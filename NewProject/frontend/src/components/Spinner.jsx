import "ldrs/tailChase";

import React from "react";

function Spinner() {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <l-tail-chase size="40" speed="1.75" color="#1743AB"></l-tail-chase>
    </div>
  );
}

export default Spinner;
