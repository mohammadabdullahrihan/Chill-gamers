import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bounce } from "react-awesome-reveal";
const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [platform, setPlatform] = useState(""); 
  const [sortBy, setSortBy] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [genre, setGenre] = useState("");

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const queryParams = new URLSearchParams();
  //       if (sortBy) queryParams.append("sortBy", sortBy);
  //       if (sortOrder) queryParams.append("sortOrder", sortOrder);
  //       if (genre) queryParams.append("genre", genre);

  //       const response = await fetch(`https://gamer-server.vercel.app/api/reviews?${queryParams.toString()}`);
  //       const data = await response.json();
  //       setReviews(data); 
  //       setFilteredReviews(data);
  //     } catch (error) {
  //       console.error("Error fetching reviews:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchReviews();
  // }, [sortBy, sortOrder, genre]);


  // Handle sorting changes
  const handleSort = (selectedSortBy) => {
    setSortBy(selectedSortBy);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc")); // Toggle sort order
  };


  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="w-4 h-4 rounded-full bg-red-400 animate-bounce [animation-delay: 17s]"></div>
        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:13s]"></div>
        <div className="w-4 h-4 rounded-full bg-red-600 animate-bounce [animation-delay:17s]"></div>
      </div>
    );
  }

  return (
    <div className="all-reviews-container">
      <div className="flex justify-center">

      <Bounce cascade>
      <h1 className="text-2xl font-semibold">All Reviews</h1>
      </Bounce>
      </div>

      {/* Sort Dropdown */}
      <div className="btn my-10 text-lg">
        <label htmlFor="sort-dropdown">Sort by:</label>
        <select id="sort-dropdown" onChange={(e) => handleSort(e.target.value)}>
          <option value="">Select</option>
          <option value="rating">Rating</option>
          <option value="year">Year</option>
        </select>

        {/* Sorting order toggle */}
        {sortBy && (
          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        )}
      </div>

      {/* Filter by Genre */}
      <div className="filter-container btn btn-ghost text-lg">
        <label htmlFor="genre-filter">Filter by Genre:</label>
        <select
          id="genre-filter"
          value={genre}
          onChange={(e) => handleGenreFilter(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Sports">Sports</option>
          <option value="Shooter">Shooter</option>
        </select>
      </div>

  
      {/* Display Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((game) => (

            <div key={game._id} className="
           hover:shadow-xl transition-shadow relative
            
            bg-gradient-to-t from-white via-[#f4f7fb] to-[#f4f7fb] rounded-[40px] p-[100px] px-[35px] border-5 border-white shadow-[rgba(232,196,128,0.878)_0px_30px_30px_-20px] m-[10px] bg-[#f7ba2b]
            
            ">
              <img src={game.gameCover} alt={game.name} className="w-full h-[240px] object-cover rounded-lg mb-4  " />
              <h3 className="text-xl font-semibold mb-2">{game.gameTitle}</h3>
              <p> Review : {game.reviewDescription}</p>
              <p className="font-medium text-gray-600">Rating: {game.rating}</p>
              <p className="font-medium text-gray-600">Publish Year : {game.publishYear}</p>
              <p className="font-medium text-gray-600">Category: {game.genres}</p>
              <Link to={`/review/${game._id}`}>

              <p className="font-medium">{game.userEmail}</p>
              <p className="font-medium">{game.userName}</p>
                <button className="mt-4 px-6 py-3 text-white bg-gradient-to-b from-pink-500 via-red-500 to-yellow-400 rounded-xl hover:bg-white">Explore Details</button>
              </Link>
            </div>


          ))
        ) : (
          <div className="flex justify-center">

            <p className="text-2xl font-semibold">No reviews available for the selected platform or genre.</p>
          </div>

        )}
      </div>
    </div>
  );
};

export default AllReviews;
