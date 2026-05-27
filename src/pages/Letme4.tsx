import PageWrapper from "./PageWrapper";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Letme4 = () => {
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
      navigate("/discover");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []); // ✅ empty array — runs once on mount

  return (
    <PageWrapper className="bg-primary">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-txt-primary text-5xl text-center sin">
          මේ සුන්දර දවස අපි සමරමු 
        </h1>
        <h2 className="text-txt-primary text-3xl text-center mt-2 sin">
          ඔන්න එහෙනම් 🙂
        </h2>

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
    </PageWrapper>
  );
};

export default Letme4;
