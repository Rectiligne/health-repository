import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupByPrefix(arr: any) {
  return Object.keys(arr).reduce((acc: any, key: string) => {
    const prefix = key.split("_")[0]; // Get the prefix of the attribute
    if (!acc[prefix]) {
      acc[prefix] = {};
    }
    const leftPart = key.split("_").slice(1).join("_");
    acc[prefix][leftPart] = arr[key];
    return acc;
  }, {});
}
