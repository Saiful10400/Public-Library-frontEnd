import React from 'react';

const useImgUpload = () => {
  let imgbb=(file)=>{

    const imgbbUrl=`https://api.imgbb.com/1/upload?key=f09b4cd75a27b305820113fddc126a37`

    const data=new FormData()
    data.append("img",file)
 
    let returnData=
    fetch(imgbbUrl,{method:"POST",body:data})
    .then(res=>res.json()).then(result=>returnData=result)
    return returnData
  }
  return imgbb
};

export default useImgUpload;