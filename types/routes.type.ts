import { LucideIcon } from "lucide-react";

export interface Route {
  path: string;
  title: string;
  icon: LucideIcon;
  position?: "top" | "bottom";
}
export interface Routes extends Array<Route> {}
