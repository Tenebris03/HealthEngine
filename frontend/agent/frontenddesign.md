# Frontend Projektstruktur (React 19 + Vite)

Diese Struktur basiert auf dem QuestEngine-Projekt und nutzt moderne Best-Practices wie CSS-Module und lokalisierte Sprachdateien.

## Verzeichnisbaum

```text
frontend/
├── public/                 # Statische Assets (Logos, Icons, Favicon)
│   ├── favicon.svg
│   ├── icons.svg
│   └── QuestEngineLogo.png
├── src/
│   ├── assets/             # Globale Assets wie Schriftarten
│   │   └── fonts/
│   ├── components/         # Wiederverwendbare UI-Komponenten
│   │   ├── Card/           # Beispiel: Komponente mit Logik, Style & Test
│   │   │   ├── Card.tsx
│   │   │   ├── Card.css    # CSS Module (lokal scoped)
│   │   │   └── Card.spec.tsx
│   │   ├── Header/         # Komponente mit eigenen Übersetzungen
│   │   │   ├── Header.tsx
│   │   │   ├── Header.css
│   │   │   └── locales/    # Co-located translations
│   │   │       ├── de/translation.json
│   │   │       └── en/translation.json
│   │   └── ...
│   ├── context/            # React Context Provider (z.B. Auth, User)
│   │   ├── UserContext.tsx
│   │   └── UserContext.spec.tsx
│   ├── hooks/              # Custom React Hooks (Business Logic)
│   │   ├── example.ts
│   │   └── example.spec.ts
│   ├── pages/              # Vollständige Seiten-Ansichten
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Dashboard.css
│   │   │   └── locales/
│   │   ├── Auth/           # Gruppierte Seiten (Login/Register)
│   │   └── ...
│   ├── services/           # API-Clients & externe Logik (z.B. WebLLM)
│   │   ├── example.ts
│   │   └── example2.ts
│   ├── theme/              # Globale Design-Tokens
│   │   ├── typography.css
│   │   └── variables.css   # CSS Variablen für Farben/Abstände
│   ├── types/              # TypeScript Interfaces & Definitionen
│   │   └── example.types.ts
│   ├── App.tsx             # Haupt-App Komponente & Routing
│   ├── App.css             # App-spezifische Layout-Stile
│   ├── i18n.ts             # Internationalisierungs-Konfiguration
│   ├── index.css           # Globaler CSS-Reset & Basis-Stile
│   ├── main.tsx            # App Entry Point
│   └── test/               # Test-Setup & Utilities
│       └── setup.ts
├── .env                    # Umgebungsvariablen (z.B. Backend URL)
├── eslint.config.js        # Linting Regeln
├── index.html              # HTML Template
├── package.json            # Abhängigkeiten & Skripte
├── tsconfig.json           # TypeScript Konfiguration
└── vite.config.ts          # Vite Build-Konfiguration