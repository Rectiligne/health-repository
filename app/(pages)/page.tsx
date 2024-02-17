import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authConfig);
  console.log(session);
  if (session) {
    redirect("/dashboard");
  }
  redirect("/login");
}
