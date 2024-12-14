import bcrypt from 'bcrypt';

async function hashPassword(passcode: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(passcode, salt);
}

async function comparePassword(passcode: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(passcode, hashedPassword);
}

export { hashPassword, comparePassword };
