# ASIAN - THE POWER OF ASIAN JSC WEBSITE

Bộ mã nguồn Website doanh nghiệp chuyên nghiệp dành cho **CÔNG TY CỔ PHẦN TẬP ĐOÀN ASIAN** (Lĩnh vực Điện Lực, Năng Lượng, Cơ Điện M&E, Tổng Thầu EPC).

## 1. Công Nghệ Sử Dụng
- **HTML5 & CSS3**: Chuẩn Semantic, responsive.
- **Bootstrap 5.3**: Layout Grid, Navbar, Responsive Utilities.
- **FontAwesome 6 & Google Fonts (Montserrat & Roboto)**.
- **Vanilla JavaScript**: Sticky Header, Counter Animation, Dynamic Project Search/Filters, Form Validation.

## 2. Hướng Dẫn Sử Dụng
1. Tải về hoặc giải nén thư mục dự án `asian-power`.
2. Đảm bảo logo hình ảnh của ASIAN đã được lưu ở thư mục `images/logo.png`.
3. Mở file `index.html` trực tiếp trên trình duyệt hoặc thông qua công cụ **Live Server** trên Visual Studio Code.

## 3. Thay Thế Thông Tin & Hình Ảnh Thật
- **Logo**: File `images/logo.png` giữ nguyên nhận diện màu sắc/đường nét từ tài sản thiết kế của công ty ASIAN.
- **Hình ảnh công trình/dự án**: Các hình ảnh minh họa Unsplash có comment `<!-- PLACEHOLDER IMAGE -->` có thể được thay thế bằng hình ảnh thi công thực tế của công ty.
- **Thông tin liên hệ**: Cập nhật địa chỉ, email và số điện thoại chính thức tại file `contact.html` và phần `footer`.
- **Backend API**: File `js/contact.js` hiện tại xử lý validation & phản hồi thành công ở giao diện Frontend. Để nhận email thật, vui lòng kết nối API backend hoặc sử dụng dịch vụ như Formspree/EmailJS.