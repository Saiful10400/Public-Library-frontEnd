
import { createBrowserRouter } from "react-router-dom";
import Root from "./Components/Other/Root";
import Home from "./Components/Other/Home/Home";
import UserDashboardRoot from "./Components/Other/UserDashboard/UserDashboardRoot";
import UpdateProfile from "./Components/Other/UserDashboard/components/UpdateProfile";
import AddABook from "./Components/Other/UserDashboard/components/AddABook";
import PdfView from "./PdfView";
import Login from "./Components/Other/Login & registration/Login";
import Signup from "./Components/Other/Login & registration/Signup";
import FakeEmailVarify from "./Components/RouteProtection/FakeEmailVarify";
import PrivateRoute from "./Components/RouteProtection/PrivateRoute";
import AuthorPage from "./Components/Other/Home/Components/AuthorPage";
import SingleBook from "./Components/Other/SingleBook/SingleBook";




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
                path:"/author/:id",
                element:<AuthorPage></AuthorPage>
            },
            {
                path:"/book/:id",
                element:<SingleBook></SingleBook>
            },
            {
                path:"/User_dashboard",
                element:<PrivateRoute><UserDashboardRoot></UserDashboardRoot></PrivateRoute>,
                children:[
                   
                    {
                        path:"Update_profile",
                        element:<UpdateProfile></UpdateProfile>
                    },
                    {
                        path:"Add_a_book",
                        element:<FakeEmailVarify><AddABook></AddABook></FakeEmailVarify>
                    }
                ]
            }
        ]
    }
])