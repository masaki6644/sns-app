"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div className="flex items-center gap-4">
        <Link href="/">ホーム</Link>
        <Link href="/search">検索</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/profile/1">プロフィール</Link>
        <button onClick={handleLogout} className="text-red-500">ログアウト</button>
      </div>
    </nav>
  );
}