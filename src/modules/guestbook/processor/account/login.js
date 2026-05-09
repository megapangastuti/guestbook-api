/**
 * Processor: login
 * Authenticate a user by email and password
 * Method: POST
 */
const login = {
  async process(input, services) {
    const { db, logger, createResponse, createError } = services;

    try {
      const jwt = require('jsonwebtoken');

      const email = normalizeEmail(input.email);
      const password = typeof input.password === 'string' ? input.password : '';

      if (!email || !password) {
        return createError(400, 'Email and password are required.');
      }

      const rows = await db.executeQuery(
        `SELECT id, name, email, password, role
         FROM users
         WHERE email = $1
         LIMIT 1`,
        [email]
      );

      const user = rows && rows[0];
      if (!user) {
        return createError(401, 'Invalid email or password.');
      }

      const passwordMatches = await verifyPassword(password, user.password);
      if (!passwordMatches) {
        return createError(401, 'Invalid email or password.');
      }

      const safeUser = toSafeUser(user);
      const token = jwt.sign(safeUser, getJwtSecret(), {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
      });

      return createResponse(200, 'Login successful.', {
        user: safeUser,
        token
      });
    } catch (error) {
      logger.error({ event: 'login_error', error: error.message }, 'Failed to process login.');
      return createError(500, 'Failed to process request.');
    }
  }
};

function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

async function verifyPassword(plainText, storedPassword) {
  if (!storedPassword) {
    return false;
  }

  if (storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$')) {
    return require('bcrypt').compare(plainText, storedPassword);
  }

  return plainText === storedPassword;
}

function getJwtSecret() {
  return process.env.JWT_SECRET || process.env.AUTH_JWT_SECRET || 'change-me-in-production';
}

function toSafeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

module.exports = login;
