import PageWrapper from "./PageWrapper";
import letter from "../assets/pictures/Loveletter.png";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Letme = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/flower-edition");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []); // ✅ empty array — runs once on mount

  return (
    <PageWrapper>
      <div className="relative flex items-center justify-center h-[100dvh] bg-primary">
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.img
            src={letter}
            alt="Love Letter"
            className="w-1/2 my-10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 1,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <h1 className="text-txt-primary text-5xl text-center">
            Let Me tell you
          </h1>
          <h2 className="text-txt-primary text-3xl text-center mb-2">
            How much I love you
          </h2>
          <motion.h2
            className="text-txt-primary text-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            Flower Edition
          </motion.h2>

          {/* countdown — remove in prod */}
          {import.meta.env.DEV && (
            <motion.p
              className="text-txt-primary text-6xl mt-6 tracking-widest"
              key={count}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              in {count}s
            </motion.p>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Letme;
