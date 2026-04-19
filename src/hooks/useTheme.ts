import { useCallback, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';

function getSnapshot(): Theme {
  return (localStorage.getItem(STORAGE_KEY) as Theme) ?? 'dark';
}

function getServerSnapshot(): Theme {
  return 'dark';
}

let listeners: Array<() => void> = [];

function emitChange() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

// Initialize on load
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  const initial = saved ?? 'dark';
  applyTheme(initial);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    emitChange();
  }, []);

  const setTheme = useCallback((t: Theme) => {
    applyTheme(t);
    emitChange();
  }, []);

  return { theme, toggleTheme, setTheme };
}
