import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import tvRoutes from "./routes/tvRoutes.js"
import searchRoutes from "./routes/searchRoutes.js"

import { protectRoutes } from "./middleware/protectMiddleware.js";

import { ENV_VAR } from "./config/envVars.js";
import { connectDB } from "./config/db.js"
import path from "path";


const app = express()


const PORT = ENV_VAR.PORT
const MONGO_URI = ENV_VAR.MONGO_URI
const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/movie", protectRoutes, movieRoutes)
app.use("/api/tv", protectRoutes, tvRoutes)
app.use("/api/search", protectRoutes, searchRoutes)

console.log(`MONGO_URI : " ${MONGO_URI}`)

if(ENV_VAR.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  connectDB();
})