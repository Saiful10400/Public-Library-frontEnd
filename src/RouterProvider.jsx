
import { createBrowserRouter } from "react-router-dom";
import Root from "./Components/Other/Root";
import Home from "./Components/Other/Home/Home";
import UserDashboardRoot from "./Components/Other/UserDashboard/UserDashboardRoot";
import UpdateProfile from "./Components/Other/UserDashboard/components/UpdateProfile";
import AddABook from "./Components/Other/UserDashboard/components/AddABook";
import PdfView from "./PdfView";
import Login from "./Components/Other/Login & registration/Login";
import Signup from "./Components/Other/Login & registration/Signup";




export const router=createBrowserRouter([
    {
        path:"/",
        element:<Root></Root>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/signup",
                element:<Signup></Signup>
            },
            {
                path:"/User_dashboard",
                element:<UserDashboardRoot></UserDashboardRoot>,
                children:[
                   
                    {
                        path:"Update_profile",
                        element:<UpdateProfile></UpdateProfile>
                    },
                    {
                        path:"Add_a_book",
                        element:<AddABook></AddABook>
                    }
                ]
            }
        ]
    }
])