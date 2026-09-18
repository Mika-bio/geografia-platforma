# GEOGRAPHY PRO — GEOGRAPHIC WORLD & PISA

Қазақ тіліндегі интерактивті география платформасы (**8–9 сынып**): Олимпиада • PISA • Тест.

Next.js 14 App Router · TypeScript · Tailwind · static export (`out/`) · Cloudflare Pages.

## Іске қосу

```bash
npm install
npm run dev
```

## Build / Deploy

```bash
npm run build   # → out/
npx wrangler@3 pages deploy out --project-name geografia-alemi --branch main
```

## Маршруттар

| Жол | Сипаттама |
|-----|-----------|
| `/` | GEOGRAPHIC WORLD & PISA · профиль |
| `/takyryptar` | 25 (8) + 27 (9) тақырып |
| `/takyryptar/[id]` | Теория + практика + карта + тест |
| `/olimpiada` | 3 деңгей олимпиада |
| `/pisa` | PISA сценарийлері |
| `/testter` | ≥100 сұрақ × 2 сынып |
| `/karta` | ҚР + әлем интерактивті карта |
| `/natizheler` | Нәтижелер, XP, бейдж |
| `/mugalim` | Мұғалім панелі + CSV |
| `/login` | Кіру / тіркелу |

## Демо аккаунттар

- Мұғалім: `aigul.n` / `mugalim2024`
- Оқушы: `erlan.k` / `okushy2024`
