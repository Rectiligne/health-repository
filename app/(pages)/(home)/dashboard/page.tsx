import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      Dashboard!
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
