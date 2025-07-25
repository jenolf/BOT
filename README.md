# Discord Bot - Role Management

Bot Discord để quản lý roles với các tính năng:
- Thêm role cho thành viên
- Xóa role khỏi thành viên  
- Tạo role mới
- Xem danh sách roles

## 🚀 Cài đặt

1. **Cài đặt Python dependencies:**
```bash
pip install -r requirements.txt
```

2. **Tạo Discord Bot:**
   - Truy cập [Discord Developer Portal](https://discord.com/developers/applications)
   - Tạo New Application
   - Vào tab "Bot" và tạo bot
   - Copy token

3. **Cấu hình token:**
```bash
cp .env.example .env
# Chỉnh sửa file .env và thêm token của bot
```

4. **Invite bot vào server:**
   - Vào tab "OAuth2" > "URL Generator"
   - Chọn scope: `bot`
   - Chọn permissions: `Manage Roles`, `Send Messages`, `Read Message History`
   - Copy URL và invite bot vào server

## 📋 Các lệnh

### Quản lý Roles (Cần quyền Manage Roles)

- `!addrole @user role_name` - Thêm role cho thành viên
- `!removerole @user role_name` - Xóa role khỏi thành viên
- `!createrole role_name` - Tạo role mới

### Xem thông tin Roles

- `!listroles @user` - Xem roles của thành viên (không cần @user để xem role của bản thân)
- `!serverroles` - Xem tất cả roles trong server
- `!help_roles` - Hiển thị hướng dẫn sử dụng

## 🔧 Chạy bot

```bash
python bot.py
```

## ⚠️ Lưu ý quan trọng

1. **Quyền của bot:** Bot cần có quyền "Manage Roles" và role của bot phải cao hơn các role mà bot quản lý
2. **Quyền của user:** User sử dụng lệnh cần có quyền "Manage Roles"
3. **Hierarchy:** Bot không thể thêm/xóa role cao hơn role của chính nó

## 🛡️ Bảo mật

- Không share token bot với ai
- Chỉ cấp quyền tối thiểu cần thiết cho bot
- Kiểm tra kỹ quyền trước khi invite bot vào server
