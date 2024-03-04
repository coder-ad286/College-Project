import { Schema,model } from "mongoose";



const voteSchema = new Schema({
    name : {
        type : String,
        required : [true,"Name Is Required...!"]
    },
    noinees:[
        {
            name : {
                type : String,
                required : [true,"Nominees Is Required...!"]
            },
            email : {
                type : String,
                required : [true,"Email Is Required...!"]
            },
            votes:{
                type:Number,
                default : 0
            }
        }
    ],
    result:{
        type : String,
        default : null
    }
})


const Vote = model("vote",voteSchema)