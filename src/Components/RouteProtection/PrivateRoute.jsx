import React, { useContext } from 'react';
import { dataProvider } from '../context api/ContextApi';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
   const{person}=useContext(dataProvider)
   if(person){
    return children
   }
   return <Navigate to={"/login"}></Navigate>
};

export default PrivateRoute;