import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    username:{type:String, required:true},
    id:{type:String, required:true , unique:true},
    password:{type:String},
    location:{type:String, required:true}
});

UserSchema.pre("save",async function(){
    console.log("User Password",this.password);
    this.password = await bcrypt.hash(this.password,5)
    console.log("Hash Password: ",this.password); 
    // this 는 create 하는 부분에 있는 것을 말한다. create에 있는
    // password를 가르키고 있고, this.password,5  뒤에 오는 숫자는
    // 해쉬해주는 횟수.
})

const User = mongoose.model("User",UserSchema);



export default User;