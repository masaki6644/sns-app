"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import api from "../../../utils/api";
import PostCard from "../../../components/PostCard";
import Navbar from "../../../components/Navbar";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useSWR(id ? `/users/${id}/` : null, fetcher);

  if (error) return (<><Navbar /><div className="p-4">エラー</div></>);
  if (!data) return (<><Navbar /><div className="p-4">読み込み中...</div></>);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="font-semibold">{data.username}</h2>
        <p>{data.bio}</p>
        <h3 className="mt-4">投稿一覧</h3>
        {data.posts && data.posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}