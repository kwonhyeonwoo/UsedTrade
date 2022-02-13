
import Deal from "../models/Deal";
//home
export const home = async(req,res)=>{
    const deals = await Deal.find({}).sort({title:"desc"});
    return res.render("home",{pagetitle:"HOME",deals});
}

//search
export const search = async(req,res)=>{
    const {keyword} = req.query;
    let deals = [];
    console.log("deals: ",req.query);
    if(keyword){
        deals = await Deal.find({
            title:{
                $regex: new RegExp(`${keyword}$`,"i"),
            }
        })
    }
        return res.render("search",{pagetitle:"searchPhoto",deals});
};
/* Upload */ 
export const getUpload = (req,res)=>{
    return res.render("upload",{pagetitle:"Upload"})
};

export const postUpload = async(req,res) =>{ 
    const {title,description,price,address} = req.body;
    const{user:{_id}} = req.session;
    const{path} = req.file;
    try{
        await Deal.create({
            title,
            description,
            address,
            avatarUrl:path,
            price,
            owner:_id,
        })
        return res.redirect("/");
    }catch(error){
        return res.render("upload",{pagetitle:"nofount",errorMessage:error.message})
    }
}

//watch
export const watch = async(req,res) =>{
    const {id} = req.params;
    console.log(deal);
    const deal=await Deal.findById(id).populate("owner");
    console.log("Deal",deal);
    if(!deal){
        return res.render("404",{
            pagetitle:"Watch",
            errorMessage:"Error"
        })
    }
    return res.render("watch",{pagetitle:"Watch",deal});
}

//getEditPhoto
export const getEditPhoto = async(req,res) =>{
    const{id}=req.params;
    const deal = await Deal.findById(id)
    return res.render("editVideo",{pagetitle:"Edit Deal",deal});
}

export const postEditPhoto = async(req,res)=>{
    const {id} = req.params;
    const {title,description,price,address} = req.body;
    const deal = await Deal.findById(id);
    if(!deal){
        return res.render("404",{pagetitle:"Error",deal})
    }
    await Deal.findByIdAndUpdate(id,{
        title,description,address,
        price,
    })
    return res.redirect(`/deal/${id}`);
}

export const deletePhoto = async(req,res) =>{
    const {id} = req.params;
    await Deal.findByIdAndDelete(id);
    return res.redirect("/");
}

