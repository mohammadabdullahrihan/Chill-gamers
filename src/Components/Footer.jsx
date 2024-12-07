import React from "react";
import logo from "/public/logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center text-primary-content p-10">
        <aside>
          <img className="w-[60px] my-4" src={logo} alt="Logo" />
          <p className="font-bold text-lg text-gray-500 ">
            Trusted by Global Game Platforms
          </p>
        </aside>
        <nav className=" grid grid-cols-1 lg:flex ml-[69px] lg:space-x-[250px] ">
  
          {/* logo and description */}
           <div className="text-left">
            <div className="flex">
              <div>
                <img src={logo} alt="" />
              </div>
              <div>
                <h1 className="font-semibold text-xl mt-5 ml-2  text-gray-500">Chill Gamer</h1>
              </div>
            </div>
              <h1 className="mt-3 text-gray-500">Chill Gamer is the ultimate destination <br /> for playing discussing and creating game.</h1>
           </div>

           <div>
            {/* navigation links */}
            <ul className="flex flex-col mt-5 space-y-3 text-gray-500 -ml-[60px] lg:-ml-0  " >
              <h1 className="text-lg font-semibold text-black">Links</h1>
              <li className="">
                <a href="#">All Reviews</a>
              </li>
              <li className="">
                <a href="#">Add Review</a>
              </li>
              <li className="">
                <a href="#">My Reviews</a>
              </li>
              <li className="">
                <a href="#">Wishlist</a>
              </li>
            </ul>
           </div>

            <div>
              <h1 className="lg:text-2xl font-medium mb-5 text-gray-500 -ml-[50px] lg:-ml-0 ">Receive notifications about <br /> news and new  game releases</h1>
              <input placeholder="Email" type="text" className="px-[60px] -ml-[50px] lg:-ml-0 py-7 bg-gray-200 rounded-2xl" />
              <button className="px-[50px] -ml-[50px] lg:-ml-8 py-5 text-white rounded-2xl bg-gradient-to-b from-pink-500 via-red-500 to-yellow-400 ">Send</button>

            </div>

        </nav>
        <p className="mt-3 font-medium text-gray-500">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
      </footer>
    </div>
  );
};

export default Footer;
