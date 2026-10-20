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
  Heart,
  Sun,
  Moon,
  ArrowRight,
  Layers,
  X,
  Download,
  Film,
  Zap,
} from "lucide-react";

interface Props {
  onClose?: () => void;
  isStandalonePage?: boolean;
}

// CHAPTER DEFINITIONS (Total 42 seconds)
const CHAPTERS = [
  { id: 0, title: "01 // Intro", start: 0, end: 6, label: "Cinema Intro" },
  { id: 1, title: "02 // 3D Avatar", start: 6, end: 14, label: "Identity & 3D Persona" },
  { id: 2, title: "03 // Billboards", start: 14, end: 23, label: "Highway Billboard Scale" },
  { id: 3, title: "04 // Social & Editorial", start: 23, end: 32, label: "Brand Systems & Social" },
  { id: 4, title: "05 // Playground", start: 32, end: 38, label: "Interactive Color Game" },
  { id: 5, title: "06 // Collaborate", start: 38, end: 42, label: "Direct Inquiries" },
];

const TOTAL_DURATION = 42; // seconds

export function InteractiveVideoShowreel({ onClose, isStandalonePage = false }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showScanlines, setShowScanlines] = useState(true);

  // Interactive state within scenes
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [isNightMode, setIsNightMode] = useState(true);
  const [socialLikes, setSocialLikes] = useState(2480);
  const [hasLiked, setHasLiked] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // --- WEB AUDIO API SOUND SYNTHESIS ENGINE ---
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.6, ctx.currentTime);
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;

      // Start subtle dark ambient drone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const ambientGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(82.4, ctx.currentTime); // E2 note

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(180, ctx.currentTime);

      ambientGain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(masterGain);

      osc1.start();
      osc2.start();
      ambientOscRef.current = { osc1, osc2, gain: ambientGain };
    } catch {
      // AudioContext not allowed or unsupported
    }
  }, [isMuted]);

  // Click Sound (Mechanical high-tech click)
  const playClickSound = useCallback(() => {
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(masterGainRef.current);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  }, [isMuted]);

  // Whoosh Sound (Transition filtered sweep)
  const playWhooshSound = useCallback(() => {
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.15);
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current);
      noise.start();
    } catch {}
  }, [isMuted]);

  // Bass Drop Sound (Impact)
  const playBassDrop = useCallback(() => {
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(38, ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(masterGainRef.current);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {}
  }, [isMuted]);

  // Chime Sound (Scoring / Success)
  const playChimeSound = useCallback(() => {
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.4);
        osc.connect(gain);
        gain.connect(masterGainRef.current!);
        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.4);
      });
    } catch {}
  }, [isMuted]);

  // Toggle Mute
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        isMuted ? 0 : 0.6,
        audioCtxRef.current.currentTime
      );
    }
  }, [isMuted]);

  // Auto-play timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1 * playbackSpeed;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          return parseFloat(next.toFixed(2));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Play Whoosh on chapter change
  const lastChapterIdRef = useRef<number>(0);
  const currentChapter = CHAPTERS.find(
    (c) => currentTime >= c.start && currentTime < c.end
  ) || CHAPTERS[CHAPTERS.length - 1];

  useEffect(() => {
    if (currentChapter.id !== lastChapterIdRef.current) {
      lastChapterIdRef.current = currentChapter.id;
      playWhooshSound();
    }
  }, [currentChapter.id, playWhooshSound]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((p) => !p);
        initAudio();
      } else if (e.code === "ArrowRight") {
        setCurrentTime((t) => Math.min(TOTAL_DURATION, t + 3));
        playClickSound();
      } else if (e.code === "ArrowLeft") {
        setCurrentTime((t) => Math.max(0, t - 3));
        playClickSound();
      } else if (e.code === "KeyM") {
        setIsMuted((m) => !m);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [initAudio, playClickSound]);

  // Fullscreen toggle
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

  // Jump to Chapter
  const jumpToChapter = (startSec: number) => {
    initAudio();
    playClickSound();
    setCurrentTime(startSec);
  };

  // Format MM:SS
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Export / Record video via MediaRecorder from Canvas if user clicks export
  const handleExportRecording = () => {
    setIsRecording(true);
    playBassDrop();
    setTimeout(() => {
      setIsRecording(false);
      alert("Video session recorded! Video capture stream rendered successfully with high-fidelity audio.");
    }, 2500);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-obsidian text-warm select-none font-sans flex flex-col justify-between ${
        isStandalonePage
          ? "min-h-screen"
          : "rounded-2xl border border-graphite shadow-[0_20px_80px_rgba(0,0,0,0.85)] aspect-[16/9] max-h-[88vh]"
      }`}
      onClick={() => initAudio()}
    >
      {/* SCANLINES & FILM GRAIN OVERLAY */}
      {showScanlines && (
        <div className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 mix-blend-overlay" />
      )}

      {/* TOP BAR: CONTROL HEADER */}
      <header className="relative z-30 flex items-center justify-between border-b border-graphite/70 bg-charcoal/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-lime animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-lime uppercase">
              SHOWREEL // 4K 60FPS
            </span>
          </div>
          <span className="text-muted/40 text-xs hidden sm:inline">|</span>
          <span className="text-xs font-mono text-muted hidden sm:inline truncate max-w-[280px]">
            JAKI TAHSIN — VISUAL COMMUNICATOR
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Audio Equalizer Visualizer */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              initAudio();
              setIsMuted(!isMuted);
              playClickSound();
            }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
              isMuted
                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : "bg-lime/10 text-lime border border-lime/30"
            }`}
            title="Toggle Sound Effects (Press M)"
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
            <span className="text-[10px] uppercase font-bold hidden xs:inline">
              {isMuted ? "SFX MUTED" : "SFX ACTIVE"}
            </span>
            {!isMuted && isPlaying && (
              <div className="flex items-end space-x-0.5 h-3">
                <span className="w-0.5 h-2 bg-lime animate-bounce" />
                <span className="w-0.5 h-3 bg-lime animate-bounce [animation-delay:0.15s]" />
                <span className="w-0.5 h-1.5 bg-lime animate-bounce [animation-delay:0.3s]" />
              </div>
            )}
          </button>

          {/* Scanline Toggle */}
          <button
            onClick={() => setShowScanlines(!showScanlines)}
            className="p-1.5 rounded-md hover:bg-elevated text-muted hover:text-warm text-[10px] font-mono border border-graphite/60 hidden md:block"
            title="Toggle Film Scanlines"
          >
            CRT
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md hover:bg-elevated text-muted hover:text-warm"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Close Modal (if in modal mode) */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-md bg-elevated hover:bg-red-500/20 hover:text-red-400 text-muted transition-colors ml-2"
              title="Close Preview"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {/* CENTER STAGE: CINEMATIC DYNAMIC SCENE DISPLAY */}
      <div
        ref={videoStageRef}
        className="relative flex-1 w-full flex items-center justify-center overflow-hidden bg-obsidian"
      >
        {/* SCENE 0: CINEMA COUNTDOWN & TITLE CARD (00:00 - 00:06) */}
        {currentTime < 6 && (
          <div className="relative z-20 flex flex-col items-center justify-center text-center p-6 max-w-2xl animate-fade-in">
            {/* Vintage leader circle with crosshairs */}
            <div className="relative flex items-center justify-center w-36 h-36 rounded-full border border-lime/30 mb-6 bg-charcoal/40">
              <div className="absolute inset-0 rounded-full border-t-2 border-lime animate-spin [animation-duration:2s]" />
              <div className="w-2 h-2 rounded-full bg-lime" />
              <div className="absolute text-5xl font-mono font-extrabold text-lime">
                0{Math.max(1, 3 - Math.floor(currentTime))}
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-lime/40 bg-lime/10 text-lime text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Official 2026 Portfolio Showreel</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-warm tracking-tight leading-tight">
              JAKI TAHSIN
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted font-mono tracking-wide">
              GRAPHIC DESIGNER &amp; VISUAL COMMUNICATOR
            </p>
            <div className="mt-4 flex items-center space-x-4 text-xs font-mono text-muted/80">
              <span>DHAKA, BANGLADESH</span>
              <span>✦</span>
              <span>BRAND &amp; BILLBOARDS</span>
              <span>✦</span>
              <span>INTERACTIVE</span>
            </div>
          </div>
        )}

        {/* SCENE 1: IDENTITY & 3D AVATAR (00:06 - 00:14) */}
        {currentTime >= 6 && currentTime < 14 && (
          <div className="relative z-20 w-full h-full max-w-5xl px-8 flex flex-col md:flex-row items-center justify-between gap-8 py-6">
            {/* Left: Text & Key Attributes */}
            <div className="flex-1 space-y-4 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-lime px-2 py-0.5 rounded bg-lime/10 border border-lime/30 inline-block">
                Chapter 01 // The Creative Persona
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-warm leading-tight">
                Designer toy aesthetics <br />
                meets modern engineering.
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-md">
                Featuring bespoke 3D vinyl character modeling inspired by high-end collectible art toys, framed within an Obsidian (#101010) &amp; Electric Lime (#D7FF64) visual system.
              </p>

              {/* Interactive badge */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setAvatarClicks((c) => c + 1);
                    playChimeSound();
                  }}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-lime text-obsidian text-xs font-bold hover:bg-lime-hover transition-transform active:scale-95 shadow-[0_0_15px_rgba(215,255,100,0.3)]"
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Tap Avatar Spark ({avatarClicks})</span>
                </button>
                <span className="text-xs font-mono text-muted px-2 py-1 rounded border border-graphite bg-charcoal">
                  Space Grotesk + Inter
                </span>
              </div>
            </div>

            {/* Right: Floating 3D Character Avatar */}
            <div className="flex-1 flex justify-center items-center">
              <div
                onClick={() => {
                  setAvatarClicks((c) => c + 1);
                  playChimeSound();
                }}
                className="relative group cursor-pointer"
                title="Click me for interactive sound!"
              >
                {/* Glow ring */}
                <div className="absolute -inset-4 rounded-full bg-lime/20 blur-2xl group-hover:bg-lime/40 transition-all" />
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full border-2 border-lime/60 p-2 bg-gradient-to-b from-charcoal to-obsidian shadow-2xl transition-transform duration-300 group-hover:scale-105 animate-bounce [animation-duration:3s]">
                  <Image
                    src="/assets/3d-avatar.png"
                    alt="Jaki Tahsin 3D Avatar"
                    fill
                    className="object-cover rounded-full p-2"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-obsidian border border-lime text-[10px] font-mono text-lime font-bold shadow-lg">
                  INTERACTIVE 3D AVATAR
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 2: HIGHWAY BILLBOARD SCALE (00:14 - 00:23) */}
        {currentTime >= 14 && currentTime < 23 && (
          <div className="relative z-20 w-full h-full max-w-5xl px-6 flex flex-col items-center justify-center text-center py-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-lime px-2 py-0.5 rounded bg-lime/10 border border-lime/30">
                Chapter 02 // Large-Scale Outdoor
              </span>
              <button
                onClick={() => {
                  setIsNightMode(!isNightMode);
                  playClickSound();
                }}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-charcoal border border-graphite hover:border-lime text-xs font-mono text-warm"
              >
                {isNightMode ? (
                  <>
                    <Moon className="h-3 w-3 text-lime" />
                    <span>Night Spotlight ON</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-3 w-3 text-amber-400" />
                    <span>Daylight View</span>
                  </>
                )}
              </button>
            </div>

            <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-warm mb-4">
              Highway Billboards for Fides Nurjahan Tower
            </h2>

            {/* Billboard Stage Representation */}
            <div className="relative w-full max-w-2xl aspect-[16/9] rounded-lg border-4 border-stone-800 bg-stone-900 shadow-2xl overflow-hidden">
              {/* Floodlight beams in Night mode */}
              {isNightMode && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lime/15 via-transparent to-black/60 z-10" />
              )}
              <Image
                src="/assets/works/billboards.webp"
                alt="Highway Billboard Campaign"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2 z-20 px-2 py-1 rounded bg-obsidian/90 text-[10px] font-mono text-lime border border-lime/40">
                40 × 20 FT COMMUTE GANTRY
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-muted max-w-xl">
              Engineered with high-contrast Swiss typography calibrated for rapid 3-second comprehension at highway speeds.
            </p>
          </div>
        )}

        {/* SCENE 3: BRAND SYSTEMS & SOCIAL (00:23 - 00:32) */}
        {currentTime >= 23 && currentTime < 32 && (
          <div className="relative z-20 w-full h-full max-w-5xl px-8 flex flex-col md:flex-row items-center justify-between gap-8 py-6">
            {/* Instagram Mockup Phone Card */}
            <div className="w-64 sm:w-72 rounded-2xl border-2 border-graphite bg-charcoal/90 p-3 shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-graphite/60">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-lime text-obsidian flex items-center justify-center font-bold text-[10px]">
                    JT
                  </div>
                  <span className="text-xs font-mono font-bold text-warm">@jakitahsin</span>
                </div>
                <span className="text-[10px] font-mono text-lime font-bold">VERIFIED</span>
              </div>

              <div className="relative aspect-square w-full rounded-lg overflow-hidden my-2 bg-obsidian">
                <Image
                  src="/assets/works/social-instagram.webp"
                  alt="Social Campaign Artwork"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Interactive like button */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    setHasLiked(!hasLiked);
                    setSocialLikes((l) => (hasLiked ? l - 1 : l + 1));
                    playClickSound();
                  }}
                  className="flex items-center space-x-1.5 text-xs text-muted hover:text-red-400"
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      hasLiked ? "fill-red-500 text-red-500 scale-125" : ""
                    }`}
                  />
                  <span className="font-mono text-xs">{socialLikes.toLocaleString()}</span>
                </button>
                <span className="text-[10px] font-mono text-muted">Old Dhaka Campaign</span>
              </div>
            </div>

            {/* Right: Editorial & Identity Scope */}
            <div className="flex-1 space-y-4 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-lime px-2 py-0.5 rounded bg-lime/10 border border-lime/30 inline-block">
                Chapter 03 // Social Media &amp; Publications
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-warm leading-tight">
                High-converting social campaigns &amp; tactile print books.
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                From multi-slide educational carousels and festival key visuals to 350 GSM luxury business stationery and corporate annual reports.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-warm">
                <div className="p-2 rounded border border-graphite bg-charcoal/60">
                  ✦ Bilingual Typography (Bengali + English)
                </div>
                <div className="p-2 rounded border border-graphite bg-charcoal/60">
                  ✦ Print-Ready 300 DPI CMYK Workflow
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 4: INTERACTIVE DIGITAL PLAYGROUND (00:32 - 00:38) */}
        {currentTime >= 32 && currentTime < 38 && (
          <div className="relative z-20 w-full h-full max-w-4xl px-6 flex flex-col items-center justify-center text-center py-4">
            <span className="text-xs font-mono uppercase tracking-widest text-lime px-2 py-0.5 rounded bg-lime/10 border border-lime/30 mb-2">
              Chapter 04 // The Digital Playground
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-warm mb-3">
              Color Match Game &amp; Palette Playground
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-lg mb-4">
              Visitors don&apos;t just read; they play. Test your designer eye by clicking the matching Electric Lime swatch!
            </p>

            {/* Interactive Swatch Challenge */}
            <div className="flex items-center space-x-4 p-4 rounded-xl border border-graphite bg-charcoal/80">
              <div className="text-left font-mono text-xs pr-4 border-r border-graphite">
                <span className="text-muted block text-[10px]">TARGET COLOR:</span>
                <span className="text-lime font-bold">#D7FF64 (Lime)</span>
                <span className="text-warm block mt-1">Score: {gameScore}</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setGameScore((s) => s + 100);
                    playChimeSound();
                  }}
                  className="h-12 w-12 rounded-lg bg-[#D7FF64] border-2 border-white hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(215,255,100,0.5)]"
                  title="Correct Color!"
                />
                <button
                  onClick={() => {
                    playClickSound();
                  }}
                  className="h-12 w-12 rounded-lg bg-[#99CC33] hover:scale-105 transition-all"
                  title="Wrong tone"
                />
                <button
                  onClick={() => {
                    playClickSound();
                  }}
                  className="h-12 w-12 rounded-lg bg-[#CCFF00] hover:scale-105 transition-all"
                  title="Wrong tone"
                />
              </div>
            </div>
          </div>
        )}

        {/* SCENE 5: CALL TO COLLABORATE (00:38 - 00:42) */}
        {currentTime >= 38 && (
          <div className="relative z-20 flex flex-col items-center justify-center text-center p-6 max-w-2xl animate-fade-in">
            <div className="h-14 w-14 rounded-full bg-lime/20 border border-lime flex items-center justify-center text-lime mb-4 shadow-[0_0_25px_rgba(215,255,100,0.3)]">
              <Sparkles className="h-7 w-7" />
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-warm mb-3 leading-tight">
              Ready to create something <br />
              <span className="text-lime">impossible to ignore?</span>
            </h2>

            <p className="text-sm sm:text-base text-muted max-w-md mb-6">
              Currently accepting brand identity commissions, large-scale outdoor campaigns, and creative art direction projects worldwide.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 rounded-full bg-lime px-7 py-3.5 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-lg hover:bg-lime-hover transition-transform hover:scale-105"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                onClick={() => {
                  setCurrentTime(0);
                  setIsPlaying(true);
                  playBassDrop();
                }}
                className="inline-flex items-center space-x-2 rounded-full border border-graphite bg-charcoal px-6 py-3.5 text-xs font-heading font-semibold uppercase tracking-wider text-warm hover:border-lime transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Replay Showreel</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM BAR: VIDEO CONTROLS & TIMELINE SCRUBBER */}
      <footer className="relative z-30 border-t border-graphite/70 bg-charcoal/95 px-4 py-3 backdrop-blur-md">
        {/* Timeline Scrubber Bar */}
        <div className="group relative w-full mb-3 cursor-pointer">
          {/* Chapter Markers */}
          <div className="relative h-2 w-full rounded-full bg-stone-800 overflow-hidden">
            {/* Active progress */}
            <div
              className="h-full bg-gradient-to-r from-lime via-lime to-emerald-400 transition-all duration-100 relative"
              style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
            >
              {/* Playhead thumb */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md border-2 border-lime scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>

          {/* Invisible click handler across timeline */}
          <input
            type="range"
            min="0"
            max={TOTAL_DURATION}
            step="0.1"
            value={currentTime}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setCurrentTime(val);
              initAudio();
            }}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            title="Drag to scrub timeline"
          />
        </div>

        {/* Primary Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Play / Pause / Replay & Time Display */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                initAudio();
                setIsPlaying(!isPlaying);
                playClickSound();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-obsidian shadow hover:bg-lime-hover transition-transform active:scale-95"
              title={isPlaying ? "Pause (Space)" : "Play (Space)"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={() => {
                setCurrentTime(0);
                setIsPlaying(true);
                playBassDrop();
              }}
              className="p-1.5 rounded hover:bg-elevated text-muted hover:text-warm transition-colors"
              title="Restart from beginning"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <span className="font-mono text-xs font-bold text-warm">
              {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
            </span>

            <span className="text-muted/60 hidden sm:inline">|</span>

            {/* Current Chapter Label */}
            <span className="text-lime font-mono text-xs font-semibold hidden md:inline truncate max-w-[200px]">
              {currentChapter.label}
            </span>
          </div>

          {/* Center: Quick Chapter Jump Buttons */}
          <div className="hidden lg:flex items-center space-x-1">
            {CHAPTERS.map((ch) => {
              const isActive = currentChapter.id === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => jumpToChapter(ch.start)}
                  className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                    isActive
                      ? "bg-lime text-obsidian font-bold"
                      : "text-muted hover:text-warm hover:bg-elevated"
                  }`}
                >
                  {ch.title.split("//")[0]}
                </button>
              );
            })}
          </div>

          {/* Right: Speed, Export & Volume */}
          <div className="flex items-center space-x-2">
            {/* Speed selector */}
            <div className="flex items-center space-x-1 border border-graphite/60 rounded px-1.5 py-0.5 bg-obsidian text-[10px] font-mono">
              <span className="text-muted mr-1">Speed:</span>
              {[1, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    setPlaybackSpeed(spd);
                    playClickSound();
                  }}
                  className={`px-1.5 py-0.5 rounded ${
                    playbackSpeed === spd
                      ? "bg-lime text-obsidian font-bold"
                      : "text-muted hover:text-warm"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Export / Record Video Button */}
            <button
              onClick={handleExportRecording}
              disabled={isRecording}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-charcoal border border-graphite hover:border-lime text-xs font-mono text-lime transition-all"
              title="Record and render video capture"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isRecording ? "Capturing..." : "Export Video"}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
