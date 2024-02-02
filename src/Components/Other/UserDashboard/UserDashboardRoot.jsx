import { NavLink, Outlet } from "react-router-dom";
import "./userDashboard.css";
import { FaUser } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import swal from "sweetalert";
import { useContext } from "react";
import { dataProvider } from "../../context api/ContextApi";

const UserDashboardRoot = () => {
  const{person}=useContext(dataProvider)
  const li = (
    <>
      <li>
        <NavLink
          className="border  w-full flex  gap-3 items-center py-[10px] font-bold px-[15px] "
          to={"/User_dashboard/Update_profile"}
        >
          <FaUser className="text-xl" /> My Profile
        </NavLink>
      </li>
      <li>
        <div className="relative overflow-hidden"> <button onClick={()=>swal("Your e-mail is not verified.", "Verify email first.", "error")} className={person?.emailVerified?"hidden":"w-full absolute top-0 left-0  h-[50px] bg-[#d9d9d9a5]"}></button><NavLink
          className="border w-full flex  gap-3 items-center py-[10px] font-bold px-[15px] "
          to={"/User_dashboard/Add_a_book"}
        >
          <MdOutlineAdd className="text-xl" /> Add a book
        </NavLink></div>
      </li>
    </>
  );
  return (
    <div>
      <div>
        <div className="lg:flex gap-4">
          <div className="lg:w-[20%] border-r-2 border-gray-300 pr-2 ">
            <ul className="flex flex-col gap-2">{li}</ul>
          </div>
          <div className="lg:w-[80%]  min-h-screen ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardRoot;
