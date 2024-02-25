import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GhRepository } from '@/types/github.types';
import RepositoriesDataTable from './repositories-data-table';

export default async function RepositoriesDataFetch() {
  const githubProvider = await getProvider();
  const repositories = await getRepositories(githubProvider?.access_token);

  const title = `${repositories.length} ${
    repositories.length > 0 ? 'Repositories' : 'Repository'
  }`;

  return (
    <>
      <div className="space-y-0.5 pb-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">Manage your repositories.</p>
      </div>
      <article>
        <RepositoriesDataTable repositories={repositories} />;
      </article>
    </>
  );
}

async function getProvider() {
  const session = await getServerSession(authOptions);
  const githubProvider = await prisma.account.findUnique({
    where: {
      user_provider_unique: {
        provider: 'github',
        userId: session!.user.id
      }
    }
  });
  return githubProvider;
}

async function fetchGithub(
  access_token: string | null | undefined
): Promise<GhRepository[]> {
  const res = await fetch('https://api.github.com/user/repos', {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${access_token}`
    }
  });

  const result = await res.json();
  return result as GhRepository[];
}

async function getRepositories(access_token: string | null | undefined) {
  return !access_token ? [] : fetchGithub(access_token);
}
