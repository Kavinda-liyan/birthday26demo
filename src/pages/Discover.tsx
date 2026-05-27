import PageWrapper from "./PageWrapper";
import { motion, AnimatePresence } from "motion/react";
import whiteflower from "../assets/pictures/whiteflower.png";
import confetti from "canvas-confetti";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const candles = [
  { x: 88, color: "#a78bfa", flameColor: "#fbbf24", delay: 0 },
  { x: 114, color: "#f9a8d4", flameColor: "#f97316", delay: 0.12 },
  { x: 140, color: "#6ee7b7", flameColor: "#ef4444", delay: 0.24 },
];

const FLOWER_COUNT = 20;

const Discover = () => {
  const [blown, setBlown] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    audioRef.current = new Audio("/music/adarei.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const flowers = useMemo(
    () =>
      Array.from({ length: FLOWER_COUNT }, (_, i) => ({
        size: 80 + Math.random() * 180,
        top: Math.random() * 85,
        left: Math.random() * 90,
        blur: Math.random() < 0.3 ? 2 : 0,
        zIndex: Math.floor(Math.random() * 3),
        sway: 2.5 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.6,
        rotate: Math.random() * 360,
        delay: i * 0.15,
      })),
    []
  );

  const blowOut = async () => {
    if (blown) return;

    setBlown(true);

    // 🎵 START MUSIC HERE
    try {
      await audioRef.current?.play();
    } catch (err) {
      console.log("Audio blocked until user interaction");
    }

    // 🎉 main burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#a78bfa", "#f9a8d4", "#6ee7b7", "#fbbf24", "#f97316"],
    });

    setTimeout(() => {
      confetti({ particleCount: 80, spread: 70, origin: { x: 0.25, y: 0.5 } });
    }, 250);

    setTimeout(() => {
      confetti({ particleCount: 80, spread: 70, origin: { x: 0.75, y: 0.5 } });
    }, 500);

    setTimeout(() => {
      setShowMessage(true);
    }, 1200);
  };

  const reset = () => {
    setShowMessage(false);
    setBlown(false);

    // optional: restart music
    audioRef.current?.pause();
    audioRef.current!.currentTime = 0;
  };

  return (
    <PageWrapper className="bg-primary">

      {/* Back */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 text-white text-sm border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/10"
      >
        Home
      </motion.button>

      {/* Flowers */}
      {flowers.map((f, i) => (
        <motion.img
          key={i}
          src={whiteflower}
          style={{
            width: `${f.size}px`,
            height: `${f.size}px`,
            top: `${f.top}%`,
            left: `${f.left}%`,
            filter: `blur(${f.blur}px)`,
            zIndex: f.zIndex,
            opacity: f.opacity,
            rotate: f.rotate,
          }}
          className="absolute object-cover rounded-full"
          animate={{ rotate: [f.rotate - 3, f.rotate + 3, f.rotate - 3] }}
          transition={{
            duration: f.sway,
            repeat: Infinity,
            ease: "easeInOut",
            delay: f.delay,
          }}
        />
      ))}

      {/* Cake */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen">

        {!blown && (
          <motion.p className="text-white text-xl mb-8">
            tap the cake to make a wish 🎂
          </motion.p>
        )}

        <motion.div
          onClick={blowOut}
          className="cursor-pointer active:scale-95 hover:scale-105 transition-transform"
        >
          <svg width="260" height="300" viewBox="0 0 260 300">

            <ellipse cx="130" cy="268" rx="110" ry="14" fill="#bae6fd" />

            <rect x="28" y="200" width="204" height="70" rx="8" fill="#c97b4b" />
            <ellipse cx="130" cy="200" rx="102" ry="14" fill="#d98c5a" />

            <rect x="50" y="148" width="160" height="58" rx="8" fill="#e8a87c" />
            <ellipse cx="130" cy="148" rx="80" ry="11" fill="#f0b88c" />

            <rect x="68" y="106" width="124" height="48" rx="8" fill="#f5c4a0" />
            <ellipse cx="130" cy="106" rx="62" ry="9" fill="#ffd4b0" />

            <text x="130" y="232" textAnchor="middle" fill="#fff">
              My hot Cappuccino
            </text>

            <text x="130" y="175" textAnchor="middle" fill="#fff" opacity="0.8">
              Happy Birthday!
            </text>

            {/* candles */}
            {candles.map((c, i) => (
              <g key={i}>
                <rect x={c.x} y="74" width="10" height="34" rx="3" fill={c.color} />

                {!blown && (
                  <ellipse cx={c.x + 5} cy="64" rx="4" ry="9" fill={c.flameColor} />
                )}

                {blown && (
                  <motion.line
                    x1={c.x + 5}
                    y1="68"
                    x2={c.x + 5}
                    y2="45"
                    stroke="#aaa"
                    strokeDasharray="3,3"
                    animate={{ opacity: [0, 0.8, 0] }}
                  />
                )}
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-8"
            >
              <h1 className="text-white text-4xl font-bold sin">
                සුබ උපන්දිනයක් බබී ...!
              </h1>

              <p className="text-white mt-2">
                Happy Birthday, Cappuccino
              </p>

              <button
                onClick={reset}
                className="mt-6 text-white border px-4 py-2 rounded-full hover:bg-white/10"
              >
                Light again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageWrapper>
  );
};

export default Discover;