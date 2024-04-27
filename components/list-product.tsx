// ListProduct.tsx

import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  title: string;
  created_at: Date;
  photo: string;
  id: number;
  user?: {
    username: string;
    id: number;
  };
  isLikedByUser: boolean; // 좋아요 상태 추가
}

export default function ListProduct({
  title,
  created_at,
  photo,
  id,
  user,
  isLikedByUser, // 좋아요 상태 추가
}: ListProductProps) {
  const [isLiked, setIsLiked] = useState(isLikedByUser);

  const toggleLike = async () => {
    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          productId: id,
        }),
      });

      if (response.ok) {
        setIsLiked((prev) => !prev);
      } else {
        console.error("좋아요 처리 실패");
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Link href={`/products/${id}`} className="flex gap-5">
        <div className="relative size-20 rounded-md overflow-hidden">
          <Image fill={true} src={photo} alt={title} />
        </div>
        <div className="flex flex-col gap-3 text-white">
          <span className="text-lg">{title}</span>
          <span className="text-sm text-neutral-500">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
      </Link>
      <div className="flex items-center  mb-2">
        <span>{user?.username}</span>
        {isLiked ? (
          <SolidHeartIcon
            className="h-5 w-5 text-red-500 cursor-pointer ml-[15px]"
            onClick={toggleLike}
          />
        ) : (
          <HeartIcon
            className="h-5 w-5 text-gray-400 cursor-pointer ml-[15px]"
            onClick={toggleLike}
          />
        )}
      </div>
      <hr className="border-neutral-600 border-t" />
    </div>
  );
}
