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
      // 사용자가 해당 제품에 좋아요를 눌렀는지 확인
      const existingLike = await db.like.findFirst({
        where: {
          userId,
          productId,
        },
      });

      if (existingLike) {
        // 이미 좋아요를 눌렀으면 좋아요 취소
        await db.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        res.status(200).json({ message: "좋아요 취소됨", likeChanged: false });
      } else {
        // 좋아요 추가
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
