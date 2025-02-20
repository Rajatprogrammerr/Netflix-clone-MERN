import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import DropdownList from "../components/dropDown";
import DropdownListShow from "../components/dropDown2";
import Trending from "../components/trending";
import { Tv, Download, SmilePlus, Glasses } from "lucide-react";
import { useState } from "react";

function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    navigate("/signup?email=" + email);
  }

  return (
    <>
      <div className="hero-bg min-h-screen flex flex-col">
        <header className="py-4 px-6 md:px-12 flex justify-between items-center w-full">
          <Link to={"/"}>
            <img src="netflix-logo.png" alt="logo" className="w-28 md:w-44" />
          </Link>
          <Link to={'/signup'}>
            <button className="text-white bg-red-600 py-2 md:py-3 px-4 md:px-6 hover:bg-red-800 rounded-xl font-bold w-24 md:w-32">SignUp</button>
          </Link>
        </header>

        <div className="flex flex-col justify-center items-center text-white flex-grow px-4 md:px-0 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">Unlimited movies,</h1>
          <h1 className="text-4xl md:text-6xl font-extrabold"> TV shows and more</h1>
          <span className="text-lg md:text-2xl font-semibold mt-2">Starts at ₹149. Cancel anytime.</span>
          <span className="text-base md:text-lg mt-6">Ready to watch? Enter your email to create or restart your membership.</span>
          <form onSubmit={handleFormSubmit} className="w-full max-w-lg flex flex-col md:flex-row justify-center items-center gap-3 mt-4">
            <input className="w-full p-3 md:p-4 text-white border border-slate-500 rounded-md focus:border-red-700 bg-transparent" type="email" placeholder="abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <button className="text-white bg-red-600 py-3 md:py-4 text-lg md:text-2xl px-4 md:px-6 flex gap-2 justify-center items-center hover:bg-red-800 rounded-md font-semibold w-full md:w-96">Get Started <ChevronRight /></button>
          </form>
        </div>
      </div>

      <div className="px-6 md:px-16 mt-12">
        <h2 className="text-white font-bold text-2xl md:text-3xl md:mb-6 mb-4 text-center ">Trending Now</h2>
        {/* <div className="flex flex-wrap gap-4 mt-4">
          <DropdownList />
          <DropdownListShow />
        </div> */}
        <Trending />
      </div>

      <div className="px-6 md:px-16 mt-12">
        <h2 className="text-white font-semibold text-2xl md:text-3xl mb-4">More Reasons to Watch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[{ title: "Enjoy on your TV", desc: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.", icon: <Tv size={50}/> },
            { title: "Download your shows to watch offline", desc: "Save your favourites easily and always have something to watch.", icon: <Download size={50}/> },
            { title: "Watch everywhere", desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.", icon: <Glasses size={50}/> },
            { title: "Create profiles for kids", desc: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.", icon: <SmilePlus size={50}/> }]
            .map((item, index) => (
              <div key={index} className="h-60 w-full border border-slate-300 relative rounded-xl text-white p-6 bg-gradient-to-b from-blue-950 to-slate-950">
                <p className="text-xl font-semibold mb-2">{item.title}</p>
                <p className="text-slate-400">{item.desc}</p>
                <div className="absolute bottom-5 right-5">{item.icon}</div>
              </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 justify-center items-center text-center mt-28 px-6">
        <p className="text-lg text-white">Ready to watch? Enter your email to create or restart your membership.</p>
        <form onSubmit={handleFormSubmit} className="w-full max-w-lg flex flex-col md:flex-row justify-center items-center gap-3">
          <input className="w-full p-3 md:p-4 text-white border border-slate-500 rounded-md focus:border-red-700 bg-transparent" type="email" placeholder="abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <button className="text-white bg-red-600 py-3 md:py-4 text-lg md:text-2xl px-4 md:px-6 flex gap-2 justify-center items-center hover:bg-red-800 rounded-md font-semibold w-full md:w-96">Get Started <ChevronRight /></button>
        </form>
      </div>

      <div className="w-full h-1 bg-slate-800 mt-8"></div>
    </>
  );
}

export default Home;
