import { useEffect, useState } from "react";
import AuthorSlide from "./Components/AuthorSlide";
import { axiosPublic } from "../../custom Hooks/useAxiosPublic";
import NewArrivedBook from "./Components/NewArrivedBook";

const Home = () => {
  const[newArrivedBooks,setNewArrivedBooks]=useState([])
  const[availableCatagory,setAvailableCataogry]=useState([])
  useEffect(()=>{
    axiosPublic.get("/get_all_book")
    .then(res=>setNewArrivedBooks(res.data))
  },[])
  console.log(newArrivedBooks)
  return (
    <div className="text-white">
      {/* banner */}
      <div className="w-full min-h-[400px] flex justify-center items-center border-2 text-3xl font-bold">
        <span>Banner</span>
      </div>
      {/* authors */}
      <div className="w-full pt-6 mt-4 border-2 text-3xl font-bold">
        <AuthorSlide></AuthorSlide>
      </div>
      {/* most read */}
      <div className="w-full min-h-[200px] mt-4 flex justify-center items-center border-2 text-3xl font-bold">
        <span>most read</span>
      </div>
      {/* newly arrived books */}
      <div className="w-full pt-6 mt-4 border-2 text-3xl font-bold">
        <NewArrivedBook data={newArrivedBooks} title={"নতুন প্রকাশিত বই"}></NewArrivedBook>
      </div>
      {/* catagory */}
      <div className="w-full pt-6 mt-4 border-2 text-3xl font-bold">
        <NewArrivedBook data={newArrivedBooks} title={"Available category"}></NewArrivedBook>
      </div>
      {/* islamic book */}
      <div className="w-full min-h-[200px] mt-4 flex justify-center items-center border-2 text-3xl font-bold">
        <span>islamic book</span>
      </div>
      {/* academic book */}
    </div>
  );
};

export default Home;
