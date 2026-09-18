import { buildOnlinePrompt } from "./ji-engine";

declare global {
  interface Window {
    puter?: {
      ai?: {
        chat: (
          prompt: string,
          options?: { model?: string; stream?: boolean }
        ) => Promise<unknown>;
      };
    };
  }
}

let loadPromise: Promise<boolean> | null = null;

export function loadPuterScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.puter?.ai?.chat) return Promise.resolve(true);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[data-puter="1"]');
    if (existing) {
      const check = () => {
        if (window.puter?.ai?.chat) resolve(true);
        else setTimeout(check, 200);
      };
      check();
      setTimeout(() => resolve(!!window.puter?.ai?.chat), 8000);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.puter.com/v2/";
    s.async = true;
    s.dataset.puter = "1";
    s.onload = () => {
      let n = 0;
      const tick = () => {
        if (window.puter?.ai?.chat) resolve(true);
        else if (n++ < 40) setTimeout(tick, 150);
        else resolve(false);
      };
      tick();
    };
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
  return loadPromise;
}

function extractText(result: unknown): string {
  if (result == null) return "";
  if (typeof result === "string") return result;
  if (typeof result === "object") {
    const r = result as Record<string, unknown>;
    if (typeof r.message === "string") return r.message;
    if (r.message && typeof r.message === "object") {
      const m = r.message as Record<string, unknown>;
      if (typeof m.content === "string") return m.content;
      if (Array.isArray(m.content)) {
        return m.content
          .map((c) =>
            typeof c === "string"
              ? c
              : typeof c === "object" && c && "text" in c
                ? String((c as { text: unknown }).text)
                : ""
          )
          .join("");
      }
    }
    if (typeof r.text === "string") return r.text;
    if (typeof r.content === "string") return r.content;
    try {
      return JSON.stringify(result);
    } catch {
      return String(result);
    }
  }
  return String(result);
}

export async function askPuter(userMessage: string): Promise<string> {
  const ok = await loadPuterScript();
  if (!ok || !window.puter?.ai?.chat) {
    throw new Error("Puter.js қолжетімсіз");
  }
  const prompt = buildOnlinePrompt(userMessage);
  const models = ["gpt-4o-mini", "gpt-5-nano", undefined];
  let lastErr: unknown;
  for (const model of models) {
    try {
      const res = model
        ? await window.puter.ai.chat(prompt, { model })
        : await window.puter.ai.chat(prompt);
      const text = extractText(res).trim();
      if (text && text.length > 20) return text;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("Puter жауап бермеді");
}
