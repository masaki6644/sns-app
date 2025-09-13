"use client";

import { useState } from "react";
import useSWR from "swr";
import api from "../../utils/api";
import PostCard from "../../components/PostCard";
import Navbar from "../../components/Navbar";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data, error, mutate } = useSWR(query ? `/posts/search/?q=${encodeURIComponent(query)}` : null, fetcher);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <form onSubmit={handleSearch} className="mb-4">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="検索ワード" className="border p-2 rounded w-64" />
          <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-1 rounded">検索</button>
        </form>

        {error && <div>エラーが発生しました</div>}
        {!data && query && <div>読み込み中...</div>}
        {data && data.map((post: any) => <PostCard key={post.id} post={post} />)}
      </div>
    </>
  );
}