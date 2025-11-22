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
