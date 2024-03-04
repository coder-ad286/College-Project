import express from "express"
import { createAdmin, loginAdmin, logoutAdmin } from "../controllers/adminCrtl.js";

const adminRouter = express.Router()


adminRouter.post("/create",createAdmin)
adminRouter.post("/login",loginAdmin)
adminRouter.post("/logout",logoutAdmin)



export default adminRouter;