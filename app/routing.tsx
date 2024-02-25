import { Routes } from "@/types/routes.type";
import {
  FolderRootIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react";

export const routes: Routes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    path: "/projects",
    title: "Projects",
    icon: FolderRootIcon,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: SettingsIcon,
    position: "bottom",
  },
];
