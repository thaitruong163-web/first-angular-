# Online Store TT-163

TT-163 là mini project Angular được xây dựng nhằm mục tiêu học và thực hành Angular một cách bài bản, tập trung vào kiến trúc, authentication, state management và TypeScript strict.

Project này không chỉ để “code cho chạy”, mà để hiểu cách tổ chức một ứng dụng Angular thực tế.

---

## 🎯 Mục tiêu học tập

- Hiểu cấu trúc chuẩn của một Angular project
- Thực hành Authentication & Authorization
- Áp dụng Route Guard và Role-based access
- Quản lý state một cách rõ ràng
- Sử dụng TypeScript đúng kiểu, hạn chế `any`
- Làm quen với Dashboard và các module chức năng

---

## 🧱 Công nghệ sử dụng

- Angular (Angular CLI)
- TypeScript
- RxJS
- Angular Router
- HTML / CSS

---

## ✨ Chức năng chính

- 🔐 Authentication (Login / Register)
- 🛡️ Route Guard (Auth Guard, Role Guard)
- 👤 Phân quyền người dùng theo role
- 📦 Quản lý Product
- 🛒 Cart & State management
- 📊 Dashboard hiển thị dữ liệu
- 🧩 Tách module, service, model rõ ràng

---

## 📁 Cấu trúc thư mục (rút gọn)

```text
src/
 ├── app/
 │   ├── dashboard/     # Dashboard module
 │   ├── login/
 │   ├── shared/
 |   |── ├── auth/      # Login, Register, Auth service, Guard
 │   │   ├── models/    # Interface / Model
 │   │   ├── state/     # State management
 │   │   └── services/ # Shared services
 │   └── app-routing.module.ts
 └── ...
