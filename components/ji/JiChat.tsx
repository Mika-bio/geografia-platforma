"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, User } from "lucide-react";
import { answerOffline, type JiAnswer } from "@/lib/ji-engine";
import { askPuter, loadPuterScript } from "@/lib/puter-ai";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  meta?: string;
};

const SUGGESTIONS = [
  "Физикалық география салаларын ата",
  "Шоқан Уәлиханов туралы қысқаша айт",
  "Литосфера дегеніміз не?",
  "8 сынып КМЖ жаса: География ғылымының салалары",
];

export default function JiChat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Сәлем! Мен география ЖИ көмекшісімін. Кез келген тапсырманы, тест сұрағын немесе КМЖ сұранысын жазыңыз — қазақша жауап беремін.",
      meta: "дайын",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [puterReady, setPuterReady] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadPuterScript().then(setPuterReady).catch(() => setPuterReady(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function ask(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text: q };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    let reply: JiAnswer = answerOffline(q);
    let meta = "жергілікті ЖИ";

    try {
      const online = await Promise.race([
        askPuter(q),
        new Promise<string>((_, rej) =>
          setTimeout(() => rej(new Error("timeout")), 25000)
        ),
      ]);
      if (online && online.trim().length > 30) {
        reply = { text: online.trim(), source: "online", kind: "qa" };
        meta = "онлайн ЖИ (Puter)";
      }
    } catch {
      // keep offline
      meta = "жергілікті ЖИ (онлайн қолжетімсіз)";
    }

    setMessages((m) => [
      ...m,
      {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: reply.text,
        meta,
      },
    ]);
    setLoading(false);
  }

  return (
    <div className="card flex h-[min(72vh,720px)] flex-col p-0 overflow-hidden">
      <div className="border-b border-forest-100 bg-gradient-to-r from-forest-50 to-sky-50 px-4 py-3">
        <h2 className="font-serif text-lg font-bold text-forest-900">ЖИ көмекші</h2>
        <p className="text-xs text-mountain-600">
          Кез келген география тапсырмасына жауап ·{" "}
          {puterReady ? "онлайн + жергілікті" : "жергілікті режим (онлайн жүктелуде…)"}
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                <Bot className="h-4 w-4" />
              </span>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-forest-600 text-white"
                  : "bg-white border border-forest-100 text-mountain-800 shadow-sm"
              }`}
            >
              {msg.text}
              {msg.meta && msg.role === "assistant" && (
                <p className="mt-2 text-[10px] uppercase tracking-wide text-mountain-400">{msg.meta}</p>
              )}
            </div>
            {msg.role === "user" && (
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                <User className="h-4 w-4" />
              </span>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-mountain-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Жауап дайындалуда…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-forest-100 bg-white px-3 py-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              disabled={loading}
              onClick={() => ask(s)}
              className="rounded-full border border-forest-200 bg-forest-50 px-2.5 py-1 text-[11px] font-medium text-forest-700 hover:bg-forest-100 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <input
            className="input-field flex-1"
            placeholder="Тапсырманы немесе сұрақты жазыңыз…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary shrink-0" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
