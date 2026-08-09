"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Heart, ShieldCheck, Key, User, ArrowRight, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_auth_session", "true");
          window.location.href = "/admin/dashboard";
        } else {
          router.push("/admin/dashboard");
        }
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("Network connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0711] text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans select-none relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#FF3366]/10 blur-[120px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#130E1E] border border-[#FF3366]/30 shadow-[0_20px_60px_rgba(255,51,102,0.15)] relative z-10 space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#FF1A66] to-[#FF4F91] p-0.5 shadow-lg">
            <div className="w-full h-full rounded-2xl bg-[#1A1226] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#FF3366]" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">
            13 Challenges of Love
          </h1>
          <p className="text-xs font-bold text-[#FF9CBD] uppercase tracking-widest">
            ⚙️ Admin Control Center
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold text-center animate-fade-in">
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1C142B] border border-zinc-800 text-white font-medium text-sm focus:border-[#FF3366] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1C142B] border border-zinc-800 text-white font-medium text-sm focus:border-[#FF3366] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-zinc-700 text-[#FF3366] focus:ring-0 accent-[#FF3366]"
              />
              <span>Remember session</span>
            </label>
            <button
              type="button"
              onClick={() => alert("Admin credentials: User ID: satyam, Password: baby ❤️")}
              className="text-[#FF9CBD] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF1A66] to-[#FF4F91] text-white font-black text-sm uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>LOGIN TO CONTROL CENTER</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-zinc-800/80">
          <p className="text-[11px] text-zinc-500 font-medium">
            Protected Server-Side Session Auth • SQLite Database Engine
          </p>
        </div>
      </div>
    </div>
  );
}
