import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider";

const UpdateReview = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [review, setReview] = useState(null); 
  const [formData, setFormData] = useState({
    gameCover: "",
    gameTitle: "",
    reviewDescription: "",
    rating: "",
    publishingYear: "",
    userEmail: user?.email || "",
    userName: user?.name || "",
  });


  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`https://gamer-server.vercel.app/api/reviews/${id}`);
        const data = await response.json();
        setReview(data);
        setFormData({
          gameCover: data.gameCover || "",
          gameTitle: data.gameTitle || "",
          reviewDescription: data.reviewDescription || "",
          rating: data.rating || "",
          publishingYear: data.publishingYear || "",
        });
      } catch (error) {
        toast.error("Error fetching review:", error);
        toast.error("Failed to load review data.");
      }
    };
    fetchReview();
  }, [id, user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedReview = {
      ...formData,
      genres: generateGenresList(formData.gameTitle), // Example JS method for generating genres
    };

    try {
      const response = await fetch(`https://gamer-server.vercel.app/api/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReview),
      });

      if (!response.ok) {
        throw new Error("Failed to update review.");
      }

      toast.success("Review updated successfully!");
      navigate("/myReviews");
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review.");
    }
  };

  
  const generateGenresList = (gameTitle) => {
    if (!gameTitle) return [];
    const defaultGenres = ["Action", "Adventure", "RPG"];
    return defaultGenres;
  };

  if (!review) return <div>Loading review data...</div>;

  return (
    <div className="max-w-lg my-8 p-6 bg-gray-100 rounded container-3 md:ml-[100px] ">
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
        <label className="block font-medium mb-1">
          Game Cover Image URL
        </label>
        <input
        className="bg-gray-100 mt-5 rounded-lg p-[35px] py-[20px] md:p-[135px] md:py-[14px]  lg:p-[140px] lg:py-[14px]"
          type="url"
          name="gameCover"
          value={formData.gameCover}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">
          Game Title
        </label>
        <input
        className="bg-gray-100 mt-5 rounded-lg p-[35px] py-[20px] md:p-[135px] md:py-[14px]  lg:p-[140px] lg:py-[14px]"
         type="text"
             name="gameTitle"
                value={formData.gameTitle}
                 onChange={handleChange}
           required
        />
      </div>

      <div className="mb-4">
        <label className="block " htmlFor="reviewDescription">
          Review Description
        </label>
        <textarea
        className="bg-gray-100 mt-5 rounded-lg p-[35px] py-[20px] md:p-[135px] md:py-[14px] lg:p-[140px] lg:py-[14px]"
          name="reviewDescription"
          value={formData.reviewDescription}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1" htmlFor="rating">
          Rating (1-10)
        </label>
        <input
        className="bg-gray-100 mt-5 rounded-lg p-[35px] py-[20px] md:p-[200px] md:py-[14px] lg:p-[140px] lg:py-[14px]"
         type="number"
         name="rating"
         value={formData.rating}
         min="1"
         max="10"
         onChange={handleChange}
         required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1" htmlFor="publishYear">
          Publishing Year
        </label>
        <input
        className="bg-gray-100 mt-5 rounded-lg p-[35px] py-[20px] md:p-[135px] md:py-[14px] lg:p-[140px] lg:py-[14px] "
           type="date"
           name="publishingYear"
           value={formData.publishingYear}
           onChange={handleChange}
           required
        />
      </div>

      

      <button type="submit" className="btn">
          Update Review
        </button>
    </form>
  </div>

  );
};

export default UpdateReview;
