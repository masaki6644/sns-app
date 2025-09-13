"use client";

import LikeButton from "@/components/LikeButton";

type Post = {
  id: number;
  content: string;
  like_count: number;
  comment_count: number;
  user: {
    username: string;
  };
  is_liked?: boolean;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border rounded p-4 mb-2">
      <h3 className="font-semibold">{post.user.username}</h3>
      <p className="my-2">{post.content}</p>
      <div className="flex items-center gap-4">
        <LikeButton postId={post.id} liked={!!post.is_liked} />
        <span>👍 {post.like_count}</span>
        <span>💬 {post.comment_count}</span>
      </div>
    </div>
  );
}