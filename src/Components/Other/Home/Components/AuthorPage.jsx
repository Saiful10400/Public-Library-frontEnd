import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { axiosPublic } from "../../../custom Hooks/useAxiosPublic";
import { FaPlus } from "react-icons/fa6";
import { dataProvider } from "./../../../context api/ContextApi";
import swal from "sweetalert";
import { MdOutlineCancel } from "react-icons/md";
const AuthorPage = () => {
  const { id } = useParams();
  const { person } = useContext(dataProvider);
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState(null);
  const [reload, setReload] = useState(false);
  const [isFollowing, setIsFollowing] = useState(null);
  useEffect(() => {
    axiosPublic.get(`/get_a_author?id=${id}`).then((res) => {
      const author = res.data;
      setAuthor(author);
      if (person) {
        axiosPublic.get(`/get_a_user?email=${person?.email}`).then((res) => {
          const userData = res.data;
          setUser(userData);
          // filtering, is this user follow this author previos time.
          const isFollowing = author?.followers?.find(
            (item) => item === userData._id
          );
          console.log(isFollowing);
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
  console.log(isFollowing);
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
  console.log(user);
  return (
    <div>
      {/* author details */}
      <div className="flex gap-2 py-4">
        <div className="border-2 w-[20%] flex flex-col justify-center items-center">
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
                ? "font-bold mt-4 opacity-100 transition-all duration-300"
                : "opacity-0"
            }
          >
            {author?.followers?.length} following
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
        <div className="w-[80%] border-2">
          <h1>{author?.name}</h1>
          <p className="mt-6 font-normal">{author?.details}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
