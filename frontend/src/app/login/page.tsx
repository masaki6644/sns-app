"use client";

import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // ログイン成功したらトップページに遷移
    router.push("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm  />
    </div>
  );
}