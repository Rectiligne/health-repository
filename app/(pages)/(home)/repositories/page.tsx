import RepositoriesDataFetch from '@/components/ui/repositories/repositories-data-fetch';
import { Suspense } from 'react';

export default function Repositories() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* @ts-expect-error Server Component */}
      <RepositoriesDataFetch />
    </Suspense>
  );
}
