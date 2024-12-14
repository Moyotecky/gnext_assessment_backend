import { config } from 'dotenv';
import { envValidation } from '../validations';
import logger from './logging';
config();

const { value: envVars, error } = envValidation.validate(process.env);
if (error) {
  logger.error(error);
}
export const DB_CONNECTION: string = envVars.DB_CONNECTION ;
export const PORT: number = parseInt(envVars.PORT );
export const NODE_ENV: string = envVars.NODE_ENV ;



export const cspOptions = {
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    fontSrc: ["'self'", 'fonts.gstatic.com'],
  },
};


// const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME; // Make sure this is set in your .env file
// const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD; // Use encodeURIComponent to escape special characters
// const SERVER_PORT = process.env.SERVER_PORT;
// const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@auth.uak7wez.mongodb.net/?retryWrites=true&w=majority&appName=auth`;

// // export const config = {
// //   mongo_url: {
// //     url: MONGO_DB_URL,
// //   },
// //   server_port: {
// //     port: SERVER_PORT,
// //   },
// // };
