import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import PrivateRoute from "../PrivateRoute";
import ErrorPage from "../Components/ErrorPage";
import AllReviews from "../Pages/AllReviews";
import ReviewDetails from "../Pages/ReviewDetails";
import AddReview from "../Pages/AddReview";
import MyReviews from "../Pages/MyReview";
import UpdateReview from "../Pages/UpdateReview";
import MyWatchlist from "../Pages/MyWatchlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />, 
    children: [
    
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/reviews", 
        element: <AllReviews />,
      },
      {
        path: "/review/:id",
        element: <ReviewDetails />,
      },
      {
        path: "/addreview", 
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/myreviews", 
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateReview/:id", 
        element: (
          <PrivateRoute>
            <UpdateReview />
          </PrivateRoute>
        ),
      },

      {
        path: "/watchlist", 
        element: (
          <PrivateRoute>
            <MyWatchlist />
          </PrivateRoute>
        ),
      },

    ],
  },
  
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
