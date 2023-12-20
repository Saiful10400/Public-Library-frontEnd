import { NavLink, Outlet } from "react-router-dom";
import "./userDashboard.css"
const UserDashboardRoot = () => {
  const li = (
    <>
      
      <li>
        <NavLink to={"/User_dashboard/Update_profile"}>Update Profile</NavLink>
      </li>
      <li>
        <NavLink to={"/User_dashboard/Add_a_book"}>Add a book</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div>
        <div className="lg:flex gap-4">
          <div className="lg:w-[20%] ">
            <ul>
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
