import { Schema,model } from "mongoose";


const adminSchema = new Schema({
    name : {
        type : String,
        required : [true,"Name Is Required...!"]
    },
    email : {
        type : String,
        required : [true,"Email Is Required...!"]
    },
    class : {
        type : String,
        required : [true,"Class Is Required...!"]
    },
    admin:{
        type:Boolean,
        default : true
    }
})


const Admin = model("admin",adminSchema)
export default Admin