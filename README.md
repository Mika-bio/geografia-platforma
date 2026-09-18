# География Әлемі (GeoAI 8–9)

Қазақстан мектептерінің **8–9 сынып** география мұғалімдері мен оқушыларына арналған веб-платформа.

Nature aesthetic · Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react

## English (short)

Educational geography platform for Kazakhstan grades 8–9: map types, client-side AI lesson/assessment generators (КМЖ / БЖБ / ТЖБ), PISA-style tasks, olympiad practice, 40+ quizzes, and full textbook TOC topics. Auth persists in `localStorage`. UI is entirely in Kazakh Cyrillic.

## Іске қосу

```bash
cd geografia-platforma
npm install
npm run dev
```

Браузерде: [http://localhost:3000](http://localhost:3000)

Өндірістік жинақ:

```bash
npm run build
npm start
```

## Маршруттар (routes)

| Жол | Сипаттама |
|-----|-----------|
| `/` | Басты бет |
| `/kartalar` | Географиялық карта түрлері |
| `/ji` | ЖИ: КМЖ / БЖБ / ТЖБ жасау |
| `/pisa` | PISA-ға дайындық |
| `/olimpiada` | Олимпиадаға дайындық |
| `/testter` | Тесттер (40+ сұрақ) |
| `/takyryptar` | Тақырыптар (оқулық TOC) |
| `/takyryptar/[id]` | Жеке § беті |
| `/login` | Кіру / тіркелу |
| `/dashboard` | Пайдаланушы панелі |

## Аккаунттар (seed)

| Аты жөні | Логин | Құпия сөз | Рөл |
|----------|-------|-----------|-----|
| Айгүл Нұрланова | `aigul.n` | `mugalim2024` | мұғалім |
| Ерлан Қасымов | `erlan.k` | `okushy2024` | оқушы |
| Дана Сейітова | `dana.s` | `geo2024` | оқушы |

Пайдаланушылар `localStorage` ішінде сақталады (`geoalemi_users`, `geoalemi_session`).

## Оқулық құрылымы

- Кіріспе
- Географиялық зерттеулер әдістемелері (§1–3)
- Картография және ГМБ (§4–6)
- Литосфера (§7–16)
- Атмосфера (§17–24)
- Гидросфера (§25–32)
- Терминдер сөздігі

## Технологиялар

- Next.js 14.2 · React 18 · TypeScript
- Tailwind CSS (forest / earth / sky палитрасы)
- lucide-react белгішелері
- Source Serif 4 + Manrope қаріптері (Google Fonts)

## Лицензия

Оқу мақсатындағы жоба.
