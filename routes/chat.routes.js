import { Router } from "express";
let chatRouter = Router()

chatRouter.get("/chat", (req, res)=>{
    res.render("index")
})
export default chatRouter;