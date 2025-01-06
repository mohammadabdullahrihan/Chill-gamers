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
    <div className="my-reviews-container px-4 sm:px-6 lg:px-8">
  <h1 className="text-center text-2xl font-semibold mb-6">My Reviews</h1>
  {reviews.length > 0 ? (
    <div className="overflow-hidden">
      <table className="reviews-table w-full border-collapse table-auto">
        <thead>
          <tr className="text-lg bg-gray-100">
            <th className="px-4 py-2">Game Title</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Genre</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="border-t">
              <td className="px-4 py-2 flex items-center space-x-4">
                <img
                  src={review.gameCover}
                  className="w-12 h-12 rounded-md object-cover"
                  alt={review.gameTitle}
                />
                <span className="font-medium">{review.gameTitle}</span>
              </td>
              <td className="px-4 py-2 text-center">{review.rating}</td>
              <td className="px-4 py-2 text-center">{review.genres}</td>
              <td className="px-4 py-2 flex justify-center space-x-2">
                <Link
                  to={`/updateReview/${review._id}`}
                >
                  <button className="text-sm lg:text-base border border-black  px-5 py-2 rounded-3xl">
                  Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-sm lg:text-base border border-black px-5 py-2 rounded-3xl"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-center text-lg font-medium mt-6">
      No reviews found. Start adding some reviews!
    </p>
  )}
</div>

  );
};

export default MyReviews;
