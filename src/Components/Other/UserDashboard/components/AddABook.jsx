import { useEffect, useState } from "react";
// import thumbnail from "../../../../../public/thambnail.png"
import axios from "axios";
import useAxiosPublic from "../../../custom Hooks/useAxiosPublic";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useImgUpload from "../../../custom Hooks/useImgUpload";

// input styles.
export const inputStyle =
  "w-full py-[12px] px-[10px] text-sm font-medium rounded-lg focus:outline-none border text-black";
const AddABook = () => {
  const move = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [country, setCountry] = useState([]);
  const [author, setAuthor] = useState([]);
  const [language, setLanguage] = useState([]);
  const [catagory, setCatagory] = useState(null);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      const sortedItem = res.data.sort((a, b) => {
        if (a.name.common > b.name.common) {
          return 1;
        } else if (a.name.common < b.name.common) {
          return -1;
        }
      });
      setCountry(sortedItem);
    });
    // get poets form mongodb.
    axiosPublic.get("/authors").then((res) => setAuthor(res.data));
    // get language data.
    axios.get("/language.json").then((res) => setLanguage(res.data));
    // get catagoryes.
    axiosPublic.get("/catagoryes").then((res) => setCatagory(res.data[0]));
  }, [axiosPublic, reload]);

  //................ post new author.
  const addNewAuthor = (e) => {
    e.preventDefault();
    document.getElementById("my_modal_3").showModal();
  };

  // form submittion handle.
  const formHandle = (e) => {
    e.preventDefault();
    console.log("form cum");
  };
  // modal form handle.
  const imgbb=useImgUpload()
  const [authorImg, setauthroImg] = useState(null);
  const modalFormHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.authorBanglaName.value;
    const englishName = form.authorEnglishName.value;
    const details = form.authorAbout.value;



    // posting author image into imgbb.
    if(authorImg){
      imgbb(authorImg)
      .then(res=>res.json())
      .then(data=>{
        const url=data.data.url

        // store author data into mongodb.

        axiosPublic
      .post("/post_author", { name, englishName, url, details })
      .then((res) => {
        console.log(res.data);
        setReload(!reload);
        document.getElementById("authoradd").reset()
        document.getElementById("my_modal_3").close()
        swal(`${name}`,"is added to the author list.","success")
        
      });
      })
    }








    
  };

  // catagory adding modal handle.
  const addnewcatagory = (e) => {
    e.preventDefault();
    document.getElementById("my_modal_4").showModal();
  };
  const addingCatagoryModalHandle = (e) => {
    e.preventDefault();
    const newcategory = e.target.category.value;

    axiosPublic.post("/add_catagory", { newcategory }).then(() => {
      setReload(!reload);
      document.getElementById("my_modal_4").close();
      swal(`${newcategory}`, "Added to the list.", "success");
      document.getElementById("catagoryAddingForm").reset();
    });
  };


//  book type based form prefare.
const [bookType,setBooktype]=useState(false)

  return (
    <div className="bg-[#f2f2f2] px-5 pt-4 h-full">
      <h1 className="text-2xl border-b-2 border-black pb-5 font-bold border-dotted">
        Add a Book
      </h1>
      <div className={`rounded-3xl bg-white py-3 mt-5 flex ${!bookType?"shadow-xl duration-700":""} justify-center items-center gap-6`}>
        <span className="text-xl font-bold">Select book type:</span>
        <div>
        <select onChange={(e)=>setBooktype(e.target.value)} className={inputStyle+" "+"font-bold"}>
          <option disabled selected>Select one</option>
          <option value="academic">Academic</option>
          <option value="non-academic">Non-academic</option>
        </select>
        </div>
        
      </div>
      <form onSubmit={formHandle} className="mt-5 flex flex-col gap-7 ">
        <div className={`bg-white rounded-3xl pb-3 px-3 transition-all ${bookType?"opacity-100 duration-700 shadow-xl":"opacity-50"}`}>
          <h1 className="font-bold text-xl text-center border-b border-black mb-2 border-dotted ">
            Book Name
          </h1>
          <div className="flex justify-between gap-12">
            <input disabled={!bookType}
              className={inputStyle}
              type="text"
              placeholder="Book Name in Bangla"
            />
            <input disabled={!bookType}
              className={inputStyle}
              type="text"
              placeholder="Book Name in English"
            />
          </div>
        </div>

        <div className={`bg-white rounded-3xl pb-3 px-3 transition-all ${bookType?"opacity-100 duration-700 shadow-xl":"opacity-50"}`}>
          <h1 className="font-bold text-xl  text-center border-b border-black mb-2 border-dotted ">
            Other informations
          </h1>
          <div className="grid grid-cols-2 gap-x-7 gap-y-3">
            <div className="flex justify-center items-center gap-4">
              <select disabled={!bookType} className={inputStyle}>
                <option disabled selected value="">
                  Select Author
                </option>
                {author.map((item, idx) => (
                  <option value={item.name} key={idx}>
                    {(idx += 1)}. {item.name} ({item.englishName})
                  </option>
                ))}
              </select>
              <button disabled={!bookType} onClick={addNewAuthor} className="btn btn-sm btn-primary">
                Add new author
              </button>
            </div>
            {/* this */}
            <div className="flex gap-4 items-center">
              <select disabled={!bookType} className={inputStyle}>
                <option disabled selected value="">
                  Select book Catagory
                </option>
                {catagory?.categories.map((item, idx) => (
                  <option value={item.name} key={idx}>
                    {(idx += 1)}. {item}
                  </option>
                ))}
              </select>
              <button disabled={!bookType}
                className="btn btn-primary btn-sm"
                onClick={addnewcatagory}
              >
                Add new category
              </button>
            </div>
            <select disabled={!bookType} className={inputStyle}>
              <option disabled selected value="">
                Select Language
              </option>
              {language.map((item, idx) => (
                <option value={item.name} key={idx}>
                  {(idx += 1)}. {item.name} ({item.native_name})
                </option>
              ))}
            </select>
            <select disabled={!bookType} className={inputStyle}>
              <option disabled selected value="">
                Select Country
              </option>
              {country.map((item, idx) => (
                <option value={item.name.common} key={idx}>
                  {(idx += 1)}. {item.name.common}
                </option>
              ))}
            </select>
            <input disabled={!bookType}
              type="number"
              className={inputStyle}
              placeholder="total page"
            />
            <input disabled={!bookType}
              type="text"
              className={inputStyle}
              placeholder="Book edition ex: New Edition, 2020"
            />
            <textarea disabled={!bookType}
              className={inputStyle}
              placeholder="Book summary"
            ></textarea>
          </div>
        </div>

        <div className={`bg-white rounded-3xl pb-3 px-3 transition-all ${bookType?"opacity-100 duration-700 shadow-xl":"opacity-50"}`}>
          <h1 className="font-bold text-xl  text-center border-b border-black mb-2 border-dotted ">
            Upload files
          </h1>
          <div className="grid grid-cols-2 gap-7">
            <label className="" htmlFor="thumbnail">
              {/* <div className="w-[300px] h-[300px]"><img className='w-full h-full object-contain' src={thumbnail} alt="thumbnail" /></div> */}
              <h1 className="font-medium text-sm">Select Book cover photo.</h1>
              <input disabled={!bookType}
                className={inputStyle}
                accept="image/png, image/gif, image/jpeg"
                type="file"
                id="thumbnail"
              />
            </label>

            <label htmlFor="thumbnail">
              <h1 className="font-medium text-sm">Select Book Pdf.</h1>
              <input disabled={!bookType}
                accept=".pdf"
                className={inputStyle}
                type="file"
                id="thumbnail"
              />
            </label>
          </div>
        </div>
        <button disabled={!bookType} className="btn btn-primary">Post</button>
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

          <form
            id="authoradd"
            className="flex flex-col gap-4 mt-3"
            onSubmit={modalFormHandle}
          >
            <input
              name="authorBanglaName"
              className={inputStyle}
              type="text"
              placeholder="Author name in bangla"
            />
            <input
              name="authorEnglishName"
              className={inputStyle}
              type="text"
              placeholder="Author name in english"
            />
            <div className="flex items-center justify-between ">
              <h1>Author Image :</h1>
              <input
              onInput={(e)=>setauthroImg(e.target.files[0])}
                name="authorImgUrl"
                type="file"
                placeholder="Author Image url link"
              />
            </div>
            <textarea
              name="authorAbout"
              className={inputStyle}
              placeholder="Write about the author."
            ></textarea>
            <button className="btn btn-primary btn-sm">Submit</button>
          </form>
        </div>
      </dialog>
      {/* for catagory.handle */}

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form
            id="catagoryAddingForm"
            onSubmit={addingCatagoryModalHandle}
            className="flex flex-col  gap-5 lg:mt-6"
          >
            <input
              name="category"
              className={inputStyle}
              type="text"
              placeholder="Add new catagory"
            />

            <button className="btn btn-primary btn-sm">Submit</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddABook;
