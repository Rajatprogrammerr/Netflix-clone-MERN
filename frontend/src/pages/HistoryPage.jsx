import { Link } from "react-router-dom";
import { Search, LogOut, Menu, Trash2 } from "lucide-react";
import { useContentStore } from "../store/content";
import { useAuthStore } from "../store/userAuth";
import { useState, useEffect } from "react";
import logo from "/netflix-logo.png";
import toast from "react-hot-toast";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constant";

const HistoryPage = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const { contentType, setContentType } = useContentStore();

    const { logout } = useAuthStore();
    const handleMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };



    useEffect(() => {
        const getHistory = async () => {
            const res = await axios.get(`/api/search/history`);
            setHistory(res.data.content);
        };
        getHistory();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
    }

    const handleDeleteHistory = async (entry) => {
        await axios.delete(`/api/search/history/${entry.id}`);
        setHistory(history.filter((item) => item.id !== entry.id));
        toast.success("Item Deleted");
    };

    return (
        <>
            <nav className='text-white relative'>
                {/* <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} alt="trending" className='absolute top-0 left-0 w-full h-full object-cover -z-50' /> */}
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

            {history.length > 0 ? (
                <div className="grid gap-6 max-w-7xl mx-auto px-4 my-10 text-white grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {history.map((item) => (
                        <div key={item.id} className="border border-red-800 p-3 flex flex-col sm:flex-row items-center gap-4 relative rounded-lg">
                            <img src={SMALL_IMG_BASE_URL + item.image} alt="" className="object-contain w-full sm:w-40 lg:w-48" />
                            <div className="flex flex-col gap-2 text-center sm:text-left">
                                <div>
                                    <span className="text-gray-500 text-sm">Title: </span>
                                    <span className="tracking-wide text-lg font-semibold">{item.title}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm">Content Type: </span>
                                    <span className="tracking-wide text-lg">{item.searchType}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm">Searched on: </span>
                                    <span className="tracking-wide text-lg">{formatDate(item.createdAt)}</span>
                                </div>
                            </div>
                            <Trash2 className="absolute top-2 right-2 cursor-pointer text-red-700 size-6" onClick={() => handleDeleteHistory(item)} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center text-white h-[85vh] px-4">
                    <h1 className="text-2xl sm:text-4xl font-bold text-center">No Search History</h1>
                </div>
            )}
        </>
    );
};

export default HistoryPage;
