import { Router } from "express";
import postsRouter from "./posts";
import commentsRouter from "./comments";
import authRouter from "./auth";
import profileRouter from "./profiles";

const apiRouter = Router();

apiRouter.use("/posts", postsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/profiles", profileRouter);

export default apiRouter;