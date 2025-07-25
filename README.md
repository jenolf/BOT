# Discord Role Bot 🎮

Bot Discord để quản lý role game thông qua emoji reactions, giống như Carl-bot.

## Tính năng

- ✅ Tự động tạo và quản lý role game
- 🎮 Hệ thống emoji reaction để nhận/bỏ role
- 📊 Hiển thị số lượng reaction như trong hình
- 💌 Thông báo DM khi nhận/bỏ role
- 🔒 Chỉ admin mới có thể setup bot

## Cài đặt

1. **Clone repository:**
```bash
git clone <repository-url>
cd BOT
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Tạo file .env:**
```bash
cp .env.example .env
```

4. **Cấu hình .env file:**
```
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
```

## Cách lấy Discord Bot Token

1. Truy cập [Discord Developer Portal](https://discord.com/developers/applications)
2. Tạo New Application
3. Vào tab "Bot" và tạo bot
4. Copy token và paste vào file .env
5. Bật các Privileged Gateway Intents:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT

## Mời bot vào server

Sử dụng link này (thay YOUR_CLIENT_ID):
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=268435456&scope=bot
```

## Sử dụng

1. **Khởi động bot:**
```bash
npm start
```

2. **Setup roles (chỉ admin):**
```
!setup-roles
```

3. **Tạo message role selection:**
```
!roles
```

## Cấu hình Game Roles

Chỉnh sửa file `config.js` để thêm/sửa/xóa game roles:

```javascript
{
    name: "Tên Game",
    emoji: "🎮",
    roleId: null,
    color: "#FF6B35"
}
```

## Commands

- `!setup-roles` - Tạo tất cả role game (Admin only)
- `!roles` hoặc `!role` - Tạo message role selection (Admin only)

## Permissions cần thiết

Bot cần các quyền sau:
- Manage Roles
- Send Messages
- Add Reactions
- Read Message History
- Use External Emojis

## Cấu trúc project

```
├── index.js          # File chính của bot
├── config.js         # Cấu hình roles và emojis
├── package.json      # Dependencies
├── .env.example      # Template cho environment variables
└── README.md         # Hướng dẫn này
```

## Troubleshooting

- **Bot không phản hồi:** Kiểm tra token và permissions
- **Không thể tạo role:** Bot cần quyền "Manage Roles"
- **Reaction không hoạt động:** Kiểm tra Message Content Intent
- **DM không gửi được:** User đã tắt DM từ server members

## Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Bot token có đúng không
2. Bot có đủ permissions không
3. Intents đã được bật chưa
4. Role hierarchy (bot role phải cao hơn các role game)
