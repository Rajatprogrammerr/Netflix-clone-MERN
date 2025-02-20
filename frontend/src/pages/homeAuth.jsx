import { Link } from "react-router-dom";
import { Info, LogOut, Menu, Search } from 'lucide-react';
import useGetTrendingContent from '../hooks/useGetTrendingContent';
import { MOVIE_CATEGORIES, TV_CATEGORIES, ORIGINAL_IMG_BASE_URL } from '../utils/constant';
import MovieSlider from '../components/movieSlider';
import { useContentStore } from "../store/content";
import { useState } from "react";
import { useAuthStore } from '../store/userAuth';
import logo from "/netflix-logo.png";

const HomeAuth = () => {
  const { trendingContent } = useGetTrendingContent();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuthStore();
  const { contentType, setContentType } = useContentStore();

  const handleMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <nav className='text-white relative h-screen bg-gradient-to-b from-gray-950 via-transparent to-gray-900'>
        <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} alt="trending" className='absolute top-0 left-0 w-full h-full object-cover -z-50 ' />
        <div className="flex justify-between items-center px-6 py-4 md:px-12">
          <div className='flex items-center gap-6 md:gap-12'>
            <img src={logo} alt="logo" className='w-24 md:w-36 cursor-pointer' />
            <div className='hidden sm:flex gap-4 md:gap-6'>
              <Link to="/" className={`cursor-pointer font-bold hover:underline ${contentType === "movie" ? "text-red-700" : "text-white"}`} onClick={() => setContentType("movie")}>Movies</Link>
              <Link to="/" className={`cursor-pointer font-bold hover:underline ${contentType === "tv" ? "text-red-700" : "text-white"}`} onClick={() => setContentType("tv")}>TV Shows</Link>
              <Link to="/history" className='cursor-pointer font-bold hover:underline'>Search History</Link>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Link to="/search"> <Search className='cursor-pointer' /></Link>
            <img src="avatar1.png" alt="profilePic" className='w-6 cursor-pointer' />
            <LogOut className='cursor-pointer' onClick={logout} />
            <Menu className='lg:hidden cursor-pointer' onClick={handleMenu} />
          </div>
        </div>

        {isMobileOpen && (
          <div className='absolute z-10 right-6 top-16 w-44 text-center p-4 space-y-4 bg-gray-900 text-white border border-red-700 rounded-lg sm:hidden'>
            <Link to="/" className={`block cursor-pointer hover:underline ${contentType === "movie" ? "text-red-700" : "text-white"} `} onClick={() => setContentType("movie")}>Movies</Link>
            <Link to="/" className={`block cursor-pointer hover:underline ${contentType === "tv" ? "text-red-700" : "text-white"} `} onClick={() => setContentType("tv")}>TV Shows</Link>
            <Link to="/history" className='block cursor-pointer hover:underline'>History</Link>
          </div>
        )}
      </nav>

      <div className="absolute top-40 left-6 md:left-20 w-5/6 md:w-1/2 text-white flex flex-col gap-4">
        <p className='text-3xl md:text-7xl font-extrabold'>{trendingContent?.title || trendingContent?.name}</p>
        <p className='text-sm md:text-md'>{trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date?.split("-")[0]} | {trendingContent?.adult ? "18+" : "PG-13"}</p>
        <p className='text-sm md:text-md'>{trendingContent?.overview.length > 200 ? trendingContent?.overview.slice(0, 200) + "..." : trendingContent?.overview}</p>
        <div className='flex gap-4'>
          <Link to={`/watch/${trendingContent?.id}`}>
            <button className='bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-lg'>Play</button>
          </Link>
          <Link to={`/watch/${trendingContent?.id}`}>
            <button className='bg-gray-700 text-white font-bold px-4 py-2 rounded-lg text-lg flex items-center gap-2'><Info /> Info</button>
          </Link>
        </div>
      </div>

      <div className="text-white flex flex-col font-bold px-2 md:px-4">
        {contentType === "movie" ?
          MOVIE_CATEGORIES.map((category) => (
            <MovieSlider key={category} category={category} />)) : TV_CATEGORIES.map((category) => (<MovieSlider key={category} category={category} />))}
      </div>
    </>
  );
};

export default HomeAuth;
