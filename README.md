## CẬP NHẬT: ĐỔI ẢNH TRỰC TIẾP TRONG INDEX.HTML

Mở `public/index.html`, tìm `window.SURPRISE_SETTINGS` gần đầu file.
Sửa `friendName` và danh sách `photos` tại đó. Ví dụ:

```js
photos: ["/assets/images/anh23.jpg", "/assets/images/anh24.jpg", "/assets/images/anh25.jpg"]
```

Chép các ảnh tương ứng vào `public/assets/images/` (giữ đúng đuôi `.jpg`, `.png` hoặc `.webp`).
Không cần sửa `script.js` hay `data/config.json` cho ảnh. `GET /api/config` vẫn hoạt động nhưng không điều khiển ảnh giao diện nữa.
Kiểm tra trực tiếp `http://localhost:3000/assets/images/anh23.jpg`, sau đó nhấn Ctrl+F5.

---

# 20/10 Surprise 💖

Website chúc mừng 20/10 fullstack (Express + HTML/CSS/JS). Không cần database.

## Chạy trên máy

1. Cài Node.js 20 trở lên.
2. Mở terminal trong thư mục dự án, chạy `npm ci` (hoặc `npm install` lần đầu).
3. Chạy `npm start`.
4. Mở http://localhost:3000 và kiểm tra http://localhost:3000/api/health.

`npm run dev` để tự khởi động lại backend khi sửa file server.

## Cá nhân hóa

- Sửa `data/config.json` để thay `friendName` (tên hiển thị), danh sách ảnh, đường dẫn nhạc.
- Thêm ảnh của bạn thân **được bạn ấy đồng ý chia sẻ** vào `public/assets/images/` với tên `friend1.jpg`, `friend2.jpg`, `friend3.jpg`.
- Thêm nhạc có quyền sử dụng vào `public/assets/music/` với tên `happy.mp3`, `emotional.mp3`.
- **Chưa có ảnh hoặc MP3 cũng không sao**: trang sẽ hiển thị ảnh thay thế và tiếp tục hoạt động không nhạc. Các thư mục chứa `.gitkeep` để Git theo dõi.
- Sửa lời chúc trong `data/wishes.json`. Dữ liệu chỉ đọc, không ghi lên Render.
- Tùy biến chữ và phong cách trong `public/index.html`, `public/css/style.css`.

## GitHub

```bash
git init
git add .
git commit -m "feat: create 20-10 surprise website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/20-10-surprise.git
git push -u origin main
```

Trước khi chạy `git remote add`, tạo repository **trống** trên GitHub, thay `YOUR_USERNAME` bằng tên GitHub của bạn. Không commit `.env`; file này được `.gitignore` loại trừ.

## Render

1. Vào https://dashboard.render.com, chọn **New > Web Service**.
2. Kết nối GitHub và chọn repo `20-10-surprise`.
3. Runtime **Node**, Build Command `npm ci`, Start Command `npm start`.
4. Health Check Path `/api/health`; Render tự cấp biến môi trường `PORT` nên không cần tự đặt.
5. Chọn gói phù hợp, nhấn Deploy Web Service.
6. Mở URL Render được cấp, kiểm tra `/api/health`, `/api/config`, `/api/wishes/random`, ảnh và âm nhạc.
7. Sau khi chỉnh code: `git add . && git commit -m "update: customize greeting" && git push origin main`. Khi bật Auto-Deploy, Render sẽ deploy lại.

Có thể dùng **Blueprint** với `render.yaml` thay vì thiết lập Web Service thủ công. Nếu giao diện Render thay đổi, đối chiếu các trường trong YAML.

## API

- `GET /api/health` → `{ "status": "ok" }`
- `GET /api/config` → cấu hình JSON
- `GET /api/wishes` → `{ "wishes": [...] }`
- `GET /api/wishes/random` → `{ "wish": "..." }`

## Lưu ý

- GSAP, Canvas Confetti, Google Fonts tải qua CDN, nên khi mất Internet các hiệu ứng bổ sung/font có thể không tải; nội dung chính vẫn hoạt động.
- File nhạc/ảnh mẫu không được tự tạo từ ảnh thật của người khác. Hãy tự thêm tài nguyên bạn có quyền sử dụng.
- Backend không có CORS vì frontend và API cùng origin.
- Không có database và không cần persistent disk. Sau này có thể thay việc đọc JSON bằng MySQL ở lớp routes/services.
