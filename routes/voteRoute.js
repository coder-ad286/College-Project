import express from "express"
import { createPoll, fetchPoll, makeVote } from "../controllers/voteCtrl.js";
import { isAuthenticatedAdmin } from "../middlewares/authenticate.js";

const voteRouter = express.Router()

voteRouter.post('/poll/create',isAuthenticatedAdmin,createPoll)
voteRouter.post('/poll/fetch',fetchPoll)
voteRouter.post('/poll/vote/:regno',makeVote)


export default voteRouter;