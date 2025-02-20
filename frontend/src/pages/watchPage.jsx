import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useContentStore } from "../store/content";
import { useParams, Link } from "react-router-dom";
import { LogOut, Menu, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "../store/userAuth";
import ReactPlayer from "react-player";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import { SMALL_IMG_BASE_URL } from "../utils/constant";

const WatchPage = () => {
    const { id } = useParams();
    const { contentType, setContentType } = useContentStore();
    const { logout } = useAuthStore();

    const [trailer, setTrailer] = useState([]);
    const [similarContent, setSimilarContent] = useState([]);
    const [details, setDetails] = useState({});
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showArrows, setShowArrows] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);


    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trailerRes, similarRes, detailsRes] = await Promise.all([
                    axios.get(`/api/${contentType}/${id}/trailer`),
                    axios.get(`/api/${contentType}/${id}/similar`),
                    axios.get(`/api/${contentType}/${id}/details`),
                ]);

                setTrailer(trailerRes.data.content);
                setSimilarContent(similarRes.data.content);
                setDetails(detailsRes.data.content);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [contentType, id]);

    const handleMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    const handleLeft = () => {
        if (currentTrailerIndex > 0) setCurrentTrailerIndex(currentTrailerIndex - 1);
    };

    const handleRight = () => {
        if (currentTrailerIndex < trailer.length - 1) setCurrentTrailerIndex(currentTrailerIndex + 1);
    };

    const scrollLeft = () => {
        sliderRef.current?.scrollBy({ left: -sliderRef.current.offsetWidth / 1.5, behavior: "smooth" });
    };

    const scrollRight = () => {
        sliderRef.current?.scrollBy({ left: sliderRef.current.offsetWidth / 1.5, behavior: "smooth" });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black p-10">
                <WatchPageSkeleton />
            </div>
        );
    }

    return (
        <>
            {/* Navbar */}
            <nav className='text-white relative'>
                {/* <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} alt="trending" className='absolute top-0 left-0 w-full h-full object-cover -z-50' /> */}
                <div className="flex justify-between items-center px-6 py-4 md:px-12">
                    <div className='flex items-center gap-6 md:gap-12'>
                        <img src="/netflix-logo.png" alt="logo" className='w-24 md:w-36 cursor-pointer' />
                        <div className='hidden sm:flex gap-4 md:gap-6'>
                            <Link to="/" className={`cursor-pointer font-bold hover:underline ${contentType === "movie" ? "text-red-700" : "text-white"}`} onClick={() => setContentType("movie")}>Movies</Link>
                            <Link to="/" className={`cursor-pointer font-bold hover:underline ${contentType === "tv" ? "text-red-700" : "text-white"}`} onClick={() => setContentType("tv")}>TV Shows</Link>
                            <Link to="/history" className='cursor-pointer font-bold hover:underline'>Search History</Link>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Link to="/search"> <Search className='cursor-pointer' /></Link>
                        <img src="/avatar1.png" alt="profilePic" className='w-6 cursor-pointer' />
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

            {/* Trailer */}
            <div className="flex justify-center items-center text-white my-8 space-x-4">
                <ChevronLeft className="bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-600 md:size-10" onClick={handleLeft} />
                <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer[currentTrailerIndex]?.key}`} controls width="80vw" height="60vh" className="rounded-lg" />
                <ChevronRight className="bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-600 md:size-10" onClick={handleRight} />
            </div>

            {/* Movie Details */}
            <div className="flex flex-col lg:flex-row items-center text-white px-4 md:px-8 lg:px-20 my-12">
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold">{details?.title || details?.name}</h1>
                    <p className="text-gray-400 mt-2">Release Date: {details?.release_date}</p>
                    <p className="text-gray-500 text-sm md:text-md mt-4">{details?.overview}</p>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-12">
                    <img src={SMALL_IMG_BASE_URL + details?.poster_path} alt="poster" className="w-48 md:w-64 rounded-lg" />
                </div>
            </div>

            {/* Similar Content */}
            <h2 className="text-center text-white text-3xl md:text-4xl font-bold mb-6">Similar Content</h2>
            <div className="relative mb-10" onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}  >

                <div className="flex space-x-5 overflow-x-scroll  my-4 w-[75vw] p-4 mx-auto no-scrollbar" ref={sliderRef} >
                    {similarContent.map((item) => {
                        if (item.poster_path === null)
                            return null

                        return (


                            <Link to={`/watch/${item.id}`} className=' relative group' key={item.id}>
                                <div className='rounded-md overflow-hidden relative w-60'>
                                    <img src={SMALL_IMG_BASE_URL + item.poster_path} alt="" className='h-auto w-full transition-transform duration-300 ease-in-out group-hover:scale-125' />
                                </div>


                            </Link>
                        )

                    })}

                    {showArrows && (
                        <>
                            <button
                                className='absolute top-1/2 -translate-y-1/2 left-48 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                                onClick={scrollLeft}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <button
                                className='absolute top-1/2 -translate-y-1/2 right-52  flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                                onClick={scrollRight}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                </div>
            </div>
        </>
    );
};

export default WatchPage;
