import img from "../../../../public/Login.svg";

import SocilaShareComponent from "./shared component/SocilaShareComponent";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import SharedHader from "./shared component/SharedHader";
import { useContext, useState } from "react";
import lady from "../../../../public/lady.jpg";
import gents from "../../../../public/gents.png";
import useImgUpload from "../../custom Hooks/useImgUpload";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

// user information.
let user = {
  firstName: undefined,
  lastName: undefined,
  gender: undefined,
  email: undefined,
  password: undefined,
  photoUrl:undefined
};

// password alert.
let passAlert={alpha:false,special:false,number:false,minimum:false}

const Signup = () => {
  // input type style classes.
  const inputStyle =
    "w-full focus:outline-none border textarea-lg lg:text-xl py-2 lg:py-3  px-3 font-normal rounded-md";
  let [progress, setProgress] = useState(["step-primary"]);
  console.log(progress);
  let [reload, setReload] = useState(true);
  let [profile, setProfile] = useState({ file: undefined, string: undefined });

  // user all data managing form here.

  // 1.users info
  // userfirstname
  const firstName = (e) => {
    user.firstName = e.target.value;
    setReload(!reload);
  };
  // user last name.
  const lastName = (e) => {
    user.lastName = e.target.value;
    setReload(!reload);
  };
  // user gender
  const gender = (e) => {
    user.gender = e.target.value;
    setReload(!reload);
    console.log(user);
  };
  // 2.email and password.
  // email
  const email = (e) => {
    // user.email = e.target.value;
    // setReload(!reload);
    const email=e.target.value
    const emailPatern=/com$/i
    if(email.split("@").length===2){
      console.log("step 1")

      if(email.split("@")[1].split(".").length===2){
        

        if(emailPatern.test(email.split("@")[1].split(".")[1])){
            user.email=email
            setReload(!reload)
            
          }
          else{
            user.email=undefined
            setReload(!reload)
          }

      }
      else{
        user.email=undefined
        setReload(!reload)
      }
      
    }
    else{
      user.email=undefined
      setReload(!reload)
    }
    // console.log(emailPatern.test(email),atPatern.test(email))
    // console.log(email.split("@")[1]?.split("."))
  };
  // password
 
  const password = (e) => {
    // user.password = e.target.value;
    // setReload(!reload);
    const password=e.target.value
    const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).*$/
    const alphabetPattern= /[A-Z]/
    const specialPattern=/^.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*$/
    const numberPattern=/\d/
    const minimumpattern = /^.{8,}$/
// console.log(specialPattern.test(password))
    // password conditional alert.
    if(alphabetPattern.test(password)){
      passAlert.alpha=true
      setReload(!reload)
    }
    if(specialPattern.test(password)){
      passAlert.special=true
      setReload(!reload)
    }
    if(numberPattern.test(password)){
      passAlert.number=true
      setReload(!reload)
    }
    if(minimumpattern.test(password)){
      passAlert.minimum=true
      setReload(!reload)
    }
    if(!alphabetPattern.test(password)){
      passAlert.alpha=false
      setReload(!reload)
    }
    if(!specialPattern.test(password)){
      passAlert.special=false
      setReload(!reload)
      
    }
    if(!numberPattern.test(password)){
      passAlert.number=false
      setReload(!reload)
    }
    if(!minimumpattern.test(password)){
      passAlert.minimum=false
      setReload(!reload)
    }
    if(passAlert.alpha&&passAlert.special&&passAlert.number&&passAlert.minimum){
      user.password=password
    }
    if(!passAlert.alpha||!passAlert.special||!passAlert.number||!passAlert.minimum){
      user.password=undefined
      
    }
    
  }
  console.log(passAlert)
    
  const imgbb = useImgUpload();
  let [uploadLoader,setUploadLoader]=useState(false)
  const profilePhoto = (e) => {
    const uploadedfile = e.target.files[0];
    
    const reader = new FileReader();
    reader.onload = () => {
      setProfile({ file: uploadedfile, string: reader.result });
    };
    reader.readAsDataURL(uploadedfile);
    setUploadLoader(true)
    imgbb(uploadedfile)
      .then((res) => res.json())
      .then((data) => {
        setUploadLoader(false)
        user.photoUrl=data.data.url
        
      });
  };
  // Signup handle submit.
  const signUpHandle=()=>{
    console.log(user,"from function.")
  }
  console.log(user);
// password show or not.
const[passhow,setPasshow]=useState(false)
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
                <li className={`step ${progress[1]}`}>E-mail & password </li>
                <li className={`step ${progress[2]}`}>Profile photo</li>
              </ul>

              {/* relative data container */}
              <div className="min-h-[30vh] flex justify-center items-center">
                {/* personal info. */}
                <div className={progress.length === 1 ? "block" : "hidden"}>
                  <input
                    onChange={firstName}
                    type="text"
                    className={inputStyle}
                    placeholder="First name"
                  />
                  <input
                    onChange={lastName}
                    type="text"
                    className={inputStyle + " " + "my-4"}
                    placeholder="Last name"
                  />
                  <select onChange={gender} className={inputStyle}>
                    <option disabled selected>
                      Select gender.
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>




                {/* email and password. */}
                <div className={progress.length === 2 ? "block w-full" : "hidden"}>
                  <input
                    onChange={email}
                    type="email"
                    className={inputStyle}
                    placeholder="Your e-mail."
                  />
                  <div className="relative mt-4">
                  <input
                    onChange={password}
                    type={passhow?"text":"password"}
                    className={inputStyle+" "+"pr-14"}
                    placeholder="minimum 6 digit password"
                  />
                  <button className="absolute top-4 text-2xl right-5" onClick={()=>setPasshow(!passhow)}>{passhow?<FaRegEye/>:<FaRegEyeSlash/>}</button>
                  </div>
                  <ul className="mt-6">
                    <li className={`flex items-center font-semibold gap-1 ${passAlert.alpha?"text-green-500": "text-red-500"}`}><span>{passAlert.alpha?<IoIosCheckmarkCircle/>:<IoIosCloseCircle/>}</span>minimum One capital letter.</li>
                    <li className={`flex items-center font-semibold gap-1 ${passAlert.number?"text-green-500": "text-red-500"}`}><span>{passAlert.number?<IoIosCheckmarkCircle/>:<IoIosCloseCircle/>}</span>minimum One number.</li>
                    <li className={`flex items-center font-semibold gap-1 ${passAlert.special?"text-green-500": "text-red-500"}`}><span>{passAlert.special?<IoIosCheckmarkCircle/>:<IoIosCloseCircle/>}</span>minimum One special character.</li>
                    <li className={`flex items-center font-semibold gap-1 ${passAlert.minimum?"text-green-500": "text-red-500"}`}><span>{passAlert.minimum?<IoIosCheckmarkCircle/>:<IoIosCloseCircle/>}</span>minimum 8 character.</li>
                  </ul>
                </div>




                {/* profile photo upload. */}
                <div className={progress.length === 3 ? "block" : "hidden"}>
                  <label htmlFor="profile">
                    <div className="border h-[150px] cursor-pointer w-[150px] rounded-full relative overflow-hidden">
                      <span
                        className={`bg-gray-200 absolute bottom-0 left-0 w-full text-center h-[30px] font-bold ${
                          profile.string ? "hidden" : "block"
                        }`}
                      >
                        upload
                      </span>
                      <img
                        className="w-full h-full object-contain"
                        src={
                          profile.string
                            ? profile.string
                            : user.gender === "female"
                            ? lady
                            : gents
                        }
                        alt=""
                      />
                      <div className={`absolute ${uploadLoader?"flex": "hidden"} top-0 left-0 h-full  justify-center items-center bg-[#ffffffc0] w-full`}><span className="loading loading-spinner text-primary"></span></div>
                    </div>
                    
                  </label>
                  <input accept="image/png, image/gif, image/jpeg" disabled={uploadLoader}
                    onInput={profilePhoto}
                    id="profile"
                    type="file"
                    className="hidden"
                  />
                </div>
              </div>

              {/* navigation buttons. */}
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    if (progress.length >= 2) {
                      progress.pop();
                      setProgress([...progress]);
                    }
                  }}
                  className="w-1/5 btn btn-primary"
                >
                  <FaArrowLeft></FaArrowLeft>
                </button>
                <button
                  disabled={
                    (user.firstName &&
                      user.lastName &&
                      user.gender &&
                      progress.length === 1) ||
                    (user.email && user.password && progress.length === 2) || progress.length===3&&user.photoUrl&&!uploadLoader
                      ? false
                      : true
                  }
                  onClick={() => {
                    if (progress.length < 3) {
                      setProgress([...progress, "step-primary"]);
                    }
                    else if(progress.length===3){
                      signUpHandle()
                    }
                  }}
                  className="w-4/5 btn btn-primary"
                >
                  {progress.length===3?"Sign up":<span className="flex gap-2">Next <FaArrowRightLong></FaArrowRightLong></span>}
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
