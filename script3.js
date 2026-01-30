
// ===== ПРОСТАЯ НАСТРОЙКА =====
// Просто измените эти значения:
const TARGET_YEAR = 2026;
const TARGET_MONTH = 1;    // 0 = январь, 1 = февраль, ...
const TARGET_DAY = 1;
const TARGET_HOUR = 11;     // 0-23
const TARGET_MINUTE = 0;   // 0-59
const TARGET_SECOND = 0;   // 0-59

// Дата создаётся автоматически
const TARGET_DATE = new Date(
    TARGET_YEAR,
    TARGET_MONTH,
    TARGET_DAY,
    TARGET_HOUR,
    TARGET_MINUTE,
    TARGET_SECOND
);

// ===== ТАЙМЕР ОБРАТНОГО ОТСЧЁТА =====
function createCountdown() {
    // Проверяем, что элементы существуют
    if (!document.getElementById('days-tens')) {
        console.log('Countdown elements not found');
        return;
    }
    
    // Используем заданную дату
    const targetDate = TARGET_DATE;
    
    console.log('Таймер настроен на:', targetDate.toLocaleString());
    console.log('Ваш часовой пояс:', Intl.DateTimeFormat().resolvedOptions().timeZone);
    
    // Ссылки на элементы
    const elements = {
        days: [document.getElementById('days-tens'), document.getElementById('days-ones')],
        hours: [document.getElementById('hours-tens'), document.getElementById('hours-ones')],
        minutes: [document.getElementById('minutes-tens'), document.getElementById('minutes-ones')],
        seconds: [document.getElementById('seconds-tens'), document.getElementById('seconds-ones')]
    };
    
    // Храним текущие значения
    let currentValues = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    };
    
    // Функция обновления таймера
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        // Если время наступило
        if (diff <= 0) {
            celebrateTarget();
            return;
        }
        
        // Рассчитываем время
        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        // Форматируем в строки
        const daysStr = days.toString().padStart(2, '0');
        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');
        
        // Обновляем значения
        updateUnit('days', daysStr, elements.days);
        updateUnit('hours', hoursStr, elements.hours);
        updateUnit('minutes', minutesStr, elements.minutes);
        updateUnit('seconds', secondsStr, elements.seconds);
    }
    
    // Обновляем блок (десятки и единицы)
    function updateUnit(type, newValue, [tensElement, onesElement]) {
        if (currentValues[type] !== newValue) {
            // Обновляем десятки
            if (currentValues[type][0] !== newValue[0]) {
                updateDigit(tensElement, newValue[0]);
            }
            
            // Обновляем единицы
            if (currentValues[type][1] !== newValue[1]) {
                updateDigit(onesElement, newValue[1]);
            }
            
            currentValues[type] = newValue;
        }
    }
    
    // Обновляем одну цифру с анимацией
    function updateDigit(element, newDigit) {
        if (element.textContent !== newDigit) {
            element.classList.add('flip');
            
            setTimeout(() => {
                element.textContent = newDigit;
            }, 300);
            
            setTimeout(() => {
                element.classList.remove('flip');
            }, 600);
        }
    }
    
    // Событие при достижении цели
    function celebrateTarget() {
        const title = document.querySelector('.countdown-title');
        const message = document.querySelector('.new-year-message');
        
        if (title) {
            title.textContent = '🎉 С Днём Рождения, пусть дни тянулись веселее!  🎉';
            title.style.color = '#ffffffff';
            title.style.textShadow = '0 0 20px #ffd700';
        }
        
        if (message) {
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const dateStr = targetDate.toLocaleDateString('ru-RU', options);
            message.innerHTML = `Наступило долгожданное время!<br><small>${dateStr}</small>`;
            message.style.fontSize = '1.8rem';
        }
        
        clearInterval(countdownInterval);
    }
    
    
    // Сразу обновляем таймер
    updateCountdown();
    
    // Запускаем интервал
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    return countdownInterval;
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    //createStars();
    initScrollAnimations();
    animateHeader();
    
    // Запускаем таймер
    setTimeout(() => {
        createCountdown();
    }, 100);
    
    // Плавное появление
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
});

// Создание звездного фона
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 200;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Случайные размеры и позиции
        const size = Math.random() * 2 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 5 + Math.random() * 5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
}

// Плавное появление элементов при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за блоками контента
    const contentBlocks = document.querySelectorAll('.content-block');
    contentBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(40px)';
        block.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(block);
    });
}

// Анимация для заголовка
function animateHeader() {
    const headerTitle = document.querySelector('.header__title');
    const letters = headerTitle.textContent.split('');
    
    headerTitle.innerHTML = '';
    
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.opacity = '0';
        span.style.transform = 'translateY(-30px)';
        span.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        span.style.display = 'inline-block';
        headerTitle.appendChild(span);
    });
    
    // Запускаем анимацию появления букв
    setTimeout(() => {
        const letterSpans = headerTitle.querySelectorAll('span');
        letterSpans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }, 500);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    initScrollAnimations();
    animateHeader();
    
    // Плавное появление всей страницы
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
});

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Пересоздаем звезды при изменении размера окна
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = '';
    createStars();
});

// Параллакс эффект для звезд
window.addEventListener('mousemove', function(e) {
    const stars = document.querySelectorAll('.star');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    stars.forEach((star, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        star.style.transform = `translate(${x}px, ${y}px)`;
    });

});


