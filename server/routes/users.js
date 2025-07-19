// server/routes/users.js
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

// --- KULLANICI KAYIT ENDPOINT'İ ---
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Gerekli alanlar var mı kontrol et
    if (!username || !password) {
      return res.status(400).json({ msg: "Lütfen tüm alanları doldurun." });
    }

    // 2. Kullanıcı adı daha önce alınmış mı kontrol et
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ msg: "Bu kullanıcı adı zaten mevcut." });
    }

    // 3. Şifreyi hash'le (şifrele)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Yeni kullanıcıyı oluştur
    const newUser = new User({
      username,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- KULLANICI GİRİŞ ENDPOINT'İ ---
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Gerekli alanlar var mı kontrol et
    if (!username || !password) {
      return res.status(400).json({ msg: "Lütfen tüm alanları doldurun." });
    }
    
    // 2. Kullanıcıyı bul
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ msg: "Kullanıcı bulunamadı." });
    }

    // 3. Şifreleri karşılaştır
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Hatalı şifre." });
    }

    // 4. JWT (JSON Web Token) Oluştur
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "gizli_anahtar");
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;