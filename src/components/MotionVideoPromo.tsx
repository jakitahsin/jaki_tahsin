"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowRight,
  Download,
  Film,
  Zap,
  CheckCircle,
  Eye,
  Layers,
  Sun,
  Moon,
} from "lucide-react";

interface Props {
  onClose?: () => void;
}

const DURATION = 30.0; // Exactly 30 seconds

export function MotionVideoPromo({ onClose }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Simulated interactive actions triggered by the automated cursor
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isCursorClicking, setIsCursorClicking] = useState(false);
  const [cursorRipple, setCursorRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  // Scene state modifications triggered by cursor clicks
  const [avatarActive, setAvatarActive] = useState(false);
  const [billboardNight, setBillboardNight] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const beatTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // --- AUDIO SYNTHESIS ENGINE (120 BPM MOTION GRAPHICS SOUNDTRACK) ---
  const initAudioEngine = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.setValueAtTime(isMuted ? 0 : 0.75, ctx.currentTime);
      master.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    } catch {
      // AudioContext not supported
    }
  }, [isMuted]);

  // Bass Kick (Punchy electronic 808 kick)
  const triggerKick = useCallback((time: number) => {
    if (!audioCtxRef.current || !masterGainRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.18);

    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(time);
    osc.stop(time + 0.22);
  }, [isMuted]);

  // Hi-hat / Snap Click
  const triggerHiHat = useCallback((time: number, isAccent: boolean = false) => {
    if (!audioCtxRef.current || !masterGainRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(isAccent ? 7500 : 9000, time);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(isAccent ? 0.35 : 0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (isAccent ? 0.05 : 0.03));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    noise.start(time);
  }, [isMuted]);

  // Synth Bass Note
  const triggerSynthBass = useCallback((time: number, freq: number) => {
    if (!audioCtxRef.current || !masterGainRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(120, time + 0.22);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(time);
    osc.stop(time + 0.25);
  }, [isMuted]);

  // SFX: Mechanical Mouse Click
  const playMouseClickSFX = useCallback(() => {
    if (!audioCtxRef.current || !masterGainRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.035);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(now);
    osc.stop(now + 0.035);
  }, [isMuted]);

  // SFX: Camera Whoosh
  const playWhooshSFX = useCallback(() => {
    if (!audioCtxRef.current || !masterGainRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(280, now);
    filter.frequency.exponentialRampToValueAtTime(3400, now + 0.16);
    filter.frequency.exponentialRampToValueAtTime(320, now + 0.35);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    noise.start(now);
  }, [isMuted]);

  // SFX: Electric Flare / Floodlight Ignites
  const playFlareSFX = useCallback(() => {
    if (!audioCtxRef.current || !masterGainRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.8);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(now);
    osc.stop(now + 0.8);
  }, [isMuted]);

  // SFX: Celebration Chime Arpeggio
  const playCelebrationChime = useCallback(() => {
    if (!audioCtxRef.current || !masterGainRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.25, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.5);

      osc.connect(gain);
      gain.connect(masterGainRef.current!);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.5);
    });
  }, [isMuted]);

  // Rhythmic Soundtrack Clock (120 BPM = 0.5s per quarter note)
  useEffect(() => {
    if (!isPlaying) {
      if (beatTimerRef.current) clearInterval(beatTimerRef.current);
      return;
    }

    const intervalMs = 250; // 8th notes at 120 BPM
    let step = Math.floor((currentTime / DURATION) * 120);

    const bassNotes = [55, 55, 65.4, 73.4, 55, 55, 82.4, 73.4]; // A1, C2, D2, E2

    beatTimerRef.current = setInterval(() => {
      if (!audioCtxRef.current) return;
      const now = audioCtxRef.current.currentTime;

      // Kick on 1 and 3 (every 4 eighth notes)
      if (step % 4 === 0) {
        triggerKick(now);
      }

      // Hi-hat on every 8th note, accent on offbeats
      triggerHiHat(now, step % 2 === 1);

      // Bassline pulse on selected steps
      if (step % 2 === 0) {
        const note = bassNotes[(step / 2) % bassNotes.length];
        triggerSynthBass(now, note);
      }

      step++;
    }, intervalMs);

    return () => {
      if (beatTimerRef.current) clearInterval(beatTimerRef.current);
    };
  }, [isPlaying, currentTime, triggerKick, triggerHiHat, triggerSynthBass]);

  // Update Mute in real time
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        isMuted ? 0 : 0.75,
        audioCtxRef.current.currentTime
      );
    }
  }, [isMuted]);

  // --- AUTOMATED 30-SECOND MOTION TIMELINE & CURSOR CHOREOGRAPHY ---
  const triggerClickAnimation = useCallback((x: number, y: number) => {
    setIsCursorClicking(true);
    setCursorRipple({ x, y, id: Date.now() });
    playMouseClickSFX();
    setTimeout(() => setIsCursorClicking(false), 200);
  }, [playMouseClickSFX]);

  // Frame loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const updateFrame = () => {
      const now = performance.now();
      const elapsed = (now - startTimeRef.current) / 1000;

      if (elapsed >= DURATION) {
        setCurrentTime(DURATION);
        setIsPlaying(false);
        return;
      }

      setCurrentTime(elapsed);

      // --- CURSOR CHOREOGRAPHY KEYFRAMES ---
      // 0.0s - 3.5s: Glide towards "Explore My Work" button (x: 26%, y: 58%)
      if (elapsed < 3.5) {
        const p = Math.min(1, elapsed / 3.0);
        const ease = p * p * (3 - 2 * p); // smoothstep
        setCursorPos({ x: 10 + ease * 16, y: 30 + ease * 28 });
      }
      // 3.5s: Click "Explore My Work"
      else if (elapsed >= 3.5 && elapsed < 4.0) {
        setCursorPos({ x: 26, y: 58 });
      }
      // 4.0s - 7.5s: Glide towards 3D Avatar (x: 75%, y: 48%)
      else if (elapsed >= 4.0 && elapsed < 8.0) {
        const p = (elapsed - 4.0) / 3.5;
        const ease = p * p * (3 - 2 * p);
        setCursorPos({ x: 26 + ease * 49, y: 58 - ease * 10 });
      }
      // 8.0s - 10.5s: Avatar clicked
      else if (elapsed >= 8.0 && elapsed < 11.0) {
        setCursorPos({ x: 75, y: 48 });
      }
      // 11.0s - 14.5s: Glide towards Billboard Night Light switch (x: 50%, y: 22%)
      else if (elapsed >= 11.0 && elapsed < 14.5) {
        const p = (elapsed - 11.0) / 3.5;
        const ease = p * p * (3 - 2 * p);
        setCursorPos({ x: 75 - ease * 25, y: 48 - ease * 26 });
      }
      // 14.5s - 17.5s: Billboard Spotlight Active
      else if (elapsed >= 14.5 && elapsed < 18.0) {
        setCursorPos({ x: 50, y: 22 });
      }
      // 18.0s - 21.0s: Glide towards Color Match Swatch (x: 52%, y: 62%)
      else if (elapsed >= 18.0 && elapsed < 21.0) {
        const p = (elapsed - 18.0) / 3.0;
        const ease = p * p * (3 - 2 * p);
        setCursorPos({ x: 50 + ease * 2, y: 22 + ease * 40 });
      }
      // 21.0s - 24.0s: Game Confetti
      else if (elapsed >= 21.0 && elapsed < 24.0) {
        setCursorPos({ x: 52, y: 62 });
      }
      // 24.0s - 28.0s: Glide towards Final CTA button (x: 50%, y: 70%)
      else if (elapsed >= 24.0 && elapsed < 28.0) {
        const p = (elapsed - 24.0) / 3.0;
        const ease = p * p * (3 - 2 * p);
        setCursorPos({ x: 52 - ease * 2, y: 62 + ease * 8 });
      } else {
        setCursorPos({ x: 50, y: 70 });
      }

      animationFrameRef.current = requestAnimationFrame(updateFrame);
    };

    animationFrameRef.current = requestAnimationFrame(updateFrame);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  // Triggers based on precise timestamps
  const lastActionTime = useRef<number>(0);
  useEffect(() => {
    // 3.5s: Click Explore
    if (currentTime >= 3.5 && lastActionTime.current < 3.5) {
      triggerClickAnimation(26, 58);
      playWhooshSFX();
    }
    // 8.0s: Click Avatar
    if (currentTime >= 8.0 && lastActionTime.current < 8.0) {
      triggerClickAnimation(75, 48);
      setAvatarActive(true);
      playCelebrationChime();
    }
    // 14.2s: Click Night Mode on Billboard
    if (currentTime >= 14.2 && lastActionTime.current < 14.2) {
      triggerClickAnimation(50, 22);
      setBillboardNight(true);
      playFlareSFX();
    }
    // 21.0s: Click Color Match Swatch
    if (currentTime >= 21.0 && lastActionTime.current < 21.0) {
      triggerClickAnimation(52, 62);
      setGameScore(100);
      setShowConfetti(true);
      playCelebrationChime();
    }
    // 27.5s: Final CTA Click
    if (currentTime >= 27.5 && lastActionTime.current < 27.5) {
      triggerClickAnimation(50, 70);
      playCelebrationChime();
    }

    lastActionTime.current = currentTime;
  }, [currentTime, triggerClickAnimation, playWhooshSFX, playCelebrationChime, playFlareSFX]);

  // Play / Start Handler
  const startPromo = () => {
    initAudioEngine();
    setHasStarted(true);
    setIsPlaying(true);
    startTimeRef.current = performance.now() - currentTime * 1000;
  };

  const pausePromo = () => {
    setIsPlaying(false);
  };

  const restartPromo = () => {
    setCurrentTime(0);
    lastActionTime.current = 0;
    setAvatarActive(false);
    setBillboardNight(false);
    setGameScore(0);
    setShowConfetti(false);
    startTimeRef.current = performance.now();
    setIsPlaying(true);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Format Timecode: 00:SS:FF
  const formatTimecode = (sec: number) => {
    const s = Math.floor(sec);
    const ms = Math.floor((sec - s) * 60); // 60 fps frames
    return `00:${s.toString().padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
  };

  // Simulated Export Video capture
  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(10);
    const t = setInterval(() => {
      setExportProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setIsExporting(false);
          alert("30-Second 4K 60FPS Promo Video exported successfully! Ready for Instagram, Behance, and Twitter.");
          return 100;
        }
        return p + 20;
      });
    }, 400);
  };

  // --- CAMERA 3D TRANSFORM LOGIC BASED ON SCENE ---
  let sceneClass = "scale-100 rotate-0";
  let activeSceneName = "01 // HERO ARCHITECTURE";

  if (currentTime < 4.0) {
    // Scene 1: Hero Awakening (Angles in from perspective)
    sceneClass = "perspective-1000 rotate-x-2 -rotate-y-1 scale-100";
    activeSceneName = "01 // HERO ARCHITECTURE";
  } else if (currentTime >= 4.0 && currentTime < 11.0) {
    // Scene 2: 3D Persona Zoom & Pan Right
    sceneClass = "perspective-1000 -translate-x-12 scale-105 rotate-y-3";
    activeSceneName = "02 // 3D VINYL PERSONA";
  } else if (currentTime >= 11.0 && currentTime < 18.0) {
    // Scene 3: Billboard Wide Gantry Perspective
    sceneClass = "perspective-1000 rotate-x-3 scale-102";
    activeSceneName = "03 // HIGHWAY BILLBOARD SCALE";
  } else if (currentTime >= 18.0 && currentTime < 24.0) {
    // Scene 4: Digital Playground Game Focus
    sceneClass = "perspective-1000 translate-y-2 scale-105";
    activeSceneName = "04 // INTERACTIVE PLAYGROUND";
  } else {
    // Scene 5: Grand Pullout Finale
    sceneClass = "perspective-1000 scale-98 -rotate-x-2";
    activeSceneName = "05 // GRAND FINALE & CTA";
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] max-h-[88vh] rounded-2xl border border-lime/40 bg-obsidian text-warm overflow-hidden shadow-[0_0_80px_rgba(215,255,100,0.15)] flex flex-col justify-between select-none font-sans"
    >
      {/* ANAMORPHIC HORIZONTAL LENS FLARE GLOW */}
      <div className="pointer-events-none absolute top-1/3 -left-1/4 w-[150%] h-24 bg-gradient-to-r from-transparent via-lime/20 to-transparent blur-3xl transform -rotate-6 animate-pulse" />

      {/* SCANLINES & FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-40 mix-blend-overlay" />

      {/* CINEMATIC LETTERBOX FRAME BRACKETS */}
      <div className="pointer-events-none absolute inset-4 z-30 border border-graphite/40 rounded-xl">
        <div className="absolute top-2 left-2 text-[10px] font-mono text-lime/80 tracking-widest flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
          <span>REC [ 4K · 60 FPS ]</span>
        </div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-muted tracking-widest">
          35MM T1.5 // AF-C ACTIVE
        </div>
        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-muted tracking-widest">
          JAKI TAHSIN // MOTION PROMO
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-lime font-bold tracking-widest">
          {formatTimecode(currentTime)} / 00:30:00
        </div>
      </div>

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-40 flex items-center justify-between px-6 py-3 border-b border-graphite/60 bg-charcoal/80 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-lime">
            PRO SHOWREEL 30S
          </span>
          <span className="text-muted/40 text-xs">|</span>
          <span className="text-xs font-mono text-warm font-semibold truncate max-w-[240px]">
            {activeSceneName}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              isMuted
                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : "bg-lime/10 text-lime border border-lime/30"
            }`}
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            <span className="text-[10px] uppercase font-bold hidden sm:inline">
              {isMuted ? "SFX MUTED" : "120 BPM BEAT + SFX"}
            </span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded hover:bg-elevated text-muted hover:text-warm"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-elevated hover:bg-red-500/20 hover:text-red-400 text-muted ml-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* CENTER STAGE: 3D DYNAMIC BROWSER STAGE */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden p-6 perspective-[1200px]">
        {/* SIMULATED BROWSER CHASSIS */}
        <div
          className={`relative w-full max-w-5xl h-full rounded-xl border border-graphite/80 bg-obsidian shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden transition-transform duration-700 ease-out flex flex-col ${sceneClass}`}
        >
          {/* Browser Top Window Bar */}
          <div className="h-8 border-b border-graphite/70 bg-charcoal/90 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="px-6 py-0.5 rounded-md bg-obsidian text-[10px] font-mono text-muted flex items-center space-x-2 border border-graphite/40">
              <span className="text-lime">https://</span>
              <span>jakitahsin.com</span>
            </div>
            <div className="text-[10px] font-mono text-muted">100%</div>
          </div>

          {/* Browser Content Stage */}
          <div className="relative flex-1 w-full p-6 sm:p-8 flex items-center justify-center overflow-hidden">
            {/* SCENE 1: HERO AWAKENING (0.0s - 4.0s) */}
            {currentTime < 4.0 && (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-lime/40 bg-lime/10 text-lime text-xs font-mono font-bold tracking-wider">
                    <span>GRAPHIC DESIGNER · BANGLADESH</span>
                  </div>
                  <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-warm tracking-tight leading-tight">
                    Making ideas <br />
                    <span className="text-lime underline decoration-lime/40 underline-offset-8">
                      impossible
                    </span>{" "}
                    to ignore.
                  </h1>
                  <p className="text-xs sm:text-sm text-muted max-w-md">
                    Brand identity systems, massive outdoor advertising, and structured visual engineering.
                  </p>
                  <div className="pt-2">
                    <button
                      className={`inline-flex items-center space-x-2 rounded-full px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 ${
                        currentTime >= 3.5
                          ? "bg-lime text-obsidian scale-105 shadow-[0_0_30px_rgba(215,255,100,0.6)]"
                          : "bg-lime text-obsidian shadow-lg"
                      }`}
                    >
                      <span>Explore My Work</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex justify-center">
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-lime/60 p-2 bg-charcoal/80 shadow-2xl">
                    <Image
                      src="/assets/3d-avatar.png"
                      alt="Avatar"
                      fill
                      className="object-cover rounded-full p-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 2: 3D PERSONA ZOOM (4.0s - 11.0s) */}
            {currentTime >= 4.0 && currentTime < 11.0 && (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in">
                <div className="flex-1 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-lime px-2 py-0.5 rounded bg-lime/10 border border-lime/30 inline-block">
                    ACT II // Bespoke 3D Avatar
                  </span>
                  <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-warm leading-tight">
                    Stylized 3D Vinyl Character Modeling
                  </h2>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-md">
                    Preserves Jaki Tahsin&apos;s authentic facial structure, hairstyle, and goatee in a tactile designer-toy vinyl finish with Electric Lime (#D7FF64) rim lighting.
                  </p>
                  <div className="flex items-center space-x-2 pt-2">
                    <span className="text-[11px] font-mono text-lime bg-lime/10 px-2 py-1 rounded border border-lime/30 font-bold">
                      {avatarActive ? "✦ INTERACTIVE SPARK TRIGGERED" : "Hover or Click Avatar"}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex justify-center">
                  <div
                    className={`relative w-56 h-56 sm:w-72 sm:h-72 rounded-full border-4 transition-all duration-500 ${
                      avatarActive
                        ? "border-lime shadow-[0_0_50px_rgba(215,255,100,0.5)] scale-110 rotate-6"
                        : "border-lime/60 shadow-2xl"
                    } p-2 bg-gradient-to-b from-charcoal to-obsidian`}
                  >
                    <Image
                      src="/assets/3d-avatar.png"
                      alt="Jaki Tahsin 3D Avatar"
                      fill
                      className="object-cover rounded-full p-2"
                    />
                    {avatarActive && (
                      <div className="absolute -inset-4 rounded-full border border-lime/60 animate-ping pointer-events-none" />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 3: HIGHWAY BILLBOARDS (11.0s - 18.0s) */}
            {currentTime >= 11.0 && currentTime < 18.0 && (
              <div className="w-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-lime px-2 py-0.5 rounded bg-lime/10 border border-lime/30">
                    ACT III // Outdoor Advertising Scale
                  </span>
                  <div
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-all ${
                      billboardNight
                        ? "bg-lime text-obsidian border-lime font-bold shadow-[0_0_15px_rgba(215,255,100,0.4)]"
                        : "bg-charcoal border-graphite text-muted"
                    }`}
                  >
                    {billboardNight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                    <span>{billboardNight ? "Night Spotlights Active" : "Daylight Mode"}</span>
                  </div>
                </div>

                <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-warm mb-3">
                  Fides Properties — Highway Gantry Billboards
                </h2>

                <div className="relative w-full max-w-2xl aspect-[16/9] rounded-lg border-4 border-stone-800 bg-stone-900 shadow-2xl overflow-hidden">
                  {billboardNight && (
                    <>
                      {/* Spotlight Beams */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lime/20 via-transparent to-black/70 z-10 animate-pulse" />
                      <div className="absolute top-0 left-1/4 w-32 h-64 bg-lime/15 blur-xl -rotate-12 z-10" />
                      <div className="absolute top-0 right-1/4 w-32 h-64 bg-lime/15 blur-xl rotate-12 z-10" />
                    </>
                  )}
                  <Image
                    src="/assets/works/billboards.webp"
                    alt="Highway Billboard Campaign"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 z-20 px-2 py-1 rounded bg-obsidian/90 text-[10px] font-mono text-lime border border-lime/40">
                    40 × 20 FT COMMUTE CORRIDOR
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 4: DIGITAL PLAYGROUND & COLOR MATCH (18.0s - 24.0s) */}
            {currentTime >= 18.0 && currentTime < 24.0 && (
              <div className="w-full flex flex-col items-center justify-center text-center animate-fade-in">
                <span className="text-xs font-mono uppercase tracking-widest text-lime px-2 py-0.5 rounded bg-lime/10 border border-lime/30 mb-2">
                  ACT IV // Digital Playground
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-warm mb-2">
                  Color Match Challenge &amp; Palette Engine
                </h2>
                <p className="text-xs sm:text-sm text-muted max-w-md mb-4">
                  Interactive browser gameplay engaging prospective clients directly.
                </p>

                <div className="flex items-center space-x-6 p-5 rounded-xl border border-graphite bg-charcoal/90 shadow-2xl">
                  <div className="text-left font-mono text-xs pr-4 border-r border-graphite">
                    <span className="text-muted block text-[10px]">TARGET:</span>
                    <span className="text-lime font-bold text-sm">#D7FF64 Lime</span>
                    <span className="text-warm block mt-1 font-bold">Score: {gameScore}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-14 w-14 rounded-lg bg-[#D7FF64] border-2 border-white transition-transform ${
                        showConfetti ? "scale-125 shadow-[0_0_25px_rgba(215,255,100,0.8)]" : ""
                      }`}
                    />
                    <div className="h-14 w-14 rounded-lg bg-[#88B04B] opacity-60" />
                    <div className="h-14 w-14 rounded-lg bg-[#A0DB8E] opacity-60" />
                  </div>
                </div>

                {showConfetti && (
                  <div className="mt-3 inline-flex items-center space-x-2 text-xs font-mono text-lime font-bold animate-bounce">
                    <Sparkles className="h-4 w-4" />
                    <span>PERFECT COLOR MATCH! +100 PTS</span>
                  </div>
                )}
              </div>
            )}

            {/* SCENE 5: GRAND FINALE & CTA (24.0s - 30.0s) */}
            {currentTime >= 24.0 && (
              <div className="w-full flex flex-col items-center justify-center text-center animate-fade-in p-6">
                <div className="h-14 w-14 rounded-full bg-lime/20 border border-lime flex items-center justify-center text-lime mb-4 shadow-[0_0_30px_rgba(215,255,100,0.4)] animate-bounce">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-warm mb-2">
                  Making ideas <br />
                  <span className="text-lime">impossible to ignore.</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted max-w-md mb-6">
                  Available for global brand identity, large-scale campaigns, and creative art direction.
                </p>
                <button
                  className={`inline-flex items-center space-x-2 rounded-full px-8 py-4 text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 ${
                    currentTime >= 27.5
                      ? "bg-lime text-obsidian scale-110 shadow-[0_0_40px_rgba(215,255,100,0.8)]"
                      : "bg-lime text-obsidian shadow-lg"
                  }`}
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- ANIMATED HIGH-TECH DESIGNER MOUSE CURSOR --- */}
        <div
          className="pointer-events-none absolute z-50 transition-all duration-75 ease-out"
          style={{
            left: `${cursorPos.x}%`,
            top: `${cursorPos.y}%`,
            transform: `translate(-2px, -2px) scale(${isCursorClicking ? 0.85 : 1})`,
          }}
        >
          {/* Custom SVG Designer Cursor */}
          <svg
            className="w-7 h-7 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
              fill="#D7FF64"
              stroke="#101010"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Cursor Label Halo */}
          <div className="absolute top-5 left-5 px-2 py-0.5 rounded bg-obsidian/90 border border-lime text-[9px] font-mono font-bold text-lime whitespace-nowrap shadow-md">
            JAKI TAHSIN
          </div>

          {/* Click Ripple Wave */}
          {cursorRipple && (
            <div
              key={cursorRipple.id}
              className="absolute -top-4 -left-4 w-12 h-12 rounded-full border-2 border-lime animate-ping pointer-events-none"
            />
          )}
        </div>
      </div>

      {/* START PROMO SPLASH OVERLAY (If not yet started) */}
      {!hasStarted && (
        <div
          onClick={startPromo}
          className="absolute inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-lime bg-charcoal/90 text-lime shadow-[0_0_40px_rgba(215,255,100,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-lime group-hover:text-obsidian mb-6">
            <Play className="h-10 w-10 fill-current ml-1" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-lime font-bold mb-2">
            30-Second Motion Graphics Promo
          </span>
          <h3 className="font-heading text-2xl sm:text-4xl font-extrabold text-warm text-center">
            Click to Play Official Website Preview
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted text-center max-w-sm">
            Experience animated mouse interactions, 3D perspective camera motion, and synced 120 BPM sound design.
          </p>
        </div>
      )}

      {/* BOTTOM CONTROL FOOTER */}
      <div className="relative z-40 border-t border-graphite/60 bg-charcoal/90 px-6 py-3 backdrop-blur-md">
        {/* Scrubber Timeline */}
        <div className="relative h-2 w-full rounded-full bg-stone-800 overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-lime via-lime to-emerald-400 transition-all duration-100"
            style={{ width: `${(currentTime / DURATION) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (isPlaying) pausePromo();
                else startPromo();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-obsidian shadow hover:bg-lime-hover transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={restartPromo}
              className="p-1.5 rounded hover:bg-elevated text-muted hover:text-warm"
              title="Restart 30s Promo"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <span className="font-mono text-xs font-bold text-warm">
              {currentTime.toFixed(1)}s / 30.0s
            </span>
          </div>

          {/* Export Video Capture Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-charcoal border border-lime/40 text-xs font-mono text-lime hover:bg-lime hover:text-obsidian transition-all shadow-[0_0_15px_rgba(215,255,100,0.15)]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isExporting ? `Exporting ${exportProgress}%...` : "Download Promo MP4"}</span>
            </button>

            <Link
              href="/work"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-lime text-obsidian text-xs font-heading font-bold uppercase tracking-wider hover:bg-lime-hover transition-all"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
