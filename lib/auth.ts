// lib/auth.ts
import bcrypt from 'bcryptjs';

// Function to hash the password
export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

// Function to verify hashed password
export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
