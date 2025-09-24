# Gerçek Zamanlı Chat Uygulaması

Bu proje, React ve Socket.IO kullanılarak geliştirilmiş basit bir gerçek zamanlı sohbet uygulamasıdır. İki kullanıcı arasında anlık mesajlaşma imkanı sağlar.

## 🚀 Özellikler

- Gerçek zamanlı mesajlaşma
- İki kullanıcı arasında özel sohbet
- Mesaj geçmişi görüntüleme
- Zaman damgalı mesajlar
- Responsive tasarım
- Modern ve kullanıcı dostu arayüz
- Tailwind CSS ile stil
- Socket.IO ile gerçek zamanlı iletişim
- JSON dosya tabanlı veri saklama

## 🛠️ Teknolojiler

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Socket.IO Client
  - date-fns (tarih formatlaması)

- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO
  - JSON dosya sistemi

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn

## 🔧 Kurulum

1. Projeyi klonlayın:
```bash
git clone [proje-url]
cd chat-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Bu komut hem frontend (port 3000) hem de backend (port 3001) sunucularını başlatacaktır.

## 💻 Kullanım

1. Tarayıcınızda http://localhost:3000 adresine gidin
2. İki farklı tarayıcı penceresi açın
3. Her pencerede farklı kullanıcı adlarıyla giriş yapın:
   - Pencere 1: Gönderen: "ibrahim", Alıcı: "selin"
   - Pencere 2: Gönderen: "selin", Alıcı: "ibrahim"
4. "Sohbete Başla" butonuna tıklayın
5. Mesajlaşmaya başlayın!

## 📁 Proje Yapısı

```
chat-app/
├── src/
│   ├── components/
│   │   └── ChatBox.js      # Ana sohbet bileşeni
│   ├── App.js             # Ana uygulama bileşeni
│   ├── index.js           # Uygulama giriş noktası
│   └── index.css          # Global stiller
├── server.js              # Backend sunucusu
├── messages.json          # Mesaj veritabanı
└── package.json           # Proje bağımlılıkları
```

## 🔄 Veri Saklama

- Mesajlar `messages.json` dosyasında saklanır
- Her sohbet için benzersiz bir ID oluşturulur
- Mesajlar şu bilgileri içerir:
  - Mesaj ID'si
  - Gönderen
  - Alıcı
  - Mesaj içeriği
  - Zaman damgası

## 🎨 UI Özellikleri

- Gönderen mesajları sağda (mavi)
- Alıcı mesajları solda (beyaz)
- Responsive tasarım
- Otomatik kaydırma
- Mesaj zaman damgaları
- Modern form tasarımı

## 🔍 Hata Ayıklama

1. Port çakışması durumunda:
```bash
lsof -i :3000,3001 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

2. Node süreçlerini temizleme:
```bash
pkill -f node
```

## 📝 Açık Kaynak Kullanımı

Bu proje açık kaynaklıdır ve herkes tarafından özgürce kullanılabilir, değiştirilebilir ve geliştirilebilir. Projeyi kullanırken veya geliştirirken herhangi bir lisans kısıtlaması bulunmamaktadır.

## 👥 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: Açıklama'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun


https://ibrahimglmz.github.io/portfolio/
