import React, { useState } from "react";
import {
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase";
import PdfView from "./PdfView";
import SecondMethod from "./SecondMethod";
 
 
const App = () => {
  const [file, setfile] = useState(null);
  const forHandle = (e) => {
    e.preventDefault();
    const fileRefarence = ref(storage, `pdf/${file?.name}`);
    uploadBytes(fileRefarence, file).then((res) => {
      console.log(res);
      getMetadata(fileRefarence).then((res) => console.log(res));
      console.log("from bottom.");
      getDownloadURL(fileRefarence).then((res) => console.log(res));
    });
  };
  const allitemhandle = () => {
    const allfilerefarence = ref(storage, "pdf/");
    listAll(allfilerefarence).then((res) => console.log(res.items));
  };
  const secoundhandle=(e)=>{
    const file=e.target.files[0]
    console.log((file.size/1048576).toFixed(2))

  }
  return (
    <div>
      <div className="w-full h-[40vh] flex justify-center items-center">
        <form
          onSubmit={forHandle}
          className="bg-orange-400 w-[60%] mx-auto flex flex-col p-8 gap-4"
        >
          <input
            type="file"
            className="bg-gray-500"
            onChange={(event) => setfile(event.target.files[0])}
          />
          <button className="btn btn-primary">Submit</button>
        </form>
        <button onClick={allitemhandle} className="btn btn-secondary">
          All item
        </button>
        <button className="btn btn-warning">Delete</button>
      </div>
      <div className="bg-yellow-500">
        <input onChange={secoundhandle} type="file" />
      </div>
      {/* <PdfView></PdfView> */}
      <SecondMethod></SecondMethod>
    </div>
  );
};

export default App;
