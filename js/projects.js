document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('project-search');
    const categoryFilter = document.getElementById('category-filter');
    const yearFilter = document.getElementById('year-filter');
    const projectCards = document.querySelectorAll('.project-item-card');
    const noResultsMsg = document.getElementById('no-projects-msg');

    function filterProjects() {
        const keyword = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        const selectedYear = yearFilter.value;

        let visibleCount = 0;

        projectCards.forEach(card => {
            const itemCategory = card.getAttribute('data-category') || '';
            const itemYear = card.getAttribute('data-year') || '';
            const itemText = card.textContent.toLowerCase();

            // Điều kiện lọc
            const matchCategory = (selectedCategory === 'all') || (itemCategory === selectedCategory);
            const matchYear = (selectedYear === 'all') || (itemYear === selectedYear);
            const matchKeyword = (keyword === '') || itemText.includes(keyword);

            // Hiện nếu thỏa mãn cả 3 điều kiện
            if (matchCategory && matchYear && matchKeyword) {
                card.style.setProperty('display', 'block', 'important');
                visibleCount++;
            } else {
                card.style.setProperty('display', 'none', 'important');
            }
        });

        // Hiển thị thông báo nếu không có dự án nào khớp
        if (noResultsMsg) {
            if (visibleCount === 0) {
                noResultsMsg.classList.remove('d-none');
            } else {
                noResultsMsg.classList.add('d-none');
            }
        }
    }

    // Lắng nghe sự kiện người dùng nhập hoặc thay đổi bộ lọc
    if (searchInput) searchInput.addEventListener('input', filterProjects);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProjects);
    if (yearFilter) yearFilter.addEventListener('change', filterProjects);
});
