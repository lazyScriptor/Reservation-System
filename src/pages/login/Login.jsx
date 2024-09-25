import React from "react";
import logo from "../../assets/logo.png";
import loginbackground from "../../assets/loginbackground.png";
import loginmainimage from "../../assets/loginmainimage.png";
import InputFieldCustomized from "../../ReUsableComponents/InputFieldCustomized";

function Login() {
  return (
    <div class="h-screen w-full bg-brandPale relative">
      <img
        src={loginbackground}
        alt=""
        className="absolute z-10 blur-md w-[50%] max-h-screen"
      />
      <img
        src={loginbackground}
        alt=""
        className="absolute z-10 blur-md w-[50%] right-0 max-h-screen"
      />
      <div class="container h-screen flex items-center z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 container bg-white py-8 rounded-lg shadow-lg shadow-gray-500/50 px-12 max-w-[1000px] z-10">
          <div className="flex flex-col gap-8">
            <img src={logo} alt="" className="w-12 md:w-16 lg:w-18" />

            {/* title and textfields */}
            <div>
              <h2 className="font-bold text-xl text-gray-600">Login</h2>
              {/* text foields div */}
              <div className="flex flex-col gap-8 py-8">
                <InputFieldCustomized placeholder={"JohnDoe@gmail.com"} />
                <InputFieldCustomized placeholder={"Password"} />
              </div>

              {/* login button div */}
              <div className="flex justify-center">
                <button className="p-2 bg-brandOrange px-10 rounded-lg font-bold text-white">
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
            <div className="bg-brandPale md:rounded-lg w-full ">
              <img src={loginmainimage} alt="" className="max-h-[430px] " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
