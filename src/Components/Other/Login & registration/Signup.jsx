import img from "../../../../public/Login.svg";

import SocilaShareComponent from "./shared component/SocilaShareComponent";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import SharedHader from "./shared component/SharedHader";
import { useState } from "react";
import lady from "../../../../public/lady.jpg"
import gents from "../../../../public/gents.png"

let user={
  firstName:undefined,
  lastName:undefined,
  gender:undefined,
  email:undefined,
  password:undefined
}

const Signup = () => {
  // input type style classes.
  const inputStyle="w-full focus:outline-none border textarea-lg lg:text-xl py-2 lg:py-3  px-3 font-normal rounded-md"
  let [progress,setProgress]=useState(["step-primary"])
  console.log(progress)
  let[reload,setReload]=useState(true)
  let[profile,setProfile]=useState({file:undefined,string:undefined})

  // user all data managing form here.

 
  
  
  // 1.users info
  // userfirstname
  const firstName=(e)=>{
    user.firstName=e.target.value
    setReload(!reload)
    
  }
  // user last name.
  const lastName=(e)=>{
    user.lastName=e.target.value
    setReload(!reload)
  }
  // user gender
  const gender=(e)=>{
    user.gender=e.target.value
    setReload(!reload)
    console.log(user)
     
  }
  // 2.email and password.
  // email
  const email=(e)=>{
    user.email=e.target.value
    setReload(!reload)
    
  }
  // password
  const password=(e)=>{
    user.password=e.target.value
    setReload(!reload)
    
    
  }
  // 3.profile photo upload.
  const profilePhoto=(e)=>{
    const uploadedfile=e.target.files[0]

    const reader=new FileReader()
    reader.onload=()=>{
      setProfile({file:uploadedfile,string:reader.result})
    }
    reader.readAsDataURL(uploadedfile)
  }
  console.log(profile)
  return (
    <div>
      <div className="flex lg:flex-row flex-col justify-center items-center h-[90vh]">
        <div className="bg-gray-100 rounded-3xl lg:h-[70vh] w-full flex gap-3">
          <div className="lg:w-[40%]  bg-gray-50 lg:px-10 px-6 py-9">
            <SharedHader data={"Sign up"}></SharedHader>

            {/* main registration containers. */}
            <div>
              <ul className="steps gap-5 font-bold text-gray-500">
                <li className={`step ${progress[0]}`}>Personal Info</li>
                <li className={`step ${progress[1]}`}>E-mail & password   </li>
                <li className={`step ${progress[2]}`}>Profile photo</li>
               
              </ul>
              
              {/* relative data container */}
              <div className="min-h-[30vh] flex justify-center items-center">

                {/* personal info. */}
                <div className={progress.length===1?"block":"hidden"}>
                 <input onChange={firstName} type="text" className={inputStyle} placeholder="First name" />
                 <input onChange={lastName} type="text" className={inputStyle+" "+"my-4"} placeholder="Last name" />
                 <select onChange={gender} className={inputStyle}>
                  <option disabled selected>Select gender.</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                 </select>
                </div>

                {/* email and password. */}
                <div className={progress.length===2?"block":"hidden"}>
                 <input onChange={email} type="email" className={inputStyle} placeholder="Your e-mail." />
                 <input onChange={password} type="password" className={inputStyle+" "+"mt-4"} placeholder="minimum 6 digit password" />
                </div>

                {/* profile photo upload. */}
                <div className={progress.length===3?"block":"hidden"}>
                 <label htmlFor="profile">
                  <div className="border h-[150px] w-[150px] rounded-full relative overflow-hidden">
                    <span className={`bg-gray-200 absolute bottom-0 left-0 w-full text-center h-[30px] font-bold ${profile.string?"hidden":"block"}`}>upload</span>
                    <img className="w-full h-full object-contain" src={profile.string?profile.string:(user.gender==="female"?lady:gents)} alt="" />
                  </div>
                 </label>
                 <input onChange={profilePhoto} id="profile"  type="file" className="hidden" />
                </div>

              </div>

              {/* navigation buttons. */}
              <div className="flex gap-2 items-center">
                <button onClick={()=>{
                  if(progress.length>=2){
                    progress.pop()
                  setProgress([...progress])
                  }
                }} className="w-1/5 btn btn-primary">
                  <FaArrowLeft></FaArrowLeft>
                </button>
                <button
                disabled={user.firstName&&user.lastName&&user.gender&&progress.length===1 || user.email&&user.password&&progress.length===2?false:true}
                
                  onClick={() =>{
                    if(progress.length<3){
                      setProgress([...progress,"step-primary"])
                    }
                  }}
                  className="w-4/5 btn btn-primary"
                >
                  Next <FaArrowRightLong></FaArrowRightLong>
                </button>
              </div>
            </div>

            <SocilaShareComponent data={"sign up"}></SocilaShareComponent>
          </div>
          <div className="w-[60%] hidden lg:flex justify-evenly items-end">
            <img className="w-[80%]  h-[80%] object-cover" src={img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
