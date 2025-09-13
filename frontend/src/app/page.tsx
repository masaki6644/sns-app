import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Page() {
  const cookieStore = await cookies(); // ← await をつける
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  return <div>認証済みコンテンツ</div>;
}
