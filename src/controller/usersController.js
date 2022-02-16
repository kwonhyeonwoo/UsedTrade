import User from "../models/User";
import bcrypt from "bcrypt";
import Deal from "../models/Deal";


export const getJoin = (req,res)=>{
    return res.render("join",{pagetitle:"Join"});
}
export const postJoin = async(req,res) =>{
    const{email,username,nickname,id,password,location,password2} = req.body;
    if(password !== password2){
        return res.render("join",{pagetitle:"Join",errorMessage:"비밀번호가 동일하지 않습니다."})
    }
    const exist = await User.exists({$or:[{email},{id}]});
    if(exist){
        return res.status(400).render("join",{pagetitle:"Join",errorMessage:"email/id 동일한 유저가 있습니다."});
    } //status는 상태코드를 말하는것이고 400이라는 에러코드를 잡아주는것이다.
    await User.create({
        email,
        username,
        nickname,
        id,
        password,
        location
    })
    return res.redirect("/login");
};

export const getLogin = (req,res) =>{
    return res.render("login",{pagetitle:"Login"});
}
export const postLogin = async(req,res) =>{
    const {id, password} = req.body;
    const user = await User.findOne({id});
    if(!user){
        return res.render("login", {pagetitle:"Login", errorMessage:"존재하지 않은 정보입니다."});
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.render("login",{
            pagetitle:"Login",
            errorMessage:"비밀번호가 올치 않습니다."
        })
    }
    req.session.loggedIn = "true";
    req.session.user = user;
    console.log("Perfect Login!!!!!");
    return res.redirect("/");
}

export const logout = (req,res)=>{
    req.session.destroy();
    return res.redirect("/");
}
export const deleteUser = (req,res)=>{
    return res.send("Delete");
};


export const getEditProfile= (req,res)=>{
    return res.render("editprofile");
}

export const postEditProfile =async(req,res) =>{
    const{
        session:{
            user:{_id}
        },
        body:{
            email,username,id,location
        },
    }=req;
   
    if(req.session.user.email=== req.session.user._id && req.session.user.id !== req.session.user._id){
        return res.render("editprofile",{
            pagetitle:"Error",
            errorMessage:"Error"
        })
    }
    const updateUser = await User.findByIdAndUpdate(
        _id,{
            email,
            username,
            id,
            location,
    },
    {new:true},
    
    );
    
    req.session.user=updateUser;
    
    return res.redirect("/users/edit");
    
};

export const getChangePassword = (req,res)=>{
    return res.render("change-password",{
        pagetitle:"Change-PassWord",
        errorMessage:"Error"
    })
};

export const postChangePassword = async(req,res) =>{
    const {
        session:{
            user:{_id}
        },
        body:{oldpassword,newpassword,newpasswordcheck}
    }=req;
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldpassword, user.password);
    if(!ok){
        return res.render("change-password",{
            pagetitle:"Change-PassWord",
            errorMessage:"Error"
        })
    };
    if(newpassword!==newpasswordcheck){
        return res.render("change-password",{
            pagetitle:"Change-PassWord",
            errorMessage:"Error"
        })
    };
    user.password=newpassword;
    await user.save();
    return res.redirect("/users/logout");
};

export const myProfile = async(req,res) =>{
    const{id} = req.params;
    const user = await User.findById(id);
    if(!user){
        return res.render("404",{
            pagetitle:"Not found user",
        })
    }
    const deals = await Deal.find({owner:user._id});
    return res.render("users/profile",{pagetitle: user.name,deals})
}