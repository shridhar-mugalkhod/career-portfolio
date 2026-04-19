import { useState, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiMapPin, FiLinkedin, FiSend, FiCheck, FiArrowUpRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { portfolioConfig } from '@/config/portfolio.config';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EASE_OUT_EXPO } from '@/constants/animation';
import { addToast } from '@/hooks/useToast';

type FormState = 'idle' | 'sending' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactLink({
  href,
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  external = false,
  index,
}: {
  href?: string;
  icon: React.ComponentType<{ size?: number }>;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  external?: boolean;
  index: number;
}) {
  const Wrapper = href ? 'a' : 'div';
  const linkProps = href
    ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      <Wrapper
        {...linkProps}
        className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 card-glow"
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
        }}
      >
        <motion.div
          className="w-14 h-14 flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ backgroundColor: iconBg, color: iconColor }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Icon size={22} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-tertiary)' }}>
            {label}
          </p>
          <p className="text-body font-medium truncate" style={{ color: 'var(--text-primary)' }}>
            {value}
          </p>
        </div>
        {href && (
          <FiArrowUpRight
            size={18}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: 'var(--text-tertiary)' }}
          />
        )}
      </Wrapper>
    </motion.div>
  );
}

export default function Contact() {
  const { contact } = portfolioConfig;
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<string | null>(null);

  const validate = (formData: FormData): FormErrors => {
    const errs: FormErrors = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email';
    if (!message.trim()) errs.message = 'Message is required';

    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
      return;
    }

    setFormState('sending');

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setFormState('success');
      formRef.current.reset();
      addToast('Message sent successfully!', 'success');
      setTimeout(() => setFormState('idle'), 3000);
    } catch {
      setFormState('error');
      addToast('Something went wrong. Please try again.', 'error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-5 py-4 rounded-xl text-body outline-none transition-all duration-300 ${
      focused === field ? 'shadow-lg' : ''
    }`;

  const contactLinks = [
    {
      href: `mailto:${contact.email}`,
      icon: FiMail,
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      label: 'Email',
      value: contact.email,
    },
    ...(contact.whatsapp
      ? [{
          href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`,
          icon: FaWhatsapp,
          iconBg: 'rgba(37, 211, 102, 0.1)',
          iconColor: '#25D366',
          label: 'WhatsApp',
          value: contact.whatsapp,
          external: true,
        }]
      : []),
    ...(contact.linkedin
      ? [{
          href: contact.linkedin,
          icon: FiLinkedin,
          iconBg: 'rgba(0, 119, 181, 0.1)',
          iconColor: '#0077B5',
          label: 'LinkedIn',
          value: 'Connect with me',
          external: true,
        }]
      : []),
    ...(contact.location
      ? [{
          icon: FiMapPin,
          iconBg: 'var(--accent-soft)',
          iconColor: 'var(--accent)',
          label: 'Location',
          value: contact.location,
        }]
      : []),
  ];

  return (
    <SectionWrapper id="contact" alternate divider="wave">
      <SectionHeader
        label="Contact"
        title="Let's Work Together"
        subtitle="Have a project in mind or just want to chat? Drop me a message and I'll get back to you as soon as possible."
      />

      <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
        {/* Left: Form (3 cols) */}
        <AnimatedSection variant="fadeLeft" className="lg:col-span-3">
          <div
            className="p-8 rounded-2xl"
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
            }}
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center py-16 gap-5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--success-soft)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <FiCheck size={36} style={{ color: 'var(--success)' }} />
                  </motion.div>
                  <p className="text-h3 font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                    Message Sent!
                  </p>
                  <p className="text-body text-center" style={{ color: 'var(--text-secondary)' }}>
                    Thanks for reaching out. I'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name & Email row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {(['name', 'email'] as const).map((field) => (
                      <div key={field}>
                        <label
                          className="block text-xs uppercase tracking-wider mb-2 font-medium transition-colors duration-300"
                          style={{
                            color: focused === field ? 'var(--accent)' : 'var(--text-tertiary)',
                          }}
                        >
                          {field === 'name' ? 'Your Name' : 'Your Email'}
                        </label>
                        <div className="relative">
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            name={field}
                            placeholder={field === 'name' ? 'John Doe' : 'john@example.com'}
                            className={inputClass(field)}
                            style={{
                              backgroundColor: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)',
                              border: `2px solid ${
                                errors[field]
                                  ? 'var(--error)'
                                  : focused === field
                                  ? 'var(--accent)'
                                  : 'transparent'
                              }`,
                            }}
                            onFocus={() => setFocused(field)}
                            onBlur={() => setFocused(null)}
                            onChange={() => setErrors((prev) => ({ ...prev, [field]: undefined }))}
                          />
                        </div>
                        {errors[field] && (
                          <motion.p
                            className="mt-1.5 text-xs font-medium"
                            style={{ color: 'var(--error)' }}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors[field]}
                          </motion.p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2 font-medium transition-colors duration-300"
                      style={{
                        color: focused === 'message' ? 'var(--accent)' : 'var(--text-tertiary)',
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`${inputClass('message')} resize-none`}
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: `2px solid ${
                          errors.message
                            ? 'var(--error)'
                            : focused === 'message'
                            ? 'var(--accent)'
                            : 'transparent'
                        }`,
                      }}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      onChange={() => setErrors((prev) => ({ ...prev, message: undefined }))}
                    />
                    {errors.message && (
                      <motion.p
                        className="mt-1.5 text-xs font-medium"
                        style={{ color: 'var(--error)' }}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="relative flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-body font-semibold overflow-hidden group disabled:opacity-60"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg-primary)',
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span
                      className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ backgroundColor: 'var(--accent-hover)' }}
                    />
                    <span className="relative z-10 flex items-center gap-2.5">
                      {formState === 'sending' ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="inline-block"
                          >
                            <FiSend size={18} />
                          </motion.span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FiSend size={18} />
                        </>
                      )}
                    </span>
                  </motion.button>

                  {formState === 'error' && (
                    <motion.p
                      className="text-small text-center"
                      style={{ color: 'var(--error)' }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Something went wrong. Please try again or email me directly.
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Right: Contact links (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
          {contactLinks.map((link, i) => (
            <ContactLink
              key={link.label}
              href={link.href}
              icon={link.icon}
              iconBg={link.iconBg}
              iconColor={link.iconColor}
              label={link.label}
              value={link.value}
              external={link.external}
              index={i}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
