import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Animated, accessible language switcher
 * - Replaces <select> with a headless, keyboard-friendly popover listbox
 * - Staggered item animations + subtle scale/fade for the menu
 * - Keeps current language first; rest sorted alphabetically
 * - Uses i18next changeLanguage under the hood
 * - Respects your existing translation keys: common:languages.<code>
 */

type Lang = { value: string; labelKey: `common:languages.${string}` };

const SUPPORTED_LANGS: Lang[] = [
  { value: "en", labelKey: "common:languages.en" },
  { value: "pl", labelKey: "common:languages.pl" },
];

// Optional: native language names (fallback when a translation is missing)
const nativeNames: Record<string, string> = {
  en: "English",
  pl: "Polski",
};

const flagFor = (code: string) => {
  // Keep it explicit to avoid country ambiguity for language codes
  switch (code) {
    case "en":
      return "🇬🇧"; // or 🇺🇸 — pick your brand convention
    case "pl":
      return "🇵🇱";
    default:
      return "🌐";
  }
};

const useOnClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = ref.current;
      if (!el || el.contains(e.target as Node)) return;
      handler();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, handler]);
};

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation(["common"]);
  const current = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  useOnClickOutside(rootRef, () => setOpen(false));

  // Current language first, then the rest alphabetically
  const languages = useMemo(() => {
    const rest = SUPPORTED_LANGS.filter((l) => l.value !== current).sort((a, b) =>
      (t(a.labelKey) || nativeNames[a.value] || a.value)
        .toString()
        .localeCompare((t(b.labelKey) || nativeNames[b.value] || b.value).toString())
    );
    return [SUPPORTED_LANGS.find((l) => l.value === current)!, ...rest];
  }, [current, t]);

  useEffect(() => {
    // keep activeIndex in range if list order changes
    if (activeIndex >= languages.length) setActiveIndex(0);
  }, [languages, activeIndex]);

  const selectLanguage = async (code: string) => {
    setOpen(false);
    if (code !== current) {
      await i18n.changeLanguage(code);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % languages.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + languages.length) % languages.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(languages.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectLanguage(languages[activeIndex].value);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const label = t("actions.language");
  const currentLabel = t(`common:languages.${current}` as const) || nativeNames[current] || current;

  return (
    <div ref={rootRef} className="relative inline-flex" onKeyDown={handleKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-background/80 px-3 py-1 text-sm text-foreground shadow-sm outline-none ring-0 transition hover:border-primary focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-1 text-foreground">
          <Globe className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="font-medium">{currentLabel}</span>
        <span className="ml-1 text-xs opacity-70">{flagFor(current)}</span>
        <span
          aria-hidden
          className="ml-1 inline-block h-3 w-3 rotate-0 transition-transform group-aria-expanded:rotate-180"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 8 }}
            exit={{ opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-xl"
            role="listbox"
            aria-label={label}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
                show: { transition: { staggerChildren: 0.03 } },
              }}
              className="max-h-72 overflow-auto py-1"
            >
              {languages.map((lang, idx) => {
                const isActive = idx === activeIndex;
                const selected = lang.value === current;
                const labelT = t(lang.labelKey) || nativeNames[lang.value] || lang.value;
                return (
                  <motion.li
                    key={lang.value}
                    variants={{ hidden: { opacity: 0, y: -4 }, show: { opacity: 1, y: 0 } }}
                    className="px-1"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={
                        "flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm outline-none transition " +
                        (isActive
                          ? "bg-primary/10 ring-2 ring-primary/30"
                          : "hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/30")
                      }
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => selectLanguage(lang.value)}
                    >
                      <span className="text-base" aria-hidden>
                        {flagFor(lang.value)}
                      </span>
                      <span className="flex-1 truncate">{labelT}</span>
                      {selected && (
                        <Check className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
