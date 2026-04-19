import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { EASE_OUT_EXPO } from '@/constants/animation';

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center">
        <motion.h1
          className="font-display font-bold mb-4 text-gradient"
          style={{
            fontSize: 'clamp(4rem, 15vw, 10rem)',
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, ease: EASE_OUT_EXPO },
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
          }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-h3 font-display mb-2"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Page not found
        </motion.p>
        <motion.p
          className="text-body mb-8"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-body font-medium"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-primary)',
            }}
          >
            <FiHome size={18} />
            Go Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
