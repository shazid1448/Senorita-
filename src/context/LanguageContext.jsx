import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const UI_DICTIONARY = {
  en: {
    nav: {
      story: "Our Story",
      gallery: "Gallery",
      letter: "Love Letter",
      music: "Our Song",
      dates: "Special Dates",
      plans: "Dream Roadmap",
      vault: "Private Vault",
      admin: "Admin Studio"
    },
    hero: {
      daysTogether: "Days Together",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      since: "Since December 12, 2023",
      yearsCount: "Years of pure magic",
      daysToAnniversary: "days until next anniversary",
      daysToMilestone: "days to next 100-day milestone"
    },
    timeline: {
      sectionTitle: "Our Journey",
      sectionSubtitle: "Every single step that brought two hearts together into one soul"
    },
    gallery: {
      sectionTitle: "Polaroid Memories",
      sectionSubtitle: "Captured moments of our laughter, adventures, and endless warmth",
      emptyTitle: "No memories captured yet",
      emptyDesc: "Upload your favorite photos from the Admin panel to fill our memory wall.",
      addPhoto: "Add Memories in Admin"
    },
    letter: {
      sectionTitle: "A Heartfelt Letter",
      sectionSubtitle: "Words penned from the deepest corners of my heart to yours",
      tapToOpen: "Tap wax seal to open",
      foldLetter: "Fold letter back into envelope"
    },
    music: {
      sectionTitle: "Our Melodies",
      sectionSubtitle: "The soothing soundtrack to our eternal love story",
      nowPlaying: "Now Playing",
      paused: "Paused",
      synthActive: "Acoustic Piano Synthesizer Active",
      audioReady: "Custom Song Audio Ready"
    },
    dates: {
      sectionTitle: "Special Dates",
      sectionSubtitle: "Milestones we celebrate and the sweet moments we eagerly await",
      daysLeft: "days left",
      today: "Today is the day! 🎉",
      past: "Anniversary celebrated ❤️"
    },
    plans: {
      sectionTitle: "Dream Roadmap",
      sectionSubtitle: "Hopes, adventures, and life bucket lists we are achieving hand in hand",
      completedBadge: "Completed With Love ✨",
      dreamBadge: "Our Next Adventure"
    },
    vault: {
      sectionTitle: "Private Space",
      sectionSubtitle: "AES-GCM 256-bit encrypted sanctuary for our secret notes and personal diary",
      lockedHeading: "Our Secret Vault is Locked",
      lockedDesc: "Enter our shared secret password to decrypt and reveal our private memories.",
      passwordPlaceholder: "Enter secret password...",
      unlockBtn: "Unlock Vault 💖",
      lockBtn: "Lock Vault",
      hintPrefix: "Password Hint:",
      wrongPassword: "Incorrect password. Please try again.",
      secretNotesTab: "Secret Love Notes",
      diaryTab: "Private Love Diary"
    },
    footer: {
      madeWith: "Crafted with endless devotion for",
      forever: "Forever & Always",
      adminBtn: "Admin Studio"
    }
  },
  bn: {
    nav: {
      story: "আমাদের গল্প",
      gallery: "গ্যালারি",
      letter: "প্রেমের চিঠি",
      music: "আমাদের গান",
      dates: "বিশেষ দিন",
      plans: "স্বপ্নের পথ",
      vault: "গোপন কুটির",
      admin: "অ্যাডমিন প্যানেল"
    },
    hero: {
      daysTogether: "একসাথে কাটানো দিন",
      hours: "ঘণ্টা",
      minutes: "মিনিট",
      seconds: "সেকেন্ড",
      since: "১২ ডিসেম্বর ২০২৩ থেকে",
      yearsCount: "বছরের মধুর পথচলা",
      daysToAnniversary: "দিন বাকি পরবর্তী বার্ষিকীর",
      daysToMilestone: "দিন বাকি পরবর্তী ১০০ দিনের মাইলফলকের"
    },
    timeline: {
      sectionTitle: "আমাদের চলার পথ",
      sectionSubtitle: "যে প্রতিটি পদক্ষেপে দুটি হৃদয় আজ এক আত্মায় পরিণত হয়েছে"
    },
    gallery: {
      sectionTitle: "পোলাারয়েড স্মৃতিমালা",
      sectionSubtitle: "আমাদের অফুরন্ত হাসি, আনন্দ আর ভালোবাসার প্রতিটি মুহূর্তের ছবি",
      emptyTitle: "এখনো কোনো ছবি যুক্ত করা হয়নি",
      emptyDesc: "অ্যাডমিন প্যানেল থেকে তোমাদের সুন্দর ছবিগুলো যুক্ত করে গ্যালারি সাজিয়ে নাও।",
      addPhoto: "অ্যাডমিন থেকে ছবি যোগ করুন"
    },
    letter: {
      sectionTitle: "মনের গভীরের চিঠি",
      sectionSubtitle: "হৃদয়ের অন্তঃস্থল থেকে কেবল তোমার জন্যই লেখা মিষ্টি কিছু কথা",
      tapToOpen: "চিঠিটি খুলতে সিলমোহরে চাপ দিন",
      foldLetter: "চিঠিটি আবার খামে রাখুন"
    },
    music: {
      sectionTitle: "আমাদের মিষ্টি সুর",
      sectionSubtitle: "আমাদের ভালোবাসার মুহূর্তগুলোকে জড়িয়ে রাখা রোমান্টিক মেলোডি",
      nowPlaying: "সুর বাজছে",
      paused: "থামানো হয়েছে",
      synthActive: "অ্যাকোস্টিক পিয়ানো সিন্থেসাইজার চলছে",
      audioReady: "অডিও গান প্রস্তুত"
    },
    dates: {
      sectionTitle: "বিশেষ দিনগুলো",
      sectionSubtitle: "যে দিনগুলো আমরা আজীবন উদযাপন করি এবং অধীর আগ্রহে অপেক্ষা করি",
      daysLeft: "দিন বাকি",
      today: "আজকের দিনটি আমাদের! 🎉",
      past: "উদযাপিত হয়েছে ❤️"
    },
    plans: {
      sectionTitle: "স্বপ্নের বাকেট লিস্ট",
      sectionSubtitle: "হাতে হাত রেখে যে স্বপ্নগুলো আমরা ধীরে ধীরে বাস্তবে রূপ দিচ্ছি",
      completedBadge: "ভালোবাসায় অর্জিত ✨",
      dreamBadge: "পরবর্তী রোমাঞ্চকর স্বপ্ন"
    },
    vault: {
      sectionTitle: "গোপন কুটির",
      sectionSubtitle: "AES-GCM ২৫৬-বিট এনক্রিপ্টেড আমাদের গোপন বার্তা ও ব্যক্তিগত স্মৃতিকথা",
      lockedHeading: "আমাদের গোপন কুটিরটি সুরক্ষিত",
      lockedDesc: "আমাদের ব্যক্তিগত কথা ও ডায়রি দেখতে আমাদের ভালোবাসার পাসওয়ার্ডটি লিখুন।",
      passwordPlaceholder: "গোপন পাসওয়ার্ড লিখুন...",
      unlockBtn: "কুটির উন্মুক্ত করুন 💖",
      lockBtn: "আবার সুরক্ষিত করুন",
      hintPrefix: "পাসওয়ার্ডের সূত্র:",
      wrongPassword: "ভুল পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।",
      secretNotesTab: "গোপন প্রেমের নোট",
      diaryTab: "ব্যক্তিগত ডায়রি"
    },
    footer: {
      madeWith: "অনন্ত ভালোবাসা দিয়ে তৈরি",
      forever: "চিরকালের জন্য",
      adminBtn: "অ্যাডমিন প্রবেশদ্বার"
    }
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('romantic_lang_v2');
      if (saved === 'bn' || saved === 'en') return saved;
    } catch {}
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('romantic_lang_v2', lang);
    } catch {}
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = UI_DICTIONARY[lang] || UI_DICTIONARY.en;

  // Localized field helper: returns `item[field + 'Bn']` if bn mode, else `item[field]`
  const getField = (item, field) => {
    if (!item) return '';
    if (lang === 'bn') {
      const bnKey = `${field}Bn`;
      if (item[bnKey]) return item[bnKey];
    }
    return item[field] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isBn: lang === 'bn', t, getField }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
