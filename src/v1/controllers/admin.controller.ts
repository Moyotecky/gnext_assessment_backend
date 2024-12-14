// admin.controller.ts
import { Request, Response } from 'express'
import Joi from 'joi'
import { comparePassword, hashPassword } from '../utils/bycrpt.utils'
import { generateToken } from '../utils/jwt.utils'
import Admin from '../models/admin.model'


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

//login a user
export async function login(req: Request, res: Response) {
  //Add validations to the login 
  const loginValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  const result = loginValidate.validate(req.body)
  if (result.error) {
    return res.status(400).json({ message: result.error.details[0].message })
  }
  //Login function block
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    //compare passwords
    const isPasswordValid = await comparePassword(password, admin.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    // Generate JWT token for authenticated Admin
    const token = generateToken({
      adminId: admin._id, 
      email: admin.email,
    })
    return res.status(200).json({ message: 'Admin Login sucessful', token })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}


