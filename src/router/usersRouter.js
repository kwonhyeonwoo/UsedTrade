import express from "express";
import {protectTorMiddleWare} from "../middleWare";
import {logout, deleteUser,getEditProfile, postEditProfile, getChangePassword,myProfile, postChangePassword} from "../controller/usersController"
const usersRouter = express.Router();

usersRouter.get("/delete",deleteUser);
usersRouter.route("/edit").all(protectTorMiddleWare).get(getEditProfile).post(postEditProfile);
usersRouter.get("/logout",logout);
usersRouter.get("/:id",myProfile);
usersRouter.route("/changepassword").get(getChangePassword).post(postChangePassword);
export default usersRouter;