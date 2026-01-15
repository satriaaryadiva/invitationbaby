"use client";
import { useState } from "react";
import { Copy, Check, Gift, MapPin, Phone, User, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const bankOptions = [
  {
    name: "BRI",
    code: "002",
    Symbolbank: "/bri.png",
    accountNumber: "5311 0102 4666 539",
    accountName: "AYU NIRWANA",
  },
];

const gifts = [
  {
    name: "Bed Cover",
    price: 500000,
    total: 2,
    image: "/bed.jpeg",
    description: "Bed cover premium ukuran king size"
  },
  {
    name: "Mirror",
    price: 300000,
    total: 2,
    image: "/mirror.jpeg",
    description: "Cermin standing dengan frame elegan"
  },
];

export default function WeddingGift() {
  const [selectedBank, setSelectedBank] = useState(bankOptions[0]);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState("transfer"); // transfer or physical

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(selectedBank.accountNumber.replace(/\s/g, ""));
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("Jl Platina 3 , Gg. Nangka, Titi Papan, Kec. Medan Deli, Kota Medan, Sumatera Utara 20242");
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("081425462354");
    alert("Nomor telepon berhasil disalin!");
  };

  return (
    <div className="mt-20 min-h-fit py-12 px-4 bg-gradient-to-b from-[#145555] to-[#0d3d3d] text-yellow-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Gift className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-4xl font-bold mb-3 text-yellow-200"> Gift</h2>
          <p className="text-sm leading-relaxed text-yellow-100/80 px-2">
            Doa   Anda merupakan hadiah terindah bagi kami. Namun, apabila berkenan
            memberikan tanda kasih, dapat disampaikan melalui:
          </p>
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-6 bg-[#0d3d3d] p-1 rounded-xl"
        >
          <button
            onClick={() => setActiveTab("transfer")}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
              activeTab === "transfer"
                ? "bg-yellow-500 text-[#145555]"
                : "text-yellow-200 hover:text-yellow-100"
            }`}
          >
            💰 Transfer Bank
          </button>
          <button
            onClick={() => setActiveTab("physical")}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
              activeTab === "physical"
                ? "bg-yellow-500 text-[#145555]"
                : "text-yellow-200 hover:text-yellow-100"
            }`}
          >
            🎁 Hadiah Fisik
          </button>
        </motion.div>

        {/* Transfer Section */}
        {activeTab === "transfer" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Bank Selector */}
            <select
              className="w-full mb-6 px-4 py-3 rounded-xl bg-yellow-500 text-[#145555] font-bold text-center focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg cursor-pointer"
              value={selectedBank.name}
              onChange={(e) =>
                setSelectedBank(
                  bankOptions.find((bank) => bank.name === e.target.value) || bankOptions[0]
                )
              }
            >
              {bankOptions.map((bank) => (
                <option key={bank.name} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>

            {/* Bank Card */}
            <div className="bg-gradient-to-br from-white to-yellow-50 text-[#145555] rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-center mb-4">
                <Image
                  src={selectedBank.Symbolbank}
                  alt={selectedBank.name}
                  width={150}
                  height={60}
                  className="object-contain"
                />
              </div>

              <div className="space-y-3 mb-4">
                <div className="bg-yellow-100/50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Nomor Rekening</p>
                  <p className="font-bold text-lg tracking-wider">
                    {selectedBank.accountNumber}
                  </p>
                </div>

                <div className="bg-yellow-100/50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Nama Penerima</p>
                  <p className="font-bold text-base">{selectedBank.accountName}</p>
                </div>
              </div>

              <button
                onClick={handleCopyAccount}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  copiedAccount
                    ? "bg-green-500 text-white"
                    : "bg-[#145555] text-yellow-100 hover:bg-[#0d3d3d]"
                } shadow-lg`}
              >
                {copiedAccount ? (
                  <>
                    <Check size={18} /> Berhasil Disalin!
                  </>
                ) : (
                  <>
                    <Copy size={18} /> Salin Nomor Rekening
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Physical Gift Section */}
        {activeTab === "physical" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Shipping Info Card */}
            <div className="bg-gradient-to-br from-white to-yellow-50 text-[#145555] rounded-2xl p-6 shadow-2xl">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-yellow-600" />
                Informasi Pengiriman
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Nama Penerima</p>
                    <p className="font-semibold">AYU NIRWANA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Nomor Telepon</p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">-</p>
                      <button
                        onClick={handleCopyPhone}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Alamat Lengkap</p>
                    <p className="font-semibold">Jl Platina 3 , Gg. Nangka, Titi Papan, Kec. Medan Deli, Kota Medan, Sumatera Utara 20242</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyAddress}
                className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  copiedAddress
                    ? "bg-green-500 text-white"
                    : "bg-[#145555] text-yellow-100 hover:bg-[#0d3d3d]"
                } shadow-lg`}
              >
                {copiedAddress ? (
                  <>
                    <Check size={18} /> Alamat Berhasil Disalin!
                  </>
                ) : (
                  <>
                    <Copy size={18} /> Salin Alamat
                  </>
                )}
              </button>
            </div>

            {/* Gift Recommendations */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-yellow-200">
                <ShoppingBag className="w-5 h-5" />
                Rekomendasi Hadiah
              </h3>

              <div className="space-y-4">
                {gifts.map((gift, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-yellow-50 text-[#145555] rounded-2xl overflow-hidden shadow-xl"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={gift.image}
                          alt={gift.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center py-3 pr-4 flex-1">
                        <h4 className="font-bold text-lg text-[#145555] mb-1">
                          {gift.name}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">{gift.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-yellow-700 font-bold text-lg">
                            Rp {gift.price.toLocaleString("id-ID")}
                          </p>
                          <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Qty: {gift.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Decorative Bottom Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 w-32 h-[2px] bg-gradient-to-r from-transparent via-yellow-300 to-transparent mx-auto"
        />
      </div>
    </div>
  );
}