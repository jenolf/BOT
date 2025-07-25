#!/usr/bin/env python3
"""
Script để chạy Discord bot với hỗ trợ .env file
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Import và chạy bot
from bot import bot

if __name__ == "__main__":
    TOKEN = os.getenv('DISCORD_BOT_TOKEN')
    
    if not TOKEN:
        print("❌ Không tìm thấy DISCORD_BOT_TOKEN!")
        print("Hãy tạo file .env và thêm token của bot:")
        print("DISCORD_BOT_TOKEN=your_bot_token_here")
        exit(1)
    
    print("🤖 Đang khởi động bot...")
    try:
        bot.run(TOKEN)
    except Exception as e:
        print(f"❌ Lỗi khi chạy bot: {e}")
        exit(1)