import PageWrapper from "./PageWrapper";
import lavender from "../assets/pictures/apple.png";
import Cloud from "../assets/pictures/Clouds.png";
import { motion } from "motion/react";
import Snowfall from "react-snowfall";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const flowers = [
  {
    size: 200,
    bottom: 500,
    left: 0,
    blur: 2,
    zIndex: 0,
    sway: 3.2,
    opacity: 1,
    rotate: -40,
  },
  {
    size: 100,
    bottom: 50,
    left: 0,
    blur: 0,
    zIndex: 1,
    sway: 2.8,
    opacity: 1,
    rotate: 0,
  },
  {
    size: 280,
    bottom: -45,
    left: 20,
    blur: 0,
    zIndex: 1,
    sway: 3.5,
    opacity: 1,
    rotate: 0,
  },
  {
    size: 250,
    bottom: 400,
    left: 50,
    blur: 0,
    zIndex: 1,
    sway: 2.5,
    opacity: 1,
    rotate: 0,
  },
  {
    size: 300,
    bottom: 150,
    left: -10,
    blur: 1,
    zIndex: 1,
    sway: 3.8,
    opacity: 1,
    rotate: 0,
  },
  {
    size: 400,
    bottom: 100,
    left: 35,
    blur: 0,
    zIndex: 1,
    sway: 3.0,
    opacity: 1,
    rotate: 40,
  },
  {
    size: 600,
    bottom: 600,
    left: 50,
    blur: 2,
    zIndex: 20,
    sway: 4.0,
    opacity: 1,
    rotate: 30,
  },
];

const FlowerEdition2 = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/music/applemalak.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
        setStarted(true);
      } catch (err) {
        console.error("Playback failed:", err);
      }
    }
    setPlaying(!playing);
  };

  const navigate = useNavigate();

  return (
    <PageWrapper className="bg-primary">
      {/* clouds + flowers */}
      <motion.div
        className="absolute inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <motion.img
          src={Cloud}
          alt="Cloud"
          className="absolute top-0 left-0 w-full h-auto z-0 opacity-70"
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {flowers.map((f, i) => (
          <motion.img
            key={i}
            src={lavender}
            alt="Lavender"
            style={{
              height: `${f.size}px`,
              bottom: f.bottom,
              left: `${f.left}%`,
              filter: `blur(${f.blur}px)`,
              zIndex: f.zIndex,
              transformOrigin: "bottom center",
              opacity: f.opacity,
              rotate: f.rotate,
            }}
            className="object-cover  absolute"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{
              duration: f.sway,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* snow */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <Snowfall
          snowflakeCount={100}
          color="#bae6fd"
          changeFrequency={400}
          speed={[0.5, 1.5]}
        />
      </div>

      {/* text — above everything */}
      <div>
        {started && (
          <motion.div
            className="relative z-50 text-center top-[-50px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-white text-7xl font-bold sin">ඔබ ඇපල්</h1>

            <p className="text-white text-6xl font-bold sin">මලක් වාගේ</p>

            <motion.p
              className="text-white text-md mt-4 tracking-[5px] backdrop-blur-md m-2 p-4 rounded-lg bg-black/10 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
            >
              ඉටි රූපෙ අපූරුව විදින්න මන් හරි ආසයි පින්තූරෙ වගේ ඔබ හිනැහෙනකොට මට
              ලෝබයි අහිතක් හිතන්නෙ නැති නම් මන් හරි ආදරෙයි කියාගන්න බැරි කමින්
              හිත බරයි ඊයේ අද මෙන් හෙටත් එහෙම වෙයි හුදෙකලාව අවනඩුවක්... ගෑනු
              ළමයෝ
            </motion.p>
          </motion.div>
        )}
        <motion.div
          className="relative z-50 text-center top-[-50px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* music toggle — top right, outside text div */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
            onClick={toggle}
            className=" z-50 text-white text-lg border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/10 transition"
          >
            {playing ? "🔊 Pause" : "🔇 Play Me"}
          </motion.button>
        </motion.div>
      </div>

      {playing && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 5 }}
          onClick={() => navigate("/letme3")}
          className="absolute bottom-10 z-50 bg-secondary text-white text-lg border border-secondary/40 px-4 py-2 rounded-full backdrop-blur-xs hover:bg-secondary transition"
        >
          Click Me to Continue{" "}
        </motion.button>
      )}
    </PageWrapper>
  );
};

export default FlowerEdition2;
