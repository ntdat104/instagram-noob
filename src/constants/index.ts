import { __prod__ } from './utils';

export * from './cloudinary';
export * from './token';
export * from './routes';
export * from './utils';
export * from './limits';

// mongodb+srv://admin:<password>@cluster0.vknm3z3.mongodb.net/?retryWrites=true&w=majority
export const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vknm3z3.mongodb.net/?retryWrites=true&w=majority`;

export const FACEBOOK_CLIENT_ID = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const DOMAIN = __prod__ ? process.env.NEXT_PUBLIC_DOMAIN : 'http://localhost:3000';
