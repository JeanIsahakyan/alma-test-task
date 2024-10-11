import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const apiRequest = async (method: string, params?: {[key: string]: string|number|File}, options?: RequestInit) => {
  const body = new FormData();
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val === undefined) {
        return;
      }
      if (val instanceof File) {
        body.append(key, val);
        return;
      }
      body.append(key, val.toString());
    });
  }
  return fetch(`/api/${method}`, {
    method: 'POST',
    body,
    ...(options || {}),
  })
  .then((response) => response.json());
}
