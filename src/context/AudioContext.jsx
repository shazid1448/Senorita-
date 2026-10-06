import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { synth } from '../utils/synthAudio';
import { useContent } from './ContentContext';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const { content } = useContent();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthesizer, setIsSynthesizer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(180); // Default 3 mins for synth
  const [volume, setVolumeState] = useState(0.7);

  const audioRef = useRef(new Audio());
  const synthTimerRef = useRef(null);

  const musicSettings = content.music || {
    title: "Romantic Piano Melody",
    artist: "Shazid & Nithia",
    audioFile: "/assets/audio/romantic-song.mp3",
    synthesizerEnabled: true
  };

  // Sync volume
  const setVolume = (val) => {
    setVolumeState(val);
    audioRef.current.volume = val;
    synth.setVolume(val);
  };

  // Helper format seconds to mm:ss
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // Fallback to procedural synth
  const playSynthesizer = () => {
    setIsSynthesizer(true);
    synth.setVolume(volume);
    synth.start();
    setIsPlaying(true);
  };

  const stopAll = () => {
    audioRef.current.pause();
    synth.stop();
    setIsPlaying(false);
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  // Handle synth progress ticker
  useEffect(() => {
    if (isPlaying && isSynthesizer) {
      synthTimerRef.current = setInterval(() => {
        setCurrentTimeSec(prev => {
          const next = prev + 1;
          const total = durationSec || 180;
          setProgress((next % total) / total * 100);
          return next % total;
        });
      }, 1000);
    } else {
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
      }
    }
    return () => {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    };
  }, [isPlaying, isSynthesizer, durationSec]);

  // Audio element events
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = musicSettings.audioFile || '';
    audio.preload = 'metadata';

    const onTimeUpdate = () => {
      if (!isSynthesizer && audio.duration) {
        setCurrentTimeSec(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDurationSec(audio.duration);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTimeSec(0);
    };

    const onError = () => {
      // Audio file missing or invalid: smoothly switch to synthesizer if enabled
      if (musicSettings.synthesizerEnabled !== false && isPlaying) {
        playSynthesizer();
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [musicSettings.audioFile, musicSettings.synthesizerEnabled, isSynthesizer, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      stopAll();
      return;
    }

    // Try playing MP3 audio file
    const audio = audioRef.current;
    if (audio.src && audio.src !== window.location.href) {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsSynthesizer(false);
      }).catch(() => {
        // Fallback to synthesizer on error
        playSynthesizer();
      });
    } else {
      playSynthesizer();
    }
  };

  const seek = (percentage) => {
    const clamped = Math.max(0, Math.min(100, percentage));
    setProgress(clamped);
    const targetSec = (clamped / 100) * (durationSec || 180);
    setCurrentTimeSec(targetSec);
    if (!isSynthesizer && audioRef.current.duration) {
      audioRef.current.currentTime = targetSec;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isSynthesizer,
        progress,
        currentTime: formatTime(currentTimeSec),
        duration: formatTime(durationSec),
        volume,
        setVolume,
        togglePlay,
        seek,
        musicSettings
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
}
