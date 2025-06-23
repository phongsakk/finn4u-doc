import { Router } from "express";
import { authUser } from "../app/http/middleware/auth";
import { Profile } from "../app/http/controllers/auth";

const authRouter = Router();

authRouter.get("/my", authUser, Profile);

export default authRouter;
