import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const githubProvider = await prisma.account.findUnique({
    where: {
      provider: "github",
      userId: session!.user.id,
    },
  });

  const fetchGithub = async () => {
    const res = await fetch("https://api.github.com/user/repos", {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${githubProvider!.access_token}`,
      },
    });

    const result = await res.json();

    return result;
  };
  let repos = {};
  if (githubProvider) {
    repos = await fetchGithub();
  }

  return (
    <main>
      Dashboard!
      <pre>{JSON.stringify(session)}</pre>
      {githubProvider && JSON.stringify(repos)}
    </main>
  );
}
