import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";

const AddReview = () => {
  const [gameCover, setGameCover] = useState("");
  const [gameTitle, setGameTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [genres, setGenres] = useState("Action");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      gameCover,
      gameTitle,
      reviewDescription,
      rating: parseInt(rating), // Ensure rating is treated as a number
      publishYear,
      genres,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      const response = await fetch("https://gamer-server.vercel.app/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your review has been added!",
          icon: "success",
          confirmButtonText: "Cool",
        });

        setGameCover("");
      setGameTitle("");
      setReviewDescription("");
      setRating(1);
      setPublishYear("");
      setGenres("");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to submit your review.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.error(error);  // Log the error to check details
      Swal.fire("Error!", "Failed to submit your review.", "error");
    }
  };

 

  return (
    <div className=" md:ml-[100px] lg:ml-[400px]">

    <div className="max-w-lg my-8 p-6 bg-gray-100 rounded container-3 ">
      <h1 className="text-2xl font-bold mb-4">Add New Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="userEmail">
            Your Email
          </label>
          <input
            type="email"
            id="userEmail"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100"
            value={user?.email || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 " htmlFor="userEmail">
            Your Name
          </label>
          <input
            type="email"
            id="userEmail"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100"
            value={user?.displayName || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 " htmlFor="gameCover">
            Game Cover Image URL
          </label>
          <input
            type="text"
            id="gameCover"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100"
            value={gameCover}
            onChange={(e) => setGameCover(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="gameTitle">
            Game Title
          </label>
          <input
            type="text"
            id="gameTitle"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100"
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="reviewDescription">
            Review Description
          </label>
          <textarea
            id="reviewDescription"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100"
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="rating">
            Rating (1-10)
          </label>
          <input
            type="number"
            id="rating"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 " htmlFor="publishYear">
            Publishing Year
          </label>
          <input
            type="date"
            id="publishYear"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="genres">
            Genres
          </label>
          <select
            id="genres"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100 "
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          >
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Adventure">Adventure</option>
            <option value="Strategy">Strategy</option>
            <option value="Simulation">Simulation</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white px-5 py-4 mt-6 rounded-xl hover:bg-blue-600 transition"
        >
          Submit Review
        </button>
      </form>
    </div>

    </div>
  );
};

export default AddReview;
