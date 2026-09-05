// Form Validation & Frontend Handling for contact.html
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const alertBox = document.getElementById('contact-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{9,11}$/;

            let isValid = true;

            // Simple client-side validation
            if (!fullname) {
                document.getElementById('fullname').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('fullname').classList.remove('is-invalid');
            }

            if (!email || !emailRegex.test(email)) {
                document.getElementById('email').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('email').classList.remove('is-invalid');
            }

            if (!phone || !phoneRegex.test(phone)) {
                document.getElementById('phone').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('phone').classList.remove('is-invalid');
            }

            if (!message) {
                document.getElementById('message').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('message').classList.remove('is-invalid');
            }

            if (isValid) {
                // Display Success Message
                alertBox.className = "alert alert-success mt-3";
                alertBox.innerHTML = "<strong>Thành công!</strong> Yêu cầu tư vấn của bạn đã được gửi. Đội ngũ ASIAN sẽ liên hệ lại trong thời gian sớm nhất. (Frontend Demo)";
                alertBox.classList.remove('d-none');

                contactForm.reset();
                contactForm.classList.remove('was-validated');
            } else {
                contactForm.classList.add('was-validated');
            }
        });
    }
});