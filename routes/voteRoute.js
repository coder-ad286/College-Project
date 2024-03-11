import express from "express"
import { createPoll, enterOTP, fetchPoll, makeVote } from "../controllers/voteCtrl.js";
import { isAuthenticatedAdmin } from "../middlewares/authenticate.js";

const voteRouter = express.Router()

voteRouter.post('/poll/create',isAuthenticatedAdmin,createPoll)
voteRouter.post('/poll/fetch',fetchPoll)
voteRouter.post('/poll/vote/:regno',makeVote)
voteRouter.post('/poll/enter-otp',enterOTP)


export default voteRouter;