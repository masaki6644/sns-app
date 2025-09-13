"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import api from "../../../utils/api";
import CommentBox from "../../../components/CommentBox";
import LikeButton from "../../../components/LikeButton";
import Navbar from "../../../components/Navbar";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useSWR(id ? `/posts/${id}/` : null, fetcher);

  if (error) return (
    <>
      <Navbar />
      <div className="p-4">エラーが発生しました</div>
    </>
  );
  if (!data) return (
    <>
      <Navbar />
      <div className="p-4">読み込み中...</div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="font-semibold">{data.user.username}</h2>
        <p className="my-2">{data.content}</p>
        <div className="flex items-center gap-4">
          <LikeButton postId={data.id} liked={!!data.liked} />
          <span>👍 {data.like_count}</span>
          <span>💬 {data.comment_count}</span>
        </div>

        <CommentBox postId={data.id} />

        <div className="mt-4">
          <h3 className="font-semibold">コメント</h3>
          {data.comments && data.comments.map((c: any) => (
            <p key={c.id}><b>{c.user.username}</b>: {c.content}</p>
          ))}
        </div>
      </div>
    </>
  );
}