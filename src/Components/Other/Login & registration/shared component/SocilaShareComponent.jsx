import React, { useContext } from "react";
import googleLogo from "../../../../../public/googleLogo.png";
import facebookLogo from "../../../../../public/facebookLogo.png";
import { dataProvider } from "../../../context api/ContextApi";
const SocilaShareComponent = ({ data }) => {
  const{googleLoginHandle}=useContext(dataProvider)
  return (
    <div>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="divider font-bold text-gray-500">Or {data} with</div>
        <div className=" flex gap-4 mt-4">
          <button onClick={googleLoginHandle} className="border-[#d99a94] border-2 flex items-center justify-center gap-8 w-full rounded-lg py-1 lg:py-2">
            <img className="w-[30px] lg:w-[40px] h-[30px] lg:h-[40px]" src={googleLogo} alt="" />
            <span className="text-[#d99a94] font-bold ">Google</span>
          </button>
          {/* <button className="border-[#6d86b6] border-2 flex items-center justify-evenly w-1/2 rounded-lg py-1 lg:py-2">
            <img className="w-[30px] lg:w-[40px] h-[30px] lg:h-[40px]" src={facebookLogo} alt="" />
            <span className="text-[#6d86b6] font-bold ">Facebook</span>
          </button> */}
          
        </div>
      </div>
    </div>
  );
};

export default SocilaShareComponent;
