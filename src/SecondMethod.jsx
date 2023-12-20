import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
 const SecondMethod = () => {
  const pdfUrl="https://firebasestorage.googleapis.com/v0/b/library-55a94.appspot.com/o/pdf%2Fstudent_application_from.pdf?alt=media&token=be28e930-0ce3-4417-ac49-39e6250be0f5"
  const localUrl="../public/Corporate English for Beginner.pdf"
  const latestUrl= "https://firebasestorage.googleapis.com/v0/b/library-55a94.appspot.com/o/pdf%2FCrafting%20your%20Linkedin%20Profile.pptx.pdf?alt=media&token=7d721374-ff98-4856-b900-d8c7f2049582"

 
  return (
    <div>
      <div className="w-4/5 mx-auto h-[70vh] overflow-hidden">
    
        <Worker  workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
         
          <Viewer initialPage={0} tran fileUrl={latestUrl} />
         
        </Worker>
      </div>
    </div>
  );
};

export default SecondMethod;
