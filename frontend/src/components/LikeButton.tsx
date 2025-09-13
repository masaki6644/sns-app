"use client";

import { useState } from "react";
import api from "../utils/api";

export default function LikeButton({ postId, liked }: { postId: number; liked: boolean }) {
  const [isLiked, setIsLiked] = useState(liked);

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await api.delete(`/posts/${postId}/like/`);
      } else {
        await api.post(`/posts/${postId}/like/`);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("like error", err);
      // エラーハンドリング（通知等）を追加可能
    }
  };

  return (
    <button onClick={toggleLike} aria-pressed={isLiked}>
      {isLiked ? "❤️" : "🤍"}
    </button>
  );
}

