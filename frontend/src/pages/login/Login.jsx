import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../assets/logo.png";
import loginbackground from "../../assets/loginbackground.png";
import loginmainimage from "../../assets/loginmainimage.png";
import InputFieldCustomized from "../../ReUsableComponents/InputFieldCustomized";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the validation schema using Yup

function decodeJWT(token) {
  if (!token) {
    throw new Error("No token provided");
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }

  const payload = parts[1]; // The payload is the second part of the JWT

  // Replace URL-safe Base64 characters
  const base64Url = payload.replace(/-/g, "+").replace(/_/g, "/");

  // Decode Base64
  const base64 =
    base64Url +
    (base64Url.length % 4 === 0 ? "" : "=".repeat(4 - (base64Url.length % 4)));

  const jsonPayload = JSON.parse(decodeURIComponent(escape(atob(base64))));

  return jsonPayload; // Return the decoded payload
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [errorToogle, setErrorToogle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/authorize-check`,
        {
          email: data.email,
          password: data.password,
        }
      );

      const authDetails = response.data;

      if (authDetails.authorizationStatus) {
        const decodedToken = decodeJWT(authDetails.token);
        console.log(decodedToken);
        if (decodedToken.data.user_type == "client") {
          {
            localStorage.setItem("token", authDetails.token);
            localStorage.setItem("userId", decodedToken.data.user_id);
            localStorage.setItem("tenantId", decodedToken.data.tenant_id);
            localStorage.setItem("userType", decodedToken.data.user_type);
            localStorage.setItem("userName", [
              `${decodedToken.data.first_name} 
            ${decodedToken.data.last_name}`,
            ]);
          }

          navigate("/dashboard-c");
        } else if (decodedToken.data.user_type == "basicuser") {
          navigate("/dashboard-bu");
        } else if (decodedToken.data.user_type == "admin") {
          navigate("/dashboard-a");
        } else {
          setErrorToogle(true);
          setErrorMessage(authDetails.message);
        }
      }
    } catch (error) {
      setErrorMessage(
        `Some errors occurred, please try again shortly: hint (${error.message})`
      );
      setErrorToogle(true);
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="h-screen w-full bg-brandPale relative">
      <div
        className="absolute inset-0 z-10 bg-cover bg-repeat-y blur-md"
        style={{
          backgroundImage: `url(${loginbackground})`,
          backgroundSize: "50% auto",
          backgroundPosition: "left",
        }}
      ></div>
      <div
        className="absolute inset-0 z-10 bg-cover bg-repeat-y blur-md"
        style={{
          backgroundImage: `url(${loginbackground})`,
          backgroundSize: "50% auto",
          backgroundPosition: "right",
        }}
      ></div>
      <div className="container h-screen flex items-center z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 container bg-white opacity-80 py-8 rounded-lg shadow-lg shadow-gray-500/50 px-12 max-w-[1000px] z-10">
          <div className="flex flex-col gap-8 max-w-[80%]">
            {/* Logo section */}
            <div className="flex items-center gap-4 text-gray-700">
              <img src={logo} alt="" className="w-12 md:w-16 lg:w-18" />
              <h2 className="">Court Reservation System</h2>
            </div>

            {/* title and textfields */}
            <div>
              <h2 className="font-bold text-xl text-gray-600">Login</h2>
              {/* text fields div */}
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col gap-8 py-8"
              >
                <InputFieldCustomized
                  setErrorMessage={setErrorMessage} // Pass the function to clear the error message
                  setErrorToogle={setErrorToogle} // Pass the function to toggle the error off
                  name="email"
                  placeholder="JohnDoe@gmail.com"
                  type="text"
                  register={register}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                />
                <InputFieldCustomized
                  setErrorMessage={setErrorMessage} // Pass the function to clear the error message
                  setErrorToogle={setErrorToogle} // Pass the function to toggle the error off
                  name="password"
                  placeholder="Password"
                  type="password"
                  register={register}
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                />
                {/* login button div */}
                <div className="flex justify-center flex-col">
                  <button
                    type="submit"
                    className="p-2 self-center  bg-brandOrange/80 hover:bg-brandOrange transition-colors duration-200 px-10 rounded-lg font-bold text-white"
                  >
                    LOGIN
                  </button>
                  <div className="h-5 py-8">
                    {errorToogle && (
                      <p className="text-red-600 text-sm font-bold">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </div>
                <p className=" text-gray-600">
                  Not registered yet
                  <a
                    href="/www.google.com"
                    className="text-brandOrange cursor-pointer"
                  >
                    {" "}
                    Create an Account
                  </a>
                </p>
              </form>
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
