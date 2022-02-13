import express from "express";
import {uploadFile} from "../middleWare";
import {deletePhoto, getEditPhoto, getUpload,postEditPhoto,postUpload,watch} from "../controller/dealsController";
const dealRouter = express.Router();


dealRouter.route("/upload").get(getUpload).post(uploadFile.single("avatar"),postUpload);
dealRouter.get("/:id([0-9a-f]{24})",watch)
dealRouter.route("/:id([0-9a-f]{24})/edit").get(getEditPhoto).post(postEditPhoto)
dealRouter.route("/:id([0-9a-f]{24})/delete").get(deletePhoto);
export default dealRouter;