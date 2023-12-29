import React, { useState } from "react";
import img from "../../../../public/Login.svg";
import { Link } from "react-router-dom";
import SocilaShareComponent from "./shared component/SocilaShareComponent";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import SharedHader from "./shared component/SharedHader";
const Login = () => {
  const [passshow, setPassshow] = useState(false);
  return (
    <div className="flex lg:flex-row flex-col justify-center items-center h-[90vh]">
      <div className="bg-gray-100 rounded-3xl lg:h-[70vh] w-full flex gap-3">
        <div className="lg:w-[40%]  bg-gray-50 lg:px-10 px-6 py-9">
            <SharedHader data={"Login"}></SharedHader>
          <form className="flex flex-col gap-4 mt-12">
            <div>
              <label className="text-xl font-bold" htmlFor="email">
                Email address
              </label>
              <input required
                placeholder="type email here."
                className="w-full focus:outline-none border textarea-lg lg:text-xl py-2 lg:py-4 mt-1 px-3 font-normal rounded-md"
                id="email"
                name="email"
                type="email"
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="text-xl font-bold" htmlFor="password">
                  Password
                </label>{" "}
                <span className="underline text-[#a274f6] font-bold">
                  Foget password?
                </span>
              </div>
              <div className="relative">
                <input required
                  placeholder="type password here."
                  className="w-full focus:outline-none border textarea-lg lg:text-xl py-2 lg:py-4 mt-1 px-3 font-normal rounded-md"
                  id="password"
                  name="password"
                  type={passshow ? "text" : "password"}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setPassshow(!passshow);
                  }}
                  className="absolute top-5 right-4 text-gray-500 text-2xl lg:text-3xl"
                >
                  {!passshow ? (
                    <IoMdEye></IoMdEye>
                  ) : (
                    <IoIosEyeOff></IoIosEyeOff>
                  )}
                </button>
              </div>
            </div>
            <button className="btn btn-primary bg-[#893dff] text-gray-100 border-none my-6">
              Login
            </button>
          </form>
          <SocilaShareComponent data={"login"}></SocilaShareComponent>
        </div>
        <div className="w-[60%] hidden lg:flex justify-evenly items-end">
          <img className="w-[80%]  h-[80%] object-cover" src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
