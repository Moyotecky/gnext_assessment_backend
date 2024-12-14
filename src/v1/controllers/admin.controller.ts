// admin.controller.ts
import { Request, Response } from 'express'
import Joi from 'joi'
import { comparePassword, hashPassword } from '../utils/bycrpt.utils'
import { generateToken } from '../utils/jwt.utils'
import Admin from '../models/admin.model'
import { sendLoginEmail } from '../utils/nodemailer.utils'
import geoip from 'geoip-lite';
import uaParser from 'ua-parser-js';
import DeviceDetector from 'device-detector-js';


// Admin registration function
export async function register(req: Request, res: Response) {
  try {
    const {email, password} = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new admin user
    const newAdmin = new Admin({
      email,
      passcode: hashedPassword
    });

    await newAdmin.save();

    return res.status(201).json({
      message: 'Admin created successfully',
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}

export async function login(req: Request, res: Response) {
  // Validate the request body
  const loginValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const result = loginValidate.validate(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error.details[0].message });
  }

  try {
    const { email, password } = req.body;

    // Fetch admin data
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Validate password
    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = generateToken({
      adminId: admin._id,
      email: admin.email,
    });

    // Extract location and device details
    const ipAddress = Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for'] || req.ip || '127.0.0.1';
    const geo = geoip.lookup(ipAddress);
    const location = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown Location';

    // Extract device type
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent'; // Extract user-agent from request headers
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);
    const deviceType = device.device?.type || 'Unknown Device';

    const dateTime = new Date().toLocaleString();

    // Send login email
    await sendLoginEmail(admin.email, location, deviceType, dateTime);

    return res.status(200).json({ message: 'Admin Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while logging in' });
  }
}