import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider"; 

const ReviewDetails = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext); 
  const [review, setReview] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // Fetch review details from the backend
  useEffect(() => {
    const fetchReviewData = () => {
      fetch(`https://gamer-server.vercel.app/api/reviews/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setReview(data);
        })
        .catch((error) => {
          console.error("Error fetching review data:", error);
          Swal.fire(
            "Error!",
            "Could not load review details. Please try again later.",
            "error"
          );
        })
        .finally(() => {
          setLoading(false); // Stop loading spinner
        });
    };
  
    if (id) {
      fetchReviewData(); // Fetch review data when the ID is available
    }
  }, [id]);
  

  // Add the review to the user's watchlist
  const handleAddToWatchlist = async () => {
    if (!user) {
      Swal.fire("Oops!", "Please log in to add reviews to your watchlist.", "info");
      navigate("/login");
      return;
    }

    const watchlistData = {
      reviewId: id,
      gameTitle: review.gameTitle,
      gameCover: review.gameCover,
      rating: review.rating,
      genres: review.genres,
      userEmail: user.email,
      userName: user.displayName,
    };

    try {
      const response = await fetch("https://gamer-server.vercel.app/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchlistData),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire(
          "Success!",
          `${review.gameTitle} has been added to your watchlist.`,
          "success"
        );
      } else {
        throw new Error("Failed to add to watchlist.");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      Swal.fire(
        "Error!",
        "Failed to add this review to your watchlist. Please try again.",
        "error"
      );
    }
  };

  if (!review) {
    return <div>No review found for the given ID.</div>; // Handle invalid ID
  }

  return (
    <div className="review-details-container">
      <h1 className="text-2xl font-medium mb-5">Review Details</h1>
      <div className="review-card lg:flex">
        <div>
        <img
          src={review.gameCover}
          alt={`${review.gameTitle} cover`}
          className="game-cover-img rounded-3xl"
        />

        </div>
        <div className="review-content ml-10 space-y-3">
          <h2 className="text-3xl font-semibold">{review.gameTitle}</h2>
          <p className="text-xl">
            <strong>Rating:</strong> {review.rating} / 10
          </p>
          <p className="text-xl">
            <strong>Genres:</strong> {review.genres}
          </p>
          <p className="text-xl">
            <strong>Review Description:</strong>
          </p>
          <p className="text-lg font-medium text-gray-500">{review.reviewDescription}</p>
          <p className="text-lg">
            <strong>Reviewed by:</strong> {review.userName}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {review.userEmail}
          </p>

          <Link to={'/'}>
          <button className="border border-red-500 mt-4 px-10 py-3 rounded-2xl"> Back </button>
          </Link>
        </div>
      </div>
      {user && (
        <button onClick={handleAddToWatchlist} className="btn watchlist-btn">
          Add to Watchlist
        </button>
      )}
    </div>
  );
};

export default ReviewDetails;
