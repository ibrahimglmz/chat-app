const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Mesajları saklamak için dosya yolu
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Mesajları yükle
let messageStore = new Map();
try {
  if (fs.existsSync(MESSAGES_FILE)) {
    const data = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
    messageStore = new Map(Object.entries(data));
  }
} catch (error) {
  console.error('Mesajlar yüklenirken hata:', error);
}

// Mesajları kaydet
const saveMessages = () => {
  try {
    const data = Object.fromEntries(messageStore);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Mesajlar kaydedilirken hata:', error);
  }
};

io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı');

  socket.on('join', ({ from, to }) => {
    const chatId = [from, to].sort().join('-');
    
    // Önceki mesajları gönder
    const messages = messageStore.get(chatId) || [];
    socket.emit('previousMessages', messages);
  });

  socket.on('sendMessage', (message) => {
    const chatId = [message.sender, message.receiver].sort().join('-');
    
    // Mesajı sakla
    const messages = messageStore.get(chatId) || [];
    messages.push(message);
    messageStore.set(chatId, messages);

    // Mesajları dosyaya kaydet
    saveMessages();

    // Mesajı gönder
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Bir kullanıcı ayrıldı');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
}); 