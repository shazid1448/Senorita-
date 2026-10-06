import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { hashPassword, generateSalt, encryptData, decryptData } from '../../../utils/crypto';
import { KeyRound, ShieldCheck, Download, Upload, RotateCcw, AlertTriangle, Check } from 'lucide-react';

export default function TabSecurity() {
  const { content, updateContent, exportContent, importContent, resetToDefault } = useContent();
  const security = content.security || {};

  // Password change state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwStatus, setPwStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Private vault plaintext edit state
  const [editingNotes, setEditingNotes] = useState('');
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [vaultUnlockPw, setVaultUnlockPw] = useState('');
  const [vaultSaveStatus, setVaultSaveStatus] = useState('');

  // Password hint state
  const [hint, setHint] = useState(security.passwordHint || '');

  // Handle changing password (re-encrypts vault)
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPw || !newPw) {
      setPwStatus('Please enter current and new passwords.');
      return;
    }
    if (newPw !== confirmPw) {
      setPwStatus('New passwords do not match.');
      return;
    }
    if (newPw.length < 4) {
      setPwStatus('Password must be at least 4 characters.');
      return;
    }

    setIsProcessing(true);
    setPwStatus('Verifying and re-encrypting vault...');

    try {
      // 1. Decrypt private vault with current password
      const currentVault = security.encryptedPrivateVault;
      let decryptedData = { secretNotes: [], diary: [] };
      if (currentVault && currentVault.ciphertext) {
        decryptedData = await decryptData(currentVault, currentPw);
      }

      // 2. Re-encrypt with new password
      const newEncryptedVault = await encryptData(decryptedData, newPw);

      // 3. Compute new salted SHA-256 hash
      const newSalt = generateSalt(16);
      const newHash = await hashPassword(newPw, newSalt);

      // 4. Update content
      updateContent(prev => ({
        ...prev,
        security: {
          ...prev.security,
          salt: newSalt,
          passwordHash: newHash,
          encryptedPrivateVault: newEncryptedVault
        }
      }));

      setPwStatus('Password successfully updated and vault re-encrypted with AES-GCM 256-bit!');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (err) {
      setPwStatus('Failed to change password: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Unlock vault inside admin to edit secret notes directly
  const handleUnlockAdminVault = async () => {
    if (!vaultUnlockPw) return;
    try {
      const data = await decryptData(security.encryptedPrivateVault, vaultUnlockPw);
      setEditingNotes(JSON.stringify(data, null, 2));
      setVaultUnlocked(true);
      setVaultSaveStatus('');
    } catch {
      alert('Incorrect password to unlock vault');
    }
  };

  // Save re-encrypted vault data
  const handleSaveAdminVault = async () => {
    try {
      const parsed = JSON.parse(editingNotes);
      const encrypted = await encryptData(parsed, vaultUnlockPw);
      updateContent(prev => ({
        ...prev,
        security: {
          ...prev.security,
          encryptedPrivateVault: encrypted
        }
      }));
      setVaultSaveStatus('Vault saved & re-encrypted with AES-GCM!');
      setTimeout(() => setVaultSaveStatus(''), 4000);
    } catch (err) {
      alert('Error saving vault: ' + err.message);
    }
  };

  // Save hint
  const handleSaveHint = () => {
    updateContent(prev => ({
      ...prev,
      security: {
        ...prev.security,
        passwordHint: hint
      }
    }));
    alert('Password hint updated!');
  };

  // Handle backup file import
  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const res = importContent(evt.target.result);
      if (res.success) {
        alert('Backup successfully imported and restored!');
      } else {
        alert('Failed to import backup: ' + res.error);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 text-sm">
      {/* Overview & Security Badge */}
      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-emerald-300">Military-Grade AES-GCM (256-bit) Encryption Active</p>
          <p className="text-emerald-200/80 leading-relaxed">
            Your Private Space content is encrypted into ciphertext with PBKDF2 (100,000 rounds) + AES-GCM. Passwords are never stored in plain text and are stripped automatically from backups.
          </p>
        </div>
      </div>

      {/* Change Password & Re-encrypt Vault */}
      <form onSubmit={handleChangePassword} className="space-y-4 p-5 rounded-2xl bg-romantic-burgundy-dark/50 border border-romantic-rose/20">
        <h4 className="font-serif text-lg text-romantic-rose font-medium flex items-center gap-2">
          <KeyRound className="w-4 h-4" />
          <span>Change Master Password</span>
        </h4>
        <p className="text-xs text-romantic-rose-muted">
          Changing your password automatically re-encrypts the private vault with your new password.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-romantic-rose-muted mb-1">Current Password</label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="Enter current password..."
              className="w-full px-3.5 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-romantic-rose-muted mb-1">New Password</label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="New password..."
                className="w-full px-3.5 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-romantic-rose-muted mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                placeholder="Confirm new password..."
                className="w-full px-3.5 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
              />
            </div>
          </div>

          {pwStatus && (
            <p className={`text-xs ${pwStatus.includes('success') ? 'text-emerald-400' : 'text-rose-400'}`}>
              {pwStatus}
            </p>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="btn-romantic-gradient px-5 py-2 rounded-full text-xs font-semibold"
          >
            {isProcessing ? 'Re-encrypting...' : 'Update Password & Re-encrypt'}
          </button>
        </div>
      </form>

      {/* Password Hint */}
      <div className="p-5 rounded-2xl bg-romantic-burgundy-dark/50 border border-romantic-rose/20 space-y-3">
        <h4 className="font-serif text-lg text-romantic-rose font-medium">Public Password Hint</h4>
        <input
          type="text"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder="e.g. Groom & Bride names together"
          className="w-full px-3.5 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
        />
        <button
          onClick={handleSaveHint}
          className="px-4 py-1.5 rounded-full border border-romantic-rose/30 bg-romantic-rose/10 hover:bg-romantic-rose/20 text-romantic-rose text-xs font-medium"
        >
          Save Hint
        </button>
      </div>

      {/* Secret Vault Direct JSON Editor */}
      <div className="p-5 rounded-2xl bg-romantic-burgundy-dark/50 border border-romantic-rose/20 space-y-3">
        <h4 className="font-serif text-lg text-romantic-rose font-medium">Edit Encrypted Vault Content</h4>
        {!vaultUnlocked ? (
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Enter master password to edit..."
              value={vaultUnlockPw}
              onChange={(e) => setVaultUnlockPw(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
            />
            <button
              onClick={handleUnlockAdminVault}
              className="btn-romantic-gradient px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Unlock
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              rows="8"
              value={editingNotes}
              onChange={(e) => setEditingNotes(e.target.value)}
              className="w-full font-mono text-xs p-3 rounded-xl bg-black/60 border border-romantic-rose/30 text-emerald-300 outline-none"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveAdminVault}
                className="btn-romantic-gradient px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Encrypt</span>
              </button>
              {vaultSaveStatus && (
                <span className="text-xs text-emerald-400 font-medium">{vaultSaveStatus}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Export / Import & Factory Reset */}
      <div className="pt-4 border-t border-romantic-rose/15 space-y-4">
        <h4 className="font-serif text-lg text-romantic-rose font-medium">Backup & Storage Management</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={exportContent}
            className="p-4 rounded-2xl border border-romantic-rose/25 bg-romantic-burgundy-dark/40 hover:bg-romantic-burgundy/60 text-left transition-all flex items-center gap-3 group"
          >
            <Download className="w-6 h-6 text-romantic-rose group-hover:scale-110 transition-transform" />
            <div>
              <span className="block text-sm font-semibold text-white">Export Clean content.json</span>
              <span className="block text-xs text-romantic-rose-muted mt-0.5">
                Automatically strips plain text passwords so it is 100% safe to deploy or host on Vercel.
              </span>
            </div>
          </button>

          <label className="p-4 rounded-2xl border border-romantic-rose/25 bg-romantic-burgundy-dark/40 hover:bg-romantic-burgundy/60 text-left transition-all flex items-center gap-3 cursor-pointer group">
            <Upload className="w-6 h-6 text-romantic-gold group-hover:scale-110 transition-transform" />
            <div>
              <span className="block text-sm font-semibold text-white">Import Backup File</span>
              <span className="block text-xs text-romantic-rose-muted mt-0.5">
                Restore all memories, timeline, and encrypted notes from a previous backup.
              </span>
            </div>
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>
        </div>

        <div className="pt-4 border-t border-romantic-rose/10 flex justify-end">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all content to default factory settings?')) {
                resetToDefault();
                alert('Reset complete!');
              }
            }}
            className="text-xs text-rose-400/80 hover:text-rose-300 flex items-center gap-1.5 p-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
