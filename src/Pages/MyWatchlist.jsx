import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";
const MyWatchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://gamer-server.vercel.app/api/myWatchlist?email=${user?.email}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWatchlist(data);
        })
        .catch((error) => {
          console.error("Error fetching watchlist:", error);
          toast.error("Error loading watchlist. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gamer-server.vercel.app/api/myWatchlist/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0) {
              setWatchlist((prevWatchlist) =>
                prevWatchlist.filter((item) => item._id !== id)
              );
              Swal.fire({
                title: "Removed!",
                text: "Game has been removed from your watchlist.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to remove the game.",
                icon: "error",
              });
            }
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

  if (loading) {
    return (
      <div className="flex justify-center mt-[150px]">
        <div className="loader "></div>
      </div>
    );
  }

  if (!watchlist.length) {
    return <div>No games added to your Watchlist.</div>;
  }

  return (
    <div className="my-watchlist-container px-4 sm:px-6 lg:px-8">
    <h1 className="text-center text-2xl font-semibold mb-6">My Watchlist</h1>
    <div className="overflow-hidden">
      <table className="watchlist-table w-full border-collapse table-auto">
        <thead>
          <tr className="text-lg bg-gray-100">
            <th className="px-4 py-2">Game Cover</th>
            <th className="px-4 py-2">Game Title</th>
            <th className="px-4 py-2">Genre</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((review) => (
            <tr key={review._id} className="border-t">
              <td className="px-4 py-2 flex items-center justify-center">
                <img
                  src={review.gameCover}
                  className="w-[80px] h-[80px] rounded-md object-cover"
                  alt={review.gameTitle}
                />
              </td>
              <td className="px-4 py-2 font-medium">{review.gameTitle}</td>
              <td className="px-4 py-2 text-center">{review.genres}</td>
              <td className="px-4 py-2 text-center">{review.rating}</td>
              <td className="px-4 py-2 flex justify-center items-center">
                <button
                  onClick={() => handleRemove(review._id)}
                  className=" border border-black px-6 py-3 rounded-3xl text-sm lg:text-base"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default MyWatchlist;
