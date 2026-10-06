# 💖 Shazid & Nithia — Our Endless Love Story (v2 Rebuild)

A premium, romantic couple web application crafted with **React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti, and the Web Crypto API**.

Rebuilt from the ground up to preserve the signature romantic identity while delivering elevated typography, seamless mobile-first responsiveness (320px to 4K), client-side image compression, military-grade encrypted private space, and procedural Web Audio piano fallback.

---

## ✨ Highlights & Rebuild Enhancements

1. **Exact Design Identity Preserved**:
   - **Dark Romantic Theme**: `#0B0710` dark night background, rich burgundies (`#2E0A18`, `#5C1030`, `#7A1B40`), rose golds and vibrant rose accents (`#E8A6C1`, `#FF6FA5`), starlight gold (`#D4AF8C`).
   - **Dusk Light Mode**: Twilight cashmere, soft mauve, and delicate plum — not stark white.
   - **Typography**: Regal headings in `Cormorant Garamond`, crisp body in `Manrope`, handwritten scrapbook notes in `Caveat`, and Bengali fonts in `Noto Serif Bengali`.

2. **Sections in Exact Requested Order**:
   1. **Hero**: Live love counter calculating exact **Days, Hours, Minutes, and Seconds** elapsed since **December 12, 2023**, with milestone badges and floating petals.
   2. **Love Story Timeline**: Animated glowing connecting line, milestone cards, tags, and icons.
   3. **Polaroid Memory Gallery**: Vintage photo scrapbook with tilt, washi-tape pins, handwritten captions, and a full-screen swipeable lightbox.
   4. **Love Letter (Envelope)**: 3D royal wax-sealed envelope with `S & N` stamp, confetti burst on tap, and unfolding parchment letter with English and Bangla text.
   5. **Song Player**: Spinning vinyl album art, scrubbable progress bar, volume slider, and dual playback engine.
   6. **Special Dates**: Live countdowns to anniversaries, birthdays, and celebrations.
   7. **Future Plans (Bucket List)**: Shared dream roadmap with category filters and completion toggles.
   8. **Private Space (Secret Vault)**: AES-GCM 256-bit encrypted secret notes and diary.
   9. **Footer**: Couple monogram, romantic quote, and subtle admin entrance.

3. **Real Security & Privacy Overhaul**:
   - **No Plaintext Passwords**: Password hashes are salted and hashed using **SHA-256** via the native browser `window.crypto.subtle`.
   - **AES-GCM (256-bit) Encryption**: Private Space notes and diary are encrypted using PBKDF2 (100,000 rounds) + AES-GCM. Unreadable in source code or `content.json`.
   - **Clean Backups**: Exporting `content.json` automatically strips passwords so you can safely deploy to public hosting without exposing secrets.
   - **Forgot Password / Recovery**: Recovery security key (`ETERNAL-LOVE-2023`) allows resetting the master password.

4. **Web Audio Synthesizer Fallback**:
   - Includes a procedural acoustic piano chord arpeggiator built with the Web Audio API.
   - If the custom MP3 file is absent or fails to load, ambient romantic piano music plays smoothly without errors.

5. **Client-Side Image Compression**:
   - Uploading photos through the Admin panel automatically compresses and resizes them on an off-screen HTML5 Canvas (target size ~60–120 KB). Prevents `localStorage` quota exceeded errors.

6. **Bilingual Support (English & বাংলা)**:
   - One-click language switcher in the navbar toggles between English and Bangla across the entire site.

7. **PWA & Cross-Device Polish**:
   - Uses `100svh`/`100dvh` and safe-area insets (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`).
   - Touch targets $\ge 44\text{px} \times 44\text{px}$.
   - Heart cursor follower active on desktop; disabled on touch devices.
   - PWA installable with webmanifest and offline service worker.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open in your browser
http://localhost:5173
```

---

## ⚙️ Admin Studio & Passwords

- Click the subtle **Lock icon** in the top navbar or the footer to open the **Admin Studio**.
- **Default Master Password**: `Shazid&Promi`
- **Default Recovery Key**: `ETERNAL-LOVE-2023`
- You can change the master password at any time in **Tab 8 (Security & Backup)**; changing the password automatically re-encrypts the private vault with your new password!

---

## 🌐 How to Deploy to Vercel (1 Minute)

### Option 1: Via Vercel Dashboard (Connected to GitHub)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Rebuild romantic couple website v2"
   git push -u origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and log in.
3. Click **Add New** $\rightarrow$ **Project**.
4. Select your GitHub repository (`shazid1448/Senorita-`).
5. Framework Preset will automatically detect **Vite**.
6. Click **Deploy**. Your romantic website will be live in ~30 seconds with free SSL and custom domain support!

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the interactive prompts and choose default settings.

---

*Made with love for Nithia Promi & Shazid Ahmed.*
