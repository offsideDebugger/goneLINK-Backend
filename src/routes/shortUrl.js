import express, { Router } from "express";

import { createUrl } from "../controller/ControllerUrl.js";
const router=express.Router();


router.post("/",createUrl)


export default router;  