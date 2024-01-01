import React from 'react';

const UploadedBook = ({title,data}) => {
    return (
        <div className='min-h-[300px] rounded-3xl bg-white mt-14 pt-3 mb-7 px-4'>
            <h1 className='text-2xl   text-center font-bold'>{title}</h1>
            
        </div>
    );
};

export default UploadedBook;