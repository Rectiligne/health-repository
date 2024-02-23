import { columns } from '@/components/ui/repositories/repositories-columns';
import RepositoriesDataTable from '@/components/ui/repositories/repositories-data-table';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { GhRepository } from '@/types/github.types';
import { getServerSession } from 'next-auth';

export default async function Repositories() {
  const session = await getServerSession(authOptions);
  const githubProvider = await prisma.account.findUnique({
    where: {
      // @ts-ignore
      user_provider_unique: {
        provider: 'github',
        userId: session!.user.id
      }
    }
  });

  const fetchGithub = async (): Promise<GhRepository[]> => {
    const res = await fetch('https://api.github.com/user/repos', {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${githubProvider!.access_token}`
      }
    });

    const result = await res.json();

    return result as GhRepository[];
  };
  let repositories: GhRepository[] = [];
  if (githubProvider) {
    repositories = await fetchGithub();
  }

  return (
    <>
      <header className="inline-flex gap-2 items-center">
        <h1>Projects</h1>
        <small>({repositories.length})</small>
      </header>
      <main>
        <RepositoriesDataTable columns={columns} data={repositories} />
      </main>
    </>
  );
}
