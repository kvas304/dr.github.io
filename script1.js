// ===== ПРОСТАЯ НАСТРОЙКА =====
// Просто измените эти значения:
const TARGET_YEAR = 2026;
const TARGET_MONTH = 0;    // 0 = январь, 1 = февраль, ...
const TARGET_DAY = 0;
const TARGET_HOUR = 0;     // 0-23
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
            title.textContent = '🎉 С НОВЫМ ГОДОМ 🎉';
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

// Создание снежинок (вместо звёзд)
function createSnowflakes() {
    const snowContainer = document.getElementById('stars'); // используем тот же контейнер
    const snowflakesCount = 150; // количество снежинок
    
    for (let i = 0; i < snowflakesCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake'); // меняем класс
        
        // Случайные параметры для снежинок
        const size = Math.random() * 5 + 2; // размер от 2 до 7px
        const posX = Math.random() * 100; // горизонтальная позиция
        const delay = Math.random() * 10; // задержка начала анимации
        const duration = 5 + Math.random() * 15; // продолжительность падения
        const opacity = Math.random() * 0.7 + 0.3; // прозрачность
        const sway = Math.random() * 50 - 25; // случайное отклонение по горизонтали
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${posX}%`;
        snowflake.style.top = '-20px'; // начинаем чуть выше видимой области
        snowflake.style.opacity = opacity.toString();
        snowflake.style.animationDelay = `${delay}s`;
        snowflake.style.animationDuration = `${duration}s`;
        
        // Добавляем ключевые кадры для плавного падения с отклонением
        const keyframes = `
            @keyframes snowflake-fall-${i} {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                100% {
                    transform: translate(${sway}px, calc(100vh + 20px)) rotate(360deg);
                }
            }
        `;
        
        // Создаём элемент style и добавляем анимацию
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        snowflake.style.animationName = `snowflake-fall-${i}`;
        snowflake.style.animationTimingFunction = 'linear';
        snowflake.style.animationIterationCount = 'infinite';
        
        snowContainer.appendChild(snowflake);
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
    createSnowflakes(); // создаём снежинки вместо звёзд
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
    // Пересоздаём снежинки при изменении размера окна
    const snowContainer = document.getElementById('stars');
    snowContainer.innerHTML = '';
    createSnowflakes();
});

// Эффект "ветра" при движении мыши
window.addEventListener('mousemove', function(e) {
    const snowflakes = document.querySelectorAll('.snowflake');
    const mouseX = e.clientX / window.innerWidth;
    
    snowflakes.forEach((snowflake, index) => {
        // Чем дальше снежинка, тем слабее эффект ветра
        const distanceFactor = (index % 5 + 1) * 0.3;
        const wind = (mouseX - 0.5) * distanceFactor * 40; // сила ветра
        
        // Сохраняем оригинальную анимацию, добавляя смещение по ветру
        const originalTransform = snowflake.style.transform || '';
        snowflake.style.transform = `translateX(${wind}px) ${originalTransform}`;
    });
});