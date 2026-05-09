/**
 * Processor: register
 * Register a new guestbook user
 * Method: POST
 */
const register = {
  async process(input, services) {
    const { db, logger, createResponse, createError } = services;

    try {
      const bcrypt = require('bcrypt');
      const crypto = require('crypto');
      const jwt = require('jsonwebtoken');

      const name = typeof input.name === 'string' ? input.name.trim() : '';
      const email = normalizeEmail(input.email);
      const password = typeof input.password === 'string' ? input.password : '';
      const role = normalizeRole(input.role);

      const validationErrors = validateRegistration({ name, email, password, role });
      if (validationErrors.length > 0) {
        return createError(400, 'Invalid registration payload.', { errors: validationErrors });
      }

      const existing = await db.executeQuery(
        'SELECT id FROM users WHERE email = $1 LIMIT 1',
        [email]
      );

      if (existing && existing.length > 0) {
        return createError(409, 'Email is already registered.');
      }

      const id = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, 10);
      const inserted = await db.executeQuery(
        `INSERT INTO users (id, name, email, password, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, name, email, role`,
        [id, name, email, hashedPassword, role]
      );

      const user = inserted && inserted[0];
      const token = jwt.sign(user, getJwtSecret(), {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
      });

      return createResponse(201, 'Registration successful.', {
        user,
        token
      });
    } catch (error) {
      if (error && error.code === '23505') {
        return createError(409, 'Email is already registered.');
      }

      logger.error({ event: 'register_error', error: error.message }, 'Failed to process register.');
      return createError(500, 'Failed to process request.');
    }
  }
};

function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function normalizeRole(value) {
  return typeof value === 'string' && value.trim() ? value.trim().toUpperCase() : 'RECEPTIONIST';
}

function validateRegistration({ name, email, password, role }) {
  const errors = [];

  if (!name) {
    errors.push('Name is required.');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email is required.');
  }
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters.');
  }
  if (!['ADMIN', 'RECEPTIONIST'].includes(role)) {
    errors.push('Role must be ADMIN or RECEPTIONIST.');
  }

  return errors;
}

function getJwtSecret() {
  return process.env.JWT_SECRET || process.env.AUTH_JWT_SECRET || 'change-me-in-production';
}

module.exports = register;
