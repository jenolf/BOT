# Discord Reaction Role Bot 🎮

Bot Discord với chức năng reaction role giống như Carl-bot. Người dùng có thể click vào emoji để nhận role game yêu thích.

## ✨ Tính năng

- 🎯 Reaction role tự động
- 🎮 Hỗ trợ nhiều game khác nhau
- 💬 Gửi DM thông báo khi nhận/mất role
- 🛡️ Chỉ admin mới có thể tạo reaction role message
- 🎨 Embed message đẹp mắt
- ⚡ Xử lý real-time khi thêm/xóa reaction

## 🚀 Cài đặt

### 1. Tạo Discord Bot

1. Truy cập [Discord Developer Portal](https://discord.com/developers/applications)
2. Tạo New Application
3. Vào tab "Bot" và tạo bot
4. Copy **Token** của bot
5. Vào tab "OAuth2" > "URL Generator":
   - Chọn scope: `bot`
   - Chọn permissions: `Manage Roles`, `Send Messages`, `Use External Emojis`, `Add Reactions`, `Read Message History`
6. Invite bot vào server bằng URL được tạo

### 2. Cài đặt Dependencies

```bash
npm install
```

### 3. Cấu hình

1. Copy file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

2. Điền thông tin vào file `.env`:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
```

3. Cập nhật `config.js` với Role ID thực tế:
   - Right-click vào role trong Discord > Copy ID
   - Thay thế các `ROLE_ID` trong file config

### 4. Chạy Bot

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📝 Cách sử dụng

### Tạo Reaction Role Message
```
!reactionrole
```
- Chỉ admin mới có thể sử dụng
- Bot sẽ tạo embed message với tất cả emoji
- Tự động thêm reactions

### Xóa Reaction Role Message
```
!clearreactionrole
```
- Xóa reaction role message hiện tại

### Cách hoạt động
1. Người dùng click vào emoji ➡️ Nhận role tương ứng
2. Người dùng bỏ click emoji ➡️ Mất role tương ứng
3. Bot gửi DM thông báo (nếu người dùng cho phép)

## 🎮 Game Roles Được Hỗ Trợ

| Emoji | Game/Role |
|-------|-----------|
| 👀 | Diablo III |
| 🤓 | Path Of Exile |
| 🍄 | MapleStory |
| 😭 | Honkai: Star Rail |
| 🚗 | Tốc Chiến |
| 🎃 | Grand Theft Auto V |
| 👤 | Blade & Soul |
| 😎 | Sky: Children of the Light |
| 💋 | Huyền Thoại Runeterra |
| 🦖 | Call Of Duty Mobile |
| 🔥 | GENSHIN |
| 🤔 | DOTA 2 |
| 😘 | osu! |
| 🌸 | Apex Legends |
| ⚠️ | Risk Hunter |
| 👺 | Brawlhalla |
| 🐷 | Cookie Game Lươn |

## ⚙️ Cấu hình Role ID

1. Bật Developer Mode trong Discord (User Settings > Advanced > Developer Mode)
2. Right-click vào role > Copy ID
3. Thay thế trong `config.js`:

```javascript
roles: {
    '👀': '123456789012345678',  // Thay bằng Role ID thực tế
    '🤓': '123456789012345679',
    // ...
}
```

## 🛠️ Troubleshooting

### Bot không phản hồi?
- Kiểm tra token trong `.env`
- Đảm bảo bot có quyền `Send Messages`, `Add Reactions`
- Check console log để xem lỗi

### Không thể add/remove role?
- Bot cần quyền `Manage Roles`
- Role của bot phải cao hơn role muốn quản lý
- Kiểm tra Role ID trong `config.js`

### Emoji không hoạt động?
- Đảm bảo emoji là Unicode emoji (không phải custom emoji)
- Kiểm tra mapping trong `config.js`

## 📋 Requirements

- Node.js 16.0.0+
- Discord.js v14
- Bot có quyền Manage Roles
- Role của bot phải cao hơn role muốn quản lý

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.
