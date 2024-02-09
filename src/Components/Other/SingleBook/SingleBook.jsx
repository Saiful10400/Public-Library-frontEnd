import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPublic } from '../../custom Hooks/useAxiosPublic';
 

const SingleBook = () => {
    const {id}=useParams()
    console.log(id)
    const[bookData,setBookData]=useState(null)
    useEffect(()=>{
    if(id){
        axiosPublic.get(`/get_a_book?id=${id}`)
        .then(res=>setBookData(res.data))
    }
    },[id])
    console.log(bookData)
    return (
        <div className='h-[60vh] relative'>
            <img className='w-full h-full object-bottom' src="https://picsum.photos/1920/1080" alt="" />
            <div className='text-white absolute top-0 left-0 w-full h-full bookBody'>
            
            <div className='flex items-center'>
                <div className='w-[30%]'>
                    <img className='' src={bookData?.coverPhoto} alt="" />
                    <div><button>Read</button> <button>Download</button></div>
                    </div>
                <div className='w-[70%]'>
                    <h1 className='text-5xl'>{bookData?.banglaName}</h1>
                    <h1 className='text-xl'> By {bookData?.authorName}</h1>
                    <h1 className='text-xl'> Catagory: {bookData?.catagory}</h1>
                    <h1 className='text-xl'> Page: {bookData?.page}</h1>
                </div>
            </div>

        </div>
        </div>
    );
};

export default SingleBook;