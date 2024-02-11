import React from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
const AuthorFollowing = ({author,user}) => {

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
    return (
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
    );
};

export default AuthorFollowing;