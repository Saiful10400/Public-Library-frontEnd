import React, { useContext } from 'react';
import { dataProvider } from '../context api/ContextApi';
import { Navigate } from 'react-router-dom';

const FakeEmailVarify = ({children}) => {
    const {person,logoutHandle}=useContext(dataProvider)
    if(person?.emailVerified){
        return children
    }
    logoutHandle()
    return<Navigate to={"/signup"}></Navigate>
};

export default FakeEmailVarify;