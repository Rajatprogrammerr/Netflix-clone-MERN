import axios from "axios"
import { useState } from "react"
import { useAuthStore } from "../store/userAuth"
import { Link } from "react-router-dom"
import { Search, LogOut, Menu } from "lucide-react"
import { useContentStore } from "../store/content"
import logo from "/netflix-logo.png"
import toast from "react-hot-toast"
import { SMALL_IMG_BASE_URL } from "../utils/constant"

const SearchPage = () => {


  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const { logout } = useAuthStore()
  const handleMenu = () => {

    setIsMobileOpen(!isMobileOpen)

  }

  const { contentType, setContentType } = useContentStore()
  // console.log("content type:", contentType)

  const [activeTab, setActiveTab] = useState("movie")
  const [results, setResults] = useState([])
  const [searchText, setSearchText] = useState("")


  const handleActive = (tab) => {
    setActiveTab(tab)
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([])
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(`/api/search/${activeTab}/${searchText}`)
      setResults(res.data.content)
      // console.log(res.data.content)
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Nothing found, make sure you are searching under the right category");
      } else {
        toast.error("An error occurred, please try again later");
      }
    }
  }



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

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 px-4">
        <button
          onClick={() => handleActive("movie")}
          className={`p-3 text-white rounded-md font-bold cursor-pointer ${activeTab === "movie" ? "bg-red-700" : "bg-gray-500"
            }`}
        >
          Movies
        </button>
        <button
          onClick={() => handleActive("tv")}
          className={`p-3 text-white rounded-md font-bold cursor-pointer ${activeTab === "tv" ? "bg-red-700" : "bg-gray-500"
            }`}
        >
          Tv Shows
        </button>
      </div>

      <form onSubmit={handleSearch} className="mt-4 px-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <input
            type="search"
            value={searchText}
            id="search"
            className="border-2 border-red-700 rounded-md text-black focus:outline-none px-4 py-3 w-full sm:w-[400px] lg:w-[500px]"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-700 rounded-lg p-2 hover:bg-red-900 w-16 sm:w-auto"
          >
            <Search className="cursor-pointer text-white size-10" />
          </button>
        </div>
      </form>

      <div className="min-h-[80vh] m-4 sm:m-8 lg:m-14 p-4 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {results.map((result) => {
            if (!result.poster_path) return null;
            return (
              <Link to={`/watch/${result.id}`} key={result.id} className="w-full sm:w-60">
                <div className="rounded-md overflow-hidden">
                  <img
                    src={SMALL_IMG_BASE_URL + result.poster_path}
                    alt="Poster"
                    className="h-auto w-full rounded-lg"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>




    </>
  )
}

export default SearchPage
