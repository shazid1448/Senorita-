import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { verifyPassword, hashPassword, generateSalt } from '../../utils/crypto';
import TabGeneral from './tabs/TabGeneral';
import TabTimeline from './tabs/TabTimeline';
import TabGallery from './tabs/TabGallery';
import TabLetter from './tabs/TabLetter';
import TabMusic from './tabs/TabMusic';
import TabDates from './tabs/TabDates';
import TabPlans from './tabs/TabPlans';
import TabSecurity from './tabs/TabSecurity';
import { X, Lock, Unlock, KeyRound, Sparkles, Sliders, Calendar, Image as ImageIcon, Feather, Disc, Compass, ShieldCheck } from 'lucide-react';

export default function AdminModal({ isOpen, onClose }) {
  const { content, updateContent } = useContent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState(1);

  // Forgot password / reset state
  const [showReset, setShowReset] = useState(false);
  const [recoveryInput, setRecoveryInput] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  if (!isOpen) return null;

  const security = content.security || {};

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const input = adminPassword.trim();
    if (!input) return;

    // Check with salted SHA-256 hash or recovery key
    const isValid = await verifyPassword(input, security.passwordHash, security.salt);
    const isRecoveryMatch = input === (security.recoveryKey || 'ETERNAL-LOVE-2023');

    // Also support default password "Shazid&Promi" fallback
    if (isValid || isRecoveryMatch || input === 'Shazid&Promi') {
      setIsAuthenticated(true);
      setErrorMsg('');
      setAdminPassword('');
    } else {
      setErrorMsg('Incorrect password. Click "Forgot Password" if you need to reset.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const recoveryKey = security.recoveryKey || 'ETERNAL-LOVE-2023';

    if (recoveryInput.trim() !== recoveryKey) {
      setResetStatus('Invalid Recovery Security Key.');
      return;
    }

    if (!resetNewPassword || resetNewPassword.length < 4) {
      setResetStatus('New password must be at least 4 characters.');
      return;
    }

    // Set new password hash
    const newSalt = generateSalt(16);
    const newHash = await hashPassword(resetNewPassword, newSalt);

    updateContent(prev => ({
      ...prev,
      security: {
        ...prev.security,
        salt: newSalt,
        passwordHash: newHash
      }
    }));

    setResetStatus('Password successfully reset! Logging you in...');
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowReset(false);
      setRecoveryInput('');
      setResetNewPassword('');
      setResetStatus('');
    }, 1200);
  };

  const tabs = [
    { id: 1, label: "General & Hero", icon: Sliders },
    { id: 2, label: "Timeline", icon: Calendar },
    { id: 3, label: "Gallery", icon: ImageIcon },
    { id: 4, label: "Love Letter", icon: Feather },
    { id: 5, label: "Music & Player", icon: Disc },
    { id: 6, label: "Special Dates", icon: Calendar },
    { id: 7, label: "Future Plans", icon: Compass },
    { id: 8, label: "Security & Backup", icon: ShieldCheck }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto safe-pt safe-pb"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col border border-romantic-rose/30 shadow-2xl bg-[#140812]/95 dark:bg-[#12050E]/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-romantic-rose/15 bg-romantic-burgundy-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-romantic-burgundy/80 border border-romantic-rose/40 flex items-center justify-center text-romantic-rose shadow-sm">
              <KeyRound className="w-5 h-5 text-romantic-gold" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                Admin Studio & Customizer
              </h3>
              <p className="text-xs text-romantic-rose-muted">
                Zero-database live customization • localStorage & backup
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-romantic-rose-muted hover:text-white hover:bg-white/10 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close Admin Studio"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6 w-full">
            <div className="w-16 h-16 rounded-full bg-romantic-burgundy/60 border border-romantic-rose/30 mx-auto flex items-center justify-center text-romantic-rose">
              <Lock className="w-7 h-7 animate-pulse" />
            </div>

            {!showReset ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <h4 className="font-serif text-2xl font-semibold text-white">
                  Admin Authorization
                </h4>
                <p className="text-xs text-romantic-rose-muted leading-relaxed">
                  Enter master password to access studio settings. (Default: Shazid&Promi)
                </p>

                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Master password..."
                  className="w-full px-5 py-3 rounded-full bg-romantic-burgundy-deep border border-romantic-rose/30 focus:border-romantic-rose text-white text-center text-sm outline-none font-sans"
                />

                {errorMsg && (
                  <p className="text-xs text-rose-400 font-medium">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-romantic-gradient w-full py-3 rounded-full text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-glow-rose min-h-[44px]"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Enter Admin Studio</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-xs text-romantic-rose-muted hover:text-romantic-rose block mx-auto underline pt-2"
                >
                  Forgot Password / Reset with Recovery Key
                </button>
              </form>
            ) : (
              /* Forgot / Reset Form */
              <form onSubmit={handleResetPassword} className="space-y-4 text-left">
                <h4 className="font-serif text-2xl font-semibold text-white text-center">
                  Reset Password
                </h4>
                <p className="text-xs text-romantic-rose-muted text-center leading-relaxed">
                  Enter recovery security key to reset your password. (Default key: ETERNAL-LOVE-2023)
                </p>

                <div>
                  <label className="block text-xs text-romantic-rose-muted mb-1">Recovery Key</label>
                  <input
                    type="text"
                    value={recoveryInput}
                    onChange={(e) => setRecoveryInput(e.target.value)}
                    placeholder="ETERNAL-LOVE-2023"
                    className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/30 text-white text-xs outline-none focus:border-romantic-rose font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-romantic-rose-muted mb-1">New Password</label>
                  <input
                    type="password"
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                    placeholder="Enter new password..."
                    className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/30 text-white text-xs outline-none focus:border-romantic-rose"
                  />
                </div>

                {resetStatus && (
                  <p className={`text-xs ${resetStatus.includes('success') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {resetStatus}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReset(false)}
                    className="flex-1 py-2.5 rounded-full border border-romantic-rose/25 text-romantic-rose-muted text-xs hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-romantic-gradient flex-1 py-2.5 rounded-full text-xs font-semibold"
                  >
                    Reset & Login
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Authenticated 8 Tabs Studio */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="md:w-60 border-b md:border-b-0 md:border-r border-romantic-rose/15 bg-black/30 p-2 md:p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap min-h-[44px] ${
                      active
                        ? 'bg-romantic-rose text-romantic-burgundy-dark font-bold shadow-glow-rose'
                        : 'text-romantic-rose-muted hover:text-white hover:bg-romantic-rose/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Panel */}
            <div className="flex-1 p-5 sm:p-8 overflow-y-auto">
              {activeTab === 1 && <TabGeneral />}
              {activeTab === 2 && <TabTimeline />}
              {activeTab === 3 && <TabGallery />}
              {activeTab === 4 && <TabLetter />}
              {activeTab === 5 && <TabMusic />}
              {activeTab === 6 && <TabDates />}
              {activeTab === 7 && <TabPlans />}
              {activeTab === 8 && <TabSecurity />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
