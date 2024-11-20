import { Router } from "express";
import { getSingleProfile } from "./getSingleProfile";
import { getProfileComments } from "./getProfileComments";
import { getProfilePosts } from "./getProfilePosts";

const profileRouter = Router();

profileRouter.get("/:userId", getSingleProfile);
profileRouter.get("/:userId/comments", getProfileComments);
profileRouter.get("/:userId/posts", getProfilePosts);
export default profileRouter;