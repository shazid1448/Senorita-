/**
 * Romantic Web Audio API Synthesizer Fallback.
 * Plays an acoustic romantic piano arpeggio and chord progression
 * when no custom MP3 is present or if the MP3 fails to load.
 */

class RomanticSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.currentStep = 0;
    this.volume = 0.5;
    this.gainNode = null;

    // Ethereal romantic chord arpeggios (frequencies in Hz)
    // Eb maj9, Cm7, Ab add9, Bb
    this.arpeggios = [
      // Eb maj9
      [155.56, 196.00, 233.08, 293.66, 349.23, 392.00, 466.16],
      // Cm9
      [130.81, 196.00, 233.08, 311.13, 392.00, 466.16, 587.33],
      // Ab add9
      [103.83, 155.56, 261.63, 311.13, 392.00, 466.16, 523.25],
      // Bb sus4 -> Bb
      [116.54, 174.61, 233.08, 311.13, 349.23, 466.16, 587.33]
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = this.volume;
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  playNote(freq, time, duration = 2.4) {
    if (!this.ctx) return;
    const now = time || this.ctx.currentTime;

    // Fundamental tone
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Warm harmonic overtone (triangle)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Warm lowpass filter to simulate soft felt hammer of piano
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq > 300 ? 1800 : 1200, now);

    // Gentle decay envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.28, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Overtone gain
    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.07, now + 0.03);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.7));

    osc1.connect(noteGain);
    osc2.connect(overtoneGain);
    noteGain.connect(filter);
    overtoneGain.connect(filter);
    filter.connect(this.gainNode);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNextArpeggio();
  }

  scheduleNextArpeggio() {
    if (!this.isPlaying || !this.ctx) return;

    const chordIndex = Math.floor(this.currentStep / 8) % this.arpeggios.length;
    const chord = this.arpeggios[chordIndex];
    const noteIndex = this.currentStep % chord.length;
    const freq = chord[noteIndex];

    const noteDuration = noteIndex === 0 ? 3.0 : 2.2;
    this.playNote(freq, this.ctx.currentTime, noteDuration);

    this.currentStep = (this.currentStep + 1) % 64;

    // Soft gentle tempo: ~460ms between notes
    this.timerId = setTimeout(() => {
      this.scheduleNextArpeggio();
    }, 460);
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const synth = new RomanticSynthesizer();
