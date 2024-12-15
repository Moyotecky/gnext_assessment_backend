import express, { Application, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import Logging from './v1/config/logging';
import cors from 'cors';
import { NODE_ENV } from './v1/config/config';
import adminRoutes from './v1/routes/admin.routes';
import productRoutes from './v1/routes/product.routes';
import cartRoutes from './v1/routes/cart.routes'; // Import the cart routes

export default async function setup(app: Application): Promise<Application> {
  // CORS configuration for production and development
  if (NODE_ENV === 'production') {
    app.use(cors({ origin: 'url' }));
    app.options('*', cors({ origin: 'url' }));
  } else {
    app.use(cors());
    app.options('*', cors());
  }

  // Middleware for parsing JSON requests and handling URL encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser()); // Make sure this is before any routes that require cookies

  // Logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    Logging.info(
      `incoming -> method: [${req.method}] - url: [${req.url}] - ip: [${req.socket.remoteAddress}]`,
    );

    res.on('finish', () => {
      Logging.info(
        `incoming -> method: [${req.method}] - url: [${req.url}] - ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`,
      );
    });

    next();
  });

  // Cart Routes
  app.use("/api/v1/cart", cartRoutes); // Add the cart routes here

  // Admin and Product Routes
  app.use("/api/v1/admin", adminRoutes);
  app.use("/api/v1/products", productRoutes);

  // Default route
  app.get('/', (req, res) => {
    res.send('Hello world');
  });

  // 404 error handling for undefined routes
  app.use('/404', (req, res) => {
    res.status(404).send({ message: 'Route not found' });
  });

  // CORS headers middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Allow requests from all origins (adjust this for production later)
    res.header('Access-Control-Allow-Origin', '*');

    // Allow specific HTTP methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Allow specific custom headers (if needed)
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Allow credentials (if your app uses credentials)
    res.header('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests by responding with 200 status
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Pass control to the next middleware
    next();
  });

  return app;
}
