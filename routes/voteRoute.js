import express from "express"
import { createPoll } from "../controllers/voteCtrl.js";

const voteRouter = express.Router()

voteRouter.post('/poll/create',createPoll)


export default voteRouter;