// src/types/types.ts

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
}

export interface AppState {
  isLoading: boolean;
  error: string | null;
  currentPath: string;
}