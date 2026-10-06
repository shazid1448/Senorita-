/**
 * Safe Unicode-compatible sync payload encoder and decoder.
 */

export function encodeSyncPayload(data) {
  try {
    const clean = JSON.parse(JSON.stringify(data));
    // Remove internal password hash for security
    if (clean.security) {
      delete clean.security.passwordHash;
      delete clean.security.salt;
    }
    const json = JSON.stringify(clean);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (err) {
    console.error('Failed to encode sync payload:', err);
    return null;
  }
}

export function decodeSyncPayload(str) {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    if (!parsed || !parsed.startDate) {
      throw new Error('Invalid payload format');
    }
    return parsed;
  } catch (err) {
    console.error('Failed to decode sync payload:', err);
    return null;
  }
}
