import React from "react";
import logo from "../../assets/logo.png";
function Login() {
  return (
    <div class="h-screen w-full bg-brandPurple">
      <div class="container h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 container bg-white py-4">
          <div className="flex flex-col">
            <img src={logo} alt="" className="w-12 md:w-16 lg:w-18" />
            {/* title and textfields */}
            <div>
              <h2 className="font-bold text-xl">Login</h2>
              {/* text foields div */}
              <div></div>
              {/* login button div */}
              <div></div>
              <p>
                Not registered yet <a className="text-brandPurple">Create an Account</a>
              </p>
            </div>
          </div>
          <div>w</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
