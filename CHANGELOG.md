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

## [1.1.0] — 2026-07-11

### Добавлено
- Touch-свайп для каруселей (работает на мобильных устройствах)
- `loading="lazy"` для изображений (кроме первого — оно preload)
- `preload` для первого изображения (`photo_1.jpg`)
- Обработчик `resize` для пересчёта активной навигационной точки

### Изменено
- `pageYOffset` заменён на `window.scrollY` (современный стандарт)

## [1.2.0] — 2026-07-11

### Добавлено
- Анимация появления секций при скролле (fade-in + translateY через Intersection Observer)
