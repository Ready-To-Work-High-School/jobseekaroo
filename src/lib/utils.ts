
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | number): string {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Get initials from a name
export function getInitials(name: string): string {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Default image placeholder
export const defaultImagePlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23dddddd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22.54 16.88 20 19.77V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v15.77l-2.54-2.88a.18.18 0 0 0-.24 0 .18.18 0 0 0 0 .24L4 20a2 2 0 0 0 2.9 0l2.1-2.39 2.1 2.39a2.06 2.06 0 0 0 2.9 0l2.1-2.39 2.1 2.39a2 2 0 0 0 2.9 0l2.78-2.88a.18.18 0 0 0 0-.24.18.18 0 0 0-.24 0Z'/%3E%3C/svg%3E";

// Calculate image sizes for responsive images
export const getImageSizes = (defaultSize: string = '100vw') => ({
  default: defaultSize,
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
});
