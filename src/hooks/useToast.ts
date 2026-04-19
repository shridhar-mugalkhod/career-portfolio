import { useSyncExternalStore } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

let toasts: Toast[] = [];
let listeners: (() => void)[] = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return toasts;
}

export function addToast(message: string, type: ToastType = 'info', duration = 4000) {
  const id = crypto.randomUUID();
  toasts = [...toasts, { id, message, type, duration }];
  emitChange();

  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }
}

export function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emitChange();
}

export function useToast() {
  const currentToasts = useSyncExternalStore(subscribe, getSnapshot);
  return { toasts: currentToasts, addToast, removeToast };
}
