const express = require('express');
const router = express.Router();
const { resolveServices } = require('restforgejs/src/utils/service-resolver');
const services = resolveServices();
const login = require('./processor/account/login');
const register = require('./processor/account/register');

// CORS ditangani di level app oleh cors middleware (lihat konfigurasi CORS_ENABLED dan CORS_ORIGINS di .env)

// === Auto-generated sensitive field masker (lihat secure-by-default.md Anti-Pattern 7) ===
const SENSITIVE_FIELD_PATTERNS = /^(password|passwd|pwd|secret|token|api_?key|auth(orization)?|credit_?card|card_?number|cvv|ssn|pin|private_?key|refresh_?token|access_?token|otp|mfa)$/i;

function __maskSensitive(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const masked = Array.isArray(obj) ? [...obj] : { ...obj };
  for (const key of Object.keys(masked)) {
    if (SENSITIVE_FIELD_PATTERNS.test(key)) {
      masked[key] = '***MASKED***';
    } else if (masked[key] && typeof masked[key] === 'object') {
      masked[key] = __maskSensitive(masked[key]);
    }
  }
  return masked;
}

// Route untuk processor login - Authenticate a user by email and password
// SECURITY: Validation di-enforce di router layer (auto-generated dari payload request schema).
//           JANGAN edit file router ini. Perubahan akan tertimpa saat generate ulang.
router.post('/login', async (req, res) => {
  try {
    const input = { ...req.body, ...req.params, ...req.query };

    // Header mapping dengan type check
    // Tidak ada header mapping

    // Tidak ada validation rules di payload. Pastikan processor melakukan validasi.

    // Debug log dengan sensitive fields masked
    if (process.env.NODE_ENV !== 'production') {
      console.log('[login] Input:', JSON.stringify(__maskSensitive(input), null, 2));
    }


    const result = await login.process(input, services, req);


    return res.status(result.statusCode || 200).json(result);
  } catch (error) {
    console.error('[login] Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      data: [],
      timestamp: new Date().toISOString()
    });
  }
});

// Route untuk processor register - Register a new guestbook user
// SECURITY: Validation di-enforce di router layer (auto-generated dari payload request schema).
//           JANGAN edit file router ini. Perubahan akan tertimpa saat generate ulang.
router.post('/register', async (req, res) => {
  try {
    const input = { ...req.body, ...req.params, ...req.query };

    // Header mapping dengan type check
    // Tidak ada header mapping

    // Tidak ada validation rules di payload. Pastikan processor melakukan validasi.

    // Debug log dengan sensitive fields masked
    if (process.env.NODE_ENV !== 'production') {
      console.log('[register] Input:', JSON.stringify(__maskSensitive(input), null, 2));
    }


    const result = await register.process(input, services, req);


    return res.status(result.statusCode || 200).json(result);
  } catch (error) {
    console.error('[register] Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      data: [],
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;