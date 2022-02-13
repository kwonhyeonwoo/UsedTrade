import multer from "multer";

export const localMiddleWare = (req,res,next)=>{
    console.log(req.session.user);
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const uploadFile = multer({dest:"uploads/"});

export const protectTorMiddleWare =(req,res,next)=>{
    if(req.session.loggedIn){
        return next()
    }
    else{
        return res.redirect("/login");
    }
}
export const publicOnliyMiddleWare = (req,res,next) =>{
    if(req.session.loggedIn){
        return next();
    }
    else{
        return res.redirect("/");
    }
}

