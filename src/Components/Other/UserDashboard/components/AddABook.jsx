import { useContext, useEffect, useState } from "react";
// import thumbnail from "../../../../../public/thambnail.png"
import axios from "axios";
import useAxiosPublic from "../../../custom Hooks/useAxiosPublic";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useImgUpload from "../../../custom Hooks/useImgUpload";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import pdfIcon from "../../../../../public/pdf.png"
import imgIcon from "../../../../../public/img.png"
import { dataProvider } from "../../../context api/ContextApi";

// input styles.
export const inputStyle =
  "w-full py-[12px] px-[10px] text-sm font-medium rounded-lg focus:outline-none border text-black";
const AddABook = () => {
  const move = useNavigate();
  const {person}=useContext(dataProvider)
  const axiosPublic = useAxiosPublic();
  const [country, setCountry] = useState([]);
  const [author, setAuthor] = useState([]);
  const [language, setLanguage] = useState([]);
  const [catagory, setCatagory] = useState(null);
  const [reload, setReload] = useState(true);
  const[user,setUser]=useState(null)

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
    // get user.
    if(person?.email){
      axiosPublic.get(`/get_a_user?email=${person.email}`)
      .then(res=>setUser(res.data))
    }
    // get poets form mongodb.
    axiosPublic.get("/authors").then((res) => setAuthor(res.data));
    // get language data.
    axios.get("/language.json").then((res) => setLanguage(res.data));
    // get catagoryes.
    axiosPublic.get("/catagoryes").then((res) => setCatagory(res.data[0]));
  }, [axiosPublic, reload,person]);

  //................ post new author.
  const addNewAuthor = (e) => {
    e.preventDefault();
    document.getElementById("my_modal_3").showModal();
  };

    //  book type based form prefare.
    const [bookType, setBooktype] = useState(null);

  // form submittion handle.
  // book and coverphoto url.
  const[coverPhotoUrl,setCoverPhotoUrl]=useState(null)

const[pdfUrl,setPdfUrl]=useState(null)
const[bookSize,setBookSize]=useState(null)
  const formHandle = (e) => {
    e.preventDefault();
    const validation=(value)=>{
      if(value===""){
        return null
      }
      return value
    }

    const form=e.target
    const banglaName=form.banglaName.value
    const englishName=form.englishName.value
    let authordata=form.bookAuthor.value
    authordata=validation(authordata)
    const authorName=authordata?.split("/")[0]
    const authorId=authordata?.split('/')[1]
    let catagory=form.bookCatagory.value
    catagory=validation(catagory)
    let language=form.bookLanguage.value
    language=validation(language)
    let forClass=form.bookForClass.value
    forClass=validation(forClass)
    let subject=form.bookSubject.value
    subject=validation(subject)
    let country=form.bookCountry.value
    country=validation(country)
    let page=form.pageNumber.value
    page=validation(page)
    let edition=form.bookEdition.value
    edition=validation(edition)
    let summery=form.bookSummery.value
    summery=validation(summery)
    const coverPhoto=coverPhotoUrl
    const pdf=pdfUrl
    // other extra field for book functionality.
    const download=0
    const read=0
    const uploaderEmail=user.email
    const publish=user.role==="superUser"||user.role==="admin"?true:false
    const postedDate=new Date().toLocaleDateString("en-IN")
    axiosPublic.post("/upload_a_book",{banglaName,uploaderEmail,bookType,bookSize,download,read,englishName,authorName,authorId,publish,catagory,language,forClass,subject,country,page,edition,summery,postedDate,coverPhoto,pdf})
    .then(res=>{
      console.log(res.data)
      form.reset()
    })
    // console.log({banglaName,bookType,bookSize,download,read,englishName,authorName,authorId,publish,catagory,language,forClass,subject,country,page,edition,summery,coverPhoto,pdf})
    
    
  };
   
  // modal form handle.
  const imgbb = useImgUpload();
  const [authorImg, setauthroImg] = useState(null);
  const modalFormHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.authorBanglaName.value;
    const englishName = form.authorEnglishName.value;
    const details = form.authorAbout.value;

    // posting author image into imgbb.
    if (authorImg) {
      imgbb(authorImg)
        .then((res) => res.json())
        .then((data) => {
          const url = data.data.url;

          // store author data into mongodb.

          axiosPublic
            .post("/post_author", { name, englishName, url, details })
            .then((res) => {
              console.log(res.data);
              setReload(!reload);
              document.getElementById("authoradd").reset();
              document.getElementById("my_modal_3").close();
              swal(`${name}`, "is added to the author list.", "success");
            });
        });
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



  // class names.
  const [className, setClassName] = useState([]);
  const [subjectName, setSubjectName] = useState([]);
  useEffect(() => {
    axiosPublic
      .get("/get_classe")
      .then((res) => setClassName(res.data.classes));
    axiosPublic
      .get("/get_subjects")
      .then((res) => setSubjectName(res.data.subjectNames));
  }, [axiosPublic]);
 

// book coverphoto and book file handle.
const[bookName,setBookName]=useState("Chose book pdf.")
const[bookCoverName,setBookCoverName]=useState("Chose book cover photo.")
const[coverUploadLoading,setCoverUploadLoading]=useState(false)
// book coaver photo url handle.
const bookCoverUrl=(e)=>{
  const coverPhotoFile=e.target.files[0]
  setBookCoverName(coverPhotoFile?.name)
  setCoverUploadLoading(true)
  imgbb(coverPhotoFile)
  .then(res=>res.json())
  .then(res=>{
    setCoverPhotoUrl(res?.data?.url)
    setCoverUploadLoading("done")
  })
}

// book url handle.
const [progress,setProgress]=useState(0)
const [fileComplition,setFileComplition]=useState("")

const bookUrl=(e)=>{
  const bookFile=e.target.files[0]
  setBookSize(bookFile.size)
  setBookName(bookFile?.name)
  // date and rendom number for unique name.
  const date=new Date().toLocaleDateString("en-US")
  // storage ref.
  const storage=getStorage()
  // pdf folder ref.
  const pdfFolder=ref(storage,"PDFS")
  // file reference.
  const fileref=ref(pdfFolder,`${bookFile?.name.split(".pdf")[0]+"-"+date+"/"+"R"+"_"+(parseInt(Math.random()*100))}.pdf`)
  // upload the file.
  if(bookFile?.type.includes("pdf")){
 const uploadTask= uploadBytesResumable(fileref,bookFile)
 uploadTask.on('state_changed', (snapshot) => {
  // Handle the snapshot to get upload progress
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  // console.log('Upload is ' + progress + '% done');
  setProgress(progress)
}, (error) => {
  // Handle errors during upload
  console.error('Error uploading file: ', error);
}, () => {
  // Handle successful upload completion
  setFileComplition('Uploaded.');
  getDownloadURL(fileref).then(res=>setPdfUrl(res))
});
  }


}
  return (
    <div className="bg-[#f2f2f2] px-5 pt-4 h-full">
      <h1 className="text-2xl border-b-2 border-black pb-5 font-bold border-dotted">
        Add a Book
      </h1>
      <div
        className={`rounded-3xl bg-white py-3 mt-5 flex ${
          !bookType ? "shadow-xl duration-700" : ""
        } justify-center flex-col lg:flex-row items-center gap-6`}
      >
        <span className="text-xl font-bold">Select book type:</span>
        <div>
          <select
          disabled={bookType}
            onChange={(e) => setBooktype(e.target.value)}
            className={inputStyle + " " + "font-bold"}
            defaultValue=""
          >
            <option disabled value="">
              Select one
            </option>
            <option value="academic">Academic (ex:প্রথম-দ্বাদশ শ্রেণি)</option>
            <option value="non-academic">
              Non-academic (ex: উপন্যাস,গল্প,ছড়া, কবিতা etc)
            </option>
            <option value="job-preparation">Job preparation</option>
          </select>
        </div>
      </div>
      <form onSubmit={formHandle} className="mt-5 flex flex-col gap-7 mb-5 ">
        <div
          className={`bg-white rounded-3xl pb-3 px-3 transition-all ${
            bookType ? "opacity-100 duration-700 shadow-xl" : "opacity-50"
          }`}
        >
          <h1 className="font-bold text-xl text-center border-b border-black mb-2 border-dotted ">
            Book Name
          </h1>
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            <input
            name="banglaName"
              required={true}
              disabled={!bookType}
              className={inputStyle}
              type="text"
              placeholder="Book Name in Bangla (required)"
            />
            <input
            name="englishName"
              required={true}
              disabled={!bookType}
              className={inputStyle}
              type="text"
              placeholder="Book Name in English (required)"
            />
          </div>
        </div>

        <div
          className={`bg-white rounded-3xl pb-3 px-3 transition-all ${
            bookType ? "opacity-100 duration-700 shadow-xl" : "opacity-50"
          }`}
        >
          <h1 className="font-bold text-xl  text-center border-b border-black mb-2 border-dotted ">
            Other informations
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-3">
            <div className={`justify-center items-center gap-4 ${bookType==="academic"||bookType==="job-preparation"?"hidden":"flex"}`}>
              <select
              defaultValue=""
                required={bookType==="academic"||bookType==="job-preparation"?false:true}
                aria-required={bookType==="academic"||bookType==="job-preparation"?false:true}
                className={inputStyle}
                disabled={!bookType}
                name="bookAuthor"
              >
                <option disabled  value="">
                  Select Author (required)
                </option>
                {author.map((item, idx) => (
                  <option value={item.name+"/"+item._id} key={idx}>
                    {(idx += 1)}. {item.name} ({item.englishName})
                  </option>
                ))}
              </select>
              <button
                disabled={!bookType}
                onClick={addNewAuthor}
                className="btn btn-sm btn-primary"
              >
                Add new author
              </button>
            </div>
            
            <div className={`flex justify-center items-center gap-4 ${bookType==="academic"||bookType==="job-preparation"?"hidden":""}`}>
              <select defaultValue="" name="bookCatagory"
                required={bookType==="academic"||bookType==="job-preparation"?false:true}
                aria-required={bookType==="academic"||bookType==="job-preparation"?false:true}
                
                disabled={!bookType}
                className={inputStyle}
                
              >
                <option disabled value="">
                  Select book Catagory (required)
                </option>
                {catagory?.categories.map((item, idx) => (
                  <option value={item} key={idx}>
                    {(idx += 1)}. {item}
                  </option>
                ))}
              </select>
              <button
                disabled={!bookType}
                className="btn btn-primary btn-sm"
                onClick={addnewcatagory}
              >
                Add new category
              </button>
            </div>
            <div className={`${bookType==="academic"?"hidden":""}`}>
            <select defaultValue="" name="bookLanguage" required={bookType==="academic"?false:true} aria-required={bookType==="academic"?false:true} disabled={!bookType} className={inputStyle}>
              <option disabled value="">
                Select Language (required)
              </option>
              {language.map((item, idx) => (
                <option value={item.name} key={idx}>
                  {(idx += 1)}. {item.name} ({item.native_name})
                </option>
              ))}
            </select>
            </div>
            {/* class select. */}

            <select
            name="bookForClass"
            required={bookType==="non-academic"||bookType==="job-preparation"?false:true}
            aria-required={bookType==="non-academic"||bookType==="job-preparation"?false:true}
            defaultValue=""
                disabled={!bookType}
                className={bookType==="non-academic"||bookType==="job-preparation"?"hidden":inputStyle}>
              <option disabled  value="">
                Select Class (required)
              </option>
              {className.map((item, idx) => (
                <option value={item.classNumber} key={idx}>
                  {++idx}. {item.className}
                </option>
              ))}
            </select>
            {/* subject selector */}
            <div className={`${bookType==="non-academic"?"hidden":"flex"}  justify-center items-center gap-4`}>
              <select
              name="bookSubject"
                required={bookType==="non-academic"?false:true}
                aria-required={bookType==="non-academic"?false:true}
                disabled={!bookType}
                className={inputStyle}
                defaultValue=""
              >
                <option disabled value="">
                  Select subject (required)
                </option>
                {subjectName.map((item, idx) => (
                  <option value={item.bangla} key={idx}>
                    {++idx}. {item.bangla} ({item.english})
                  </option>
                ))}
              </select>
              <button disabled={!bookType} className="btn btn-primary btn-sm">
                Add new subject
              </button>
            </div>

            <select name="bookCountry" required={false} defaultValue="" disabled={!bookType} className={`${bookType==="academic"||bookType==="job-preparation"?"hidden":inputStyle}`}>
              <option disabled value="">
                Select book target audience country (optional)
              </option>
              {country.map((item, idx) => (
                <option value={item.name.common} key={idx}>
                  {(idx += 1)}. {item.name.common}
                </option>
              ))}
            </select>
            <input
            name="pageNumber"
              disabled={!bookType}
              type="number"
              className={`${bookType==="academic"?"hidden":inputStyle}`}
              placeholder="total page (optional)"
            />
            <input
            name="bookEdition"
              disabled={!bookType}
              type="text"
              className={inputStyle}
              placeholder="Book edition (optional) ex: New Edition, 2020"
            />
            <textarea
            name="bookSummery"
              disabled={!bookType}
              className={`${bookType==="academic"?"hidden":inputStyle}`}
              placeholder="Book summary (optional)"
            ></textarea>
          </div>
        </div>

        <div
          className={`bg-white rounded-3xl pb-3 px-3 transition-all ${
            bookType ? "opacity-100 duration-700 shadow-xl" : "opacity-50"
          }`}
        >
          <h1 className="font-bold text-xl  text-center border-b border-black mb-2 border-dotted ">
            Upload files
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mt-5">
            <div>
            <label className="" htmlFor="thumbnail">
            <div className="flex items-end gap-3">
                <img className="lg:w-[70px] w-[30px]" src={imgIcon} alt="pdf icon." />
                <h1 className="font-bold text-[12px] lg:text-base">{bookCoverName}</h1>
              </div>
              <input
              onInput={bookCoverUrl}
                required={true}
                disabled={!bookType}
                className={inputStyle+" "+"hidden"}
                accept="image/png, image/jpeg"
                type="file"
                id="thumbnail"
              />
            </label>
            {
              coverUploadLoading==="done"?<span className={`flex items-center gap-3`}><progress className="progress progress-primary w-56" value="100" max="100"></progress><span className="font-bold text-[12px] lg:text-[13px]">Uploaded.</span></span>:coverUploadLoading?<progress className="progress progress-primary w-56"></progress>:""
            }
            
            </div>

            <div>
            <label htmlFor="bookPdf">
              <div className="flex items-end gap-3">
                <img className="lg:w-[70px] w-[30px]" src={pdfIcon} alt="pdf icon." />
                <h1 className="font-bold text-[12px] lg:text-base">{bookName}</h1>
              </div>
              <input
              onInput={bookUrl}
                required={true}
                disabled={!bookType}
                accept=".pdf"
                className={inputStyle+" "+"hidden"}
                type="file"
                id="bookPdf"
              />
            </label>
            <div className={progress===0?"opacity-0":"flex gap-3 opacity-100 duration-300 items-center"}><progress className="progress progress-primary w-56" value={progress} max="100"></progress><span className="font-bold text-[12px] lg:text-[13px]">{progress===100?fileComplition:(progress.toFixed(1)+"%")}</span></div>
            </div>
          </div>
        </div>
        <button disabled={!(bookType&&coverPhotoUrl&&pdfUrl)} className="btn btn-primary btn-sm lg:btn-md">
          Post
        </button>
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
            <div className="flex items-center flex-col lg:flex-row justify-between ">
              <h1>Author Image :</h1>
              <input
                onInput={(e) => setauthroImg(e.target.files[0])}
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

            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddABook;
