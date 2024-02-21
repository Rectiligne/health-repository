import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { GhRepository } from '@/types/github.types';
import { getServerSession } from 'next-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { languageColor } from './language-color';
import { StarIcon, GitForkIcon } from 'lucide-react';

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
      <main className="pt-4">
        <div className="xl:grid-cols-3 xl:grid xl:gap-4 md:grid-cols-2 md:grid flex flex-col gap-2">
          {repositories.map(repository => (
            <RepositoryCard key={repository.id} repository={repository} />
          ))}
        </div>
      </main>
    </>
  );
}

function RepositoryCard({ repository }: { repository: GhRepository }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-ellipsis overflow-hidden">
          {repository.name}
        </CardTitle>
        <CardDescription>{repository.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {repository.language && (
            <Badge className={languageColor[repository.language]}>
              {repository.language}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-4">
          <small className="flex flex-row items-center gap-2">
            {repository.stargazers_count} <StarIcon size="21" />
          </small>
          <small className="flex flex-row items-center gap-2">
            {repository.forks_count} <GitForkIcon size="21" />
          </small>
        </div>
      </CardFooter>
    </Card>
  );
}
