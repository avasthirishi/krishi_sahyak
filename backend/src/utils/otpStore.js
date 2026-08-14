const OTP_EXPIRY_MS = 10 * 60 * 1000;
const OTP_RATE_LIMIT_MS = 60 * 1000;

const otpStore = new Map();
const loginOtpStore = new Map();
const loginVerifiedStore = new Map();
const verifiedEmailStore = new Map();

const getNow = () => Date.now();

export const canRequestOtp = (email) => {
  const normalizedEmail = email.toLowerCase();
  const current = otpStore.get(normalizedEmail);

  if (!current) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const elapsed = getNow() - current.lastSentAt;
  if (elapsed >= OTP_RATE_LIMIT_MS) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const retryAfterSeconds = Math.ceil((OTP_RATE_LIMIT_MS - elapsed) / 1000);
  return { allowed: false, retryAfterSeconds };
};

export const saveOtp = (email, otpHash) => {
  const normalizedEmail = email.toLowerCase();
  otpStore.set(normalizedEmail, {
    otpHash,
    expiresAt: getNow() + OTP_EXPIRY_MS,
    lastSentAt: getNow(),
    attempts: 0
  });
};

export const getOtpRecord = (email) => {
  const normalizedEmail = email.toLowerCase();
  const record = otpStore.get(normalizedEmail);

  if (!record) {
    return null;
  }

  if (record.expiresAt < getNow()) {
    otpStore.delete(normalizedEmail);
    return null;
  }

  return record;
};

export const incrementOtpAttempts = (email) => {
  const normalizedEmail = email.toLowerCase();
  const record = otpStore.get(normalizedEmail);
  if (!record) {
    return;
  }

  record.attempts += 1;
  otpStore.set(normalizedEmail, record);
};

export const clearOtp = (email) => {
  otpStore.delete(email.toLowerCase());
};

export const markEmailVerified = (email) => {
  verifiedEmailStore.set(email.toLowerCase(), getNow());
};

export const isEmailVerifiedForSignup = (email) => {
  const normalizedEmail = email.toLowerCase();
  const verifiedAt = verifiedEmailStore.get(normalizedEmail);

  if (!verifiedAt) {
    return false;
  }

  if (getNow() - verifiedAt > OTP_EXPIRY_MS) {
    verifiedEmailStore.delete(normalizedEmail);
    return false;
  }

  return true;
};

export const consumeEmailVerification = (email) => {
  verifiedEmailStore.delete(email.toLowerCase());
};

// ─── Login OTP helpers (separate namespace) ───────────────────────────────────

export const canRequestLoginOtp = (email) => {
  const key = email.toLowerCase();
  const current = loginOtpStore.get(key);
  if (!current) return { allowed: true, retryAfterSeconds: 0 };
  const elapsed = getNow() - current.lastSentAt;
  if (elapsed >= OTP_RATE_LIMIT_MS) return { allowed: true, retryAfterSeconds: 0 };
  return { allowed: false, retryAfterSeconds: Math.ceil((OTP_RATE_LIMIT_MS - elapsed) / 1000) };
};

export const saveLoginOtp = (email, otpHash) => {
  const key = email.toLowerCase();
  loginOtpStore.set(key, { otpHash, expiresAt: getNow() + OTP_EXPIRY_MS, lastSentAt: getNow(), attempts: 0 });
};

export const getLoginOtpRecord = (email) => {
  const key = email.toLowerCase();
  const record = loginOtpStore.get(key);
  if (!record) return null;
  if (record.expiresAt < getNow()) { loginOtpStore.delete(key); return null; }
  return record;
};

export const incrementLoginOtpAttempts = (email) => {
  const key = email.toLowerCase();
  const record = loginOtpStore.get(key);
  if (!record) return;
  record.attempts += 1;
  loginOtpStore.set(key, record);
};

export const clearLoginOtp = (email) => { loginOtpStore.delete(email.toLowerCase()); };

export const markLoginVerified = (email) => { loginVerifiedStore.set(email.toLowerCase(), getNow()); };

export const isLoginVerified = (email) => {
  const key = email.toLowerCase();
  const t = loginVerifiedStore.get(key);
  if (!t) return false;
  if (getNow() - t > OTP_EXPIRY_MS) { loginVerifiedStore.delete(key); return false; }
  return true;
};

export const consumeLoginVerification = (email) => { loginVerifiedStore.delete(email.toLowerCase()); };
