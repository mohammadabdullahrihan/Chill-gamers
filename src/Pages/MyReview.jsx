import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "/src/AuthProvider";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const fetchReviews = async () => {
    try {
      if (!user?.email) return;
      const response = await fetch(
        `https://gamer-server.vercel.app/api/myReviews?email=${user.email}`
      );
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      toast.error("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  };

  // Handle review deletion
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gamer-server.vercel.app/api/reviews/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete coffee.",
                icon: "error",
              });
            }
            fetchReviews();
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
            console.error(err);
          });
      }
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchReviews();
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center mt-[150px]">
        <div className="loader "></div>
      </div>
    );
  }

  return (
    <div className="my-reviews-container">
      <h1>My Reviews</h1>
      {reviews.length > 0 ? (
        <table className="reviews-table ">
          <thead>
            <tr className="text-xl">
              <th>Game Title</th>
              <th>Rating</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <img
                  src={review.gameCover}
                  className="w-[80px] rounded-badge  lg:mt-9"
                  alt=""
                />
                <td className="lg:p-10 font-medium">{review.gameTitle}</td>
                <td>{review.rating}</td>
                <td>{review.genres}</td>
                <td className="lg:flex md:flex lg:ml-4 mb-10 ">
                  <Link to={`/updateReview/${review._id}`} className="btn ">
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reviews found. Start adding some reviews!</p>
      )}
    </div>
  );
};

export default MyReviews;
