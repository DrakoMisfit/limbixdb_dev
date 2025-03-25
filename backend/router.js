import Express from "express";
let router=Express.Router();

// controllers.
import {LoginUser} from "./controllers/Auth-Users.js";

// routing:
router.post("/auth/login",LoginUser);

export default router;