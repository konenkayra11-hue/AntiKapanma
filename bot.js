const mineflayer = require('mineflayer');
const http = require('http');

// Render Ücretsiz Planı için Web Sunucusu Kuruluyor (Render'ın hata vermesini önler)
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Aternos Botu Aktif Olarak Calisiyor!\n');
});
server.listen(10000, '0.0.0.0', () => {
    console.log('Web sunucusu 10000 portunda baslatildi. Render kontrolü aktif.');
});

function createBot() {
    const bot = mineflayer.createBot({
        host: 'tevhikileri.aternos.me', // Buraya kendi Aternos IP'nizi yazın (örn: deneme.aternos.me)
        port: 25565,                     
        username: 'TevhikİleriAFK',      
        version: '26.3'                  
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

// Minecraft botunu baslat
createBot();
