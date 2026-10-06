import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { decryptData } from '../../utils/crypto';
import GlassCard from '../common/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, ShieldAlert, Heart, BookOpen, Sparkles, Feather } from 'lucide-react';

export default function PrivateSpaceSection() {
  const { content } = useContent();
  const { t, isBn } = useLanguage();

  const [password, setPassword] = useState('');
  const [unlockedData, setUnlockedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'diary'

  const security = content.security || {};
  const encryptedVault = security.encryptedPrivateVault;
  const passwordHint = security.passwordHint || 'Groom & Bride names together (e.g. Shazid&Promi)';

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;

    setErrorMsg('');
    setIsDecrypting(true);

    try {
      if (!encryptedVault || !encryptedVault.ciphertext) {
        throw new Error('Encrypted vault is empty');
      }

      // Decrypt using Web Crypto AES-GCM
      const decrypted = await decryptData(encryptedVault, password.trim());
      setUnlockedData(decrypted);
      setPassword('');
    } catch (err) {
      setErrorMsg(t.vault.wrongPassword);
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleLock = () => {
    setUnlockedData(null);
    setPassword('');
    setErrorMsg('');
  };

  return (
    <section id="vault" className="py-20 md:py-28 px-4 relative max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs uppercase tracking-widest text-romantic-rose font-medium flex items-center justify-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5" />
          <span>{isBn ? 'গোপন ও ব্যক্তিগত' : 'Encrypted Sanctuary'}</span>
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white dark:text-white">
          {t.vault.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-romantic-rose-muted">
          {t.vault.sectionSubtitle}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!unlockedData ? (
          /* Locked Vault Card */
          <motion.div
            key="locked-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="max-w-xl mx-auto p-8 sm:p-12 text-center border-romantic-rose/30 shadow-glow-burgundy">
              {/* Lock Icon */}
              <div className="w-20 h-20 rounded-full bg-romantic-burgundy/60 border-2 border-romantic-rose/40 mx-auto flex items-center justify-center text-romantic-rose mb-6 shadow-glow-rose">
                <Lock className="w-8 h-8 animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white dark:text-white mb-2">
                {t.vault.lockedHeading}
              </h3>
              <p className="text-sm text-romantic-rose-muted leading-relaxed mb-6">
                {t.vault.lockedDesc}
              </p>

              {/* Password Unlock Form */}
              <form onSubmit={handleUnlock} className="space-y-4 max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.vault.passwordPlaceholder}
                    disabled={isDecrypting}
                    className="w-full px-5 py-3.5 rounded-full bg-romantic-burgundy-dark/70 border border-romantic-rose/30 focus:border-romantic-rose focus:ring-2 focus:ring-romantic-rose/30 text-white placeholder-romantic-rose-muted/50 text-center font-sans tracking-widest text-sm outline-none transition-all"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400 font-medium animate-shake">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isDecrypting}
                  className="btn-romantic-gradient w-full py-3.5 rounded-full text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-glow-rose min-h-[44px]"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{isDecrypting ? (isBn ? 'উন্মুক্ত হচ্ছে...' : 'Decrypting...') : t.vault.unlockBtn}</span>
                </button>
              </form>

              {/* Password Hint */}
              {passwordHint && (
                <div className="mt-6 pt-4 border-t border-romantic-rose/15 text-xs text-romantic-gold/80 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    <strong>{t.vault.hintPrefix}</strong> {passwordHint}
                  </span>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ) : (
          /* Unlocked Private Space */
          <motion.div
            key="unlocked-vault"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Vault Action Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-romantic-rose/30">
              {/* Tab Selector */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all min-h-[44px] ${
                    activeTab === 'notes'
                      ? 'bg-romantic-rose text-romantic-burgundy-dark font-bold shadow-glow-rose'
                      : 'text-romantic-rose hover:bg-romantic-rose/15'
                  }`}
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>{t.vault.secretNotesTab}</span>
                </button>

                <button
                  onClick={() => setActiveTab('diary')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all min-h-[44px] ${
                    activeTab === 'diary'
                      ? 'bg-romantic-rose text-romantic-burgundy-dark font-bold shadow-glow-rose'
                      : 'text-romantic-rose hover:bg-romantic-rose/15'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.vault.diaryTab}</span>
                </button>
              </div>

              {/* Lock Button */}
              <button
                onClick={handleLock}
                className="px-5 py-2 rounded-full border border-romantic-rose/40 bg-romantic-burgundy-dark/60 hover:bg-romantic-burgundy text-romantic-rose hover:text-white text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all min-h-[44px]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t.vault.lockBtn}</span>
              </button>
            </div>

            {/* Secret Notes View */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                {(unlockedData.secretNotes || []).map((note, idx) => (
                  <GlassCard key={idx} className="p-6 sm:p-8 hover:border-romantic-rose/40">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-romantic-burgundy/60 border border-romantic-rose/30 flex items-center justify-center text-romantic-rose shrink-0">
                        <Heart className="w-4 h-4 fill-romantic-rose/40" />
                      </div>
                      <p className="font-serif text-lg sm:text-xl text-white dark:text-white leading-relaxed">
                        {note}
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* Private Diary View */}
            {activeTab === 'diary' && (
              <div className="space-y-4">
                {(unlockedData.diary || []).map((entry, idx) => (
                  <GlassCard key={idx} className="p-6 sm:p-8 hover:border-romantic-rose/40">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-romantic-gold uppercase tracking-wider">
                        <span>{entry.date}</span>
                        <span>Entry #{idx + 1}</span>
                      </div>
                      <h4 className="font-serif text-2xl font-semibold text-white dark:text-white">
                        {entry.title}
                      </h4>
                      <p className="font-serif text-base sm:text-lg text-romantic-rose-muted leading-relaxed">
                        {entry.entry}
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
