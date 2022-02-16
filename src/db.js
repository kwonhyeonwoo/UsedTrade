import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOn =(error) =>{
    console.log("❌ Not Connetcion DB");
};
const handleOpen=()=>{
    console.log("🆅 Connetion DB!!!!!");
};

db.on("error",handleOn);
db.once("open",handleOpen);
