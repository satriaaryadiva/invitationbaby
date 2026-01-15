"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsVisible } from "./visibilityobserver";
import { Send, Heart, MessageCircle, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from "firebase/firestore";

const WeddingWishes = () => {
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);
  
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    attendance: "hadir"
  });
  
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Real-time listener untuk wishes
  useEffect(() => {
    const q = query(
      collection(db, "wishes"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesData = [];
      snapshot.forEach((doc) => {
        wishesData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setWishes(wishesData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error loading wishes:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Mohon isi nama dan ucapan Anda");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "wishes"), {
        name: formData.name.trim(),
        message: formData.message.trim(),
        attendance: formData.attendance,
        timestamp: serverTimestamp()
      });
      
      // Reset form
      setFormData({
        name: "",
        message: "",
        attendance: "hadir"
      });

      alert("Terima kasih atas ucapan dan doa Anda! 💝");
    } catch (error) {
      console.error("Error saving wish:", error);
      alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="flex flex-col  bg-[#f1ded2]   justify-center items-center py-10 px-4  ">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full max-w-[340px]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Heart className="w-10 h-10 text-[#851a19] fill-[#851a19]" />
          </motion.div>
          <h2 className="text-3xl font-bold text-[#851a19] mb-2">Ucapan & Doa</h2>
          <p className="text-sm text-gray-600">Berikan ucapan terbaik untuk kami</p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Nama */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Anda
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama Anda"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#851a19] focus:ring-2 focus:ring-[#851a19] focus:ring-opacity-20 outline-none transition-all text-gray-800"
              required
            />
          </div>

          {/* Konfirmasi Kehadiran */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Konfirmasi Kehadiran
            </label>
            <div className="flex gap-3">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="hadir"
                  checked={formData.attendance === "hadir"}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <div className="px-4 py-2 rounded-lg border-2 border-gray-200 text-center text-sm font-medium peer-checked:border-[#851a19] peer-checked:bg-[#851a19] peer-checked:text-white transition-all">
                  Hadir
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="tidak-hadir"
                  checked={formData.attendance === "tidak-hadir"}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <div className="px-4 py-2 rounded-lg border-2 border-gray-200 text-center text-sm font-medium peer-checked:border-[#851a19] peer-checked:bg-[#851a19] peer-checked:text-white transition-all">
                  Tidak Hadir
                </div>
              </label>
            </div>
          </div>

          {/* Ucapan */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ucapan & Doa
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tulis ucapan dan doa untuk kami..."
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#851a19] focus:ring-2 focus:ring-[#851a19] focus:ring-opacity-20 outline-none transition-all resize-none text-gray-800"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#851a19] text-white font-semibold py-3 rounded-lg hover:bg-[#6b1515] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Kirim Ucapan
              </>
            )}
          </button>
        </motion.form>

        {/* Wishes List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-[#851a19]" />
            <h3 className="text-lg font-bold text-[#851a19]">
              Ucapan dari Tamu ({wishes.length})
            </h3>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-[#851a19] mx-auto" />
                <p className="text-gray-400 mt-2">Memuat ucapan...</p>
              </div>
            ) : wishes.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>Belum ada ucapan</p>
              </div>
            ) : (
              wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-800">{wish.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      wish.attendance === "hadir" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {wish.attendance === "hadir" ? "✓ Hadir" : "✗ Tidak Hadir"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {wish.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDate(wish.timestamp)}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#851a19] to-transparent mx-auto"
        />
      </motion.div>
    </div>
  );
};

export default WeddingWishes;