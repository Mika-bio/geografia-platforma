"use client";

import { useCallback, useEffect, useState } from "react";
import { Star, Zap, Award, Trophy } from "lucide-react";
import { BADGE_DEFS, getRewards, REWARDS_EVENT, RewardsState } from "@/lib/storage";

export default function RewardsBar() {
  const [r, setR] = useState<RewardsState>({ xp: 0, stars: 0, level: 1, badges: [] });

  const refresh = useCallback(() => {
    setR(getRewards());
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === "geopro_rewards" || e.key === "geopro_results") refresh();
    };
    const onFocus = () => refresh();
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(REWARDS_EVENT, refresh);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(REWARDS_EVENT, refresh);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  const pct = Math.min(100, Math.round(r.xp % 100));

  return (
    <div className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-1.5 font-semibold text-navy-800">
          <Trophy className="h-4 w-4 text-gold-500" /> Деңгей {r.level}
        </span>
        <span className="inline-flex items-center gap-1.5 text-teal-800">
          <Zap className="h-4 w-4" /> {r.xp} XP
        </span>
        <span className="inline-flex items-center gap-1.5 text-gold-700">
          <Star className="h-4 w-4" /> {r.stars} жұлдыз
        </span>
      </div>
      <div className="min-w-[160px] flex-1">
        <div className="mb-1 flex justify-between text-xs text-sand-600">
          <span>Келесі деңгей</span>
          <span>{r.xp % 100}/100</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-navy-100">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-teal-500"
            style={{ width: `${pct}%` }}
          />
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
                on ? "bg-teal-100 text-teal-800" : "bg-sand-100 text-sand-400"
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
