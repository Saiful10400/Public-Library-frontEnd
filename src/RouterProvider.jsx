
import { createBrowserRouter } from "react-router-dom";
import Root from "./Components/Other/Root";
import Home from "./Components/Other/Home/Home";
import UserDashboardRoot from "./Components/Other/UserDashboard/UserDashboardRoot";
import UserDashboard from "./Components/Other/UserDashboard/components/UserDashboard";
import UpdateProfile from "./Components/Other/UserDashboard/components/UpdateProfile";
import AddABook from "./Components/Other/UserDashboard/components/AddABook";



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
                path:"/User_dashboard",
                element:<UserDashboardRoot></UserDashboardRoot>,
                children:[
                    {
                        path:"",
                        element:<UserDashboard></UserDashboard>
                    },
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