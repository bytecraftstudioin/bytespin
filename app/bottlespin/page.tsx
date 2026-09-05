"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  Play, 
  UserPlus, 
  Trash2, 
  Trophy, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Palette,
  Dices
} from "lucide-react";

interface Player {
  id: string;
  name: string;
  color: string;
  avatar: string;
  winCount: number;
}

type BottleType = "beer" | "coke" | "wine" | "whiskey" | "milk";

const AVATARS = ["👑", "🔥", "⚡", "🦊", "🦁", "🐻", "🦄", "🐉"];
const SLICE_COLORS = [
  "#10b981", "#ec4899", "#8b5cf6", "#06b6d4",
  "#f59e0b", "#ef4444", "#3b82f6", "#d946ef",
];

const BOTTLE_OPTIONS: { id: BottleType; label: string; icon: string }[] = [
  { id: "beer", label: "Beer", icon: "🍾" },
  { id: "coke", label: "Coke", icon: "🥤" },
  { id: "wine", label: "Wine", icon: "🍷" },
  { id: "whiskey", label: "Whiskey", icon: "🥃" },
  { id: "milk", label: "Milk", icon: "🍼" },
];

const TRUTH_OR_DARE_PROMPTS = [
  { type: "Truth", text: "Who was your first crush?" },
  { type: "Dare", text: "Do 10 pushups right now!" },
  { type: "Truth", text: "What is your biggest fear?" },
  { type: "Dare", text: "Sing the chorus of your favorite song loudly!" },
  { type: "Truth", text: "What is the most embarrassing thing you've ever done?" },
  { type: "Dare", text: "Let the person to your left send a text from your phone!" },
];

const INITIAL_PLAYERS: Player[] = [
  { id: "1", name: "Muthu", color: SLICE_COLORS[0], avatar: "👑", winCount: 0 },
  { id: "2", name: "Dev", color: SLICE_COLORS[1], avatar: "🔥", winCount: 0 },
  { id: "3", name: "Raja", color: SLICE_COLORS[2], avatar: "⚡", winCount: 0 },
  { id: "4", name: "Guest", color: SLICE_COLORS[3], avatar: "🦊", winCount: 0 },
];

export default function FlagshipBottleSpin() {
  const [spinMode] = useState<"plain" | "name">("name");
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningSliceIndex, setWinningSliceIndex] = useState<number | null>(null);
  const [spinCount, setSpinCount] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [theme, setTheme] = useState<"wood" | "pub" | "neon" | "dark">("wood");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedBottle, setSelectedBottle] = useState<BottleType>("beer");
  const [truthOrDare, setTruthOrDare] = useState<{ type: string; text: string } | null>(null);
  const [enableTod, setEnableTod] = useState(true);
  const [isShaking, setIsShaking] = useState(false);

  const controls = useAnimationControls();
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Dynamic sound generator synced with deceleration
  const playRealisticSpinAudio = useCallback((durationSec: number) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const totalClicks = 32;
      for (let i = 0; i < totalClicks; i++) {
        // Exponential time distribution to match heavy bottle easing
        const progress = i / totalClicks;
        const timeOffset = Math.pow(progress, 2.2) * durationSec;

        setTimeout(() => {
          try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            // Frequency drops as bottle slows down
            osc.frequency.setValueAtTime(260 - i * 5.5, ctx.currentTime);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.03);
          } catch (e) {}
        }, timeOffset * 1000);
      }
    } catch (e) {}
  }, [soundEnabled]);

  const playVictoryChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
          } catch (e) {}
        }, idx * 80);
      });
    } catch (e) {}
  }, [soundEnabled]);

  const handleAddPlayer = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    setPlayers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        color: SLICE_COLORS[prev.length % SLICE_COLORS.length],
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
        winCount: 0,
      }
    ]);
    setNewPlayerName("");
  }, [newPlayerName]);

  const handleRemovePlayer = useCallback((id: string) => {
    setPlayers((prev) => (prev.length <= 2 ? prev : prev.filter((p) => p.id !== id)));
  }, []);

  // 🚀 CINEMATIC ANIMATION PIPELINE (No setTimeout race conditions)
  const handleSpin = useCallback(async () => {
    if (isSpinning) return;
    if (spinMode === "name" && players.length < 2) return;

    setIsSpinning(true);
    setWinner(null);
    setWinningSliceIndex(null);
    setTruthOrDare(null);

    const SPIN_DURATION = 5.2;
    playRealisticSpinAudio(SPIN_DURATION);

    const fullSpins = (6 + Math.floor(Math.random() * 4)) * 360;
    const randomAngle = Math.floor(Math.random() * 360);
    const targetAngle = rotation + fullSpins + randomAngle;

    // 1. Heavy Friction Deceleration Spin
    await controls.start({
  rotate: targetAngle,
  transition: {
    duration: SPIN_DURATION,
   ease: [0.08, 0.96, 0.18, 1],
  },
});

   // 2. Realistic Physics Wobble Sequence

await controls.start({
  rotate: targetAngle + 4,
  transition: {
    duration: 0.08,
    ease: "easeOut",
  },
});

await controls.start({
  rotate: targetAngle - 2,
  transition: {
    duration: 0.07,
    ease: "easeOut",
  },
});

await controls.start({
  rotate: targetAngle + 1,
  transition: {
    duration: 0.05,
    ease: "easeOut",
  },
});

await controls.start({
  rotate: targetAngle,
  transition: {
    duration: 0.05,
    ease: "easeOut",
  },
});

    setRotation(targetAngle);
    setIsSpinning(false);
    setSpinCount((prev) => prev + 1);

    // 3. Screen Shake & Impact Feel
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 200);

    // 4. Calculate Winner & Trigger Delayed Visual Effects
    if (spinMode === "name") {
      const normalizedAngle = (targetAngle % 360 + 360) % 360;
      const segmentAngle = 360 / players.length;
      
      const winnerIndex = Math.floor(normalizedAngle / segmentAngle) % players.length;
      const targetPlayer = players[winnerIndex];

      if (targetPlayer) {
        setWinner(targetPlayer);
        setWinningSliceIndex(winnerIndex);
        setHistory((prev) => [targetPlayer.name, ...prev.slice(0, 4)]);
        setPlayers((prev) =>
          prev.map((p) => (p.id === targetPlayer.id ? { ...p, winCount: p.winCount + 1 } : p))
        );

        if (enableTod) {
          const randomPrompt = TRUTH_OR_DARE_PROMPTS[Math.floor(Math.random() * TRUTH_OR_DARE_PROMPTS.length)];
          setTruthOrDare(randomPrompt);
        }

        // Confetti after 150ms delay for maximum impact
        setTimeout(() => {
          try {
            confetti({ particleCount: 130, spread: 85, origin: { y: 0.58 } });
          } catch (e) {}
          playVictoryChime();
        }, 150);
      }
    }
  }, [isSpinning, spinMode, players, rotation, controls, playRealisticSpinAudio, playVictoryChime, enableTod]);

  const tableThemeClass = useMemo(() => {
    switch (theme) {
      case "wood":
        return "bg-[#140a05] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2d180d] via-[#140a05] to-[#080402]";
      case "pub":
        return "bg-[#090d16] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#182436] via-[#090d16] to-[#020408]";
      case "neon":
        return "bg-[#0b051b] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#230f4d] via-[#0b051b] to-[#03010a]";
      default:
        return "bg-slate-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black";
    }
  }, [theme]);

  const renderWheelSlices = useMemo(() => {
    const totalSlices = players.length;
    const sliceAngle = 360 / totalSlices;

    return players.map((player, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = (index + 1) * sliceAngle;
      
      const radStart = (startAngle * Math.PI) / 180;
      const radEnd = (endAngle * Math.PI) / 180;

      const x1 = 200 + 195 * Math.sin(radStart);
      const y1 = 200 - 195 * Math.cos(radStart);
      const x2 = 200 + 195 * Math.sin(radEnd);
      const y2 = 200 - 195 * Math.cos(radEnd);

      const largeArc = sliceAngle > 180 ? 1 : 0;
      const pathData = `M 200 200 L ${x1} ${y1} A 195 195 0 ${largeArc} 1 ${x2} ${y2} Z`;

      const midAngle = startAngle + sliceAngle / 2;
      const textRad = (midAngle * Math.PI) / 180;
      const textX = 200 + 125 * Math.sin(textRad);
      const textY = 200 - 125 * Math.cos(textRad);

      const isWinningSlice = winningSliceIndex === index;

      return (
        <g key={player.id}>
          <path 
            d={pathData} 
            fill={SLICE_COLORS[index % SLICE_COLORS.length]} 
            stroke="#0f172a" 
            strokeWidth="3" 
            className={`transition-all duration-300 ${
              isWinningSlice 
                ? "brightness-150 stroke-amber-300 stroke-[6] filter drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] animate-pulse" 
                : "opacity-95"
            }`}
          />
          
          <text
            x={textX}
            y={textY}
            fill="#ffffff"
            fontSize="15"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
            className="select-none tracking-wider font-sans uppercase filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            {player.avatar} {player.name}
          </text>
        </g>
      );
    });
  }, [players, winningSliceIndex]);

  const RenderBottleGraphics = ({ type }: { type: BottleType }) => {
    switch (type) {
      case "coke":
        return (
          <svg viewBox="0 0 100 300" className="w-20 h-36 sm:w-24 sm:h-40 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.9)] overflow-visible">
            <rect x="42" y="15" width="16" height="10" rx="2" fill="#ef4444" />
            <path d="M 44 25 L 56 25 L 54 85 L 46 85 Z" fill="#991b1b" />
            <path d="M 46 85 Q 25 120 25 160 L 75 160 Q 75 120 54 85 Z" fill="#7f1d1d" />
            <path d="M 25 160 Q 20 210 28 270 Q 30 285 50 285 Q 70 285 72 270 Q 80 210 75 160 Z" fill="#450a0a" />
            <rect x="23" y="170" width="54" height="45" rx="4" fill="#dc2626" />
            <text x="50" y="198" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">Coke</text>
            <path d="M 30 160 L 32 265" stroke="#ffffff" strokeWidth="2.5" opacity="0.3" strokeLinecap="round" />
          </svg>
        );
      case "wine":
        return (
          <svg viewBox="0 0 100 300" className="w-20 h-36 sm:w-24 sm:h-40 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.9)] overflow-visible">
            <rect x="43" y="12" width="14" height="14" rx="2" fill="#3f0713" />
            <path d="M 44 26 L 56 26 L 56 100 L 44 100 Z" fill="#581c87" />
            <path d="M 44 100 Q 22 135 22 170 L 78 170 Q 78 135 56 100 Z" fill="#4c1d95" />
            <rect x="22" y="170" width="56" height="105" rx="4" fill="#3b0764" />
            <rect x="26" y="185" width="48" height="60" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <text x="50" y="220" fill="#713f12" fontSize="11" fontWeight="800" textAnchor="middle">WINE</text>
          </svg>
        );
      case "whiskey":
        return (
          <svg viewBox="0 0 100 300" className="w-20 h-36 sm:w-24 sm:h-40 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.9)] overflow-visible">
            <rect x="40" y="15" width="20" height="12" rx="2" fill="#78350f" />
            <rect x="36" y="27" width="28" height="35" rx="3" fill="#b45309" />
            <path d="M 36 62 Q 20 85 20 110 L 80 110 Q 80 85 64 62 Z" fill="#d97706" />
            <rect x="20" y="110" width="60" height="165" rx="6" fill="#b45309" />
            <rect x="25" y="140" width="50" height="90" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="50" y="180" fill="#78350f" fontSize="10" fontWeight="900" textAnchor="middle">WHISKEY</text>
          </svg>
        );
      case "milk":
        return (
          <svg viewBox="0 0 100 300" className="w-20 h-36 sm:w-24 sm:h-40 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.9)] overflow-visible">
            <rect x="42" y="12" width="16" height="14" rx="2" fill="#38bdf8" />
            <path d="M 44 26 L 56 26 L 56 90 L 44 90 Z" fill="#e0f2fe" />
            <path d="M 44 90 Q 25 120 25 150 L 75 150 Q 75 120 56 90 Z" fill="#f0f9ff" />
            <rect x="25" y="150" width="50" height="125" rx="6" fill="#ffffff" stroke="#bae6fd" strokeWidth="2" />
            <rect x="29" y="180" width="42" height="55" rx="4" fill="#38bdf8" />
            <text x="50" y="212" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">MILK</text>
          </svg>
        );
      default: // Beer Bottle
        return (
          <svg viewBox="0 0 100 300" className="w-20 h-36 sm:w-24 sm:h-40 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.9)] overflow-visible">
            <rect x="42" y="15" width="16" height="12" rx="3" fill="#3D5A12" />
            <rect x="40" y="27" width="20" height="8" rx="2" fill="#5F881B" />
            <path d="M 43 35 L 57 35 L 57 95 L 43 95 Z" fill="#6B991F" />
            <path d="M 43 95 Q 25 125 25 155 L 75 155 Q 75 125 57 95 Z" fill="#6B991F" />
            <path d="M 25 155 L 25 270 Q 25 285 40 285 L 60 285 Q 75 285 75 270 L 75 155 Z" fill="#6B991F" />
            <path d="M 57 35 L 57 95 Q 75 125 75 155 L 75 270 Q 75 285 60 285 L 50 285 Q 70 285 70 270 L 70 155 Q 70 125 54 95 L 54 35 Z" fill="#3D5A12" opacity="0.45" />
            <rect x="28" y="165" width="44" height="75" rx="6" fill="#FCE8A6" stroke="#E2C46C" strokeWidth="1.5" />
            <path d="M 34 180 Q 50 170 66 180 L 66 200 Q 50 210 34 200 Z" fill="#F5CF68" />
            <rect x="34" y="215" width="32" height="4" rx="2" fill="#E2C46C" />
            <path d="M 29 160 L 29 265" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
          </svg>
        );
    }
  };

  return (
    <main className={`min-h-screen text-slate-100 flex flex-col justify-between transition-all duration-700 ${tableThemeClass} ${isShaking ? "animate-[impactShake_0.2s]" : ""}`}>
      
      {/* Header Bar */}
      <header className="p-4 sm:p-6 flex flex-wrap justify-between items-center gap-4 border-b border-white/10 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-amber-500 flex items-center justify-center font-black text-white text-xl shadow-lg border border-white/20">
            B
          </div>
          <div>
            <h1 className="font-black tracking-tight text-xl leading-none bg-gradient-to-r from-pink-400 via-purple-300 to-amber-400 bg-clip-text text-transparent">
              ByteSpin 2D
            </h1>
            <p className="text-[10px] text-amber-400/90 font-mono tracking-wider font-semibold uppercase mt-0.5">
              Flagship Experience • Bytecraft Studio
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
            {BOTTLE_OPTIONS.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBottle(b.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  selectedBottle === b.id ? "bg-white/20 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{b.icon}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setEnableTod((prev) => !prev)}
            className={`p-2.5 rounded-xl border transition text-xs font-bold flex items-center gap-1.5 ${
              enableTod ? "bg-amber-500/20 border-amber-500/40 text-amber-300" : "bg-white/5 border-white/10 text-slate-500"
            }`}
          >
            <Dices className="w-4 h-4" />
            <span className="hidden md:inline">Truth/Dare</span>
          </button>

          <button
            onClick={() => {
              const themes: Array<"wood" | "pub" | "neon" | "dark"> = ["wood", "pub", "neon", "dark"];
              setTheme(themes[(themes.indexOf(theme) + 1) % themes.length]);
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition active:scale-95 text-xs font-bold flex items-center gap-2"
          >
            <Palette className="w-4 h-4 text-pink-400" />
            <span className="capitalize hidden sm:inline">{theme}</span>
          </button>

          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition active:scale-95"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </header>

      {/* 🎮 Core Perfect 2D Circle Arena */}
      <section className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden my-4">
        
        {/* Pointer Fix: Gold Pointer Indicator */}
        <div className="z-30 -mb-3 flex flex-col items-center pointer-events-none drop-shadow-[0_4px_10px_rgba(245,158,11,0.6)]">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-amber-400" />
        </div>

        {/* Outer Wheel Frame */}
        <div className={`relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] flex items-center justify-center transition-all duration-300 ${
          isSpinning ? "shadow-[0_0_60px_rgba(236,72,153,0.3)]" : ""
        }`}>
          
          {/* Wheel Slices */}
          <div className="w-full h-full rounded-full border-[10px] border-[#22130c] shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden bg-slate-900 relative">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {renderWheelSlices}
            </svg>
          </div>

          {/* Centered Dynamic Light Glow */}
          <div className={`absolute w-24 h-24 rounded-full bg-amber-400/20 blur-xl transition-opacity duration-500 pointer-events-none ${
            isSpinning ? "opacity-100 scale-125" : "opacity-30"
          }`} />

          {/* Centered Spinning Bottle Container */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.div
              animate={controls}
              initial={{ rotate: rotation }}
              style={{ transformOrigin: "50% 50%" }}
              className="pointer-events-auto cursor-pointer select-none flex items-center justify-center active:scale-95 transition-transform"
              onClick={handleSpin}
            >
              <RenderBottleGraphics type={selectedBottle} />
            </motion.div>
          </div>

        </div>

        {/* 🎯 Outcome & Winner Banner */}
        <div className="mt-8 flex flex-col items-center gap-4 z-30 max-w-lg w-full px-4">
          <AnimatePresence mode="wait">
            {winner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: [1, 1.03, 1], y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35 }}
                className="w-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border-2 border-amber-400/60 backdrop-blur-2xl p-4 rounded-2xl text-center shadow-[0_0_30px_rgba(251,191,36,0.25)]"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                  <p className="text-base font-black text-amber-200">
                    TARGET: <span className="text-white text-xl underline decoration-amber-400 ml-1">{winner.avatar} {winner.name}</span>
                  </p>
                </div>

                {truthOrDare && (
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-[10px] font-black uppercase tracking-wider text-pink-300">
                      {truthOrDare.type} Challenge
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1 italic">
                      "{truthOrDare.text}"
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:opacity-95 active:scale-95 transition-all font-black text-sm uppercase tracking-widest text-white shadow-2xl shadow-pink-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2.5 border border-white/20"
          >
            <Play className="w-4 h-4 fill-white" />
            {isSpinning ? "Bottle Spinning..." : "Spin Bottle"}
          </button>
        </div>

      </section>

      {/* Roster & Live Analytics Footer */}
      {spinMode === "name" && (
        <footer className="p-4 sm:p-6 bg-black/70 border-t border-white/10 backdrop-blur-2xl">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Player Roster */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-pink-400" />
                Table Roster ({players.length})
              </h2>

              <form onSubmit={handleAddPlayer} className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Enter player name..."
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-pink-500 transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-black transition active:scale-95 shadow-md shadow-pink-600/20"
                >
                  + Add
                </button>
              </form>

              <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1">
                {players.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-950 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md"
                  >
                    <span>{p.avatar}</span>
                    <span className="text-slate-200">{p.name}</span>
                    <span className="text-[10px] bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded text-amber-300 font-mono">
                      {p.winCount}W
                    </span>
                    {players.length > 2 && (
                      <button
                        onClick={() => handleRemovePlayer(p.id)}
                        className="text-slate-500 hover:text-rose-400 transition ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Analytics */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Live Deck Analytics
                </h2>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Total Table Spins</p>
                    <p className="text-lg font-black text-pink-400 font-mono">{spinCount}</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Latest Winner</p>
                    <p className="text-sm font-extrabold text-emerald-400 truncate">
                      {history[0] || "None"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center border-t border-white/10 pt-3 flex justify-between items-center text-[11px]">
                <span className="font-bold text-slate-500">
                  ByteSpin 2D • Flagship v3.3
                </span>
                <span className="font-bold text-slate-400">
                  Crafted with ❤️ by <strong className="text-pink-400">Bytecraft Studio</strong>
                </span>
              </div>
            </div>

          </div>
        </footer>
      )}

    </main>
  );
}