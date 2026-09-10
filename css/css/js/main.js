// Main JavaScript Logic for ASIAN Corporate Website
document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Sticky Header & Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('shadow');
        } else {
            header.classList.remove('shadow');
        }
    });

    // 2. Animated Counter function
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    function runCounters() {
        const counterBox = document.getElementById('counter-box');
        if (!counterBox) return;

        const boxPosition = counterBox.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (boxPosition < screenPosition && !hasAnimated) {
            hasAnimated = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = target / 50; // Controls animation speed

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }

    window.addEventListener('scroll', runCounters);

    // Close mobile nav on item click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500; // Thời gian hoàn thành hiệu ứng (ms)
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        const countUp = setInterval(() => {
            frame++;
            // Công thức ease-out giúp số chạy chậm dần ở đoạn cuối cho tự nhiên
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

            counter.innerText = currentCount;

            if (frame === totalFrames) {
                counter.innerText = target;
                clearInterval(countUp);
            }
        }, frameRate);
    };

    // Theo dõi khi phần tử xuất hiện trên màn hình mới kích hoạt đếm
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter); // Chỉ chạy 1 lần
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counter.innerText = '0'; // Gán giá trị ban đầu là 0
        observer.observe(counter);
    });
});

