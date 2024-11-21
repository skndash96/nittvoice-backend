import { RequestHandler } from "express";
import prisma from "../../prisma/client";

// GET /api/profiles/:userId/
export const getSingleProfile : RequestHandler = async (req, res) => {
    const { userId } = req.params;

    try {
        const prof = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        res.json(prof).end();
    } catch (e) {
        console.log(e);

        res.status(500).end("Internal Server Error");
    }
};