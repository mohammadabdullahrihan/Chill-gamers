import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import bg from "/public/bg-banner.png"
import chat from "/public/chat.png"
import Purchase from "/public/group.png"
import early from "/public/early access.png"
import person1 from "/public/person1.png"
import person2 from "/public/person2.png"
import person3 from "/public/person3.png"
const Home = () => {
  const { user } = useContext(AuthContext);
  const [highestRatedGames, setHighestRatedGames] = useState([])

  useEffect(() => {
    // Fetch highest-rated games
    fetch("https://gamer-server.vercel.app/api/reviews?limit=6")
      .then((res) => res.json())
      .then((data) => {
        const sortedGames = data.sort((a, b) => b.rating - a.rating); // Sort by rating (high to low)
        setHighestRatedGames(sortedGames);
      });


    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="space-y-8">
      {/* Banner/Slider */}
      <div className="mt-10" data-aos="fade-up">
        <Slider {...sliderSettings}>
          <div>
          <img className="w-full h-full bg-cover bg-center object-cover rounded-[100px]" src={'https://wallpapers.com/images/high/call-of-duty-black-ops-3-ptmmgqov5w3pah30.webp'} alt="" />
            <div className="h-full flex items-center justify-center text-white text-center">
              <h1 className="text-3xl lg:text-5xl font-bold">Explore the Best Games of 2024</h1>
            </div>
          </div>


          <div>
          <img className="w-full h-full bg-cover bg-center object-cover rounded-[100px]" src={'https://wallpapers.com/images/high/fortnite-pc-k4epzm05mdrfmm7u.webp'} alt="" />
            <div className="h-full flex items-center justify-center text-white text-center">
              <h1 className="text-3xl lg:text-5xl font-bold">Explore the Best Games of 2024</h1>
            </div>
          </div>

          <div>
          <img className="w-full h-full bg-cover bg-center object-cover rounded-[100px]" src={'https://wallpapers.com/images/high/fortnite-battle-royale-4k-ltset3zyli4rziwg.webp'} alt="" />
            <div className="h-full flex items-center justify-center text-white text-center">
              <h1 className="text-3xl lg:text-5xl font-bold
              ">Explore the Best Games of 2024</h1>
            </div>
          </div>

        </Slider>
      </div>

      {/* Highest Rated Games Section */}

      <div className="px-4">
    
        <h2 className="text-3xl font-bold  text-center">Highest Rated Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {highestRatedGames.map((game) => (
            <div key={game._id} className="
            bg-white
            rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative container-3">
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
          ))}

        </div>

      </div>

      <div className="pt-[50px] ">
        <div className="text-center">

        <h1 className="text-2xl font-medium mb-1">Features</h1>
        <p className="text-lg font-medium mb-4">Earn achievements, read reviews, explore custom recommendations, and more.</p>
        </div>

        <div className="mt-10 gap-10 space-x-[90px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">

  
          <div className="text-center p-2">
            <img className="w-[150px] ml-[80px]  lg:ml-[130px]" src={chat} alt="" />
            <h2 className="text-lg font-semibold mt-4">Chill Chat</h2>
            <p className="mt-3 text-gray-500 ">Talk with friends or groups <br /> via text or voice without leaving <br /> Steam. Videos, Tweets, GIFs <br /> and more are supported; use wisely.</p>
          </div>

          <div className="text-center p-2">
            <img className="w-[150px] -ml-[0px] lg:ml-[60px]" src={early} alt="" />
            <h2 className="text-lg -ml-[80px] lg:-ml-0 font-semibold mt-4">Early Access to Games</h2>
            <p className="mt-3 text-gray-500 xl:w-[270px] -ml-[80px] lg:-ml-0">Discover, play, and get involved <br /> with games as they evolve. <br /> Be the first to see what's coming and become part of the process.</p>
          </div>

          <div className="text-center p-2">
            <img className="w-[150px] lg:ml-[60px]" src={Purchase} alt="" />
            <h2 className="text-lg font-semibold mt-4 -ml-[70px] lg:-ml-0">Purchases</h2>
            <p className="mt-3 text-gray-500 xl:w-[270px] -ml-[70px] lg:-ml-0">Our storefront supports 100+ payment methods across over 35 currencies, giving you the flexibility to pay how you want</p>
          </div>


        </div>
      </div>

      <div className="m-[70px] px-[60px] pt-[50px] pb-[100px] ">

        <div className="text-center">
        <h1 className="text-2xl font-semibold  lg:pb-[60px]">Join the Community</h1>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 ">
          <div className="mt-[70px]">
            <h1 className="text-3xl pb-6 font-medium md:ml-[90px]">Meet new People</h1>
            <p className="text-lg pb-5 font-medium w-[350px] md:w-[600px] -ml-[100px] lg:-ml-0 md:-ml-[30px]  ">Connect with fellow gamers and share your thoughts, <br /> experiences, and recommendations. Join the community <br /> and enjoy a fun, engaging, and inclusive environment.</p>
            <p className="text-[#ee4242] md:ml-[130px] font-medium mb-5">Visit the Community</p>

          </div>

          <div className=" w-[400px] lg:w-[600px] lg:h-[400px] space-y-5 -ml-[165px] md:ml-[20px] lg:ml-[200px] ">
            <img className="w-[400px] h-[100px] border border-red-200 rounded-2xl" src={person1} alt="" />
            <img className="border border-blue-200 lg:ml-[160px] rounded-2xl w-[400px]" src={person2} alt="" />
            <img className="border border-yellow-200 rounded-2xl w-[400px]" src={person3} alt="" />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;
