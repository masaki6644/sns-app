"use client";

import { useState } from "react";
import api from "../utils/api";

export default function CommentBox({ postId }: { postId: number }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await api.post(`/posts/${postId}/comments/`, { content: comment });
      setComment("");
      // TODO: mutate() で局所更新するのがベター（SWR）
      window.location.reload();
    } catch (err) {
      console.error("comment error", err);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを入力"
          className="border w-full p-2 rounded"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
          投稿
        </button>
      </form>
    </div>
  );
}