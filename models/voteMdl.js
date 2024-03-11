import { Schema, model } from "mongoose";



const voteSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name Is Required...!"]
    },
    nominees: [
        {
            name: {
                type: String,
                required: [true, "Nominees Is Required...!"]
            },
            email: {
                type: String,
                required: [true, "Email Is Required...!"]
            },
            regno: {
                type: String,
                required: [true, "RegNo Is Required...!"]
            },
            votes:{
                type : Number,
                default : 0
            }
        }
    ],
    voters:[
        {
            regno : {
                type : String,
            }
        }
    ],
    result: {
        type: String,
        default: ""
    }
})


const Vote = model("vote", voteSchema)
export default Vote