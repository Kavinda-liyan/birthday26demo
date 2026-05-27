import PageWrapper from "./PageWrapper";
import lavender from "../assets/pictures/apple.png";
import Cloud from "../assets/pictures/Clouds.png";
import { motion } from "motion/react";
import Snowfall from "react-snowfall";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import couple from "../assets/pictures/couple.jpeg";

const flowers = [
  { size: 200, bottom: 500, left: 0, blur: 2, zIndex: 0, sway: 3.2, opacity: 1, rotate: -40 },
  { size: 100, bottom: 50, left: 0, blur: 0, zIndex: 1, sway: 2.8, opacity: 1, rotate: 0 },
  { size: 280, bottom: -45, left: 20, blur: 0, zIndex: 1, sway: 3.5, opacity: 1, rotate: 0 },
  { size: 250, bottom: 400, left: 50, blur: 0, zIndex: 1, sway: 2.5, opacity: 1, rotate: 0 },
  { size: 300, bottom: 150, left: -10, blur: 1, zIndex: 1, sway: 3.8, opacity: 1, rotate: 0 },
  { size: 400, bottom: 100, left: 35, blur: 0, zIndex: 1, sway: 3.0, opacity: 1, rotate: 40 },
  { size: 600, bottom: 600, left: 50, blur: 2, zIndex: 20, sway: 4.0, opacity: 1, rotate: 30 },
];

const lyrics = [
  "ඔබේ සිනා ලග නෙත නැවතුනු දා ...",
  "ඔබේ කතා ලග සිත නැවතුනු දා ...",
  "ප්‍රේමය හැදින්නෙමී ...",
  "ප්‍රේමය හැදින්නෙමී...",
  "මේ ලෝ තලයේ ..."
];

const lyricTimings = [17000, 27000, 34000, 42000, 49000];

const RomanticEdition = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [visibleLyrics, setVisibleLyrics] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    audioRef.current = new Audio("/music/Obesinalaga.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!started) return;

    lyrics.forEach((line, index) => {
      setTimeout(() => {
        let current = "";
        let charIndex = 0;

        const interval = setInterval(() => {
          current += line[charIndex];
          charIndex++;

          setVisibleLyrics((prev) => {
            const updated = [...prev];
            updated[index] = current;
            return updated;
          });

          if (charIndex >= line.length) {
            clearInterval(interval);
          }
        }, 120);
      }, lyricTimings[index]);
    });
  }, [started]);

  const toggle = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setPlaying(true);
      setStarted(true);
    } catch (err) {
      console.error("Playback failed:", err);
    }
  };

  return (
    <PageWrapper className="bg-primary">

      {/* Cloud + Flowers */}
      <motion.div
        className="absolute inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.img
          src={Cloud}
          className="absolute top-0 left-0 w-full h-auto opacity-70"
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {flowers.map((f, i) => (
          <motion.img
            key={i}
            src={lavender}
            alt="flower"
            style={{
              height: `${f.size}px`,
              bottom: f.bottom,
              left: `${f.left}%`,
              filter: `blur(${f.blur}px)`,
              zIndex: f.zIndex,
              transformOrigin: "bottom center",
              opacity: f.opacity,
            }}
            className="absolute object-cover"
            animate={{
              rotate: [f.rotate - 2, f.rotate + 2, f.rotate - 2],
            }}
            transition={{
              duration: f.sway,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Snow */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <Snowfall
          snowflakeCount={100}
          color="#bae6fd"
          changeFrequency={400}
          speed={[0.5, 1.5]}
        />
      </div>

      {/* Music Control (ALWAYS VISIBLE) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onClick={toggle}
        className=" fixed top-6 right-6  z-50 text-white text-sm border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/10 transition bg-primary/80"
      >
        {playing ? "🔊 Pause" : "🔇 Play Me"}
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onClick={()=>navigate("/letme3")}
        className=" fixed top-6 left-6  z-50 text-white text-sm border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/10 transition bg-primary/80"
      >
        Back
      </motion.button>
      

      {/* Main Content */}
      <div className="relative z-50 flex flex-col items-center justify-center min-h-screen text-center">

        {started && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="text-white text-6xl font-bold sin bg-black/10 p-2 rounded-lg">
              ඔබේ සිනා ලග
            </h1>

            <div className="mt-8 flex flex-col gap-4">
              {visibleLyrics.map((line, i) => (
                <motion.p
                  key={i}
                  className="text-white text-md tracking-[2px] backdrop-blur-[1.5px] p-2 rounded-lg bg-black/10 inline-block opacity-70"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1 }}
                >
                  {line}
                  <span className="animate-pulse">|</span>
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Couple image */}
      <img
        src={couple}
        alt="couple"
        className="absolute bottom-0 right-0 h-full object-cover z-40"
      />

      {/* Continue Button */}
      {started && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          onClick={() => navigate("/letme4")}
          className="absolute bottom-10 z-50 bg-secondary text-white text-lg border border-secondary/40 px-4 py-2 rounded-full backdrop-blur-xs hover:bg-secondary transition"
        >
          Click Me to Continue
        </motion.button>
      )}

    </PageWrapper>
  );
};

export default RomanticEdition;