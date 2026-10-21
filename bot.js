const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'tevhikileri.aternos.me', // Buraya kendi Aternos IP'nizi yazın
        port: 25565,                     
        username: 'AternosBekcisi',      
        version: '26.2'                  
    });

    bot.on('spawn', () => {
        console.log('Bot Aternos sunucusuna girdi! 7/24 trafik basılıyor.');

        // AFK kalıp atılmamak için zıplama döngüsü
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 15000); 
    });

    bot.on('end', () => {
        console.log('Bağlantı koptu, 10 saniye sonra tekrar bağlanılıyor...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Hata:', err));
}

createBot();
