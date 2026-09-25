import type { CSSProperties } from 'react';
import { getTeamTheme, type TeamTheme } from '../data/nhlTeams';

const COOKIE_NAME = 'penguinscape_favorite_team';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function getFavoriteTeam(): string | null {
  if (typeof document === 'undefined') return null;
  const cookie = document.cookie.split('; ').find((entry) => entry.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return null;
  const teamId = decodeURIComponent(cookie.split('=')[1] ?? '').toLowerCase();
  return getTeamTheme(teamId)?.id ?? null;
}

export function setFavoriteTeam(teamId: string) {
  const team = getTeamTheme(teamId);
  if (!team || typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(team.id)}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax`;
}

export function clearFavoriteTeam() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
}

export function createThemeCssVariables(team?: TeamTheme): CSSProperties | undefined {
  if (!team) return undefined;
  return {
    '--theme-primary': team.primary,
    '--theme-secondary': team.secondary,
    '--theme-accent': team.accent,
    '--theme-background': team.background,
    '--theme-background-alt': team.backgroundAlt,
    '--theme-surface': team.surface,
    '--theme-surface-hover': team.surfaceHover,
    '--theme-text': team.text,
    '--theme-text-muted': team.textMuted,
    '--theme-border': team.border,
    '--theme-button-background': team.buttonBackground,
    '--theme-button-text': team.buttonText,
    '--bg': team.background,
    '--surface': team.surface,
    '--surface-2': team.backgroundAlt,
    '--text': team.text,
    '--muted': team.textMuted,
    '--border': team.border,
    '--accent': team.buttonBackground,
    '--accent-2': team.accent,
    '--button-text': team.buttonText,
    '--focus': team.accent,
    '--hero-scrim': 'color-mix(in srgb, var(--theme-background) 86%, transparent)',
    '--shadow': '0 22px 70px color-mix(in srgb, var(--theme-background) 55%, #000000 45%)'
  } as CSSProperties;
}
