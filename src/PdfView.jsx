import React from 'react';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import resume from "../public/Resume.pdf"
const PdfView = () => {


  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);


  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  const pdfUrl="https://firebasestorage.googleapis.com/v0/b/library-55a94.appspot.com/o/pdf%2Fstudent_application_from.pdf?alt=media&token=be28e930-0ce3-4417-ac49-39e6250be0f5"

  return (
    <div>
      <Document file={"../public/Corporate English for Beginner.pdf"} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default PdfView;