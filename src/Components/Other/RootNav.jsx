import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { dataProvider } from "../context api/ContextApi";
import"./rootNav.css"
 

const RootNav = () => {
    const li=<>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/User_dashboard/Update_profile"}>Dashboard</NavLink></li>
    <li><NavLink to={"/login"}>Login</NavLink></li>
    </>
    const{person,logoutHandle}=useContext(dataProvider)
    
  return (
    <div className="navbar bg-gradient-to-b from-black to-transparent sticky top-0 z-10">
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
        <div className=" text-2xl font-bold text-white flex items-center gap-16">
        <div><span>Grontho</span><span className="text-[#be2f2f]">Ghor</span></div>
        <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 gap-5 text-lg navlist text-gray-400 font-thin">
        {li}
        </ul>
      </div>
        </div>
      </div>
      
      <div className="navbar-end">
        <a onClick={logoutHandle} className="btn">logout</a>
      </div>
    </div>
  );
};

export default RootNav;
