import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Octokit } from "octokit";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const fetchGithub = async () => {
    const octokit = new Octokit({
      auth: "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",
      /*      auth: "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", */
    });

    const result = await octokit.request("GET /user/repos", {});

    return result;
  };

  const repos = await fetchGithub();

  return (
    <main>
      Dashboard!
      <pre>{JSON.stringify(session)}</pre>
      <Link
        href={
          "https://github.com/login/oauth/authorize?client_id=f18f8a8579d1509224df"
        }
      >
        POC GITHUB
      </Link>
      {JSON.stringify(repos)}
    </main>
  );
}
