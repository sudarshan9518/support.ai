"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const navigate = useRouter();

  const [businessName, setbusinessName] = useState("");
  const [supportEmail, setsupportEmail] = useState("");
  const [knowledge, setknowledge] = useState("");
  const [saved, setsaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSettings = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/settings", {
        ownerId,
        businessName,
        supportEmail,
        knowledge,
      });
      console.log(result.data);
      setLoading(false);
      setsaved(true);

      setTimeout(() => {
        setsaved(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerId) {
      const handleGetDetails = async () => {
        try {
          const result = await axios.post("/api/settings", {
            ownerId,
          });
          console.log(result.data);
          setbusinessName(result.data.businessName);
          setsupportEmail(result.data.supportEmail);
          setknowledge(result.data.knowledge);
        } catch (error) {
          console.log(error);
        }
      };

      handleGetDetails();
    }
  }, [ownerId]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl  border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-lg font-semiboid tracking-tight cursor-pointer"
            onClick={() => navigate.push("/")}
          >
            support<span className="text-zinc-400">AI</span>
          </div>

          <button className="px-4 py-2 rounded-lg border cursor-pointer border-zinc-300 text-sm hover:bg-zinc-100 transition">
            Embed ChatBot{" "}
          </button>
        </div>
      </motion.div>

      <div className="flex justify-center px-4 py-14 mt-16">
        <motion.div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
          <div className="mb-10">
            <h1
              className="text-2xl font-semibold
            "
            >
              ChatBot Settings
            </h1>
            <p className="text-zinc-500 mt-1">
              manage your AI chatbot knowledge and business details
            </p>
          </div>

          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Business Details</h1>
            <div className="space-y-4">
              <input
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:reing-black/80 "
                placeholder="Business Name"
                type="text"
                onChange={(e) => setbusinessName(e.target.value)}
                value={businessName}
              />
              <input
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:reing-black/80 "
                placeholder="Support Email"
                type="text"
                onChange={(e) => setsupportEmail(e.target.value)}
                value={supportEmail}
              />
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Knowledge Base</h1>
            <p className="text-sm text-zinc-500 mb-4">
              add FAQs, polices, delivery info, refunds, etc.{" "}
            </p>
            <div className="space-y-4">
              <textarea
                className="w-full rounded-x h-54  rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:reing-black/80 "
                placeholder={` example:
         * Refund policy : 7 days retun avilable
         * delivery time: 3-5 working days
         * cash on delivery avilable
         * support hours`}
                onChange={(e) => setknowledge(e.target.value)}
                value={knowledge}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              onClick={handleSettings}
              className="px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60"
            >
              {loading ? "Saving..," : "Save"}
            </motion.button>

            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                text-sm font-medium text-emerald-600
                "
              >
                🟢 setting saved
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardClient;
