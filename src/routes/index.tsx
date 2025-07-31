import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import { CreateTrip } from "../pages/CreateTrip";
import { TripDetails } from "../pages/TripDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTrip />,
    
  },
  {
    path:'/trips/:tripId',
    element:<TripDetails />
  }
]);

export function AppRoute() {
  return <RouterProvider router={router}/>
}
