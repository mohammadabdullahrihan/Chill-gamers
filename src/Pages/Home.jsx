import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import bg from "/public/bg-banner.png";
import chat from "/public/chat.png";
import Purchase from "/public/group.png";
import early from "/public/early access.png";
import person1 from "/public/person1.png";
import person2 from "/public/person2.png";
import person3 from "/public/person3.png";
const Home = () => {
  const { user } = useContext(AuthContext);
  const [highestRatedGames, setHighestRatedGames] = useState([]);

  useEffect(() => {
    fetch("https://gamer-server.vercel.app/api/reviews?limit=6")
      .then((res) => res.json())
      .then((data) => {
        const sortedGames = data.sort((a, b) => b.rating - a.rating);
        setHighestRatedGames(sortedGames);
      });

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

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

      <div
        className="md:mx-[50px] lg:mx-[100px] max-h-[120vh]"
        data-aos="fade-up"
      >
        <Slider {...sliderSettings}>
          <div className="h-full flex flex-col items-center justify-center">
            <img
              className="w-full h-full bg-cover bg-center object-cover rounded-[100px]"
              src="https://wallpapers.com/images/high/call-of-duty-black-ops-3-ptmmgqov5w3pah30.webp"
              alt="Call of Duty Black Ops 3"
              style={{ height: "100%", width: "100%" }} // Ensures uniform dimensions for all slides
            />
            <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-center">
              <h1 className="text-3xl lg:text-5xl font-bold">
                Explore the Best Games of 2024
              </h1>
            </div>
          </div>

          <div className="h-full flex flex-col items-center justify-center">
            <img
              className="w-full h-full bg-cover bg-center object-cover rounded-[100px]"
              src="https://wallpapers.com/images/high/fortnite-pc-k4epzm05mdrfmm7u.webp"
              alt="Fortnite PC"
              style={{ height: "100%", width: "100%" }} // Uniform height and width
            />
            <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-center">
              <h1 className="text-3xl lg:text-5xl font-bold">
                Explore the Best Games of 2024
              </h1>
            </div>
          </div>

          <div className="h-full flex flex-col items-center justify-center">
            <img
              className="w-full h-full bg-cover bg-center object-cover rounded-[100px]"
              src="https://wallpapers.com/images/high/fortnite-battle-royale-4k-ltset3zyli4rziwg.webp"
              alt="Fortnite Battle Royale"
              style={{ height: "100%", width: "100%" }} // Consistent dimensions for all slides
            />
            <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-center">
              <h1 className="text-3xl lg:text-5xl font-bold">
                Explore the Best Games of 2024
              </h1>
            </div>
          </div>
        </Slider>
      </div>

      {/* Highest Rated Games Section */}

      <div className="px-4">
        <h2 className="text-3xl font-bold  text-center">Highest Rated Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highestRatedGames.map((game) => (
            <div
              key={game._id}
              className="
            bg-white
            rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative container-3"
            >
              <img
                src={game.gameCover}
                alt={game.name}
                className="w-full h-[240px] object-cover rounded-lg mb-4  "
              />
              <h3 className="text-xl font-semibold mb-2">{game.gameTitle}</h3>
              <p> Review : {game.reviewDescription}</p>
              <p className="font-medium text-gray-600">Rating: {game.rating}</p>
              <p className="font-medium text-gray-600">
                Publish Year : {game.publishYear}
              </p>
              <p className="font-medium text-gray-600">
                Category: {game.genres}
              </p>
              <Link to={`/review/${game._id}`}>
                <p className="font-medium">{game.userEmail}</p>
                <p className="font-medium">{game.userName}</p>
                <button className="mt-4 px-6 py-3 text-white bg-gradient-to-b from-pink-500 via-red-500 to-yellow-400 rounded-xl hover:bg-white">
                  Explore Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* features section */}

      <div className="pt-[50px] text-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-1">Features</h1>
          <p className="text-lg font-medium mb-4">
            Earn achievements, read reviews, explore custom recommendations, and
            more.
          </p>
        </div>

        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center">
          <div className="text-center p-2">
            <img className="w-[150px] mx-auto" src={chat} alt="" />
            <h2 className="text-lg font-semibold mt-4">Chill Chat</h2>
            <p className="mt-3 text-gray-500">
              Talk with friends or groups <br /> via text or voice without
              leaving <br /> Steam. Videos, Tweets, GIFs <br /> and more are
              supported; use wisely.
            </p>
          </div>

          <div className="text-center p-2">
            <img className="w-[150px] mx-auto" src={early} alt="" />
            <h2 className="text-lg font-semibold mt-4">
              Early Access to Games
            </h2>
            <p className="mt-3 text-gray-500 xl:w-[270px] mx-auto">
              Discover, play, and get involved <br /> with games as they evolve.{" "}
              <br /> Be the first to see what's coming and become part of the
              process.
            </p>
          </div>

          <div className="text-center p-2">
            <img className="w-[150px] mx-auto" src={Purchase} alt="" />
            <h2 className="text-lg font-semibold mt-4">Purchases</h2>
            <p className="mt-3 text-gray-500 xl:w-[270px] mx-auto">
              Our storefront supports 100+ payment methods across over 35
              currencies, giving you the flexibility to pay how you want
            </p>
          </div>
        </div>
      </div>

      {/* Join the community section */}

      <div className="m-[70px] px-[60px] pt-[50px] ">
        <div className="text-center">
          <h1 className="text-2xl font-semibold  lg:pb-[60px]">
            Join the Community
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 ">
          <div className="mt-[70px] text-left lg:text-left md:text-center sm:text-center">
            <h1 className="text-3xl pb-6 font-medium md:ml-[90px] flex justify-center lg:justify-start md:justify-center sm:justify-center">
              Meet new People
            </h1>
            <p className="text-lg pb-5 font-medium w-[260px] md:w-[600px] lg:w-[700px] -ml-[100px] lg:-ml-0 md:-ml-[30px] flex justify-center lg:justify-start md:justify-center sm:justify-center text-center">
              Connect with fellow gamers and share your thoughts, <br />
              experiences, and recommendations. Join the community <br /> and
              enjoy a fun, engaging, and inclusive environment.
            </p>
            <p className="text-[#ee4242] md:ml-[130px] flex justify-center lg:justify-start md:justify-center sm:justify-center font-medium mb-5">
              Visit the Community
            </p>
          </div>

          <div className=" w-[400px] lg:w-[600px] lg:h-[400px] space-y-5 -ml-[165px] md:ml-[20px] lg:ml-[200px] ">
            <img
              className="w-[400px] h-[100px] border border-red-200 rounded-2xl"
              src={person1}
              alt=""
            />
            <img
              className="border border-blue-200 lg:ml-[160px] rounded-2xl w-[400px]"
              src={person2}
              alt=""
            />
            <img
              className="border border-yellow-200 rounded-2xl w-[400px]"
              src={person3}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* subscription */}

      <div className="lg:flex mx-[100px]">
        <div
          className="bg-black p-10 lg
            :rounded-l-[50px] rounded-t-[50px] "
        >
          <div className="flex flex-col bg-white rounded-3xl lg:p-[10px]">

            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                <div>
                  <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                    Starter
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Suitable to grow steadily.
                  </p>
                </div>
                <div className="mt-6">
                  <p>
                    <span className="text-5xl font-light tracking-tight text-black">
                      $25
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      {" "}
                      /mo{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex px-6 pb-8 sm:px-8">
              <a
                aria-describedby="tier-company"
                className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                href="#"
              >
                Get started
              </a>
            </div>
          </div>
        </div>

        <div className="bg-black lg:px-[50px] lg:py-[30px] lg:rounded-r-[50px] rounded-b-[50px]">
          <div className="px-4 text-center bg-black">
            <h2 className="text-6xl font-bold mb-6 text-white">
              Get Premium access
            </h2>
            <p className="mb-5 text-white">
              Buy Subscription to get premium access
            </p>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default Home;
