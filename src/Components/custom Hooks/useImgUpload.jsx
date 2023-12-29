import React from 'react';

const useImgUpload = () => {
  let imgbb=(file)=>{

    const imgbbUrl=`https://api.imgbb.com/1/upload?key=f09b4cd75a27b305820113fddc126a37`

    const data=new FormData()
    data.append("image",file)
 
   
   return fetch(imgbbUrl,{method:"POST",body:data})
    
  }
  return imgbb
};

export default useImgUpload;