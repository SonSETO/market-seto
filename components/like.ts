"use server";
import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, productId } = req.body;

    try {
      const existingLike = await db.like.findFirst({
        where: {
          userId,
          productId,
        },
      });

      if (existingLike) {
        await db.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        res.status(200).json({ message: "좋아요 취소됨", likeChanged: false });
      } else {
        await db.like.create({
          data: {
            userId,
            productId,
          },
        });
        res.status(200).json({ message: "좋아요 추가됨", likeChanged: true });
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
      res.status(500).json({ error: "서버 오류 발생" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// 좋아요가 제대로 구동이 되질 않음 db에 안박히는 중 이유는 모르겠으니 천천히 체크
