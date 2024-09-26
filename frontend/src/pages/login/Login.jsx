import React from "react";
import logo from "../../assets/logo.png";
import loginbackground from "../../assets/loginbackground.png";
import loginmainimage from "../../assets/loginmainimage.png";
import InputFieldCustomized from "../../ReUsableComponents/InputFieldCustomized";

export default function Login() {
  const handleLogin=()=>{
    
  }
  return (
    <div class="h-screen w-full bg-brandPale relative">
      <div
        className="absolute inset-0 z-10 bg-cover bg-repeat-y blur-md"
        style={{
          backgroundImage: `url(${loginbackground})`,
          backgroundSize: "50% auto", // Set 50% width and automatic height
          backgroundPosition: "left", // Position the image to the left
        }}
      ></div>
      <div
        className="absolute inset-0 z-10 bg-cover bg-repeat-y blur-md"
        style={{
          backgroundImage: `url(${loginbackground})`,
          backgroundSize: "50% auto",
          backgroundPosition: "right", // Position the image to the right
        }}
      ></div>
      <div class="container h-screen flex items-center z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 container bg-white py-8 rounded-lg shadow-lg shadow-gray-500/50 px-12 max-w-[1000px] z-10">
          <div className="flex flex-col gap-8 max-w-[80%]">
            {/* Logo sxtion */}
            <div className="flex items-center gap-4 text-gray-700">
              <img src={logo} alt="" className="w-12 md:w-16 lg:w-18" />
              <h2 className="">Court Reservation System</h2>
            </div>

            {/* title and textfields */}
            <div>
              <h2 className="font-bold text-xl text-gray-600">Login</h2>
              {/* text foields div */}
              <div className="flex flex-col gap-8 py-8">
                <InputFieldCustomized placeholder={"JohnDoe@gmail.com"} />
                <InputFieldCustomized placeholder={"Password"} />
              </div>

              {/* login button div */}
              <div className="flex justify-center ">
                <button className="p-2 bg-brandOrange/80 hover:bg-brandOrange transition-colors duration-200 px-10 rounded-lg font-bold text-white">
                  LOGIN
                </button>
              </div>
              <p className="py-8 text-gray-600">
                Not registered yet
                <a
                  href="/www.google.com"
                  className="text-brandOrange cursor-pointer"
                >
                  {" "}
                  Create an Account
                </a>
              </p>
            </div>
          </div>
          <div className="pl-4 md:flex justify-center hidden ">
            <div className="bg-brandPale md:rounded-md w-full ">
              <img src={loginmainimage} alt="" className="max-h-[430px] " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
