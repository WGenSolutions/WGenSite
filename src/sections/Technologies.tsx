import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'

/**
 * Encodes inline SVG markup as a data URI for technology tile artwork.
 */
const createIllustration = (svgMarkup: string) => {
  const _encodedMarkup = encodeURIComponent(svgMarkup.trim())
  return `data:image/svg+xml;utf8,${_encodedMarkup}`
}

/**
 * Technology storytelling cards displayed inside the horizontal scroller.
 */
const TECH_TOPICS = [
  {
    id: 'humanCoders',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="humanGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#f472b6" />
          </linearGradient>
          <radialGradient id="humanHalo" cx="55%" cy="22%" r="70%">
            <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="200" fill="#050b1a" />
        <circle cx="96" cy="106" r="78" fill="url(#humanGradient)" opacity="0.9" />
        <circle cx="214" cy="60" r="64" fill="url(#humanHalo)" opacity="0.8" />
        <path d="M60 172c12-36 42-60 80-60s68 24 80 60" fill="none" stroke="#e0f2fe" stroke-opacity="0.4" stroke-width="6" stroke-linecap="round" />
        <g fill="#f8fafc" fill-opacity="0.12">
          <rect x="46" y="46" width="14" height="14" rx="3" />
          <rect x="70" y="64" width="14" height="14" rx="3" />
          <rect x="94" y="46" width="14" height="14" rx="3" />
          <rect x="118" y="64" width="14" height="14" rx="3" />
        </g>
      </svg>
    `),
  shadowClass: 'shadow-[0_0_18px_rgba(59,130,246,0.24)]',
  },
  {
    id: 'aiCoders',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="aiMatrix" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stop-color="#22d3ee" />
            <stop offset="45%" stop-color="#8b5cf6" />
            <stop offset="100%" stop-color="#1e1b4b" />
          </linearGradient>
          <radialGradient id="aiPulse" cx="78%" cy="30%" r="50%">
            <stop offset="0%" stop-color="#a855f7" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#22d3ee" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="200" fill="#060822" />
        <rect x="24" y="24" width="272" height="152" fill="#0f172a" rx="24" />
        <g stroke="#312e81" stroke-width="1" stroke-opacity="0.5">
          <line x1="64" y1="40" x2="64" y2="160" />
          <line x1="104" y1="40" x2="104" y2="160" />
          <line x1="144" y1="40" x2="144" y2="160" />
          <line x1="184" y1="40" x2="184" y2="160" />
          <line x1="224" y1="40" x2="224" y2="160" />
          <line x1="264" y1="40" x2="264" y2="160" />
          <line x1="40" y1="72" x2="280" y2="72" />
          <line x1="40" y1="112" x2="280" y2="112" />
          <line x1="40" y1="152" x2="280" y2="152" />
        </g>
        <circle cx="202" cy="94" r="62" fill="url(#aiMatrix)" opacity="0.92" />
        <circle cx="254" cy="70" r="46" fill="url(#aiPulse)" opacity="0.75" />
        <g fill="#e0e7ff" fill-opacity="0.38">
          <circle cx="92" cy="92" r="10" />
          <circle cx="124" cy="124" r="12" />
          <circle cx="156" cy="84" r="8" />
          <circle cx="188" cy="132" r="9" />
        </g>
      </svg>
    `),
  shadowClass: 'shadow-[0_0_18px_rgba(139,92,246,0.24)]',
  },
  {
    id: 'aiAutomations',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="aiAutomationFlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#22d3ee" />
            <stop offset="50%" stop-color="#34d399" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="#03131a" />
        <path d="M26 44c62 0 62 88 124 88s62-88 124-88" fill="none" stroke="#22d3ee" stroke-width="8" stroke-linecap="round" stroke-opacity="0.35" />
        <path d="M26 156c62 0 62-72 124-72s62 72 124 72" fill="none" stroke="#34d399" stroke-width="8" stroke-linecap="round" stroke-opacity="0.35" />
        <path d="M48 102c54 0 54 48 108 48s54-48 108-48" fill="none" stroke="url(#aiAutomationFlow)" stroke-width="10" stroke-linecap="round" stroke-opacity="0.85" />
        <g fill="#f0fdf4" fill-opacity="0.5">
          <circle cx="80" cy="88" r="7" />
          <circle cx="160" cy="132" r="8" />
          <circle cx="240" cy="88" r="6" />
        </g>
      </svg>
    `),
  shadowClass: 'shadow-[0_0_18px_rgba(45,212,191,0.24)]',
  },
  {
    id: 'hybridAutomations',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="hybridLinear" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#facc15" />
            <stop offset="100%" stop-color="#38bdf8" />
          </linearGradient>
          <radialGradient id="hybridRadial" cx="70%" cy="26%" r="60%">
            <stop offset="0%" stop-color="#facc15" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="200" fill="#071229" />
        <circle cx="228" cy="74" r="58" fill="url(#hybridRadial)" />
        <path d="M46 160h72l32-64 32 64h72" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.6" />
        <path d="M72 128h44l20-40 20 40h44" fill="none" stroke="#facc15" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.7" />
        <rect x="120" y="70" width="80" height="48" rx="10" fill="url(#hybridLinear)" opacity="0.88" />
        <path d="M140 86h40" stroke="#0f172a" stroke-width="6" stroke-linecap="round" opacity="0.4" />
        <path d="M140 104h40" stroke="#0f172a" stroke-width="6" stroke-linecap="round" opacity="0.4" />
      </svg>
    `),
  shadowClass: 'shadow-[0_0_18px_rgba(56,189,248,0.22)]',
  },
  {
    id: 'python',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="pythonMist" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0ea5e9" />
            <stop offset="60%" stop-color="#22d3ee" />
            <stop offset="100%" stop-color="#a3e635" />
          </linearGradient>
          <linearGradient id="pythonCurrent" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stop-color="#0b1120" />
            <stop offset="100%" stop-color="#111827" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#pythonCurrent)" />
        <path d="M-20 170 Q 40 110 110 140 T 240 136 T 360 110 L 360 200 L -20 200 Z" fill="#0ea5e9" fill-opacity="0.35" />
        <path d="M-20 150 Q 40 80 120 120 T 250 130 T 360 90 L 360 200 L -20 200 Z" fill="#22d3ee" fill-opacity="0.45" />
        <path d="M-20 130 Q 44 60 132 110 T 260 118 T 360 70 L 360 200 L -20 200 Z" fill="url(#pythonMist)" opacity="0.7" />
        <circle cx="72" cy="70" r="14" fill="#a3e635" opacity="0.4" />
        <circle cx="210" cy="54" r="18" fill="#38bdf8" opacity="0.25" />
        <circle cx="260" cy="90" r="10" fill="#fefce8" opacity="0.3" />
      </svg>
    `),
  shadowClass: 'shadow-[0_0_18px_rgba(250,204,21,0.22)]',
  },
  {
    id: 'typescript',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="tsBlocks" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1d4ed8" />
            <stop offset="100%" stop-color="#38bdf8" />
          </linearGradient>
          <linearGradient id="tsBackdrop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#020617" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#tsBackdrop)" />
        <rect x="36" y="40" width="120" height="120" rx="22" fill="url(#tsBlocks)" opacity="0.8" />
        <rect x="166" y="56" width="118" height="96" rx="18" fill="#1e40af" opacity="0.55" />
        <rect x="86" y="80" width="184" height="52" rx="16" fill="#60a5fa" opacity="0.2" />
        <path d="M64 64h64" stroke="#bfdbfe" stroke-width="6" stroke-linecap="round" stroke-opacity="0.6" />
        <path d="M180 132h76" stroke="#60a5fa" stroke-width="6" stroke-linecap="round" stroke-opacity="0.4" />
        <circle cx="120" cy="140" r="16" fill="#0ea5e9" opacity="0.6" />
        <circle cx="214" cy="82" r="12" fill="#38bdf8" opacity="0.55" />
        <circle cx="246" cy="106" r="10" fill="#e0f2fe" opacity="0.4" />
      </svg>
    `),
  shadowClass: 'shadow-[0_0_18px_rgba(59,130,246,0.22)]',
  },
  {
    id: 'nodejs',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <radialGradient id="nodePulse" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="#22c55e" />
            <stop offset="60%" stop-color="#16a34a" />
            <stop offset="100%" stop-color="#052e16" />
          </radialGradient>
        </defs>
        <rect width="320" height="200" fill="#041310" />
        <circle cx="160" cy="100" r="96" fill="#064e3b" opacity="0.35" />
        <circle cx="160" cy="100" r="72" fill="#065f46" opacity="0.3" />
        <circle cx="160" cy="100" r="52" fill="url(#nodePulse)" opacity="0.85" />
        <g stroke="#bbf7d0" stroke-opacity="0.35" stroke-width="6" stroke-linecap="round">
          <path d="M160 32v32" />
          <path d="M160 168v-32" />
          <path d="M64 100h32" />
          <path d="M224 100h32" />
          <path d="M96 44l22 22" />
          <path d="M224 156l-22-22" />
          <path d="M96 156l22-22" />
          <path d="M224 44l-22 22" />
        </g>
        <circle cx="160" cy="100" r="20" fill="#bbf7d0" opacity="0.3" />
        <circle cx="160" cy="100" r="10" fill="#f0fdf4" opacity="0.6" />
      </svg>
    `),
  shadowClass: 'shadow-[0_0_18px_rgba(34,197,94,0.24)]',
  },
  {
    id: 'fastApi',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="fastApiCurtain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#67e8f9" />
            <stop offset="55%" stop-color="#22d3ee" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
          <linearGradient id="fastApiGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#0ea5e9" />
            <stop offset="100%" stop-color="#2dd4bf" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="#01131c" />
        <g opacity="0.8">
          <rect x="32" y="28" width="40" height="144" rx="18" fill="url(#fastApiCurtain)" />
          <rect x="94" y="20" width="34" height="160" rx="17" fill="url(#fastApiCurtain)" opacity="0.7" />
          <rect x="148" y="36" width="42" height="136" rx="20" fill="url(#fastApiCurtain)" opacity="0.9" />
          <rect x="210" y="16" width="36" height="168" rx="18" fill="url(#fastApiCurtain)" opacity="0.65" />
          <rect x="262" y="44" width="28" height="124" rx="14" fill="url(#fastApiCurtain)" opacity="0.55" />
        </g>
        <path d="M-10 160 Q 96 120 168 134 T 330 124" fill="none" stroke="url(#fastApiGlow)" stroke-width="10" stroke-linecap="round" stroke-opacity="0.7" />
        <path d="M-10 184 Q 120 152 204 164 T 330 154" fill="none" stroke="url(#fastApiGlow)" stroke-width="8" stroke-linecap="round" stroke-opacity="0.45" />
        <circle cx="86" cy="82" r="12" fill="#f0fdfa" opacity="0.42" />
        <circle cx="228" cy="108" r="16" fill="#ccfbf1" opacity="0.38" />
      </svg>
    `),
  shadowClass: 'shadow-[0_0_18px_rgba(45,212,191,0.22)]',
  },
  {
    id: 'reactSmallApps',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" role="img" aria-label="Dark React apps illustration">
        <defs>
          <!-- Glow aura -->
          <radialGradient id="auraDark" cx="50%" cy="46%" r="60%">
            <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.8"/>
            <stop offset="60%" stop-color="#0ea5e9" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
          </radialGradient>

          <!-- Shadow for cards -->
          <filter id="darkCardShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0ea5e9" flood-opacity="0.15"/>
          </filter>

          <!-- Accent gradient -->
          <linearGradient id="accentDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#818cf8"/>
          </linearGradient>

          <!-- Subtle grid -->
          <pattern id="darkGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#334155" stroke-opacity="0.6" stroke-width="1"/>
          </pattern>
        </defs>

        <!-- Background -->
        <rect width="320" height="200" fill="#0f172a"/>
        <rect width="320" height="200" fill="url(#darkGrid)" opacity="0.3"/>

        <!-- Aura glow -->
        <circle cx="160" cy="92" r="88" fill="url(#auraDark)"/>

        <!-- React atom -->
        <g transform="translate(160 92)">
          <ellipse rx="56" ry="22" fill="none" stroke="url(#accentDark)" stroke-width="3" opacity="0.85"/>
          <ellipse rx="56" ry="22" fill="none" stroke="url(#accentDark)" stroke-width="3" transform="rotate(60)" opacity="0.85"/>
          <ellipse rx="56" ry="22" fill="none" stroke="url(#accentDark)" stroke-width="3" transform="rotate(-60)" opacity="0.85"/>
          <circle r="7" fill="#38bdf8"/>
          <circle r="11" fill="none" stroke="#38bdf8" stroke-opacity="0.25" stroke-width="2"/>
        </g>

        <!-- Light rays -->
        <g stroke="url(#accentDark)" stroke-linecap="round" stroke-opacity="0.4">
          <path d="M160 8v12" stroke-width="2"/>
          <path d="M160 164v12" stroke-width="2"/>
          <path d="M296 92h-12" stroke-width="2"/>
          <path d="M36 92H24" stroke-width="2"/>
          <path d="M246 26l-8 8" stroke-width="2"/>
          <path d="M74 158l-8 8" stroke-width="2"/>
          <path d="M246 158l-8-8" stroke-width="2"/>
          <path d="M74 26l8 8" stroke-width="2"/>
        </g>

        <!-- App cards (dark UI) -->
        <g filter="url(#darkCardShadow)">
          <!-- Card 1 -->
          <g transform="translate(32 118)">
            <rect width="108" height="62" rx="12" fill="#1e293b" stroke="#334155"/>
            <g transform="translate(10 8)">
              <circle r="3" cx="0" cy="0" fill="#ef4444"/>
              <circle r="3" cx="10" cy="0" fill="#f59e0b"/>
              <circle r="3" cx="20" cy="0" fill="#10b981"/>
            </g>
            <rect x="12" y="24" width="72" height="8" rx="4" fill="#334155"/>
            <rect x="12" y="38" width="56" height="8" rx="4" fill="#334155"/>
            <path d="M16 50c8-10 14-10 22-2s16 10 24-2" fill="none" stroke="url(#accentDark)" stroke-width="2"/>
          </g>

          <!-- Card 2 -->
          <g transform="translate(182 116)">
            <rect width="108" height="66" rx="12" fill="#1e293b" stroke="#334155"/>
            <g transform="translate(10 8)">
              <circle r="3" cx="0" cy="0" fill="#ef4444"/>
              <circle r="3" cx="10" cy="0" fill="#f59e0b"/>
              <circle r="3" cx="20" cy="0" fill="#10b981"/>
            </g>
            <rect x="12" y="24" width="24" height="24" rx="6" fill="#0f172a"/>
            <rect x="42" y="24" width="24" height="24" rx="6" fill="#0f172a"/>
            <rect x="72" y="24" width="24" height="24" rx="6" fill="#0f172a"/>
            <path d="M24 36h0" stroke="url(#accentDark)" stroke-width="6" stroke-linecap="round"/>
            <path d="M54 36h0" stroke="url(#accentDark)" stroke-width="6" stroke-linecap="round"/>
            <path d="M84 36h0" stroke="url(#accentDark)" stroke-width="6" stroke-linecap="round"/>
            <rect x="24" y="54" width="60" height="6" rx="3" fill="#334155"/>
          </g>

          <!-- Card 3 -->
          <g transform="translate(126 20)">
            <rect width="68" height="44" rx="10" fill="#1e293b" stroke="#334155"/>
            <g transform="translate(8 7)">
              <circle r="2.5" cx="0" cy="0" fill="#ef4444"/>
              <circle r="2.5" cx="8" cy="0" fill="#f59e0b"/>
              <circle r="2.5" cx="16" cy="0" fill="#10b981"/>
            </g>
            <rect x="12" y="20" width="44" height="6" rx="3" fill="#334155"/>
            <path d="M12 34c8-6 16-6 24 0s16 6 20-2" fill="none" stroke="url(#accentDark)" stroke-width="2"/>
          </g>
        </g>

        <!-- Floating chips -->
        <g opacity="0.9">
          <rect x="32" y="32" width="54" height="22" rx="11" fill="#1e293b" stroke="#334155"/>
          <circle cx="48" cy="43" r="4" fill="#38bdf8"/>
          <rect x="58" y="38" width="20" height="10" rx="5" fill="#334155"/>
        </g>
        <g opacity="0.9">
          <rect x="236" y="28" width="52" height="22" rx="11" fill="#1e293b" stroke="#334155"/>
          <circle cx="252" cy="39" r="4" fill="#818cf8"/>
          <rect x="262" y="34" width="18" height="10" rx="5" fill="#334155"/>
        </g>

        <!-- Sparkles -->
        <g fill="#38bdf8" opacity="0.65">
          <circle cx="286" cy="152" r="2"/>
          <circle cx="40" cy="156" r="2"/>
          <circle cx="272" cy="80" r="1.8"/>
          <circle cx="52" cy="72" r="1.6"/>
        </g>
      </svg>
    `),
    shadowClass: 'shadow-[0_0_18px_rgba(56,189,248,0.18)]',
  },
  {
    id: 'angularBigApps',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="angularPillars" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stop-color="#f97316" />
            <stop offset="50%" stop-color="#ef4444" />
            <stop offset="100%" stop-color="#7f1d1d" />
          </linearGradient>
          <linearGradient id="angularGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fecaca" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="#180306" />
        <rect x="60" y="48" width="200" height="132" rx="28" fill="#450a0a" opacity="0.35" />
        <path d="M88 160l72-128 72 128z" fill="url(#angularPillars)" />
        <path d="M116 160l44-80 44 80z" fill="#fb7185" opacity="0.4" />
        <path d="M136 160l24-44 24 44z" fill="#fde68a" opacity="0.35" />
        <rect x="96" y="32" width="128" height="24" rx="12" fill="url(#angularGlow)" />
        <circle cx="160" cy="60" r="18" fill="#fee2e2" opacity="0.4" />
        <circle cx="208" cy="142" r="8" fill="#fca5a5" opacity="0.4" />
      </svg>
    `),
    shadowClass: 'shadow-[0_0_18px_rgba(239,68,68,0.2)]',
  },
  {
    id: 'androidAppsWidgets',
    illustration: createIllustration(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id="androidSheets" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#86efac" />
            <stop offset="100%" stop-color="#22c55e" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="#03140b" />
        <circle cx="236" cy="66" r="52" fill="#86efac" opacity="0.2" />
        <circle cx="88" cy="166" r="64" fill="#22c55e" opacity="0.18" />
        <g transform="rotate(-8 160 100)">
          <rect x="86" y="54" width="108" height="72" rx="18" fill="url(#androidSheets)" opacity="0.85" />
          <rect x="144" y="102" width="112" height="64" rx="18" fill="#bbf7d0" opacity="0.45" />
          <rect x="60" y="104" width="96" height="56" rx="18" fill="#4ade80" opacity="0.35" />
        </g>
        <path d="M60 66l18 18" stroke="#bbf7d0" stroke-width="6" stroke-linecap="round" stroke-opacity="0.4" />
        <path d="M246 138l18 18" stroke="#bbf7d0" stroke-width="6" stroke-linecap="round" stroke-opacity="0.4" />
        <circle cx="200" cy="52" r="10" fill="#bbf7d0" opacity="0.5" />
      </svg>
    `),
    shadowClass: 'shadow-[0_0_18px_rgba(34,197,94,0.22)]',
  },
] as const satisfies readonly {
  id:
    | 'humanCoders'
    | 'aiCoders'
    | 'aiAutomations'
    | 'hybridAutomations'
    | 'python'
    | 'typescript'
    | 'nodejs'
    | 'fastApi'
    | 'reactSmallApps'
    | 'angularBigApps'
    | 'androidAppsWidgets'
  illustration: string
  shadowClass: string
}[]

/**
 * Horizontal showcase of core technologies and delivery modes we excel at.
 */
export const Technologies = () => {
  const { t: _t } = useTranslation('home')
  const _prefersReducedMotion = useReducedMotion()
  const _containerRef = useRef<HTMLDivElement | null>(null)

  /**
   * Auto-scrolls the technology carousel on larger screens while supporting drag-to-scroll interactions.
   */
  useEffect(() => {
    if (_prefersReducedMotion) return undefined
    if (typeof window === 'undefined') return undefined
    const _container = _containerRef.current
    if (!_container) return undefined

    const _mediaQuery = window.matchMedia('(min-width: 768px)')
    const _shouldAutoScroll = _mediaQuery.matches && _container.scrollWidth > _container.clientWidth

    let _rafId: number | null = null
    let _scrollDirection = 1
    let _isPaused = false
    let _resumeTimeout: ReturnType<typeof setTimeout> | null = null
    let _autoScrollActive = _shouldAutoScroll
    let _isDragging = false
    let _activePointerId: number | null = null
    let _dragStartX = 0
    let _dragStartScrollLeft = 0

    const _step = () => {
      const _maxScroll = _container.scrollWidth - _container.clientWidth
      if (_maxScroll <= 0) {
        _isPaused = true
        if (_rafId !== null) {
          window.cancelAnimationFrame(_rafId)
          _rafId = null
        }
        return
      }

      _container.scrollLeft += 0.6 * _scrollDirection

      if (_container.scrollLeft <= 0) {
        _scrollDirection = 1
      } else if (_container.scrollLeft >= _maxScroll) {
        _scrollDirection = -1
      }

      if (!_isPaused) {
        _rafId = window.requestAnimationFrame(_step)
      }
    }

    const _start = () => {
      if (!_autoScrollActive) return
      if (_rafId === null && !_isPaused) {
        _rafId = window.requestAnimationFrame(_step)
      }
    }

    const _scheduleResume = () => {
      if (_resumeTimeout !== null) {
        window.clearTimeout(_resumeTimeout)
      }
      _resumeTimeout = window.setTimeout(() => {
        if (!_autoScrollActive) {
          _isPaused = true
          return
        }
        _isPaused = false
        _start()
      }, 2400)
    }

    const _pause = (_shouldSchedule = true) => {
      _isPaused = true
      if (_rafId !== null) {
        window.cancelAnimationFrame(_rafId)
        _rafId = null
      }
      if (_shouldSchedule) {
        _scheduleResume()
      }
    }

    const _handleHoverInteraction = () => {
      _pause()
    }

    const _handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      _pause(false)
      _isDragging = true
      _activePointerId = event.pointerId
      _dragStartX = event.clientX
      _dragStartScrollLeft = _container.scrollLeft
      _container.classList.add('select-none')
      try {
        _container.setPointerCapture(event.pointerId)
      } catch (_error) {
        // Ignore pointer capture availability issues
      }
    }

    const _handlePointerMove = (event: PointerEvent) => {
      if (!_isDragging || event.pointerId !== _activePointerId) return
      event.preventDefault()
      const _deltaX = event.clientX - _dragStartX
      _container.scrollLeft = _dragStartScrollLeft - _deltaX
    }

    const _endDrag = (event?: PointerEvent) => {
      if (!_isDragging) return
      if (event && event.pointerId !== _activePointerId) return
      if (_activePointerId !== null) {
        try {
          _container.releasePointerCapture(_activePointerId)
        } catch (_error) {
          // Ignore pointer capture release issues
        }
      }
      _isDragging = false
      _activePointerId = null
      _container.classList.remove('select-none')
      _scheduleResume()
    }

    const _handlePointerUp = (event: PointerEvent) => {
      _endDrag(event)
    }

    const _handlePointerCancel = (event: PointerEvent) => {
      _endDrag(event)
    }

    const _handlePointerLeave = (event: PointerEvent) => {
      if (_isDragging) {
        _endDrag(event)
        return
      }
      _container.classList.remove('select-none')
      _pause()
    }

    const _handlePointerEnter = () => {
      if (_isDragging) return
      _container.classList.remove('select-none')
      _pause()
    }

    const _handleMediaChange = (event: MediaQueryListEvent) => {
      const _isScrollable = _container.scrollWidth > _container.clientWidth
      _autoScrollActive = event.matches && _isScrollable

      if (!_autoScrollActive) {
        _pause(false)
        return
      }

      if (_resumeTimeout !== null) {
        window.clearTimeout(_resumeTimeout)
        _resumeTimeout = null
      }

      _isPaused = false
      _start()
    }

    if (_autoScrollActive) {
      _start()
    }

    _container.addEventListener('wheel', _handleHoverInteraction, { passive: true })
    _container.addEventListener('pointerdown', _handlePointerDown)
    _container.addEventListener('pointermove', _handlePointerMove, { passive: false })
    _container.addEventListener('pointerup', _handlePointerUp)
    _container.addEventListener('pointercancel', _handlePointerCancel)
    _container.addEventListener('pointerleave', _handlePointerLeave)
    _container.addEventListener('pointerenter', _handlePointerEnter)

    const _supportsModernMqApi = typeof _mediaQuery.addEventListener === 'function'
    if (_supportsModernMqApi) {
      _mediaQuery.addEventListener('change', _handleMediaChange)
    } else {
      _mediaQuery.addListener(_handleMediaChange)
    }

    return () => {
      if (_rafId !== null) {
        window.cancelAnimationFrame(_rafId)
      }
      if (_resumeTimeout !== null) {
        window.clearTimeout(_resumeTimeout)
      }
      _container.removeEventListener('wheel', _handleHoverInteraction)
      _container.removeEventListener('pointerdown', _handlePointerDown)
      _container.removeEventListener('pointermove', _handlePointerMove)
      _container.removeEventListener('pointerup', _handlePointerUp)
      _container.removeEventListener('pointercancel', _handlePointerCancel)
      _container.removeEventListener('pointerleave', _handlePointerLeave)
      _container.removeEventListener('pointerenter', _handlePointerEnter)
      if (_supportsModernMqApi) {
        _mediaQuery.removeEventListener('change', _handleMediaChange)
      } else {
        _mediaQuery.removeListener(_handleMediaChange)
      }
    }
  }, [_prefersReducedMotion])

  return (
    <Section
      id="technologies"
      title={_t('technologies.title')}
      description={_t('technologies.subtitle')}
      className="relative"
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/90 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/90 to-transparent"
          aria-hidden="true"
        />
        <div
          ref={_containerRef}
          className="overflow-x-auto pb-6 sm:pb-8 scrollbar-hidden md:cursor-grab md:active:cursor-grabbing"
        >
          <div className="flex min-w-full snap-x snap-mandatory gap-6 px-6 sm:gap-8 sm:px-10">
            {TECH_TOPICS.map(topic => (
                <article
              key={topic.id}
              className={`group relative flex min-h-[22rem] w-[18rem] min-w-[18rem] snap-center flex-col items-start gap-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.07] ${topic.shadowClass}`}
                >
              <div className="w-full overflow-hidden rounded-2xl border border-white/10">
              <img
                src={topic.illustration}
                alt={_t(`technologies.cards.${topic.id}.alt`)}
                className="h-36 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              </div>
              <div className="flex flex-col gap-3 text-left">
              <h3 className="text-lg font-semibold text-white">
                {_t(`technologies.cards.${topic.id}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-white/75">
                {_t(`technologies.cards.${topic.id}.body`)}
              </p>
              </div>
                </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Technologies
