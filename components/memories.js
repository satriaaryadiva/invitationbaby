"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { useIsVisible } from "./visibilityobserver";
import { Italianno } from "next/font/google";

const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
});

const Memories = () => {
  const ref1 = useRef(null);
  const isVisible1 = useIsVisible(ref1);
  const ref2 = useRef(null);
  const isVisible2 = useIsVisible(ref2);
  const ref3 = useRef(null);
  const isVisible3 = useIsVisible(ref3);
  const ref4 = useRef(null);
  const isVisible4 = useIsVisible(ref4);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div className="py-16 px-4">
      <h1
        ref={ref1}
        className={` text-[#f1ded2]   text-5xl text-center my-6 ${
          isVisible1 ? "animate-spinnerGrow" : "opacity-0"
        }`}
      >
       🤲 Doa & Harapan
      </h1>

      {/* Narasi tambahan */}
      <p
        className={`text-center  text-sm  text-[#f1ded2]  max-w-md mx-auto mb-8 ${
          isVisible1 ? "animate-fadeInSlow" : "opacity-0"
        }`}
      >
       

“Semoga Allah menjadikannya anak yang shalih/shalihah, berbakti kepada orang tua, serta menjadi penyejuk hati dan cahaya dalam keluarga.”
      </p>

      
    </div>
  );
};

export default Memories;
