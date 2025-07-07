import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import hpp from 'hpp';
import { xssSanitize } from './xssSanitize.js';
import defaultLimiter from './rateLimit.js';
import cors from 'cors'

export const applySecurity = (app) => {
    app.use(cors());               // Enable Cross-Origin Resource Sharing for all origins
    app.use(helmet());              // Set secure HTTP headers (e.g. CSP, HSTS, X-Frame-Options)
    // app.use(mongoSanitize());      // Prevent NoSQL injection by sanitizing request data
    app.use(compression());        // Compress response bodies to improve performance
    app.use(hpp());                // Prevent HTTP parameter pollution (e.g., ?id=1&id=2)
    app.use(defaultLimiter);       // Limit repeated requests from same IP (rate limiting)
    app.use(xssSanitize);          // Sanitize input to prevent XSS (Cross-Site Scripting) attacks
};

