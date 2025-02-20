import { fetchFromTmdb } from "../services/tmdbService.js";

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTmdb('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No trending movies found" });
        }

        const randomTv = data.results[Math.floor(Math.random() * (data.results?.length))]

        res.json({ success: true, content: randomTv})
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Internal server error" })
    }
}

export async function getTvTrailer(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        res.json({ success: true, content: data.results })
    }
    catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(400).json({ success: false, message: "Internal server Error" })
    }
}


export async function getTvDetails(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        res.json({ success: true, content: data })
    }
    catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(400).json({ success: false, message: "Internal server Error" })
    }
}


export async function getSimilarTv(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.json({ success: true, content: data.results })
    }
    catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(400).json({ success: false, message: "Internal server Error" })
    }
}


export async function getTvByCategories(req, res) {
    const { category } = req.params
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.json({ success: true, content: data.results })
    }
    catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(400).json({ success: false, message: "Internal server Error" })
    }
}