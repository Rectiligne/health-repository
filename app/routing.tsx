import { Routes } from '@/types/routes.type';
import {
  ActivityIcon,
  FlaskConicalIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  FolderRootIcon
} from 'lucide-react';

export const routes: Routes = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: LayoutDashboardIcon
  },
  {
    path: '/pipelines',
    title: 'Pipelines',
    icon: FlaskConicalIcon
  },
  {
    path: '/repositories',
    title: 'Repositories',
    icon: FolderRootIcon
  },
  {
    path: '/environments',
    title: 'Environments',
    icon: ActivityIcon
  },
  {
    path: '/settings',
    title: 'Settings',
    icon: SettingsIcon,
    position: 'bottom'
  }
];
