// server/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // 1. İstek başlığından (header) token'ı al
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'Yetkilendirme reddedildi: Token bulunamadı.' });
    }

    // 2. Token'ın geçerliliğini kontrol et
    // Token oluştururken kullandığımız gizli anahtarla doğrula
    const verified = jwt.verify(token, process.env.JWT_SECRET || "gizli_anahtar");
    if (!verified) {
      return res.status(401).json({ msg: 'Yetkilendirme reddedildi: Token geçersiz.' });
    }

    // 3. Token geçerliyse, kullanıcı ID'sini isteğe (req) ekle
    // Token'ı oluştururken içine { id: user._id } koymuştuk.
    req.user = verified.id;
    
    // 4. Bir sonraki adıma (asıl route fonksiyonuna) geç
    next();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;