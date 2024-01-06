import axios from "axios";
import React from "react";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { axiosPublic } from "../../../custom Hooks/useAxiosPublic";

const UploadedBook = ({ title, data ,reload,refetch}) => {
  
  return (
    <div className="h-[300px] overflow-y-scroll noScrollBar w-full rounded-2xl bg-white mt-14 pt-3 mb-7 px-4">
      <h1 className="text-2xl   text-center font-bold">{title}</h1>

      <div
        className={
          title === "Published books" ? "hidden" : "mt-3 overflow-x-auto"
        }
      >
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                
              </th>
              <th>Cover image</th>
              <th>Book & author name</th>
              <th>Posted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <tr key={idx}>
                <th>{idx+=1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item?.coverPhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    
                  </div>
                </td>
                <td>
                  <h1 className="font-bold ">{item.banglaName}</h1>
                  <h1>{item.authorName}</h1>
                </td>
                <td>{item?.postedDate}</td>
                <th>
                  <button onClick={()=>{
                    Swal.fire({
                        title: "Want to delete?",
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            axiosPublic.post("/delete_a_book",{id:item._id})
                            .then((res)=>{
                                if(res.data.deletedCount===1){
                                    reload(!refetch)
                                    Swal.fire("Deleted.", "", "success");
                                }
                            })
                          
                        } 
                      });
                  }} className="btn btn-warning btn-xs">Cancel</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className={title === "Panding books" ? "hidden" : "mt-3"}>
        {data?.map((item, idx) => (
          <li
            className="flex justify-between bg-gray-200 rounded-xl font-bold py-2 px-4 items-center"
            key={idx}
          >
            <span>{(idx += 1)}.</span> <span>{item.banglaName}</span>{" "}
            <button className="btn btn-sm btn-primary">Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedBook;
