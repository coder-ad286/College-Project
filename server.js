import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js"
import voteRouter from "./routes/voteRoute.js"
import { connectDatabase } from "./config/db.js";
import adminRouter from "./routes/adminRoute.js";
import error from "./middlewares/error.js";
// import seedData from "./utils/seeder.js";


dotenv.config()
const app = express()

//CONFIG
const PORT = process.env.PORT
connectDatabase()
app.use(express.json())

//ROUTES
app.use("/api/v1/user/",userRouter)
app.use("/api/v1/vote/",voteRouter)
app.use("/api/v1/admin/",adminRouter)


app.use(error)


app.listen(PORT,()=>{
    console.log(`App Is Listening ${PORT} Port...!`);
})


