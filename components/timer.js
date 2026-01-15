"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsVisible } from "./visibilityobserver";

const Timer = () => {
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);
  // Minggu, 18 Januari 2026 jam 08:00 pagi (sesuaikan dengan jam akad/resepsi)
  const targetDate = new Date("2026-01-18T08:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const boxVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 30 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.43, 0.13, 0.23, 0.96] // easeOutExpo
      },
    },
  };

  const timeUnits = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col justify-center items-center py-10 px-4">
      {/* Judul Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-[#f1ded2]  mb-2">Hitung Mundur Acara</h2>
        <p className="text-lg text-[#f1ded2]">Minggu, 18 Januari 2026</p>
      </motion.div>

      {/* Timer Grid */}
      <motion.div
        ref={ref}
        className="grid grid-cols-4 gap-3 w-full max-w-[340px]"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {timeUnits.map((unit, i) => (
          <motion.div
            key={unit.label}
            className="relative flex justify-center items-center"
            variants={boxVariants}
          >
            {/* Flower decoration */}
            <Image
              src="/flower-circle.png"
              alt="Flower Circle"
              width={88}
              height={88}
              priority={i < 2}
              className="absolute w-[88px] h-[88px] object-cover rotate-45 z-10"
            />
            
            {/* Timer box */}
            <div className="rounded-full w-[68px] h-[68px] bg-gradient-to-br from-white to-gray-50 flex flex-col justify-center items-center text-[#851a19] font-bold relative z-20 shadow-lg border border-gray-100">
              <span className="text-2xl leading-none">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] mt-1 font-medium text-gray-600 uppercase tracking-wide">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Ornamental divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#851a19] to-transparent"
      />
    </div>
  );
};

export default Timer;