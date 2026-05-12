import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./A11yPanel.css";
import "../../styles/a11y-engine.css";

interface A11ySettings {
  fontScale: number;
  highContrast: boolean;
  monochrome: boolean;
  invert: boolean;
  dyslexia: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  letterSpacing: boolean;
  textAlignLeft: boolean;
  bigCursor: boolean;
  boldText: boolean;
  readableFont: boolean;
  lineHeight: boolean;
  wordSpacing: boolean;
}

const DEFAULT_SETTINGS: A11ySettings = {
  fontScale: 1,
  highContrast: false,
  monochrome: false,
  invert: false,
  dyslexia: false,
  highlightLinks: false,
  highlightHeadings: false,
  letterSpacing: false,
  textAlignLeft: false,
  bigCursor: false,
  boldText: false,
  readableFont: false,
  lineHeight: false,
  wordSpacing: false,
};

const A11yPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [settings, setSettings] = useState<A11ySettings>(() => {
    try {
      const saved = localStorage.getItem("a11y_prefs");
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const activeCount = useMemo(() => {
    return (
      Object.values(settings).filter((val) => val === true).length +
      (settings.fontScale !== 1 ? 1 : 0)
    );
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    localStorage.setItem("a11y_prefs", JSON.stringify(settings));
    root.style.setProperty("--a11y-font-scale", settings.fontScale.toString());

    body.classList.toggle("a11y-high-contrast", settings.highContrast);
    body.classList.toggle("a11y-monochrome", settings.monochrome);
    body.classList.toggle("a11y-invert", settings.invert);
    body.classList.toggle("a11y-dyslexia", settings.dyslexia);
    body.classList.toggle("a11y-highlight-links", settings.highlightLinks);
    body.classList.toggle(
      "a11y-highlight-headings",
      settings.highlightHeadings,
    );
    body.classList.toggle("a11y-letter-spacing", settings.letterSpacing);
    body.classList.toggle("a11y-text-align-left", settings.textAlignLeft);
    body.classList.toggle("a11y-big-cursor", settings.bigCursor);
    body.classList.toggle("a11y-bold-text", settings.boldText);
    body.classList.toggle("a11y-readable-font", settings.readableFont);
    body.classList.toggle("a11y-line-height", settings.lineHeight);
    body.classList.toggle("a11y-word-spacing", settings.wordSpacing);
  }, [settings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleSetting = useCallback((key: keyof A11ySettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="a11y-widget">
      <button
        className={`a11y-trigger ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Відкрити панель доступності"
        aria-expanded={isOpen}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 14a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4z"></path>
          <line x1="12" y1="14" x2="12" y2="21"></line>
          <line x1="9" y1="18" x2="15" y2="18"></line>
        </svg>
        {activeCount > 0 && !isOpen && (
          <span
            className="a11y-badge"
            aria-label={`Активних функцій: ${activeCount}`}
          >
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <section
          className="a11y-modal"
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Налаштування доступності"
        >
          <header className="a11y-header">
            <h2>Доступність</h2>
            <button
              className="a11y-close"
              onClick={() => setIsOpen(false)}
              aria-label="Закрити панель доступності"
              autoFocus
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </header>

          <div className="a11y-content">
            <div className="a11y-section" style={{ animationDelay: "0.05s" }}>
              <h3>Текст та інтервали</h3>
              <div className="a11y-grid">
                <button
                  className={`a11y-btn ${settings.fontScale < 1 ? "active" : ""}`}
                  onClick={() =>
                    setSettings((s) => ({
                      ...s,
                      fontScale: Math.max(0.8, s.fontScale - 0.1),
                    }))
                  }
                  aria-pressed={settings.fontScale < 1}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" />
                    <path d="M8 11h8" />
                    <path d="M12 7v8" />
                  </svg>
                  Зменшити
                </button>
                <button
                  className={`a11y-btn ${settings.fontScale > 1 ? "active" : ""}`}
                  onClick={() =>
                    setSettings((s) => ({
                      ...s,
                      fontScale: Math.min(2, s.fontScale + 0.1),
                    }))
                  }
                  aria-pressed={settings.fontScale > 1}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" />
                    <path d="M8 11h8" />
                    <path d="M12 7v8" />
                  </svg>
                  Збільшити
                </button>
                <button
                  className={`a11y-btn ${settings.boldText ? "active" : ""}`}
                  onClick={() => toggleSetting("boldText")}
                  aria-pressed={settings.boldText}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                  </svg>
                  Жирний текст
                </button>
                <button
                  className={`a11y-btn ${settings.readableFont ? "active" : ""}`}
                  onClick={() => toggleSetting("readableFont")}
                  aria-pressed={settings.readableFont}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="4 7 4 4 20 4 20 7" />
                    <line x1="9" y1="20" x2="15" y2="20" />
                    <line x1="12" y1="4" x2="12" y2="20" />
                  </svg>
                  Простий шрифт
                </button>
                <button
                  className={`a11y-btn ${settings.letterSpacing ? "active" : ""}`}
                  onClick={() => toggleSetting("letterSpacing")}
                  aria-pressed={settings.letterSpacing}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 12h8M4 12l4-4v8zM20 12l-4-4v8z" />
                  </svg>
                  Інтервал літер
                </button>
                <button
                  className={`a11y-btn ${settings.wordSpacing ? "active" : ""}`}
                  onClick={() => toggleSetting("wordSpacing")}
                  aria-pressed={settings.wordSpacing}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12h6M5 12l2-2v4zM19 12l-2-2v4z" />
                  </svg>
                  Інтервал слів
                </button>
                <button
                  className={`a11y-btn ${settings.lineHeight ? "active" : ""}`}
                  onClick={() => toggleSetting("lineHeight")}
                  aria-pressed={settings.lineHeight}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M8 9l4-4 4 4M8 15l4 4 4-4M4 6h1M4 12h1M4 18h1" />
                  </svg>
                  Висота рядка
                </button>
                <button
                  className={`a11y-btn ${settings.textAlignLeft ? "active" : ""}`}
                  onClick={() => toggleSetting("textAlignLeft")}
                  aria-pressed={settings.textAlignLeft}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="14" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                  Текст ліворуч
                </button>
              </div>
            </div>

            <div className="a11y-section" style={{ animationDelay: "0.1s" }}>
              <h3>Колір та контраст</h3>
              <div className="a11y-grid">
                <button
                  className={`a11y-btn ${settings.highContrast ? "active" : ""}`}
                  onClick={() => toggleSetting("highContrast")}
                  aria-pressed={settings.highContrast}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a10 10 0 0 0 0 20z" />
                  </svg>
                  Контраст
                </button>
                <button
                  className={`a11y-btn ${settings.monochrome ? "active" : ""}`}
                  onClick={() => toggleSetting("monochrome")}
                  aria-pressed={settings.monochrome}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  Монохром
                </button>
                <button
                  className={`a11y-btn ${settings.invert ? "active" : ""}`}
                  onClick={() => toggleSetting("invert")}
                  aria-pressed={settings.invert}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2v20a10 10 0 1 0 0-20z" />
                  </svg>
                  Інверсія
                </button>
              </div>
            </div>

            <div className="a11y-section" style={{ animationDelay: "0.15s" }}>
              <h3>Допоміжні функції</h3>
              <div className="a11y-grid">
                <button
                  className={`a11y-btn ${settings.highlightLinks ? "active" : ""}`}
                  onClick={() => toggleSetting("highlightLinks")}
                  aria-pressed={settings.highlightLinks}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Посилання
                </button>
                <button
                  className={`a11y-btn ${settings.highlightHeadings ? "active" : ""}`}
                  onClick={() => toggleSetting("highlightHeadings")}
                  aria-pressed={settings.highlightHeadings}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 5v14M18 5v14M6 12h12" />
                  </svg>
                  Заголовки
                </button>
                <button
                  className={`a11y-btn ${settings.dyslexia ? "active" : ""}`}
                  onClick={() => toggleSetting("dyslexia")}
                  aria-pressed={settings.dyslexia}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 20h4L12 4l4 16h4M10 14h4" />
                  </svg>
                  Дислексія
                </button>
                <button
                  className={`a11y-btn ${settings.bigCursor ? "active" : ""}`}
                  onClick={() => toggleSetting("bigCursor")}
                  aria-pressed={settings.bigCursor}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    <path d="m13 13 6 6" />
                  </svg>
                  Великий курсор
                </button>
              </div>
            </div>
          </div>

          <footer className="a11y-footer" style={{ animationDelay: "0.2s" }}>
            <button
              className="a11y-reset"
              onClick={() => setSettings(DEFAULT_SETTINGS)}
              disabled={activeCount === 0}
              aria-label="Скинути всі налаштування доступності"
            >
              ↺ Скинути налаштування
            </button>
          </footer>
        </section>
      )}
    </div>
  );
};

export default A11yPanel;
