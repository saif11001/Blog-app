// Signed admin session cookie, built on the Web Crypto API so it works in both
// the middleware and the route handlers.

export const SESSION_COOKIE = "admin_auth";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

const encoder = new TextEncoder();

// SESSION_SECRET is optional: without it the admin password is used as the signing secret
export const getSessionSecret = () => process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;

const toHex = (buffer: ArrayBuffer) =>
    Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

async function sign(value: string, secret: string) {
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

// Compare two strings without stopping at the first different character
function safeEqual(a: string, b: string) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
}

export async function passwordMatches(input: unknown, expected: string | undefined) {
    if (typeof input !== "string" || !expected) return false;
    // hashing both sides gives two strings of the same length to compare
    const [a, b] = await Promise.all([sign(input, "password-check"), sign(expected, "password-check")]);
    return safeEqual(a, b);
}

export async function createSessionToken(secret: string) {
    const payload = String(Date.now() + SESSION_MAX_AGE * 1000);
    return `${payload}.${await sign(payload, secret)}`;
}

export async function verifySessionToken(token: string | undefined, secret: string | undefined) {
    if (!token || !secret) return false;

    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;

    const expiresAt = Number(payload);
    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

    return safeEqual(signature, await sign(payload, secret));
}
