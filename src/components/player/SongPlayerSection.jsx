import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { useLanguage } from '../../context/LanguageContext';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { Play, Pause, Disc, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

export default function SongPlayerSection() {
  const {
    isPlaying,
    isSynthesizer,
    progress,
    currentTime,
    duration,
    volume,
    setVolume,
    togglePlay,
    seek,
    musicSettings
  } = useAudio();

  const { t, isBn } = useLanguage();

  const handleSeekChange = (e) => {
    seek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <section id="music" className="py-20 md:py-28 px-4 relative max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs uppercase tracking-widest text-romantic-rose font-medium flex items-center justify-center gap-1.5">
          <Disc className="w-3.5 h-3.5" />
          <span>{isBn ? 'মধুর সুর' : 'Melody of Our Hearts'}</span>
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white dark:text-white">
          {t.music.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-romantic-rose-muted">
          {t.music.sectionSubtitle}
        </p>
      </div>

      <GlassCard className="max-w-2xl mx-auto p-6 sm:p-10 border border-romantic-rose/30 shadow-glow-burgundy">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Spinning Vinyl Album Art */}
          <div className="relative">
            <div
              className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-romantic-gold/40 shadow-2xl relative flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#1E0812] via-[#3D0C20] to-[#12040B] ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-3 rounded-full border border-romantic-rose/20" />
              <div className="absolute inset-6 rounded-full border border-romantic-rose/15" />
              <div className="absolute inset-9 rounded-full border border-romantic-rose/10" />

              {/* Center Label */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-romantic-rose/25 border-2 border-romantic-gold/70 flex flex-col items-center justify-center text-romantic-gold">
                <Heart className="w-5 h-5 fill-romantic-gold/40 animate-pulse" />
              </div>
            </div>

            {/* Glowing Accent Ring */}
            <div className="absolute -inset-2 rounded-full bg-romantic-rose/10 blur-md -z-10" />
          </div>

          {/* Controls & Track Details */}
          <div className="flex-1 w-full text-center sm:text-left space-y-4">
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-romantic-rose/15 text-romantic-rose border border-romantic-rose/25 mb-2">
                <Sparkles className="w-3 h-3 text-romantic-gold" />
                <span>{isSynthesizer ? t.music.synthActive : t.music.audioReady}</span>
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white dark:text-white">
                {musicSettings.title}
              </h3>
              <p className="text-xs sm:text-sm text-romantic-rose-muted">
                {musicSettings.artist}
              </p>
            </div>

            {/* Scrubbable Seek Bar */}
            <div className="space-y-1.5">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress || 0}
                onChange={handleSeekChange}
                className="w-full h-1.5 bg-romantic-burgundy-dark/60 rounded-lg appearance-none cursor-pointer accent-romantic-rose"
                aria-label="Track progress seek"
              />
              <div className="flex justify-between text-xs text-romantic-rose-muted font-mono">
                <span>{currentTime}</span>
                <span>{duration}</span>
              </div>
            </div>

            {/* Play/Pause Button and Volume */}
            <div className="flex items-center justify-between sm:justify-start gap-6 pt-2">
              <button
                onClick={togglePlay}
                type="button"
                className="btn-romantic-gradient p-3.5 sm:p-4 rounded-full flex items-center justify-center min-w-[50px] min-h-[50px] shadow-glow-rose group"
                aria-label={isPlaying ? "Pause Song" : "Play Song"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white fill-white" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                )}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-romantic-rose-muted" />
                ) : (
                  <Volume2 className="w-4 h-4 text-romantic-rose" />
                )}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 sm:w-24 h-1.5 bg-romantic-burgundy-dark/60 rounded-lg appearance-none cursor-pointer accent-romantic-rose"
                  aria-label="Volume slider"
                />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
