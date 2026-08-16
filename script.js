// Навигация по точкам
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('.section');

navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    });
});

// Обновление активной точки при прокрутке
function updateActiveDot() {
    let current = 0;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
            current = index;
        }
    });
    navDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === current) {
            dot.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveDot);
window.addEventListener('resize', updateActiveDot);

// Анимация появления секций при скролле (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    if (section.id !== 'section-0') {
        observer.observe(section);
    }
});

// Инициализация каруселей (кроссфейд + предзагрузка)
document.querySelectorAll('.carousel').forEach(carousel => {
    let images;
    try {
        images = JSON.parse(carousel.dataset.images);
    } catch (e) {
        console.error('Ошибка парсинга data-images в карусели:', e);
        return;
    }

    if (!Array.isArray(images) || images.length === 0) {
        console.error('Карусель не содержит изображений:', carousel);
        return;
    }

    const imgLayers = carousel.querySelectorAll('.carousel-img');
    if (imgLayers.length < 2) {
        console.error('Карусель должна содержать два слоя .carousel-img:', carousel);
        return;
    }

    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    if (!prevBtn || !nextBtn) {
        console.error('Карусель не содержит кнопок prev/next:', carousel);
        return;
    }

    let currentIndex = 0;
    let isTransitioning = false;

    // Предзагрузка всех изображений карусели
    images.forEach(src => {
        const img = new Image();
        img.src = 'images/' + src;
    });

    const updateImage = (newIndex) => {
        if (isTransitioning) return;
        isTransitioning = true;

        const currentLayer = carousel.querySelector('.carousel-img.active');
        const nextLayer = currentLayer === imgLayers[0] ? imgLayers[1] : imgLayers[0];

        // Устанавливаем новое изображение на неактивный слой
        nextLayer.src = 'images/' + images[newIndex];
        nextLayer.alt = 'Спектакль ' + (newIndex + 1);

        // Кроссфейд: неактивный слой проявляется поверх активного
        nextLayer.classList.add('active');
        currentLayer.classList.remove('active');

        currentIndex = newIndex;

        // Разрешаем следующее переключение после завершения анимации
        setTimeout(() => {
            isTransitioning = false;
        }, 400);
    };

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateImage((currentIndex - 1 + images.length) % images.length);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateImage((currentIndex + 1) % images.length);
    });

    // Touch-свайп для мобильных
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) { // минимальный порог свайпа — 50px
            if (diff > 0) {
                // Свайп влево — следующее фото
                updateImage((currentIndex + 1) % images.length);
            } else {
                // Свайп вправо — предыдущее фото
                updateImage((currentIndex - 1 + images.length) % images.length);
            }
        }
    }, { passive: true });
});