 
import { Outlet } from 'react-router-dom';
import RootNav from './RootNav';
import RootFoot from './RootFoot';

const Root = () => {
    return (
        <div>
            <div><RootNav></RootNav></div>
            <div className='lg:w-[1400px] mx-auto px-4 lg:px-0 min-h-[90vh]'>
                <Outlet></Outlet>
            </div>
            <div>
                <RootFoot></RootFoot>
            </div>
        </div>
    );
};

export default Root;