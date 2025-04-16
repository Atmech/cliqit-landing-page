'use client';
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const TYPEWRITER_TEXT = "Coming Soon ...";
const TYPEWRITER_DELAY = 150;
const START_DELAY = 700;
const EMAIL = "business@cliqit.co";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  const [buttonText, setButtonText] = useState("Contact Us");
  const mainRef = useRef(null);
  const isInView = useInView(mainRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let i = 0;
      const intervalId = setInterval(() => {
        setTypedText(TYPEWRITER_TEXT.slice(0, i + 1));
        i++;
        if (i === TYPEWRITER_TEXT.length) {
          clearInterval(intervalId);
          setIsTypewriterComplete(true);
        }
      }, TYPEWRITER_DELAY);

      return () => clearInterval(intervalId);
    }, START_DELAY);

    return () => clearTimeout(startTimeout);
  }, []);

  const handleContactClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setButtonText("Email Copied!");
      setTimeout(() => setButtonText("Contact Us"), 2000);
    } catch (err) {
      setButtonText("Failed to Copy");
      setTimeout(() => setButtonText("Contact Us"), 2000);
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#4F0080] text-white font-[family-name:var(--font-geist-sans)] px-4 sm:px-6 md:px-8">
      <main ref={mainRef} className="flex flex-col items-center text-center w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, clipPath: "inset(0 100% 0 0)" }}
          animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" } : { opacity: 0, y: 50, clipPath: "inset(0 100% 0 0)" }}
          transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full max-w-[473px] sm:max-w-[591px] md:max-w-[676px] lg:max-w-[760px] relative aspect-[400/150]"
        >
          <Image
            src="/Cliqit Logo Transparent.png"
            alt="Cliqit Logo"
            fill
            priority
            className="object-contain"
          />
        </motion.div>
        <motion.p 
          className={`${roboto.className} text-lg sm:text-xl md:text-2xl lg:text-3xl text-white min-h-[2em] mt-6 sm:mt-8`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {typedText}
        </motion.p>
        {isTypewriterComplete && (
          <div className="relative mt-6 sm:mt-8 md:mt-10">
            <motion.button
              onClick={handleContactClick}
              className={`${roboto.className} px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-[#4F0080] rounded-lg font-bold text-sm sm:text-base shadow-[0_0_0_2px_#6a1a99_inset] hover:shadow-[0_0_0_2px_#6a1a99_inset,2px_2px_0_0_#6a1a99] active:shadow-[0_0_0_2px_#6a1a99_inset,1px_1px_0_0_#6a1a99] transition-all duration-150 transform min-w-[100px]`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              {buttonText}
            </motion.button>
          </div>
        )}
      </main>
    </div>
  );
}
