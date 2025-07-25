import discord
from discord.ext import commands
import os

# Thiết lập intents
intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
intents.members = True

# Tạo bot instance
bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'{bot.user} đã sẵn sàng!')
    print(f'Bot ID: {bot.user.id}')

@bot.command(name='addrole')
@commands.has_permissions(manage_roles=True)
async def add_role(ctx, member: discord.Member, *, role_name):
    """
    Thêm role cho thành viên
    Cách sử dụng: !addrole @user role_name
    """
    try:
        # Tìm role theo tên
        role = discord.utils.get(ctx.guild.roles, name=role_name)
        
        if role is None:
            await ctx.send(f"❌ Không tìm thấy role '{role_name}'")
            return
        
        # Kiểm tra xem user đã có role này chưa
        if role in member.roles:
            await ctx.send(f"❌ {member.display_name} đã có role '{role_name}' rồi!")
            return
        
        # Thêm role cho member
        await member.add_roles(role)
        await ctx.send(f"✅ Đã thêm role '{role_name}' cho {member.display_name}")
        
    except discord.Forbidden:
        await ctx.send("❌ Bot không có quyền thêm role này!")
    except Exception as e:
        await ctx.send(f"❌ Có lỗi xảy ra: {str(e)}")

@bot.command(name='removerole')
@commands.has_permissions(manage_roles=True)
async def remove_role(ctx, member: discord.Member, *, role_name):
    """
    Xóa role khỏi thành viên
    Cách sử dụng: !removerole @user role_name
    """
    try:
        # Tìm role theo tên
        role = discord.utils.get(ctx.guild.roles, name=role_name)
        
        if role is None:
            await ctx.send(f"❌ Không tìm thấy role '{role_name}'")
            return
        
        # Kiểm tra xem user có role này không
        if role not in member.roles:
            await ctx.send(f"❌ {member.display_name} không có role '{role_name}'!")
            return
        
        # Xóa role khỏi member
        await member.remove_roles(role)
        await ctx.send(f"✅ Đã xóa role '{role_name}' khỏi {member.display_name}")
        
    except discord.Forbidden:
        await ctx.send("❌ Bot không có quyền xóa role này!")
    except Exception as e:
        await ctx.send(f"❌ Có lỗi xảy ra: {str(e)}")

@bot.command(name='createrole')
@commands.has_permissions(manage_roles=True)
async def create_role(ctx, *, role_name):
    """
    Tạo role mới
    Cách sử dụng: !createrole role_name
    """
    try:
        # Kiểm tra xem role đã tồn tại chưa
        existing_role = discord.utils.get(ctx.guild.roles, name=role_name)
        if existing_role:
            await ctx.send(f"❌ Role '{role_name}' đã tồn tại!")
            return
        
        # Tạo role mới
        new_role = await ctx.guild.create_role(name=role_name)
        await ctx.send(f"✅ Đã tạo role '{role_name}' thành công!")
        
    except discord.Forbidden:
        await ctx.send("❌ Bot không có quyền tạo role!")
    except Exception as e:
        await ctx.send(f"❌ Có lỗi xảy ra: {str(e)}")

@bot.command(name='listroles')
async def list_roles(ctx, member: discord.Member = None):
    """
    Liệt kê các role của thành viên
    Cách sử dụng: !listroles @user (hoặc !listroles để xem role của bản thân)
    """
    if member is None:
        member = ctx.author
    
    roles = [role.name for role in member.roles if role.name != "@everyone"]
    
    if not roles:
        await ctx.send(f"{member.display_name} không có role nào.")
    else:
        roles_text = ", ".join(roles)
        await ctx.send(f"**Roles của {member.display_name}:**\n{roles_text}")

@bot.command(name='serverroles')
async def server_roles(ctx):
    """
    Liệt kê tất cả role trong server
    Cách sử dụng: !serverroles
    """
    roles = [role.name for role in ctx.guild.roles if role.name != "@everyone"]
    
    if not roles:
        await ctx.send("Server này không có role nào.")
    else:
        roles_text = "\n".join(f"• {role}" for role in roles)
        embed = discord.Embed(
            title=f"Roles trong {ctx.guild.name}",
            description=roles_text,
            color=discord.Color.blue()
        )
        await ctx.send(embed=embed)

# Error handlers
@add_role.error
@remove_role.error
@create_role.error
async def role_error(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("❌ Bạn không có quyền sử dụng lệnh này!")
    elif isinstance(error, commands.MemberNotFound):
        await ctx.send("❌ Không tìm thấy thành viên này!")
    elif isinstance(error, commands.MissingRequiredArgument):
        await ctx.send("❌ Thiếu tham số! Hãy kiểm tra lại cách sử dụng lệnh.")

@bot.command(name='help_roles')
async def help_roles(ctx):
    """
    Hiển thị hướng dẫn sử dụng các lệnh role
    """
    embed = discord.Embed(
        title="🎭 Hướng dẫn sử dụng Role Commands",
        color=discord.Color.green()
    )
    
    embed.add_field(
        name="!addrole @user role_name",
        value="Thêm role cho thành viên",
        inline=False
    )
    
    embed.add_field(
        name="!removerole @user role_name",
        value="Xóa role khỏi thành viên",
        inline=False
    )
    
    embed.add_field(
        name="!createrole role_name",
        value="Tạo role mới",
        inline=False
    )
    
    embed.add_field(
        name="!listroles @user",
        value="Xem roles của thành viên (không cần @user để xem role của bản thân)",
        inline=False
    )
    
    embed.add_field(
        name="!serverroles",
        value="Xem tất cả roles trong server",
        inline=False
    )
    
    embed.set_footer(text="⚠️ Cần quyền 'Manage Roles' để sử dụng các lệnh quản lý role")
    
    await ctx.send(embed=embed)

# Chạy bot
if __name__ == "__main__":
    # Lấy token từ environment variable
    TOKEN = os.getenv('DISCORD_BOT_TOKEN')
    
    if not TOKEN:
        print("❌ Không tìm thấy DISCORD_BOT_TOKEN!")
        print("Hãy tạo file .env và thêm token của bot:")
        print("DISCORD_BOT_TOKEN=your_bot_token_here")
    else:
        bot.run(TOKEN)