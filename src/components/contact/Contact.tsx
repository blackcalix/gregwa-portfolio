'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { colors } = useTheme();
  const form = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // INFOS D'AFFICHAGE (Visuel seulement)
  const contactInfo = {
    email: 'woodshleico@gmail.com',
    phone: '+509 39 20 1945',
    instagram: 'gregwadizay',
    instagramUrl: 'https://www.instagram.com/gregwadizay/',
    location: 'Haïti',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');

    // ============================================================
    // CLÉS DU CLIENT
    // ============================================================
    const SERVICE_ID = 'service_3m0ro9p';
    const TEMPLATE_ID = 'template_qhyn5o9';
    const PUBLIC_KEY = 'ciReId4kKMC8uE_x-';

    const templateParams = {
      from_name: formData.name,   // Correspond à {{from_name}} dans le template
      from_email: formData.email, // Correspond à {{from_email}} dans le template
      message: formData.message,  // Correspond à {{message}} dans le template
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.error(error.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  const inputClasses =
    'w-full px-5 py-4 rounded-lg border-2 outline-none transition-all duration-300 placeholder:opacity-50 focus:border-[#FF3C00] text-sm md:text-base';

  return (
    <section
      id="contact"
      className="py-16 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: 'transparent' }}
      aria-labelledby="contact-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Colonne gauche (Infos) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.primary }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="text-sm uppercase tracking-[0.3em]"
                style={{ color: colors.primary, fontFamily: 'var(--font-body)' }}
              >
                Contact
              </span>
            </motion.div>

            <div className="mb-6">
              <motion.h2
                id="contact-title"
                className="text-3xl md:text-5xl lg:text-6xl font-bold"
                style={{ color: colors.text, fontFamily: 'var(--font-heading)' }}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
              >
                Travaillons
                <span style={{ color: colors.primary }}> ensemble</span>
              </motion.h2>
            </div>

            <motion.p
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Un projet en tête ? Une idée à concrétiser ?
              N&apos;hésite pas à me contacter pour en discuter.
            </motion.p>

            <div className="space-y-5">
              {/* Email Link */}
              <motion.a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 group p-3 rounded-xl transition-colors hover:bg-white/5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#FF3C00]"
                  style={{ backgroundColor: colors.border }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" className="group-hover:stroke-white transition-colors duration-300">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}>Email</p>
                  <p className="text-base md:text-lg font-medium transition-colors duration-300 group-hover:text-[#FF3C00]" style={{ color: colors.text, fontFamily: 'var(--font-body)' }}>{contactInfo.email}</p>
                </div>
              </motion.a>

              {/* Téléphone */}
              <motion.a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 group p-3 rounded-xl transition-colors hover:bg-white/5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#FF3C00]"
                  style={{ backgroundColor: colors.border }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" className="group-hover:stroke-white transition-colors duration-300">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}>Téléphone</p>
                  <p className="text-base md:text-lg font-medium transition-colors duration-300 group-hover:text-[#FF3C00]" style={{ color: colors.text, fontFamily: 'var(--font-body)' }}>{contactInfo.phone}</p>
                </div>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-3 rounded-xl transition-colors hover:bg-white/5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-orange-500"
                  style={{ backgroundColor: colors.border }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={colors.text} className="group-hover:fill-white transition-colors duration-300">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}>Instagram</p>
                  <p className="text-base md:text-lg font-medium transition-colors duration-300 group-hover:text-[#FF3C00]" style={{ color: colors.text, fontFamily: 'var(--font-body)' }}>@{contactInfo.instagram}</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Colonne droite - Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm mb-2" style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}>Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="from_name" // IMPORTANT pour le template EmailJS
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className={inputClasses}
                  style={{ backgroundColor: colors.card, borderColor: colors.border, color: colors.text, fontFamily: 'var(--font-body)' }}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2" style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="from_email" // IMPORTANT pour le template EmailJS
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className={inputClasses}
                  style={{ backgroundColor: colors.card, borderColor: colors.border, color: colors.text, fontFamily: 'var(--font-body)' }}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm mb-2" style={{ color: colors.textMuted, fontFamily: 'var(--font-body)' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Décris ton projet..."
                  className={`${inputClasses} resize-none`}
                  style={{ backgroundColor: colors.card, borderColor: colors.border, color: colors.text, fontFamily: 'var(--font-body)' }}
                />
              </div>

              {/* Bouton Submit */}
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-70"
                style={{
                  backgroundColor: status === 'success' ? '#22c55e' : status === 'error' ? '#ef4444' : colors.primary,
                  color: '#ffffff',
                  fontFamily: 'var(--font-heading)',
                }}
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Envoi...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Message envoyé !
                  </span>
                ) : status === 'error' ? (
                  'Erreur, réessaye.'
                ) : (
                  'Envoyer le message'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;