/* ASIAN – main.js (dùng chung cho mọi trang)
   1. Header   2. Menu mobile   3. Magic nav   4. Số đếm
   5. Hiện khi cuộn   6. Lọc dự án */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasIO = 'IntersectionObserver' in window;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    /* 1. Header: đổ bóng + thu nhỏ logo khi cuộn */
    function initHeader() {
        var header = document.getElementById('header');
        if (!header) return;
        var ticking = false;
        function update() {
            var scrolled = window.scrollY > 50;
            header.classList.toggle('shadow', scrolled);
            header.classList.toggle('scrolled', scrolled);
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }, { passive: true });
        update();
    }

    /* 2. Đóng menu mobile sau khi bấm một mục */
    function initMobileNav() {
        var collapse = document.querySelector('.navbar-collapse');
        if (!collapse || !window.bootstrap) return;
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (collapse.classList.contains('show')) {
                    window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
                }
            });
        });
    }

    /* 3. Magic navigation: thanh trượt màu chạy theo chuột (desktop) */
    function initMagicNav() {
        var nav = document.querySelector('.magic-nav');
        var indicator = document.getElementById('navIndicator');
        if (!nav || !indicator) return;
        var items = Array.prototype.slice.call(nav.querySelectorAll('.nav-item'));
        var base = nav.querySelector('.nav-item.active') || items[0];
        var desktop = window.matchMedia('(min-width: 992px)');

        function move(item) {
            if (!item || !desktop.matches) return;
            indicator.style.left = item.offsetLeft + 'px';
            indicator.style.width = item.offsetWidth + 'px';
            var clr = item.getAttribute('data-clr');
            if (clr) {
                indicator.style.backgroundColor = clr;
                item.style.setProperty('--clr', clr);
            }
        }
        function activate(item) {
            items.forEach(function (i) { i.classList.toggle('active', i === item); });
            move(item);
        }
        function place() {            // đặt thanh trượt ngay, không trượt từ mép trái
            indicator.style.transition = 'none';
            activate(base);
            void indicator.offsetWidth;
            indicator.style.transition = '';
        }

        items.forEach(function (item) {
            item.addEventListener('mouseenter', function () { if (desktop.matches) activate(item); });
        });
        nav.addEventListener('mouseleave', function () { if (desktop.matches) activate(base); });
        window.addEventListener('resize', place);
        window.addEventListener('load', place);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
        place();
    }

    /* 4. Số đếm: chạy 1 lần khi cuộn tới (thay cho 2 bộ đếm trùng nhau trước đây) */
    function initCounters() {
        var counters = document.querySelectorAll('.counter');
        if (!counters.length || !hasIO || reduceMotion) return;   // giữ nguyên số tĩnh trong HTML

        function run(el) {
            var target = parseInt(el.getAttribute('data-target'), 10) || 0;
            var duration = 1800, start = performance.now();
            (function tick(now) {
                var p = Math.min((now - start) / duration, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
                if (p < 1) requestAnimationFrame(tick);
                else el.classList.add('counter-done');
            })(start);
        }
        var io = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); }
            });
        }, { threshold: 0.6 });
        counters.forEach(function (el) { el.textContent = '0'; io.observe(el); });
    }

    /* 5. Hiện khi cuộn: tự gắn hiệu ứng theo class, không cần sửa HTML */
    var REVEAL = [
        // [selector, hiệu ứng, so-le thời gian?]
        ['.title-line', 'line', false],
        ['.row.align-items-center > .col-lg-6:first-child', 'fade-right', false],
        ['.row.align-items-center > .col-lg-6:last-child', 'fade-left', false],
        ['main section .text-center.mb-5, main section .text-center.mb-4', 'fade-up', false],
        ['.partner-logo-box', 'zoom-in', true],
        ['.service-card, .project-card, .news-card, .process-step-card, #counter-box > div, main .card', 'fade-up', true]
    ];

    function initReveal() {
        if (!hasIO || reduceMotion) return;
        var targets = [];

        REVEAL.forEach(function (rule) {
            document.querySelectorAll(rule[0]).forEach(function (el, i) {
                if (el.hasAttribute('data-animate')) return;
                if (el.closest('.modal, header.site-header')) return;
                // bỏ qua phần tử con của khối đã có hiệu ứng (trừ gạch chân tiêu đề)
                if (rule[1] !== 'line' && el.parentElement &&
                    el.parentElement.closest('[data-animate]:not([data-animate="line"])')) return;
                el.setAttribute('data-animate', rule[1]);
                if (rule[2]) el.style.setProperty('--d', (i % 3) * 120 + 'ms');
                targets.push(el);
            });
        });

        var io = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                var el = e.target;
                el.classList.add('is-visible');
                obs.unobserve(el);
                var wait = (parseFloat(el.style.getPropertyValue('--d')) || 0) + 1000;
                setTimeout(function () {       // trả lại transition hover gốc của thẻ
                    el.removeAttribute('data-animate');
                    el.classList.remove('is-visible');
                }, wait);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        targets.forEach(function (el) { io.observe(el); });

        // Đường nối nét đứt của timeline "vẽ" ra khi cuộn tới
        var timeline = document.querySelector('.process-timeline-wrapper');
        if (timeline) {
            new IntersectionObserver(function (entries, obs) {
                if (entries[0].isIntersecting) { timeline.classList.add('line-in'); obs.disconnect(); }
            }, { threshold: 0.3 }).observe(timeline);
        }

        document.documentElement.classList.add('anim-ready');
    }

    /* 6. Lọc dự án (dùng chung cho index.html và projects.html, hỗ trợ nhiều danh mục: "cong-nghiep me") */
    function initProjectFilter() {
        var box = document.getElementById('project-filters');
        if (!box) return;
        var buttons = Array.prototype.slice.call(box.querySelectorAll('[data-filter]'));
        var items = Array.prototype.slice.call(document.querySelectorAll('.project-item, .project-item-card'));
        if (!buttons.length || !items.length) return;

        var empty = document.getElementById('project-empty');
        if (!empty) {
            empty = document.createElement('p');
            empty.id = 'project-empty';
            empty.className = 'col-12 text-center text-muted py-5 d-none';
            empty.textContent = 'Chưa có dự án nào trong nhóm này. Vui lòng quay lại sau.';
            items[0].parentElement.appendChild(empty);
        }

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                buttons.forEach(function (b) { b.classList.toggle('active', b === btn); });
                var filter = btn.getAttribute('data-filter'), shown = 0;
                items.forEach(function (item) {
                    var cats = (item.getAttribute('data-category') || '').split(/\s+/);
                    var match = filter === 'all' || cats.indexOf(filter) !== -1;
                    item.classList.remove('filter-in');
                    if (match) {
                        item.classList.remove('d-none');
                        item.style.setProperty('--d', (shown % 6) * 70 + 'ms');
                        void item.offsetWidth;               // khởi động lại animation
                        item.classList.add('filter-in');
                        shown++;
                    } else {
                        item.classList.add('d-none');
                    }
                });
                empty.classList.toggle('d-none', shown > 0);
            });
        });
    }

    ready(function () {
        initHeader();
        initMobileNav();
        initMagicNav();
        initCounters();
        initReveal();
        initProjectFilter();
    });
})();
