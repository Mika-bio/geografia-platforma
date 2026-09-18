"use client";

import { useEffect, useState } from "react";
import { Star, Zap, Award, Trophy } from "lucide-react";
import { BADGE_DEFS, getRewards, RewardsState } from "@/lib/storage";

export default function RewardsBar() {
  const [r, setR] = useState<RewardsState>({ xp: 0, stars: 0, level: 1, badges: [] });
  useEffect(() => {
    setR(getRewards());
    const id = setInterval(() => setR(getRewards()), 1500);
    return () => clearInterval(id);
  }, []);
  // level progress uses xp % 100
  const pct = Math.min(100, Math.round((r.xp % 100)));

  return (
    <div className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-1.5 font-semibold text-forest-800">
          <Trophy className="h-4 w-4 text-horizon-500" /> Деңгей {r.level}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sky-800">
          <Zap className="h-4 w-4" /> {r.xp} XP
        </span>
        <span className="inline-flex items-center gap-1.5 text-horizon-700">
          <Star className="h-4 w-4" /> {r.stars} жұлдыз
        </span>
      </div>
      <div className="min-w-[160px] flex-1">
        <div className="mb-1 flex justify-between text-xs text-mountain-600">
          <span>Келесі деңгей</span>
          <span>{r.xp % 100}/100</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-forest-100">
          <div className="h-full bg-gradient-to-r from-horizon-400 to-forest-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {BADGE_DEFS.map((b) => {
          const on = r.badges.includes(b.id);
          return (
            <span
              key={b.id}
              title={`${b.name}: ${b.desc}`}
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                on ? "bg-forest-100 text-forest-800" : "bg-mountain-100 text-mountain-400"
              }`}
            >
              <Award className="h-3 w-3" />
              {b.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
