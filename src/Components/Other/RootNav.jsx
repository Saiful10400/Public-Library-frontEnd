import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { dataProvider } from "../context api/ContextApi";
import "./rootNav.css";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { axiosPublic } from "../custom Hooks/useAxiosPublic";

const RootNav = () => {
  const li = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/User_dashboard/Update_profile"}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"/User_dashboard/Update_profile"}>Following</NavLink>
      </li>
      <li>
        <NavLink to={"/User_dashboard/Update_profile"}>Profile</NavLink>
      </li>
    </>
  );
  const { person, logoutHandle } = useContext(dataProvider);
  // getting all books form the data base.
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axiosPublic.get("/get_all_book").then((res) => setBooks(res.data));
  }, []);

  // handle search.
  const [searchedList, setSearchedList] = useState([]);
  const handleSearch = (e) => {
    const queryWord = e.target.value;
    const queryBook = [];

    books.forEach((input) => {
      const banglaNameArray = input.banglaName.split(" ");
      const englishNameArray = input.englishName.split(" ");
      const bookNameArray = [...banglaNameArray, ...englishNameArray];
      for (let word of bookNameArray) {
        if (word.toLowerCase().includes(queryWord.toLowerCase())) {
          return queryBook.push(input);
        }
      }
    });
    if(queryWord===""){
      setSearchedList([]);
    }else{
      setSearchedList(queryBook)
    }
  };


  // nav bar onslide background change.
  const[windowScroll,setWindowScroll]=useState(0)
document.addEventListener("scroll",()=>setWindowScroll(window.pageYOffset))

  return (
    <div className={`navbar ${windowScroll<=50?"bg-gradient-to-b from-black to-transparent":"bg-black"} sticky top-0 z-10`}>
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
          <div>
            <span>Grontho</span>
            <span className="text-[#be2f2f]">Ghor</span>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal px-1 gap-5 text-lg navlist text-gray-400 font-thin">
              {li}
            </ul>
          </div>
        </div>
      </div>

      <div className="navbar-end gap-4 mr-5">
        <div className=" w-96 h-8 relative">
          <input
            onChange={handleSearch}
            type="text"
            className="w-full bg-[#2a2929] text-white text-lg pl-2 pr-11 py-2 rounded-lg h-full focus:outline-none"
            placeholder="Search by book title and author"
          />
          <button className=" text-[27px] absolute top-[2px] right-0 text-white px-2">
            <IoSearch />
          </button>
          <div
            className={`w-[99%] mx-auto max-h-80 overflow-y-auto  bg-[#131212] ${
              searchedList.length === 0 ? "hidden" : "block"
            }`}
          >
            <ul>
              {searchedList.map((item, idx) => (
                <Link key={idx} to={item?._id}>
                  <li className="text-gray-200 hover:bg-gray-700 rounded-lg p-1">
                  <div>
                    <h1>{item?.banglaName}</h1>
                     <h1 className={`text-gray-400 text-sm ${item?.forClass?"hidden":"block"}`}>{item?.authorName}</h1>
                     <h1 className={`text-gray-400 text-sm ${item?.forClass?"block":"hidden"}`}>For class {item?.forClass}</h1>
                  </div>
                </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {person ? (
          <button className=" relative">
            <span className="text-white text-[27px]">
              <IoNotificationsSharp />
            </span>
            <span className="text-white absolute bg-[#d20820] rounded-xl px-1 top-[-8px] right-[-7px] text-sm">
              0
            </span>
          </button>
        ) : (
          <Link
            to={"/login"}
            onClick={logoutHandle}
            className="font-bold text-white bg-[#d20820] px-6 py-1 rounded-full"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default RootNav;
