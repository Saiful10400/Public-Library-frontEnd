import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { dataProvider } from "../context api/ContextApi";

 

const RootNav = () => {
    const li=<>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/User_dashboard/Update_profile"}>Dashboard</NavLink></li>
    <li><NavLink to={"/login"}>Login</NavLink></li>
    </>
    const{person,logoutHandle}=useContext(dataProvider)
    
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-3"
          >
            {li}
          </ul>
        </div>
        <img className="w-[50px] rounded-full h-[50px]" src={person?.photoURL} alt="" />
        <span>{person?.displayName}</span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5 text-md font-medium">
        {li}
        </ul>
      </div>
      <div className="navbar-end">
        <a onClick={logoutHandle} className="btn">logout</a>
      </div>
    </div>
  );
};

export default RootNav;
