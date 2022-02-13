import mongoose from "mongoose";

export const formatHashTags = (hashTags) =>{
    hashTags.split(",").map((word)=>(word.startsWith("#") ? word : `#${word}`))
}

const DealSchema = new mongoose.Schema({
    title:{type:String, required:true, maxlength:20},
    avatarUrl:String,
    description:{type:String, required:true},
    address:{type:String, required:true},
    createAt:{type:String, required:true, default:Date.now},
    price:{type:String,required:true},
    meta:{
        views:Number,
        rating:Number,
    },
    owner:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
});

const Deal = mongoose.model("Deal", DealSchema);

export default Deal;