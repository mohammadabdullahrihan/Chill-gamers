import React from "react";
import { Link } from "react-router-dom";
import bg from "/public/error.mp4";

const ErrorPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full object-cover"
        src={bg}
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        
        <Link to="/">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transition-all duration-300">
            Go Back
          </button>
        </Link>

      </div>
    </div>
  );
};

export default ErrorPage;
