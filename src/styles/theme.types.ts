/**
 * Theme types for DungeonForge Online
 * Defines all theme-related types and interfaces
 */

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  accentSecondary: string;
  text: string;
  textSecondary: string;
  danger: string;
  success: string;
  warning: string;
  info: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontFamilyHeading: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

export interface ThemeBorder {
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  width: string;
  style: string;
  color: string;
}

export interface ThemeShadow {
  sm: string;
  md: string;
  lg: string;
  inset: string;
}

export interface ThemeTransition {
  fast: string;
  medium: string;
  slow: string;
}

export interface ThemeZIndex {
  base: number;
  above: number;
  modal: number;
  toast: number;
}

export interface DungeonForgeTheme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  border: ThemeBorder;
  shadow: ThemeShadow;
  transition: ThemeTransition;
  zIndex: ThemeZIndex;
}