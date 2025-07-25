const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const config = require('./config');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Store message ID for role reactions
let roleMessageId = null;

client.once('ready', () => {
    console.log(`✅ Bot đã sẵn sàng! Đăng nhập với tên ${client.user.tag}`);
    client.user.setActivity('🎮 Game Roles', { type: 'WATCHING' });
});

// Command to create role selection message
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    if (message.content === '!roles' || message.content === '!role') {
        // Check if user has admin permissions
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('❌ Bạn cần quyền Administrator để sử dụng lệnh này!');
        }
        
        await createRoleMessage(message.channel);
    }
    
    if (message.content === '!setup-roles') {
        // Check if user has admin permissions
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('❌ Bạn cần quyền Administrator để sử dụng lệnh này!');
        }
        
        await setupRoles(message.guild);
        message.reply('✅ Đã tạo tất cả các role game!');
    }
});

async function setupRoles(guild) {
    for (const roleData of config.roleConfig) {
        try {
            // Check if role already exists
            const existingRole = guild.roles.cache.find(role => role.name === roleData.name);
            
            if (!existingRole) {
                const role = await guild.roles.create({
                    name: roleData.name,
                    color: roleData.color,
                    reason: 'Game role setup'
                });
                console.log(`✅ Đã tạo role: ${roleData.name}`);
                
                // Update config with role ID (in a real app, you'd save this to a database)
                roleData.roleId = role.id;
            } else {
                roleData.roleId = existingRole.id;
                console.log(`ℹ️ Role đã tồn tại: ${roleData.name}`);
            }
        } catch (error) {
            console.error(`❌ Lỗi khi tạo role ${roleData.name}:`, error);
        }
    }
}

async function createRoleMessage(channel) {
    // Create embed
    const embed = new EmbedBuilder()
        .setTitle(config.embedConfig.title)
        .setDescription(config.embedConfig.description)
        .setColor(config.embedConfig.color)
        .setFooter({ text: config.embedConfig.footer })
        .setTimestamp();
    
    // Add fields for each game role
    let roleList = '';
    config.roleConfig.forEach((role, index) => {
        roleList += `${role.emoji} ${role.name}\n`;
    });
    
    embed.addFields({ name: 'Available Games:', value: roleList, inline: false });
    
    // Add reaction count section (like in the image)
    let reactionCounts = '';
    const emojis = ['👁️', '🤓', '🍄', '😭', '🚲', '🎃', '👨', '😎'];
    const counts = [11, 10, 11, 47, 21, 14, 11, 18];
    
    for (let i = 0; i < emojis.length; i++) {
        reactionCounts += `${emojis[i]} ${counts[i]} `;
        if ((i + 1) % 4 === 0) reactionCounts += '\n';
    }
    
    embed.addFields({ name: 'Reaction Counts:', value: reactionCounts, inline: false });
    
    // Send message
    const message = await channel.send({ embeds: [embed] });
    roleMessageId = message.id;
    
    // Add reactions
    for (const roleData of config.roleConfig) {
        try {
            await message.react(roleData.emoji);
        } catch (error) {
            console.error(`❌ Lỗi khi thêm reaction ${roleData.emoji}:`, error);
        }
    }
    
    console.log('✅ Đã tạo message role selection!');
}

// Handle reaction add
client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.id !== roleMessageId) return;
    
    // Get the role config for this emoji
    const roleData = config.roleConfig.find(r => r.emoji === reaction.emoji.name);
    if (!roleData || !roleData.roleId) return;
    
    try {
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);
        const role = guild.roles.cache.get(roleData.roleId);
        
        if (role && !member.roles.cache.has(roleData.roleId)) {
            await member.roles.add(role);
            console.log(`✅ Đã thêm role ${roleData.name} cho ${user.tag}`);
            
            // Send DM notification
            try {
                await user.send(`🎮 Bạn đã nhận role **${roleData.name}**! ${roleData.emoji}`);
            } catch (error) {
                console.log('Không thể gửi DM cho user');
            }
        }
    } catch (error) {
        console.error('❌ Lỗi khi thêm role:', error);
    }
});

// Handle reaction remove
client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.id !== roleMessageId) return;
    
    // Get the role config for this emoji
    const roleData = config.roleConfig.find(r => r.emoji === reaction.emoji.name);
    if (!roleData || !roleData.roleId) return;
    
    try {
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);
        const role = guild.roles.cache.get(roleData.roleId);
        
        if (role && member.roles.cache.has(roleData.roleId)) {
            await member.roles.remove(role);
            console.log(`❌ Đã xóa role ${roleData.name} khỏi ${user.tag}`);
            
            // Send DM notification
            try {
                await user.send(`🗑️ Bạn đã bỏ role **${roleData.name}**! ${roleData.emoji}`);
            } catch (error) {
                console.log('Không thể gửi DM cho user');
            }
        }
    } catch (error) {
        console.error('❌ Lỗi khi xóa role:', error);
    }
});

// Error handling
client.on('error', console.error);

// Login
client.login(process.env.DISCORD_TOKEN);