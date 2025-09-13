"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/login/", { username, password }); // Cookie がセットされる
      router.push("/"); // ログイン成功後にホームへ
    } catch {
      alert("ログイン失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
