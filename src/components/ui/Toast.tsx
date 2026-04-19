import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiInfo } from 'react-icons/fi';
import { useToast, removeToast, type ToastType } from '@/hooks/useToast';

const icons: Record<ToastType, React.ReactNode> = {
  success: <FiCheck size={18} />,
  error: <FiX size={18} />,
  info: <FiInfo size={18} />,
};

const colors: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: 'var(--success-soft)', border: 'var(--success-border)', icon: 'var(--success)' },
  error: { bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.2)', icon: 'var(--error)' },
  info: { bg: 'var(--accent-soft)', border: 'var(--accent-glow)', icon: 'var(--accent)' },
};

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[10002] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const color = colors[toast.type];
          return (
            <motion.div
              key={toast.id}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg max-w-sm"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: `1px solid ${color.border}`,
              }}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <span style={{ color: color.icon }}>{icons[toast.type]}</span>
              <p className="text-small flex-1" style={{ color: 'var(--text-primary)' }}>
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-1 rounded-md transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
                aria-label="Dismiss"
              >
                <FiX size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
