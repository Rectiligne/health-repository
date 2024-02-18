import { Routes } from "@/types/routes.type";
import {
  ActivityIcon,
  FlaskConicalIcon,
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
    path: "/pipelines",
    title: "Pipelines",
    icon: FlaskConicalIcon,
  },
  {
    path: "/environments",
    title: "Environments",
    icon: ActivityIcon,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: SettingsIcon,
    position: "bottom",
  },
];
