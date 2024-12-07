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
    <div className="my-watchlist-container">
      <h1>My Watchlist</h1>
      <table className="watchlist-table">
        <thead>
          <tr>
            <th>Game Cover</th>
            <th>Game Title</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((review) => (
            <tr key={review._id}>
              <img
                src={review.gameCover}
                className="w-[80px] rounded-badge mt-9"
                alt=""
              />
              <td className="p-10 font-medium">{review.gameTitle}</td>
              <td>{review.rating}</td>
              <td>{review.genres}</td>
              <td className="flex ml-4 mb-10">
                <button
                  onClick={() => handleRemove(review._id)}
                  className="btn "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyWatchlist;
