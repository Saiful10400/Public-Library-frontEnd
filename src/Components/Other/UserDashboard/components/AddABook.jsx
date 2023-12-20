import { useEffect, useState } from "react";
// import thumbnail from "../../../../../public/thambnail.png"
import axios from "axios";
import useAxiosPublic from "../../../custom Hooks/useAxiosPublic";

const AddABook = () => {
    const inputStyle='w-full py-[12px] px-[10px] text-sm font-medium focus:outline-none border text-black'
const axiosPublic=useAxiosPublic()
    const[country,setCountry]=useState([])
    const[author,setAuthor]=useState([])
    const[language,setLanguage]=useState([])
    useEffect(()=>{
        axios.get("https://restcountries.com/v3.1/all")
        .then(res=>{
            const sortedItem=res.data.sort((a,b)=>{
                if(a.name.common>b.name.common){
                    return 1
                }
                else if(a.name.common<b.name.common){
                    return -1
                }
            })
            setCountry(sortedItem)
        })
        // get poets form mongodb.
        axiosPublic.get("/authors")
        .then(res=>setAuthor(res.data))
        // get language data.
        axios.get("/language.json")
        .then(res=>setLanguage(res.data))

    },[axiosPublic])

// post new author.
const addNewAuthor=(e)=>{
    e.preventDefault()
    document.getElementById("my_modal_3").showModal()
}

// form submittion handle.
const formHandle=(e)=>{
    e.preventDefault()
    console.log("form cum")
}
// modal form handle.
const modalFormHandle=(e)=>{
    e.preventDefault()
    const form =e.target
    const name=form.authorBanglaName.value
    const englishName=form.authorEnglishName.value
    const url=form.authorImgUrl.value
    const details=form.authorAbout.value
    axiosPublic.post("/post_author",{name,englishName,url,details})
    .then(res=>console.log(res.data))
}


    return (
      <div>
        <h1 className="text-2xl border-b-2 border-black pb-5 font-bold border-dotted">
          Add a Book
        </h1>
        <form onSubmit={formHandle} className="mt-5 flex flex-col gap-7 ">
          <div>
            <h1 className="font-bold text-xl text-center border-b border-black mb-2 border-dotted ">
              Book Name
            </h1>
            <div className="flex justify-between gap-12">
              <input
                className={inputStyle}
                type="text"
                placeholder="Book Name in Bangla"
              />
              <input
                className={inputStyle}
                type="text"
                placeholder="Book Name in English"
              />
            </div>
          </div>

          <div>
            <h1 className="font-bold text-xl  text-center border-b border-black mb-2 border-dotted ">
              Other informations
            </h1>
            <div className="grid grid-cols-2 gap-x-7 gap-y-3">
              <div className="flex justify-center items-center gap-4">
                <select className={inputStyle}>
                  <option disabled selected value="">
                    Select Author
                  </option>
                  {author.map((item, idx) => (
                    <option value={item.name} key={idx}>
                      {(idx += 1)}. {item.name} ({item.englishName})
                    </option>
                  ))}
                </select>
                <button
                  onClick={addNewAuthor}
                  className="btn btn-sm btn-primary"
                >
                  Add new author
                </button>
              </div>

              <select className={inputStyle}>
                <option disabled selected value="">
                  Select Language
                </option>
                {language.map((item, idx) => (
                  <option value={item.name} key={idx}>
                    {(idx += 1)}. {item.name} ({item.native_name})
                  </option>
                ))}
              </select>
              <select className={inputStyle}>
                <option disabled selected value="">
                  Select Country
                </option>
                {country.map((item, idx) => (
                  <option value={item.name.common} key={idx}>
                    {(idx += 1)}. {item.name.common}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className={inputStyle}
                placeholder="total page"
              />
              <input
                type="text"
                className={inputStyle}
                placeholder="Book edition ex: New Edition, 2020"
              />
              <textarea
                className={inputStyle}
                placeholder="Book summary"
              ></textarea>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-xl  text-center border-b border-black mb-2 border-dotted ">
              Upload files
            </h1>
            <div className="grid grid-cols-2 gap-7">
              <label className="" htmlFor="thumbnail">
                {/* <div className="w-[300px] h-[300px]"><img className='w-full h-full object-contain' src={thumbnail} alt="thumbnail" /></div> */}
                <h1 className="font-medium text-sm">
                  Select Book cover photo.
                </h1>
                <input
                  className={inputStyle}
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  id="thumbnail"
                />
              </label>

              <label htmlFor="thumbnail">
                <h1 className="font-medium text-sm">Select Book Pdf.</h1>
                <input
                  accept=".pdf"
                  className={inputStyle}
                  type="file"
                  id="thumbnail"
                />
              </label>
            </div>
          </div>
          <button className="btn btn-primary">Post</button>
        </form>

        {/* modal */}

        {/* You can open the modal using document.getElementById('ID').showModal() method */}
       
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">If you dont get author just add this author.</h3>
            <form onSubmit={modalFormHandle}>
                <input name="authorBanglaName" className={inputStyle} type="text" placeholder="Author name in bangla" />
                <input name="authorEnglishName" className={inputStyle} type="text" placeholder="Author name in english" />
                <input name="authorImgUrl" className={inputStyle} type="text" placeholder="Author Image url link" />
                <textarea name="authorAbout" className={inputStyle} placeholder="say something about this author."></textarea>
                <button className="btn btn-primary btn-sm">Submit</button>
            </form>
          </div>
        </dialog>
      </div>
    );
};

export default AddABook;