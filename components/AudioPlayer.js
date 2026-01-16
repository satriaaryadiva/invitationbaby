"use client";
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useImperativeHandle(ref, () => ({
    play: async () => {
      if (audioRef.current) {
        try {
          audioRef.current.currentTime = 0; // Reset ke awal
          await audioRef.current.play();
          setIsPlaying(true);
          console.log("Audio playing successfully");
        } catch (error) {
          console.error("Audio play failed:", error);
          // Retry setelah delay
          setTimeout(async () => {
            try {
              await audioRef.current.play();
              setIsPlaying(true);
            } catch (e) {
              console.error("Audio retry failed:", e);
            }
          }, 100);
        }
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    },
  }));

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Toggle play failed:", error);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Auto unmute setelah play
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.muted = false;
      setIsMuted(false);
    }
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/Backsound.mp3"
        loop
        preload="auto"
        playsInline
      />
      
      {/* Floating Music Control Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <button
          onClick={toggleMute}
          className="bg-[#851a19] text-white p-3 rounded-full shadow-lg hover:bg-[#6b1515] transition-all duration-300 hover:scale-110"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6 animate-pulse" />
          )}
        </button>
      </div>
    </>
  );
});

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;