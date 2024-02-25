'use client';

import { GhRepository } from '@/types/github.types';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Badge } from '../badge';
import { Button } from '../button';
import { Globe, MoreHorizontalIcon, UserRound } from 'lucide-react';

type pickedColumns = 'id' | 'name' | 'private' | 'html_url' | 'language';

export const columns: ColumnDef<
  Pick<GhRepository & 'actions', pickedColumns>
>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorFn: x => ({ isPrivate: x.private, name: x.name, link: x.html_url }),
    header: 'Name',
    cell: x => {
      const { isPrivate, name, link } = x.getValue<{
        isPrivate: boolean;
        name: string;
        link: string;
      }>();

      const icon = isPrivate ? <UserRound size="20" /> : <Globe size="20" />;
      const title = isPrivate ? 'Private repository' : 'Public repository';

      return (
        <Link
          title={title}
          className="inline-flex items-center justify-center gap-2"
          target="_blank"
          href={link}
        >
          {icon} {name}
        </Link>
      );
    }
  },
  {
    accessorKey: 'language',
    header: 'Language',
    cell: ({ row }) => {
      const language = row.getValue<string>('language');

      if (!language) return null;
      return <Badge>{language}</Badge>;
    }
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: () => (
      // dropdown
      <Button
        className="text-transparent group-hover:text-primary"
        variant="ghost"
      >
        <MoreHorizontalIcon />
      </Button>
    )
  }
];
