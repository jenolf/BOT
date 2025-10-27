const { Client, GatewayIntentBits, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('./config.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ]
});

// Lưu trữ message ID của reaction role message
let reactionRoleMessageId = null;

client.once('ready', () => {
    console.log(`✅ Bot đã sẵn sàng! Đăng nhập với tên: ${client.user.tag}`);
    console.log(`🚀 Bot đang hoạt động trên ${client.guilds.cache.size} server(s)`);
});

// Command để tạo reaction role message
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // Chỉ admin mới có thể sử dụng command này
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return;
    
    if (message.content === '!reactionrole') {
        // Tạo embed message đẹp
        const embed = new EmbedBuilder()
            .setTitle('🎮 CHỌN GAME YÊU THÍCH CỦA BẠN!')
            .setDescription('Click vào emoji để nhận role nhoa cá siao bé nhỏ :3\n\n' +
                '👀 @Diablo III\n' +
                '🤓 @Path Of Exile\n' +
                '🍄 @MapleStory\n' +
                '😭 @Honkai: Star Rail\n' +
                '🚗 @Tốc Chiến\n' +
                '🎃 @Grand Theft Auto V\n' +
                '👤 @Blade & Soul\n' +
                '😎 @Sky: Children of the Light\n' +
                '💋 @Huyền Thoại Runeterra\n' +
                '🦖 @Call Of Duty Mobile\n' +
                '🔥 @GENSHIN\n' +
                '🤔 @DOTA 2\n' +
                '😘 @osu!\n' +
                '🌸 @Apex Legends\n' +
                '⚠️ @Risk Hunter\n' +
                '👺 @Brawlhalla\n' +
                '🐷 @Cookie Game Lươn')
            .setColor('#00FF00')
            .setFooter({ text: 'Carl-bot 📱 APP • React để nhận role!' })
            .setTimestamp();

        try {
            const sentMessage = await message.channel.send({ embeds: [embed] });
            reactionRoleMessageId = sentMessage.id;
            
            // Thêm tất cả reactions
            const emojis = Object.keys(config.roles);
            for (const emoji of emojis) {
                await sentMessage.react(emoji);
                // Delay nhỏ để tránh rate limit
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            console.log('✅ Reaction role message đã được tạo thành công!');
            
            // Xóa command message
            await message.delete();
            
        } catch (error) {
            console.error('❌ Lỗi khi tạo reaction role message:', error);
            message.reply('❌ Có lỗi xảy ra khi tạo reaction role message!');
        }
    }
    
    // Command để xóa reaction role message
    if (message.content === '!clearreactionrole') {
        if (reactionRoleMessageId) {
            try {
                const messageToDelete = await message.channel.messages.fetch(reactionRoleMessageId);
                await messageToDelete.delete();
                reactionRoleMessageId = null;
                console.log('✅ Reaction role message đã được xóa!');
                message.reply('✅ Đã xóa reaction role message!').then(msg => {
                    setTimeout(() => msg.delete(), 3000);
                });
            } catch (error) {
                console.error('❌ Lỗi khi xóa message:', error);
                message.reply('❌ Không thể xóa message!');
            }
        } else {
            message.reply('❌ Không tìm thấy reaction role message để xóa!');
        }
        await message.delete();
    }
});

// Xử lý khi người dùng thêm reaction
client.on('messageReactionAdd', async (reaction, user) => {
    // Bỏ qua nếu là bot
    if (user.bot) return;
    
    // Kiểm tra xem có phải reaction role message không
    if (reaction.message.id !== reactionRoleMessageId) return;
    
    const emoji = reaction.emoji.name;
    const roleId = config.roles[emoji];
    
    if (!roleId) return;
    
    try {
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);
        const role = await guild.roles.fetch(roleId);
        
        if (!role) {
            console.error(`❌ Không tìm thấy role với ID: ${roleId} cho emoji: ${emoji}`);
            return;
        }
        
        if (!member.roles.cache.has(roleId)) {
            await member.roles.add(role);
            console.log(`✅ Đã thêm role ${role.name} cho ${user.tag}`);
            
            // Gửi DM thông báo (optional)
            try {
                await user.send(`🎉 Bạn đã nhận được role **${role.name}**!`);
            } catch (error) {
                // Người dùng có thể đã tắt DM, bỏ qua lỗi này
                console.log(`⚠️ Không thể gửi DM cho ${user.tag}`);
            }
        }
        
    } catch (error) {
        console.error('❌ Lỗi khi thêm role:', error);
    }
});

// Xử lý khi người dùng xóa reaction
client.on('messageReactionRemove', async (reaction, user) => {
    // Bỏ qua nếu là bot
    if (user.bot) return;
    
    // Kiểm tra xem có phải reaction role message không
    if (reaction.message.id !== reactionRoleMessageId) return;
    
    const emoji = reaction.emoji.name;
    const roleId = config.roles[emoji];
    
    if (!roleId) return;
    
    try {
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);
        const role = await guild.roles.fetch(roleId);
        
        if (!role) {
            console.error(`❌ Không tìm thấy role với ID: ${roleId} cho emoji: ${emoji}`);
            return;
        }
        
        if (member.roles.cache.has(roleId)) {
            await member.roles.remove(role);
            console.log(`✅ Đã xóa role ${role.name} khỏi ${user.tag}`);
            
            // Gửi DM thông báo (optional)
            try {
                await user.send(`❌ Bạn đã mất role **${role.name}**!`);
            } catch (error) {
                // Người dùng có thể đã tắt DM, bỏ qua lỗi này
                console.log(`⚠️ Không thể gửi DM cho ${user.tag}`);
            }
        }
        
    } catch (error) {
        console.error('❌ Lỗi khi xóa role:', error);
    }
});

// Xử lý lỗi
client.on('error', error => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Đăng nhập bot
client.login(process.env.DISCORD_TOKEN);