import asyncError from "../utils/asyncError.js";
import User from "../models/userMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Vote from "../models/voteMdl.js";
import sendResponse from "../utils/sendResponse.js";
import { checkEmpty } from "../utils/validate.js";
import { generateOTP, sendOTP } from "../utils/otp.js";
import { getExpiryTime } from "../utils/time.js";

export const createPoll = asyncError(async (req, res, next) => {
    const { name, nominees } = req.body;
    let nomineesData = []
    for await (const nominee of nominees) {
        const nomineeResult = await User.findOne({ regno: nominee })
        if (!nomineeResult) return next(new ErrorHandler("Nominee is not a student...!", 400))
        nomineesData.push({
            email: nomineeResult.email,
            name: nomineeResult.name,
            regno: nomineeResult.regno
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

    sendResponse(res, 201, "Poll Created Successfully...!", poll)

})

export const fetchPoll = asyncError(async (req, res, next) => {
    let poll = await Vote.find({})
    if (poll.length === 0) {
        return next(new ErrorHandler("No Poll Exits...!", 400))
    }
    poll = poll[0]
    return sendResponse(res, 200, "Poll Fetched Successfully...!", poll);
})

export const makeVote = asyncError(async (req, res, next) => {
    const { regno } = req.params;
    if (checkEmpty([regno])) {
        return next(new ErrorHandler("RegNo is Required....!", 400))
    }
    const user = await User.findOne({ regno })
    if (!user) {
        return next(new ErrorHandler("User Doesn't Exists....!", 400))
    }
    let poll = await Vote.find({})
    if (poll.length === 0) {
        return next(new ErrorHandler("No Poll Exits...!", 400))
    }
    poll = poll[0]
    const voter = poll.voters.find((voter) => voter.regno === user.regno)
    if (voter) {
        return next(new ErrorHandler("You're Already Voted ...!", 400))
    }
    const otpNum = generateOTP();
    const expiryTime = getExpiryTime()
    try {
        await sendOTP(user.email,otpNum)
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
    const otpGeneratedUser = await User.findByIdAndUpdate(user._id, {
        otp: {
            num: otpNum,
            expiresTime: expiryTime
        }
    })
    return sendResponse(res, 201, "Otp Generated Successfully...!", otpGeneratedUser)
})