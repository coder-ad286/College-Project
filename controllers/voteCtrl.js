import asyncError from "../utils/asyncError.js";
import User from "../models/userMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Vote from "../models/voteMdl.js";
import sendResponse from "../utils/sendResponse.js";

export const createPoll = asyncError(async (req, res, next) => {
    const { name, nominees } = req.body;
    let nomineesData = []
    for await (const nominee of nominees) {
        const nomineeResult = await User.findOne({ regno: nominee })
        if (!nomineeResult) return next(new ErrorHandler("Nominee is not a student...!", 400))
        nomineesData.push({
            email: nomineeResult.email,
            name: nomineeResult.name
        })
    }

    const polls = await Vote.find({})
    if (polls.length >= 1) {
        return next(new ErrorHandler("Already Poll Exists...!", 400))
    }
    const poll = await Vote.create({
        name,
        nominees: nomineesData
    })

    sendResponse(res,201,"Poll Created Successfully...!",poll)

})