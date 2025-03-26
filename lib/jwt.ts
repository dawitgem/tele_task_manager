import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'secret key');

export const generateToken = async (id: string, username: string) => {
  return new SignJWT({ id, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    console.log(payload)

    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};