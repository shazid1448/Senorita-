import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App crashed:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('romantic_content_v2');
      if ('caches' in window) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
      }
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0710] text-[#F5E9EE] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#5C1030] border border-[#FF6FA5]/40 flex items-center justify-center text-3xl mb-4 shadow-lg animate-pulse">
            💖
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 text-white">
            Shazid & Nithia — Endless Love
          </h2>
          <p className="text-sm text-[#C9A8B6] max-w-md mb-6 leading-relaxed">
            একটি অপ্রত্যাশিত সমস্যা হয়েছে। পেজটি নতুন করে রিলোড করতে নিচের বাটনে চাপ দিন।
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7A1B40] via-[#B85D83] to-[#FF6FA5] text-white font-medium text-sm shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            Reload & Fix (পেজ রিফ্রেশ করুন)
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
