document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initCountdown();
    initProductTabs();
    initCategoryHover();
    initSearchTabs();
});

let currentSlide = 0;
let carouselTimer = null;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function initCarousel() {
    startAutoPlay();

    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function () {
            stopAutoPlay();
        });
        carousel.addEventListener('mouseleave', function () {
            startAutoPlay();
        });
    }
}

function startAutoPlay() {
    stopAutoPlay();
    carouselTimer = setInterval(function () {
        changeSlide(1);
    }, 4000);
}

function stopAutoPlay() {
    if (carouselTimer) {
        clearInterval(carouselTimer);
        carouselTimer = null;
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    updateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

function updateSlide() {
    slides.forEach(function (slide, index) {
        slide.classList.toggle('active', index === currentSlide);
    });
    dots.forEach(function (dot, index) {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function initCountdown() {
    let totalSeconds = 2 * 3600 + 35 * 60 + 18;

    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        if (totalSeconds <= 0) {
            totalSeconds = 24 * 3600;
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hoursEl) hoursEl.textContent = padZero(hours);
        if (minutesEl) minutesEl.textContent = padZero(minutes);
        if (secondsEl) secondsEl.textContent = padZero(seconds);

        totalSeconds--;
    }

    function padZero(num) {
        return num < 10 ? '0' + num : String(num);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initProductTabs() {
    const tabs = document.querySelectorAll('.product-tabs .section-title-text');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) {
                t.classList.remove('active');
            });
            tab.classList.add('active');

            const tabType = tab.getAttribute('data-tab');
            shuffleProducts(tabType);
        });
    });
}

function shuffleProducts(tabType) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.product-card'));

    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    grid.innerHTML = '';
    cards.forEach(function (card) {
        grid.appendChild(card);
    });
}

function initCategoryHover() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            item.style.paddingLeft = '20px';
        });
        item.addEventListener('mouseleave', function () {
            item.style.paddingLeft = '16px';
        });
    });
}

function initSearchTabs() {
    const tabs = document.querySelectorAll('.search-tabs .tab');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) {
                t.classList.remove('active');
            });
            tab.classList.add('active');

            const input = document.querySelector('.search-input');
            if (input) {
                const activeTab = tab.textContent;
                if (activeTab === '店铺') {
                    input.placeholder = '搜索您喜欢的店铺...';
                } else {
                    input.placeholder = '搜索您喜欢的商品...';
                }
            }
        });
    });

    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
}

function handleSearch() {
    const input = document.querySelector('.search-input');
    const keyword = input ? input.value.trim() : '';
    if (keyword) {
        alert('正在搜索：' + keyword);
    } else {
        input.focus();
    }
}

document.querySelectorAll('.seckill-card, .product-card, .category-card').forEach(function (card) {
    card.addEventListener('click', function () {
        const name = card.querySelector('h3, .product-name');
        if (name) {
            console.log('查看商品：' + name.textContent.trim());
        }
    });
});

document.querySelectorAll('.hot-word').forEach(function (word) {
    word.addEventListener('click', function (e) {
        e.preventDefault();
        const input = document.querySelector('.search-input');
        if (input) {
            input.value = word.textContent;
            input.focus();
        }
    });
});

document.querySelectorAll('.btn-login, .btn-register').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const type = btn.classList.contains('btn-login') ? '登录' : '注册';
        alert('即将跳转到' + type + '页面');
    });
});

document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(function (l) {
            l.classList.remove('active');
        });
        link.classList.add('active');
    });
});
