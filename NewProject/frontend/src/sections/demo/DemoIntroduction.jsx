import React from "react";
import Button1 from "../../components/Button1";
import {useNavigate} from 'react-router-dom'
function DemoIntroduction() {
  const navigate=useNavigate();
  const handleDemoButton = () => {
    navigate('/reservation')
  };
  return (
    <div className="py-12">
      <div className="container ">
        <div className="flex items-center flex-col ">
          {/* Title section */}
          <div className="py-4 flex flex-col items-center">
            <h2 className="pb-4 text-2xl">Demo of Booking procedure</h2>
            <hr className="border-2 rounded-full w-10 self-center  border-brandBlue " />
          </div>
          <Button1
            content={"View Demo"}
            hover_text_color={"black"}
            clickHandler={handleDemoButton}
          />

          <div className="py-4 flex flex-col items-center">
            <h2 className="pb-4 text-xl">
              Interested in a customised demo with access to an administration?
            </h2>
            <hr className="border-2 rounded-full w-10 self-center  border-brandBlue " />
            <p className="py-4 text-xs">
              <a className="text-brandBlueDark underline cursor-pointer">
                {" "}
                Fill out our form{" "}
              </a>{" "}
              and we will create a demo just for you. Please give us as many
              details as possible so we can customise a demo for your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoIntroduction;
