import express from "express";
import {signup} from "../controller/signup.js";
import {signin} from "../controller/signin.js";
import {addToDo} from "../controller/addToDo.js";
import {loadToDo} from "../controller/loadToDo.js";
import {verifyAuth} from "../controller/verifyAuth.js";


const router=express.Router();
// All routes
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/addtodo",addToDo);
router.get("/loadtodo",verifyAuth,loadToDo);

export default router;