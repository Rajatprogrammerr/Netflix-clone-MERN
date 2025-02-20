import { User } from "../models/user.js"
import { fetchFromTmdb } from "../services/tmdbService.js"

export const getPersonDetails = async (req, res) => {
    const { query } = req.params
    try {

        const response = await fetchFromTmdb(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        if (response.results.length === 0) {
            return res.status(404).send(null)
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }

        })
        res.status(200).json({ success: true, content: response.results })
    }
    catch (error) {
        console.log("Error in searchMovie controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const getMovieDetails = async (req, res) => {
    const { query } = req.params
    try {

        const response = await fetchFromTmdb(`https://api.themoviedb.org/3/search/movie?query=${query}%20jon&include_adult=false&language=en-US&page=1`)

        if (response.results.length === 0) {
            return res.status(404).send(null)
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date()
                }
            }

        })
        res.status(200).json({ success: true, content: response.results })
    }
    catch (error) {
        console.log("Error in searchMovie controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const getTvDetails = async (req, res) => {
    const { query } = req.params
    try {

        const response = await fetchFromTmdb(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

        if (response.results.length === 0) {
            return res.status(404).send(null)
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }

        })
        res.status(200).json({ success: true, content: response.results })
    }
    catch (error) {
        console.log("Error in searchMovie controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const getHistory = async (req, res) => {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory })
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server error" })
    }
}

export const deleteHistory = async (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                searchHistory: { id: id }
            }
        })
        res.status(200).json({ success: true, message: "History Deleted" })
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}