
import { createBrowserRouter } from "react-router-dom";
import Root from "./Components/Other/Root";
import Home from "./Components/Other/Home/Home";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<Root></Root>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            }
        ]
    }
])