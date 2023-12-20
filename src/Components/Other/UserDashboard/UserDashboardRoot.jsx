import { NavLink, Outlet } from "react-router-dom";
import "./userDashboard.css"
import { FaUserEdit } from "react-icons/fa";




const UserDashboardRoot = () => {
  const li = (
    <>
      
      <li>
        <NavLink className="border  w-full flex  gap-3 items-center py-[10px] px-[15px] " to={"/User_dashboard/Update_profile"}><FaUserEdit className="text-xl" /> Update Profile</NavLink>
      </li>
      <li>
        <NavLink className="border  w-full flex  gap-3 items-center py-[10px] px-[15px] " to={"/User_dashboard/Add_a_book"}>Add a book</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div>
        <div className="lg:flex gap-4">
          <div className="lg:w-[20%] ">
            <ul className="flex flex-col gap-2">
                {li}
            </ul>
          </div>
          <div className="lg:w-[80%] min-h-screen border-2">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardRoot;
