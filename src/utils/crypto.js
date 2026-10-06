/**
 * Web Crypto API utilities for military-grade AES-GCM (256-bit) encryption
 * and salted SHA-256 password hashing.
 */

// Buffer to Hex
export function bufToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Hex to Uint8Array
export function hexToBuf(hexString) {
  if (!hexString || hexString.length % 2 !== 0) return new Uint8Array();
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }
  return bytes;
}

// Generate random cryptographic salt as hex
export function generateSalt(length = 16) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return bufToHex(array);
}

// Hash password with SHA-256 + salt
export async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}:love_story_v2`);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return bufToHex(hashBuffer);
}

// Verify password
export async function verifyPassword(password, storedHash, salt) {
  if (!password || !storedHash || !salt) return false;
  const hash = await hashPassword(password, salt);
  return hash === storedHash;
}

// Derive AES-GCM key from password and salt using PBKDF2
async function deriveKey(password, saltBytes) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt arbitrary JavaScript object or string with AES-GCM
export async function encryptData(data, password) {
  const plaintext = typeof data === 'string' ? data : JSON.stringify(data);
  const saltBytes = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(password, saltBytes);
  const enc = new TextEncoder();

  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  );

  return {
    salt: bufToHex(saltBytes),
    iv: bufToHex(iv),
    ciphertext: bufToHex(ciphertextBuffer),
    timestamp: new Date().toISOString()
  };
}

// Decrypt AES-GCM encrypted package
export async function decryptData(encryptedPackage, password) {
  if (!encryptedPackage || !encryptedPackage.ciphertext) {
    throw new Error('No ciphertext available');
  }

  const saltBytes = hexToBuf(encryptedPackage.salt);
  const iv = hexToBuf(encryptedPackage.iv);
  const ciphertextBytes = hexToBuf(encryptedPackage.ciphertext);

  const key = await deriveKey(password, saltBytes);

  try {
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertextBytes
    );

    const dec = new TextDecoder();
    const str = dec.decode(decryptedBuffer);

    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  } catch (err) {
    throw new Error('Incorrect password or corrupted data');
  }
}
