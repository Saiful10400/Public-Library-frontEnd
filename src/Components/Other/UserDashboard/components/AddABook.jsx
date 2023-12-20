import thumbnail from "../../../../../public/thambnail.png"

const AddABook = () => {
    const inputStyle='w-full py-[12px] px-[10px] text-sm font-medium focus:outline-none border text-black'
    return (
        <div>
           <h1 className='text-2xl border-b-2 border-black pb-5 font-bold border-dotted'>Add a Book</h1>
           <form className='mt-5 flex flex-col gap-7 '>
            <div>
                <h1 className='font-bold text-xl text-center border-b border-black mb-2 border-dotted '>Book Name</h1>
                <div className='flex justify-between gap-12'>
                    <input className={inputStyle} type="text" placeholder='Book Name in Bangla' />
                    <input className={inputStyle} type="text" placeholder='Book Name in English'/>
                </div>
            </div>


            <div>
            <h1 className='font-bold text-xl  text-center border-b border-black mb-2 border-dotted '>Other informations</h1>
            <div className='grid grid-cols-2 gap-x-7 gap-y-3'>

            <div className='flex justify-center items-center gap-4'>
            <select className={inputStyle}>
                <option disabled selected value="">Select Author</option>
            </select>
            <button className='btn btn-sm btn-primary'>add Author</button>
            </div>


            <select className={inputStyle}>
                <option disabled selected value="">Select Language</option>
            </select>
            <select className={inputStyle}>
                <option disabled selected value="">Select Country</option>
            </select>
            <input type="number" className={inputStyle} placeholder='total page'/>
            <input type="text" className={inputStyle} placeholder='Book edition ex: New Edition, 2020'/>
            <textarea className={inputStyle} placeholder='Book summary'></textarea>
            
            </div>
            </div>

            <div>
            <h1 className='font-bold text-xl  text-center border-b border-black mb-2 border-dotted '>Upload files</h1>
            <div className="grid grid-cols-2 gap-7">
                
                <label className="" htmlFor="thumbnail">
                    {/* <div className="w-[300px] h-[300px]"><img className='w-full h-full object-contain' src={thumbnail} alt="thumbnail" /></div> */}
                    <h1 className="font-medium text-sm">Select Book cover photo.</h1>
                    <input className={inputStyle} accept="image/png, image/gif, image/jpeg" type="file" id='thumbnail' />
                </label>
                
                <label htmlFor="thumbnail">
                    <h1 className="font-medium text-sm">Select Book Pdf.</h1>
                    <input accept=".pdf" className={inputStyle} type="file" id='thumbnail' />
                </label>
               
            </div>
            </div>
            <button className="btn btn-primary">Post</button>
           </form>
        </div>
    );
};

export default AddABook;