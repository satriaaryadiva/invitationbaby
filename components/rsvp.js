"use client";
import { Italianno } from "next/font/google";
import { useIsVisible } from "./visibilityobserver";
import { useRef } from "react";

const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
});

const RSVP = () => {
  const ref1 = useRef(null);
  const isVisible1 = useIsVisible(ref1);
  const ref2 = useRef(null);
  const isVisible2 = useIsVisible(ref2);

  return (
    <div>
      <h1
        className={` text-[#f1ded2] text-center font-bold  text-[3.5rem] flex justify-center my-7 ${
          isVisible1 ? "animate-slideInDown" : "opacity-0"
        }`}
        ref={ref1}
      >
        Tempat dan waktu
      </h1>
      <p
        className={`flex justify-center  text-[#f1ded2] text-center ${
          isVisible1 ? "animate-spinnerGrow" : "opacity-0"
        }`}
      >
        Minggu , 18 January 2026   <br />  Jl Platina 3 , Gg. Nangka, Titi Papan, Kec. Medan Deli, Kota Medan, Sumatera Utara 20242
      </p>

      <div
        className={`flex flex-col mt-4 bg-white rounded-sm  shadow-md shadow-black/25 w-max h-max mx-auto ${
          isVisible2 ? "animate-spinnerGrow" : "opacity-0"
        }`}
        ref={ref2}
      >
        <div className="w-[600] h-[600] bg-gray-400">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3981.5934198286136!2d98.67388916015625!3d3.6796035766601562!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313300439f8945%3A0x2d9dc9fd0bbb6091!2sTempe%20Berkah%20Jaya!5e0!3m2!1sen!2sid!4v1768504755087!5m2!1sen!2sid"
            width={600}
            height={400}
            className="border-none w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="w-full h-auto bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-lg flex flex-col p-4 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-2">
           Maps
          </h1>
          <h1
            className={`text-2xl text-center text-pink-500 `}
          >
         📍Tempe berkah jaya Medan
          </h1>
          <hr className="w-full border-t-2 border-gray-300 mt-2 mb-4" />

          {/* Arahkan tombol ke link tujuan */}
          <div className="flex justify-center mt-4">
            <a
              href=" https://www.google.com/maps/place/Tempe+Berkah+Jaya/@3.6796036,98.6738892,17z/data=!4m6!3m5!1s0x30313300439f8945:0x2d9dc9fd0bbb6091!8m2!3d3.6796043!4d98.6738921!16s%2Fg%2F11m694zpv1?hl=en&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D" // <-- ganti link ini ke tujuan kamu
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm px-6 py-2 shadow-lg transform transition-transform hover:scale-105"
            >
              Arah ke lokasi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
