// Cấu hình mapping giữa emoji và role
const reactionRoleConfig = {
    // Channel ID nơi sẽ gửi reaction role message
    channelId: 'YOUR_CHANNEL_ID_HERE',
    
    // Mapping emoji với role ID
    roles: {
        '👀': 'DIABLO_ROLE_ID',           // @Diablo III
        '🤓': 'PATH_OF_EXILE_ROLE_ID',    // @Path Of Exile
        '🍄': 'MAPLESTORY_ROLE_ID',       // @MapleStory
        '😭': 'HONKAI_ROLE_ID',           // @Honkai: Star Rail
        '🚗': 'TOC_CHIEN_ROLE_ID',        // @Tốc Chiến
        '🎃': 'GTA_ROLE_ID',              // @Grand Theft Auto V
        '👤': 'BLADE_SOUL_ROLE_ID',       // @Blade & Soul
        '😎': 'SKY_CHILDREN_ROLE_ID',     // @Sky: Children of the Light
        '💋': 'RUNETERRA_ROLE_ID',        // @Huyền Thoại Runeterra
        '🦖': 'COD_MOBILE_ROLE_ID',       // @Call Of Duty Mobile
        '🔥': 'GENSHIN_ROLE_ID',          // @GENSHIN
        '🤔': 'DOTA_ROLE_ID',             // @DOTA 2
        '😘': 'OSU_ROLE_ID',              // @osu!
        '🌸': 'APEX_LEGENDS_ROLE_ID',     // @Apex Legends
        '⚠️': 'RISK_HUNTER_ROLE_ID',      // @Risk Hunter
        '👺': 'BRAWLHALLA_ROLE_ID',       // @Brawlhalla
        '🐷': 'COOKIE_RUN_ROLE_ID'        // @Cookie Game Lươn
    }
};

module.exports = reactionRoleConfig;