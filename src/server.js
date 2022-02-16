import express from "express";
import morgan from "morgan";
import session from "express-session"
import MongoStore from "connect-mongo";
import rootRouter from "./router/rootRouter";
import usersRouter from "./router/usersRouter";
import dealsRouter from "./router/dealsRouter";
import {localMiddleWare} from "./middleWare";
import apiRouter from "./router/apiRouter";

const app = express();

const logger = morgan("dev");
app.set("views",process.cwd() + "/src/views");
app.set("view engine","pug");
app.use(logger); 


app.use(
    session({
        secret:process.env.COOKIE_SECRET,
        resave:false,
        saveUninitialized:false, //움직임이 있을경우에만 true가 된다고함..
        store: MongoStore.create({mongoUrl:process.env.DB_URL}),
    })
);


// Router 
app.use(express.urlencoded({ extended: true }))
app.use(localMiddleWare);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/",rootRouter);
app.use("/users",usersRouter);
app.use("/deal",dealsRouter);
app.use("/api",apiRouter);
export default app;