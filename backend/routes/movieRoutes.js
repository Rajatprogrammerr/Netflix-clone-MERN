import express from "express";
import { getTrendingMovie, getMovieTrailer, getMovieDetails, getMoviesByCategories, getSimilarMovies } from "../controllers/moviecontroller.js"

const Router = express.Router()


Router.get('/trending', getTrendingMovie)
Router.get('/:id/trailer', getMovieTrailer)
Router.get('/:id/details', getMovieDetails)
Router.get('/:id/similar', getSimilarMovies)
Router.get('/:category', getMoviesByCategories)



export default Router