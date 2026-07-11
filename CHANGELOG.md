# Changelog — проект «На ощупь»

Все значимые изменения проекта фиксируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/).

---

## [1.0.0] — 2026-07-11

### Добавлено
- Первая версия сайта-медиакита (на основе `mediakit_na_oschup.html`)
- `index.html` + `styles.css` — стили вынесены в отдельный файл
- Git-репозиторий с первым коммитом

### Изменено (рефакторинг)
- **Этап 1**: все inline-стили (`style="..."`) вынесены в CSS-классы: `.subtitle`, `.divider--short`, `.list-title`, `.list`, `.grid-2-col`, `.lyric--accent`, `.mt-1_5`, `.footer-divider`, `.footer-hint`, `.footer-text`
- **Этап 2**: улучшена семантика HTML — `<nav>` вместо `<div>` для навигации, обёртка `<main>`, `<footer>` вместо секции с контактами, `aria-label` на кнопках карусели и навигации
- **Этап 3**: CSS-переменные для хардкодных значений — `--border-color`, `--accent-bg`, `--carousel-btn-bg`, `--carousel-btn-hover`, `--shadow`, `--divider-gradient`
- **Этап 4**: добавлены favicon (SVG-эмодзи) и Open Graph-теги для шаринга в соцсетях

### Технический долг (не закрыто)
- Используется устаревший `pageYOffset` (нужно `window.scrollY`)
- Нет touch-свайпа для каруселей на мобильных
- Нет `loading="lazy"` для изображений
- Нет анимаций при скролле
- Нет Google Fonts (кастомный шрифт)