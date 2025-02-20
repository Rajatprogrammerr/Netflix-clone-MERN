import express from "express";
import { getTrendingTv, getSimilarTv, getTvByCategories, getTvDetails, getTvTrailer } from "../controllers/tvController.js";


const Router = express.Router()

Router.get("/trending", getTrendingTv)
Router.get('/:id/trailer', getTvTrailer)
Router.get('/:id/details', getTvDetails)
Router.get('/:id/similar', getSimilarTv)
Router.get('/:category', getTvByCategories)

export default Router
