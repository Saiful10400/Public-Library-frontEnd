 
import { Outlet, useLocation } from 'react-router-dom';
import RootNav from './RootNav';
import RootFoot from './RootFoot';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    const url=useLocation()
    console.log()
    return (
        <div className='bg-[#111122]'>
            <RootNav></RootNav>
            <div className={` mx-auto  lg:px-0 min-h-[90vh] ${url.pathname.includes("User_dashboard")?"w-full":"lg:w-[1400px] px-4"}`}>
                <Outlet></Outlet>
            </div>
            <div>
                <RootFoot></RootFoot>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Root;