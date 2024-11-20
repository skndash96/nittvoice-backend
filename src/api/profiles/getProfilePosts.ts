import { RequestHandler } from "express";
import getUser from "../actions/getUser";
import prisma from "../../prisma/client";

// GET /api/profiles/:userId/posts
export const getProfilePosts : RequestHandler = async (req, res) => {
    const { userId } = req.params;

    const user = getUser(req);

    const { page: _page } = req.query;
    const page = parseInt(_page as string) || 1;
    const step = 20;
    
    if (page < 1) {
        res.status(400).end("Invalid page number");
        return;
    }

    try {
        const comments = await prisma.post.findMany({
            take: step,
            skip: (page - 1) * step,
            where: {
                authorId: userId
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                media: {
                    select: {
                        id: true,
                        type: true,
                        url: true
                    }
                },
                votes: {
                    take: user ? 1 : 0,
                    where: {
                        postId: null,
                        voterId: user?.id
                    }
                }
            }
        });

        res.json(comments).end();
    } catch (e) {
        console.log(e);

        res.status(500).end("Internal Server Error");
    }
};
