import { Octokit } from "octokit";

const fetchgit = async () => {
  const octokit = new Octokit({
    auth: "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",
  });

  const res = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: "Laaurent",
    repo: "OSF-Recouvrement",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return res;
};

export default async function Dashboard() {
  const result = await fetchgit();
  return <p>{JSON.stringify(result)}</p>;
}
