import { useState } from "react";
import swal from "sweetalert";
import { axiosPublic } from './../../../custom Hooks/useAxiosPublic';

const WaitingForConfirmationBook = ({ data ,refetch,reload}) => {
  console.log(data);

  // book details modal handle.
  //   single book data.
  const [singleBook, setSingleBook] = useState(null);
  const [availabekeys, setAvailableKeys] = useState([]);
  const modalHandle = (singleBookData) => {
    setSingleBook(singleBookData);
    const fileterdData = [];
    for (let item in singleBookData) {
      if (singleBookData[item] && item!=="_id" && item!=="bookSize" && item!=="uploaderId" && item!=="uploaderName" && item!=="uploaderPhotoUrl" && item!=="uploaderEmail" && item!=="authorId") {
        fileterdData.push(item);
      }
    }
    setAvailableKeys(fileterdData);

    document.getElementById("my_modal_3").showModal();
  };
  console.log(singleBook, availabekeys);

  // book publishing handle.
  const bookPublishHandle=(identifyer)=>{
    if(identifyer){
      axiosPublic.patch("/update_a_book",{id:singleBook._id})
      .then(res=>{
        if(res){
          reload(!refetch)
          document.getElementById('my_modal_3').close()
          swal("You successfully confirm the book","","success")
        }
        
      })
    }
    else{
      axiosPublic.post("/delete_a_book",{id:singleBook._id})
      .then(res=>{
        if(res){
          reload(!refetch)
          document.getElementById('my_modal_3').close()
          swal("You successfully Reject the book","","success")
        }
        
      })
    }
  }
  return (
    <div className="h-[300px] overflow-y-scroll noScrollBar w-full rounded-2xl bg-[#1c2229] text-white mt-14 pt-3 mb-7 px-4">
      <h1 className="text-2xl   text-center font-bold">
        Waiting books for confirmation.
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((item, idx) => (
              <tr key={idx}>
                <th>
                  <span>{(idx += 1)}</span>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item?.uploaderPhotoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.uploaderName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {item?.banglaName}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item?.authorName}
                  </span>
                </td>

                <th>
                  <button
                    onClick={() => modalHandle(item)}
                    className="btn btn-warning btn-xs"
                  >
                    details
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal handle. */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 bg-[#111122] text-white max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            {/* publisher details. */}
            <div>
              <h1>Book uploader Details.</h1>
              <dir className="flex flex-col justify-center items-center gap-3">
                <div className="w-[200px] overflow-hidden rounded-full h-[200px]">
                  <img
                    className="w-full  object-cover "
                    src={singleBook?.uploaderPhotoUrl}
                    alt=""
                  />
                </div>
                <div className="text-center font-bold text-gray-100 text-lg">
                  <h1>
                    Name:{" "}
                    <span className="text-base ">
                      {singleBook?.uploaderName}
                    </span>
                  </h1>
                  <h1>
                    E-mail:{" "}
                    <span className="text-base ">
                      {singleBook?.uploaderEmail}
                    </span>
                  </h1>
                </div>
              </dir>
            </div>
            <hr />
            {/* book details. */}
            <div>
              <h1 className="mt-5 font-bold text-xl mb-6">Uploaded book details.</h1>
              <table className="w-full">
                <tbody>
                {availabekeys.map((item, idx) => (
                  <tr key={idx}>
                    <td className="w-[30%] pl-2 border">{item}</td>
                    <td className="w-[70%] py-3 pl-3 border">
                      {item === "pdf" || item === "coverPhoto" ? (
                        <a target="blank"
                          className="btn btn-sm btn-ghost border border-white"
                          href={singleBook[item]}
                        >
                          {item === "pdf" ? "Check pdf" : "Check cover photo"}
                        </a>
                      ) : (
                        singleBook[item]
                      )}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            {/* cancel or confirm button. */}
            <div className="flex items-center justify-center gap-6 my-7 ">
              <button onClick={()=>bookPublishHandle(false)} className="btn btn-warning w-1/2">Reject</button>
              <button onClick={()=>bookPublishHandle(true)} className="btn btn-success w-1/2">Confirm</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default WaitingForConfirmationBook;
