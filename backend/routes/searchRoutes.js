import express from "express";
import { getPersonDetails,getMovieDetails,getTvDetails,getHistory,deleteHistory } from "../controllers/searchController.js";

const Router = express.Router()

Router.get("/person/:query",getPersonDetails)
Router.get("/movie/:query",getMovieDetails)
Router.get("/tv/:query",getTvDetails)
Router.get("/history",getHistory)
Router.delete("/history/:id",deleteHistory)

export default Router