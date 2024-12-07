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
    errorElement: <ErrorPage />, // Default error page
    children: [
      // Home route
      {
        path: "/",
        element: <Home />,
      },

      // Authentication routes
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      // Reviews routes
      {
        path: "/reviews", // Fetch and display all reviews
        element: <AllReviews />,
      },
      {
        path: "/review/:id", // Fetch details of a specific review by ID
        element: <ReviewDetails />,
      },
      {
        path: "/addreview", // Private route for adding reviews
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/myreviews", // User's reviews, requires authentication
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateReview/:id", // Update specific review, private route
        element: (
          <PrivateRoute>
            <UpdateReview />
          </PrivateRoute>
        ),
      },

      // Watchlist routes
      {
        path: "/watchlist", // User's watchlist, private route
        element: (
          <PrivateRoute>
            <MyWatchlist />
          </PrivateRoute>
        ),
      },

    ],
  },
  // Fallback for undefined routes
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
