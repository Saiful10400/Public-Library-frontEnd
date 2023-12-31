import React, { useContext, useEffect, useState } from "react";
import { axiosPublic } from "../../../custom Hooks/useAxiosPublic";
import { dataProvider } from "../../../context api/ContextApi";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../../../firebase";
import tick from "../../../../../public/tick.png"
const UpdateProfile = () => {
  const inputStyle =
    "w-full border textarea-lg lg:text-xl py-2 lg:py-3  px-3 font-normal rounded-md";
  const { person } = useContext(dataProvider);
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    if (person) {
      axiosPublic
        .get(`/get_a_user?email=${person?.email}`)
        .then((res) => {
          setUser(res.data)
          setLoading(false)
        });
    }
  }, [person]);
  console.log(person);

  // user email verification handle.
  const userVarify = () => {
    if (user && person) {
      sendEmailVerification(auth.currentUser).then(() => {
        document.getElementById("my_modal_3").showModal();
      });
    }
  };
  
  
  
  return (
    <div className="bg-[#f2f2f2] h-full  px-5 pt-4">
      <div className="flex justify-center items-start gap-2">




{/* skleton for profile. */}

<div className={`skeleton w-[70%] h-[250px]  ${loading?"":"hidden"}`}></div>


        <div className={`w-[70%]  flex-col justify-center items-center h-[250px] bg-white rounded-3xl p-2 ${!loading?"flex":"hidden"}`}>
          {/* image and name */}
          <div className=" w-full flex items-center justify-evenly">
            <div className="w-[180px] h-[180px] rounded-full relative">
            <img
              className="w-full h-full object-cover rounded-full"
              src={user?.photoUrl}
              alt=""
            />
            <img src={tick} className={`absolute bottom-3 right-1 w-[40px] h-[40px] ${person?.emailVerified?"":"hidden"}`} />
            </div>
            <div className=" w-[50%]">
              <div>
                <h1 className="text-xl font-bold mb-1">Your name</h1>
                <h1 className={inputStyle}>
                  {user?.fulName
                    ? user?.fulName
                    : user?.firstName + " " + user?.lastName}
                </h1>
              </div>
              <div className="mt-6">
                <h1 className="text-xl font-bold mb-1">
                  Your email{" "}
                  <span
                    className={`${
                      person?.emailVerified || !person ? "hidden" : ""
                    } text-base font-normal text-white bg-red-600 p-1 rounded-md`}
                  >
                    not verified
                  </span>
                </h1>
                <div className="flex gap-4 items-center">
                  <h1 className={inputStyle}>{user?.email}</h1>
                  <button
                    onClick={userVarify}
                    className={`${
                      person?.emailVerified || !person ? "hidden" : ""
                    } btn btn-primary`}
                  >
                    Verify now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] h-[250px] bg-white rounded-3xl p-2">dfsdf</div>
      </div>
      {/* modal for email confirmation. */}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateProfile;
