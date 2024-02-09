import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { axiosPublic } from "../../../custom Hooks/useAxiosPublic";
import { FaPlus } from "react-icons/fa6";
import { dataProvider } from "./../../../context api/ContextApi";
import swal from "sweetalert";
import { MdOutlineCancel } from "react-icons/md";
import SingleBookDesign from './../../Login & registration/shared component/SingleBookDesign';




const AuthorPage = () => {
  const { id } = useParams();
  const { person } = useContext(dataProvider);
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState(null);
  const [reload, setReload] = useState(false);
  const [isFollowing, setIsFollowing] = useState(null);
  // get author published all books.
  const[authorBooks,setAuthorsBooks]=useState([])
  const[allCatagory,setAllCatagory]=useState([])
  
  useEffect(() => {
    axiosPublic.get(`/get_a_author?id=${id}`).then((res) => {
      const author = res.data;
      setAuthor(author);
      axiosPublic.post("/get_a_author_books",{id:author._id})
      .then(res=>{
        setAuthorsBooks(res.data)
        // get authors all books catagorys.
        let catagoryArray=[]
        res?.data?.forEach(item=>catagoryArray.push(item.catagory))
        setAllCatagory(catagoryArray)
      })
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
      } else {
        // setAuthor(author)
      }
    });
  }, [id, person, reload]);

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

  

  // ............................................ will be on it................................
  // manage all input type check.

  const[checkedArray,setChackedArray]=useState([])
  const checkboxHandle=(e)=>{

    const sortingCatagory=[]
    const clickedCatagory={isclicked:e.target.checked,value:e.target.id}
    console.log(clickedCatagory)
    if(clickedCatagory.isclicked){
      setChackedArray([clickedCatagory.value])
    }
    console.log(checkedArray)
    
  }
  
  return (
    <div>
      {/* author details */}
      <div className="flex gap-2 py-4">
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
                <span className="text-xl"><MdOutlineCancel /></span>
                <span>Unfollow</span>
              </span>
            ) : (
              <span className="flex gap-2 justify-center items-center">
                <span className="text-xl"><FaPlus /></span>
                <span>Follow</span>
              </span>
            )}
          </button>
        </div>
        <div className="w-[80%] text-gray-200 text-sm">
          <h1 className="font-bold text-base">{author?.name},</h1>
          <p className="mt-6 font-medium">{author?.details}</p>
        </div>
      </div>


      {/* authors published books */}
      <div className=" text-white flex mt-6">
        {/* aside */}
        <div className="w-[20%]">
         {
          allCatagory.map((item,idx)=><label className="flex gap-3 items-start font-normal mb-3 " key={idx} htmlFor={item}>
          <input onChange={checkboxHandle} name="checkbox" id={item} type="checkbox" />
          {item}
         </label>)
         }
        </div>
        {/* container */}
        <div className="w-[80%]">
          <h1 className="font-thin text-xl">{author?.name} এর বই সমূহ</h1>
        {/* author books collection. */}
        <div className="grid grid-cols-5 mt-5 gap-y-5">
          {
            authorBooks.map((item,idx)=><SingleBookDesign book={item} key={idx}></SingleBookDesign>)
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
