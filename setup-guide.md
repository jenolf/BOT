# 📋 Hướng dẫn Setup Chi Tiết

## Bước 1: Tạo Discord Bot

### 1.1 Tạo Application
1. Truy cập https://discord.com/developers/applications
2. Click **"New Application"**
3. Đặt tên cho bot (ví dụ: "Reaction Role Bot")
4. Click **"Create"**

### 1.2 Tạo Bot
1. Vào tab **"Bot"** ở sidebar
2. Click **"Add Bot"**
3. Confirm **"Yes, do it!"**
4. Copy **Token** (giữ bí mật!)

### 1.3 Cấu hình Bot
1. Tắt **"Public Bot"** nếu muốn (optional)
2. Bật **"Message Content Intent"**
3. Save Changes

### 1.4 Invite Bot vào Server
1. Vào tab **"OAuth2"** > **"URL Generator"**
2. Chọn **Scopes**: `bot`
3. Chọn **Bot Permissions**:
   - ✅ Send Messages
   - ✅ Use External Emojis  
   - ✅ Add Reactions
   - ✅ Read Message History
   - ✅ Manage Roles
4. Copy URL và mở trong browser
5. Chọn server và authorize

## Bước 2: Setup Code

### 2.1 Clone/Download Code
```bash
git clone <repository-url>
cd discord-reaction-role-bot
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Tạo file .env
```bash
cp .env.example .env
```

Điền thông tin vào `.env`:
```env
DISCORD_TOKEN=NzI4MjM5ODU2NzY4MDU2Mzky.Xv1234.abcdefghijklmnopqrstuvwxyz
CLIENT_ID=728239856768056392
GUILD_ID=123456789012345678
```

**Cách lấy ID:**
- **DISCORD_TOKEN**: Copy từ Bot tab trong Developer Portal
- **CLIENT_ID**: Copy từ General Information tab
- **GUILD_ID**: Right-click server name > Copy ID (cần bật Developer Mode)

## Bước 3: Tạo Roles trong Discord

### 3.1 Tạo Game Roles
1. Vào Server Settings > Roles
2. Tạo role cho từng game:
   - `Diablo III`
   - `Path Of Exile`
   - `MapleStory`
   - `Honkai: Star Rail`
   - `Tốc Chiến`
   - `Grand Theft Auto V`
   - `Blade & Soul`
   - `Sky: Children of the Light`
   - `Huyền Thoại Runeterra`
   - `Call Of Duty Mobile`
   - `GENSHIN`
   - `DOTA 2`
   - `osu!`
   - `Apex Legends`
   - `Risk Hunter`
   - `Brawlhalla`
   - `Cookie Game Lươn`

### 3.2 Copy Role IDs
1. Bật Developer Mode: User Settings > Advanced > Developer Mode
2. Right-click từng role > Copy ID
3. Ghi lại để cập nhật config

## Bước 4: Cấu hình Role Mapping

Mở file `config.js` và thay thế Role IDs:

```javascript
roles: {
    '👀': '123456789012345678',  // Diablo III Role ID
    '🤓': '123456789012345679',  // Path Of Exile Role ID
    '🍄': '123456789012345680',  // MapleStory Role ID
    // ... tiếp tục với các role khác
}
```

## Bước 5: Test Bot

### 5.1 Chạy Bot
```bash
npm start
```

Nếu thành công, bạn sẽ thấy:
```
✅ Bot đã sẵn sàng! Đăng nhập với tên: YourBot#1234
🚀 Bot đang hoạt động trên 1 server(s)
```

### 5.2 Test Commands
1. Vào channel trong Discord
2. Gõ `!reactionrole`
3. Bot sẽ tạo embed message với reactions
4. Test click vào emoji để xem có nhận role không

## Bước 6: Setup Role Hierarchy

⚠️ **QUAN TRỌNG**: Bot role phải cao hơn các game roles

1. Vào Server Settings > Roles
2. Drag bot role lên trên tất cả game roles
3. Đảm bảo bot có permission `Manage Roles`

## 🔧 Troubleshooting

### Bot không online?
- Kiểm tra token trong `.env`
- Đảm bảo không có space thừa
- Check console log

### Không tạo được message?
- Bot cần permission `Send Messages`
- Kiểm tra channel permissions

### Không add được role?
- Bot role phải cao hơn target role
- Bot cần permission `Manage Roles`
- Kiểm tra Role ID trong config

### Emoji không react?
- Đảm bảo dùng Unicode emoji
- Không dùng custom emoji của server khác

## 📝 Commands

| Command | Mô tả | Quyền cần |
|---------|-------|-----------|
| `!reactionrole` | Tạo reaction role message | Administrator |
| `!clearreactionrole` | Xóa reaction role message | Administrator |

## 🎯 Tips

1. **Backup config**: Lưu Role IDs ở đâu đó an toàn
2. **Test trước**: Test với 1-2 role trước khi setup hết
3. **Role colors**: Đặt màu khác nhau cho dễ phân biệt
4. **Bot nickname**: Đặt nickname cho bot dễ nhận biết
5. **Channel riêng**: Tạo channel riêng cho reaction roles

## 🚀 Production Deployment

### Heroku
1. Tạo Heroku app
2. Add buildpack: `heroku/nodejs`
3. Set config vars từ `.env`
4. Deploy từ GitHub

### VPS
1. Install Node.js
2. Clone code
3. Install PM2: `npm install -g pm2`
4. Run: `pm2 start index.js --name "reaction-bot"`
5. Setup auto-restart: `pm2 startup`

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

---

🎉 **Chúc mừng! Bot của bạn đã sẵn sàng hoạt động!**