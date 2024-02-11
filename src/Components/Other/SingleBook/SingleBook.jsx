import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { axiosPublic } from "../../custom Hooks/useAxiosPublic";
import { FaDownload } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { dataProvider } from "../../context api/ContextApi";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
const SingleBook = () => {
  const { id } = useParams();

  const [bookData, setBookData] = useState(null);
  const [author, setAuthor] = useState(null);
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const [reload, setReload] = useState(false);
  const { person } = useContext(dataProvider);
  
  useEffect(() => {
    if (id) {
      axiosPublic.get(`/get_a_book?id=${id}`).then((res) => {
        setBookData(res.data);
        axiosPublic
          .get(`/get_a_author?id=${res.data.authorId}`)
          .then((res) => setAuthor(res.data));
      });
    }

    if (person) {
      axiosPublic.get(`/get_a_user?email=${person?.email}`).then((res) => {
        const userData = res.data;
        setUser(userData);
        // filtering, is this user follow this author previos time.
        const isFollowing = author?.followers?.find(
          (item) => item === userData._id
        );
        if (isFollowing) {
          return setIsFollowing(true);
        }
        setIsFollowing(false);
      });
    }
  }, [id, person]);

  //   follow and unfollow handle.
  const followBehaviourHandle = (authorId) => {
    if (user) {
      if (!isFollowing) {
        axiosPublic
          .post("/follow_a_author", { userId: user._id, authorId })
          .then((res) => {
            console.log(res.data);
            setReload(!reload);
          });
      } else {
        axiosPublic
          .post("/unfollow_a_author", { userId: user._id, authorId })
          .then((res) => {
            console.log(res.data);
            setReload(!reload);
          });
      }
    } else {
      return <Navigate to={"/login"}></Navigate>;
    }
  };
 
const unFilterdebookkeys=bookData&&Object.keys(bookData)
let FilteredBookKeys=[] 
if(bookData){
  unFilterdebookkeys.map(item=>{
    if(item==="_id"|| item==="authorId" ||item==="reviewComments" || item==="rating"||item==="summery"||item==="pdf"||item==="coverPhoto"||item==="publish"){
      // "don't do anything."
    }
    else{
      FilteredBookKeys.push(item)
    }
  })
}
console.log(bookData)


  return (
    <div className="min-h-[60vh] relative">
      <div className="flex items-center">
        <div className="w-[30%]">
          <img
            className="w-[350px] rounded-lg"
            src={bookData?.coverPhoto}
            alt=""
          />
        </div>
        <div className="w-[70%] text-gray-200">
          <h1 className="text-5xl">{bookData?.banglaName}</h1>
          <h1 className="text-base text-gray-300 mt-4">
            {" "}
            <span className="font-bold text-gray-200">Author</span> :{" "}
            <Link
              to={`/author/${bookData?.authorId}`}
              className="text-[#f33f41] hover:underline"
            >
              {bookData?.authorName}
            </Link>
          </h1>
          <h1 className="text-base text-gray-300">
            {" "}
            <span className="font-bold text-gray-200">Category</span> :{" "}
            <Link className="text-[#f33f41] hover:underline">
              {bookData?.catagory}
            </Link>
          </h1>
          <h1 className="text-base text-gray-300">
            {" "}
            <span className="font-bold text-gray-200">Page</span> :{" "}
            {bookData?.page}
          </h1>
          <h1 className="text-base text-gray-300">
            {" "}
            <span className="font-bold text-gray-200">Edition</span> :{" "}
            {bookData?.edition}
          </h1>
          <p className=" text-gray-300">
            <span className="font-bold text-gray-200">Summary</span> : <br />
            {bookData?.summery}
          </p>
          <div className="grid grid-cols-2 gap-5 mt-2">
            <button className="btn btn-error text-white w-full">
              download <FaDownload />
            </button>
            <button className="btn text-white btn-success w-full">
              read <FaBookOpenReader />
            </button>
          </div>
        </div>
      </div>
      <div className="text-white mt-14">
        <Tabs>
          <TabList>
            <Tab>Author</Tab>
            <Tab>Book</Tab>
          </TabList>

          <TabPanel>
            <div className="flex mt-8">
              <div className=" w-[20%] flex flex-col justify-center items-center">
                <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-contain"
                    src={author?.url}
                    alt=""
                  />
                </div>
                <h1
                  className={
                    author?.followers?.length
                      ? "font-bold mt-4 opacity-100 text-gray-300 transition-all duration-300"
                      : "opacity-0"
                  }
                >
                  {author?.followers?.length} follower
                </h1>

                <button
                  onClick={() => followBehaviourHandle(author?._id)}
                  className=" mt-1 rounded-xl font-bold bg-primary text-white text-md px-3 py-2"
                >
                  {isFollowing ? (
                    <span className="flex gap-2 justify-center items-center">
                      <span className="text-xl">
                        <MdOutlineCancel />
                      </span>
                      <span>Unfollow</span>
                    </span>
                  ) : (
                    <span className="flex gap-2 justify-center items-center">
                      <span className="text-xl">
                        <FaPlus />
                      </span>
                      <span>Follow</span>
                    </span>
                  )}
                </button>
              </div>
              <div className="w-[80%] text-gray-200 text-[15px]">
                <h1 className="font-bold text-base">{author?.name},</h1>
                <p className="mt-6 font-medium">{author?.details}</p>
              </div>
            </div>
          </TabPanel>
          <TabPanel >
            <table className="w-full">
                <tbody>
                  {
                    FilteredBookKeys?.map((item,idx)=><tr className={`${bookData[item]===null||bookData[item]===""?"hidden":""}`} key={idx}>
                    <td className="border w-[30%]">{item}</td>
                    <td className="border w-[70%]">{item==="bookSize"?(bookData[item]*0.000001).toFixed(2)+""+"MB":bookData[item]}</td>
                </tr>)
                }
                </tbody>
            </table>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default SingleBook;
